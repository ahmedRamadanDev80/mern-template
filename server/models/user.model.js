const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema({

    name:     { type:String, max: [50]},
    email:    { type:String, trim:1,   unique:1, required:1},
    password: { type:String, min: [5], required:1},
    joined:   { type:Date  ,default:new Date()},
    role:     { type:Number,default:0},
    token:    { type:String},
    tokenExp: { type:Number}
})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password , salt)
        this.password = hashedPassword
        next() 
    }catch(e){
        return next(e)
    }
})

UserSchema.methods.isPasswordMatch = function(password,hashedPassword,callback){
    bcrypt.compare(password,hashedPassword,(err, success) =>{
        if(err)return callback(err)
        callback(null,success)

    })
}

UserSchema.methods.toJSON =function () {
    const userObject = this.toObject()
    delete userObject.password
    return userObject
}
const User = mongoose.model('User',UserSchema)
module.exports =  User