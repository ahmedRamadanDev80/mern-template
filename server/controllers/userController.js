const jwt  = require('jsonwebtoken')
const User = require('../models/user.model')
const userController ={}

userController.register = async (req,res,next)=>{
    const { name,email,password,joined } = req.body
    const newUser = new User({
        name,
        email,
        password,
        joined
    })

    try{
        const user = await newUser.save()
        return res.send({user})
    }catch(e){
        if(e.code ===11000 && e.name ==='MongoError'){
            var error = new Error('email is already taken. ')
            next(error)
        }else{
            next(e)
        }
        
    }
    
    
}

userController.login = async (req,res,next)=>{
    const{email,password} = req.body

    try{
        // check the email and password is valid
        const user = await User.findOne({email})
        if(!user){
            const err = new Error(`${email} does not exist`)
            err.status = 401
            next(err)
        }
        user.isPasswordMatch(password,user.password,(err,matched)=>{
            if(matched){
               //jwt generation
                const secret = process.env.JWT_SECRET
                const expire = process.env.JWT_EXPIRATION

                const token  = jwt.sign({ _id: user._id }, secret,{expiresIn: expire})
                return res.send({token})
            }

            res.status(401).send({error:'email and password does not match'})
            
        })
    }catch(e){
        next(e)
    }
}

userController.me = (req, res, next) => {
    const { user } = req;
    res.send({ user })
}
module.exports = userController