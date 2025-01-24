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
                sparse: true,
            },
            codeforcesUser: {
                type: String,
                sparse: true,
            },
            leetUser: {
                type: String,
                sparse: true,
            },
        },
        ranks:{
            codechefRank:{
                type:String,
                sparse:true,
                rankLastUpdated:{ 
                    type: Date, 
                    default: Date.now 
                }
            },
            codeforcesRank:{
                type:String,
                sparse:true,
                rankLastUpdated:{ 
                    type: Date, 
                    default: Date.now 
                }
            },
            leetRank:{
                type:String,
                sparse:true,
                rankLastUpdated:{ 
                    type: Date, 
                    default: Date.now 
                }
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
