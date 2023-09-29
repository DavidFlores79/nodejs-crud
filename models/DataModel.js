const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter your first name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter your last name"]
        },
        email: {
            type: String,
            required: [true, 'Must have an email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Must have a password'],
            
        },
        avatar: {
            type: String,
            default: 'https://res.cloudinary.com/dltvxi4tm/image/upload/v1684249857/files/63f5014ee1ea6226ba9dbfd3_gmwwgx.png'
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;