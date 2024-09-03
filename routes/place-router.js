const express=require('express')

const router=express.Router()
const HttpError=require('../models/http-error')
const {check}= require('express-validator')
const placesControllers=require('../controllers/places-controllers')

router.get('/:pid',placesControllers.getPlaceById)
   

router.get('/user/:uid',placesControllers.getPlacesByUserId)

router.post('/',[
    check('title').not().isEmpty(), check('description').isLength({min: 5}), 
    check('address').not().isEmpty()
],placesControllers.createPlace)  //These fields in the post method call are validated using  express-validator module
router.patch('/:pid',placesControllers.updatePlace)
router.delete('/:pid',placesControllers.deletePlace)

module.exports=router