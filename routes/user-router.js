const express=require('express')

const router=express.Router()
const HttpError=require('../models/http-error')
const userControllers=require('../controllers/user-controllers')

router.get('/',userControllers.getUserName)
router.post('/signup',userControllers.signup)
router.post('/login',userControllers.login)


module.exports=router