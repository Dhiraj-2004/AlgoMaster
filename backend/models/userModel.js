const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        college: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        usernames: {
            codechefUser: {
                type: String,
                unique: true,
                sparse: true,
            },
            codeforcesUser: {
                type: String,
                unique: true,
                sparse: true,
            },
            leetUser: {
                type: String,
                unique: true,
                sparse: true,
            },
        },
        otp: {
            type: String,
        },
        otpExpiration: {
            type: Date,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
