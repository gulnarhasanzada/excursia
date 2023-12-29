const User = require('../models/user');
const validator = require('../util/validationError')
const formValidator = require("../util/validator")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../config/keys.env'})

exports.signup = async(req, res, next)=>{
    validator.validate(req);
    let errors = {}
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 12);
        if(formValidator.validateText("firstName", req.body.firstName).length > 0){
            errors.firstName = formValidator.validateText("firstName", req.body.firstName);
        }

        if(formValidator.validateText("lasstName", req.body.lastName).length > 0){
            errors.lastName = formValidator.validateText("lastName", req.body.lastName);
        }
        
        if(formValidator.validateEmail(req.body.email).length > 0){
            errors.email = formValidator.validateEmail(req.body.email);
        }else{
            const foundUser = await User.findOne({email: req.body.email.trim()});
            if(foundUser){
                errors.email= "Email address already exists!";
            }
        }
        
        if(formValidator.validatePassword(req.body.password).length > 0){
            errors.password = formValidator.validatePassword(req.body.password);
        }

        

        if(Object.keys(errors).length > 0){
            res.status(400).json({
                message: 'Error',
                errors: errors
            })
        }else{
            const user = new User({
                email: req.body.email,
                password: hashedPassword,
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber
            })
            
    
            const createdUser = await user.save();
            res.status(201).json({
                message: 'User created!',
                userId: createdUser._id
            })
        }

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