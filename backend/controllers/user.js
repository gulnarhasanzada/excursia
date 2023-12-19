const User = require('../models/user');
const validator = require('../util/validationError')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../config/keys.env'})

exports.signup = async(req, res, next)=>{
    validator.validate(req);
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber
        })
        const foundUser = await User.findOne({email: req.body.email.trim()});
        if(foundUser){
            const error = new Error('Email address already exists!');
            error.statusCode = 400;
            throw error;
        }

        const createdUser = await user.save();
        res.status(201).json({
            message: 'User created!',
            userId: createdUser._id
        })

    } catch (error) {
        next(error)
    }

}

exports.login = async (req, res, next)=>{
    try {
        //validating email
        const user = await User.findOne({email: req.body.email.trim()});
        if(!user){
            const error = new Error('Wrong email or password!');
            error.statusCode = 401;
            throw error;
        }
        //validating password
        const isCorrectPassword = await bcrypt.compare(req.body.password.trim(), user.password);
        if(!isCorrectPassword){
            const error = new Error('Wrong email or password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({email: user.email, 
                                userId: user._id.toString()},
                                process.env.SECRET,
                                {expiresIn: '1h'});
        res.status(200).json({
            token,
            userId: user._id.toString()
        })
    } catch (error) {
        next(error);
    }

}

exports.getUser = (req, res, next)=>{

}