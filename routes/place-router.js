const express=require('express')

const router=express.Router()
const HttpError=require('../models/http-error')
const placesControllers=require('../controllers/places-controllers')

router.get('/:pid',placesControllers.getPlaceById)
   

router.get('/user/:uid',placesControllers.getUserById)

module.exports=router