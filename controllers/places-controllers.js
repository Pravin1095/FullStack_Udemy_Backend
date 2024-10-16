const HttpError=require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')
const User=require('../models/user.js')
const mongoose = require('mongoose')

const Place=require('../models/place.js')
const getCoordsForAddress= require('../util/location.js');
let DUMMY_PLACES= [{
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  }]

  const getPlaces=async(req, res, next)=>{
    try{
    const allPlaces=await Place.find()
    res.json(allPlaces)
    }
    catch(err){
        const error=HttpError('Could not find any plces', 500)
        return next(error)
    }
  }
const getPlaceById=async (req, res, next)=>{
    const placeID=req.params.pid
    // console.log('id',placeID)
    // const place=DUMMY_PLACES.find(p=>{
    //     return p.id===placeID
    // })
    // console.log('place',place)
    let place
    try{
    place=await Place.findById(placeID)
    }
    catch(err){
const error=new HttpError('Something went wrong, could not find a place', 500)
return next(error)
    }
    if(!place){
        // const error=new Error('Could not find a place for the provided id')
        // error.code=404
        throw new HttpError('Could not find a place for the provided id', 404)
        // res.status(404).json({message:'Could not find a place for the provided id'})
    }
    
        res.json({place: place.toObject({getters: true})}) 
}

const getPlacesByUserId=async (req, res, next)=>{
    const userID=req.params.uid
    // console.log('id',userID)
    // const places=DUMMY_PLACES.filter(u=>{
    //     return u.creator===userID
    // })

    let userWithPlaces
    try{
        userWithPlaces=await User.findById(userID).populate('places')
    }
    catch(err){
        const error=HttpError('Could not find a place for entered creator')
        return next(error)
    }

    if(!userWithPlaces || userWithPlaces.places.length===0){
        // const error=new Error('Could not find a place for the provided user id')
        // error.code=404
       return next(new HttpError('Could not find place for the provided user id', 404)) // Here we use next because it goes to next middleware in this way
        // res.status(404).json({message:'Could not find a place for the provided user id'})
    }
    
   res.json({places : userWithPlaces.places.map(place=>place.toObject({getters: true}))}) 
}

const createPlace=async (req,res,next)=>{
    const {title,description, address, creator}=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log('error', errors)
         next(new HttpError('Invalid inputs passed . Please check your data', 422))
    }
    let coordinates
try{
    coordinates=getCoordsForAddress(address)
}catch(error){
    return next(error)
}
    const createdPlace=new Place({
        title,
        description,
        address,
        location : coordinates,
        image :'dummy url',
        creator
    })
    // const createdPlace={
    //     id:uuidv4(),
    //     title:title,
    //     description:description,
    //     location:coordinates,
    //     address:address,
    //     creator:creator

    // }
    // DUMMY_PLACES.push(createdPlace)

    let user
    try{
        user=await User.findById(creator)
    }
    catch(err){
        const error=new HttpError('Creating place failed. please try again', 500)
        return next(error)
    }
    if(!user){
        const error=new HttpError('Could not find user for this id', 404)
        return next(error)
    }
    try{
        const sess=await mongoose.startSession()
        sess.startTransaction()
        await createdPlace.save({session: sess});
        user.places.push(createdPlace)
        await user.save({session: sess})
        await sess.commitTransaction()
    }
    catch(err){
const error = new HttpError('Could not save in database', 500)
return next(error) // this should be present else it won't stop executing and continues even after error
    }
   
    
    res.status(201).json({place:createdPlace})
}

const updatePlace=async (req, res, next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log('error', errors)
        throw new HttpError('Invalid inputs passed . Please check your data', 422)
    }
    const {title, description, address}=req.body
    const id=req.params.pid
    // const updatePlace={...DUMMY_PLACES.find(p=>p.id===id)}
    // const placeIndex=DUMMY_PLACES.findIndex(p=>p.id===id)
    // updatePlace.title=title
    // updatePlace.description=description
    // DUMMY_PLACES[placeIndex]=updatePlace

    let place
    try{
        place= await Place.findById(id)
        place.title=title
        place.description=description
        place.address=address
        await place.save()
    }
    catch(err){
        const error=HttpError('Could not update the place details', 500)
        return next(error)
    }

    res.status(200).json({place:place.toObject({getters: true})})


}

const deletePlace=async (req,res,next)=>{
    const pid=req.params.pid
    // if(!DUMMY_PLACES.filter(p=>p.id!==pid)){
    //     throw new HttpError('Could not find that place for that id', 404);
    // }
    // DUMMY_PLACES=DUMMY_PLACES.filter(p=>p.id!==pid)
    let places
    try{
        places=await Place.findById(pid).populate('creator')
        
    }
    catch(err){
const error=new HttpError('Could not delete places', 500)
return next(error)
    }
    if(!places){
        const error=new HttpError('Could not find place for this id', 404)
        return next(error)
    }
    try{
        const sess=await mongoose.startSession()
        sess.startTransaction()
        await Place.deleteOne({ _id: places._id }, { session: sess });
        console.log('usercheck', places.creator)
        places.creator.places.pull(places)
        await places.creator.save({session: sess})
        await sess.commitTransaction()
       
    }
    catch(err){
        const error=new HttpError('Something went wrong, could not delete place', 500)
        return next(err)
    }
    res.json({message:'Deleted place successfully!'})

}

exports.getPlaces=getPlaces
exports.getPlaceById=getPlaceById
exports.getPlacesByUserId=getPlacesByUserId
exports.createPlace=createPlace
exports.updatePlace=updatePlace
exports.deletePlace=deletePlace
