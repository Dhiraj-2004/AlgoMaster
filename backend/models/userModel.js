const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
        },
        roll: {
            type: String,
            required: true,
        },
        registeredID: {
            type: String,
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
        department: {
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
                sparse: true 
            },
            codeforcesUser: { 
                type: String, 
                sparse: true 
            },
            leetcodeUser: { 
                type: String, 
                sparse: true 
            },
        },
        amcatkey: {
            type: String,
        },
        ranks: {
            codechefRank: { 
                type: String, 
                sparse: true 
            },
            codeforcesRank: { 
                type: String, 
                sparse: true 
            },
            leetcodeRank: { 
                type: String, 
                sparse: true 
            },
        },
        collegeRank:{
            codechefRank: { 
                type: String, 
                sparse: true 
            },
            codeforcesRank: { 
                type: String, 
                sparse: true 
            },
            leetcodeRank: { 
                type: String, 
                sparse: true 
            },
        },
        departmentRank:{
            codechefRank: { 
                type: String, 
                sparse: true 
            },
            codeforcesRank: { 
                type: String, 
                sparse: true 
            },
            leetcodeRank: { 
                type: String, 
                sparse: true 
            },
        },
        otp: {
            type: String,
        },
        otpExpiration: {
            type: Date,
        },
        amcat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Amcat",
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
