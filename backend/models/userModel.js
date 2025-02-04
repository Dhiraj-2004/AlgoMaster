const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        roll:{
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
                sparse: true,
            },
            codeforcesUser: {
                type: String,
                sparse: true,
            },
            leetcodeUser: {
                type: String,
                sparse: true,
            },
        },
        amcatkey:{
            type: String,
            required: true,
        },
        ranks:{
            codechefRank:{
                type:String,
                sparse:true,
            },
            codeforcesRank:{
                type:String,
                sparse:true,
            },
            leetcodeRank:{
                type:String,
                sparse:true,
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
