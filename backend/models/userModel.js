const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    token : {
        type : String,
        default : ""
    },
    isActive : {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true
})

mongoose.model('User', userSchema)

// const User = new mongoose.model('User', userSchema)
// module.exports = User 