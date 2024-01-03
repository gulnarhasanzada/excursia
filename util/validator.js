const {body} = require('express-validator');
const User = require('../models/user');

exports.validateText = (name, text, len=2) => {
    let errors = [];
    if (!text.trim()) {
        errors.push(name + " is required!");
    }
    else {
        if (text.trim().length < len) {
            errors.push(name + " must be at least " + len + " characters long!");
        }
        if (/[^a-zA-Z]/.test(text.trim())) {
            errors.push(name + " cannot have any special characters!");
        }
    }
    
    return errors;
}

exports.validateEmail = (email) => {
    let errors = [];
    if (!email.trim()) {
        errors.push("Email is required!");
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.push("Invalid email format!");
    }
    return errors;
}

exports.validatePassword = (password) => {
    let errors = [];
    if (!password.trim()) {
        errors.push("Password is required!");
    }else {
        if (password.trim().length < 6) {
            errors.push("Password must be at least 6 characters long!");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must contain at least one special character");
        }
    }
    return errors;
}
