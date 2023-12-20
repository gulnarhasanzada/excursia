const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    listings: [{
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    }],
    }, { timestamps: true });

module.exports = mongoose.model('User', userSchema);