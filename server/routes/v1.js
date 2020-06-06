const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const expenseController = require('../controllers/expenseController')
const passport = require('passport')


//--------------------publiic routes-----------------------------//

router.post('/register',userController.register)
router.post('/login'   ,userController.login)

//---------------customizing auth middleware--------------------//

router.all('*',(req,res,next)=>{
    passport.authenticate('jwt',{session:false}, (err,user)=>{
        if(err || !user){
            const error  = new Error('u r not authorized to view this area')
            error.status = 401
            throw error
        }
        req.user =user
        return next()
    })(req,res,next)
})
//---------------protected routes------------------------------//

router.get('/me', userController.me);
router.get('/expense/:month?', expenseController.get);
router.post('/expense',expenseController.create)
router.put('/expense/:expense_id',expenseController.update)
router.delete('/expense/:expense_id',expenseController.destroy)

module.exports = router