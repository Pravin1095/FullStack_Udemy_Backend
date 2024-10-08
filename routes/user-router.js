const express=require('express')

const router=express.Router()
const HttpError=require('../models/http-error')
const {check}= require('express-validator')
const userControllers=require('../controllers/user-controllers')

router.get('/',userControllers.getUserName)
router.post('/signup',[check('name').not().isEmpty(), check('email').normalizeEmail() //=>Test@test.com => test@test.com (normalizes)
.isEmail(), check('password').isLength({min : 6})],userControllers.signup)
router.post('/login',userControllers.login)


module.exports=router