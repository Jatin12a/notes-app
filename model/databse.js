const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/notedb');
const UserSchema = new mongoose.Schema({
    username:{
        type:String, 
    },
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

UserSchema.plugin(plm);

module.exports =  mongoose.model("Users", UserSchema)