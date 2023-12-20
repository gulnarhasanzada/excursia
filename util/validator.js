const {body} = require('express-validator');
const User = require('../models/user');

exports.validateSignup = [
    // body('email').isEmail().withMessage('Please enter a valid email!')
    //              .custom((value, {req})=>{
    //                 return User.findOne({email:value}).then(userDoc =>{
    //                     if(userDoc){
    //                         return Promise.reject('Email address already exists!');
    //                     }
    //                 })
    //              }).normalizeEmail(),
    // body('password').trim().isLength({min: 5}).withMessage('Please enter a valid email!'),
    // body('firstname').trim().not().isEmpty().withMessage('Please enter a valid email!'),
]

exports.validateLogin = []

exports.validateCreateListing = [
    // body('title').trim().isLength({min: 3}).withMessage('Title should be at least 3 characters long!'),
    // body('description').trim().isLength({min: 15}).withMessage('Description should be at least 15 characters long!'),
    // body('city').trim().notEmpty().withMessage('City should be at least 3 characters long!'),
    // body('country').trim().notEmpty().withMessage('Country is required!'),
    // body('province').trim().notEmpty().withMessage('Province is required!'),
    // body('nightlyPrice').notEmpty().withMessage('Nightly price is required!').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    // body('weeklyPrice').optional().notEmpty().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    // body('monthlyPrice').optional().notEmpty().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    // body('guests').notEmpty().withMessage('Number of guests is required!').isFloat({ min: 0 }).withMessage('Number of guests must be a positive number'),
    // body('bedrooms').notEmpty().withMessage('Number of bedrooms is required!').isFloat({ min: 0 }).withMessage('Number of bedrooms must be a positive number'),
    // body('bathrooms').notEmpty().withMessage('Number of bathrooms is required!').isFloat({ min: 0 }).withMessage('Number of bathrooms must be a positive number'),
]

