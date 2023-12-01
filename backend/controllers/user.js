const User = require('../models/user');
const validator = require('../util/validationError')
const bcrypt = require('bcryptjs');
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

        const createdUser = await user.save();
        res.status(201).json({
            message: 'User created!',
            userId: createdUser._id
        })

    } catch (error) {
        next(error)
    }

}

exports.login = (req, res, next)=>{

}

exports.getUser = (req, res, next)=>{

}