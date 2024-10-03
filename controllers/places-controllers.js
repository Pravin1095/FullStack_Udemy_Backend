const HttpError=require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')

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

    let places
    try{
        places=await Place.find({creator: userID})
    }
    catch(err){
        const error=HttpError('Could not find a place for entered creator')
        return next(error)
    }

    if(!places || places.length===0){
        // const error=new Error('Could not find a place for the provided user id')
        // error.code=404
       return next(new HttpError('Could not find place for the provided user id', 404)) // Here we use next because it goes to next middleware in this way
        // res.status(404).json({message:'Could not find a place for the provided user id'})
    }
    
   res.json({places}) 
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
    try{
        await createdPlace.save()
    }
    catch(err){
const error = new HttpError('Could not save in database', 500)
return next(error) // this should be present else it won't stop executing and continues even after error
    }
   
    
    res.status(201).json({place:createdPlace})
}

const updatePlace=(req, res, next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log('error', errors)
        throw new HttpError('Invalid inputs passed . Please check your data', 422)
    }
    const {title, description}=req.body
    const id=req.params.pid
    const updatePlace={...DUMMY_PLACES.find(p=>p.id===id)}
    const placeIndex=DUMMY_PLACES.findIndex(p=>p.id===id)
    updatePlace.title=title
    updatePlace.description=description
    DUMMY_PLACES[placeIndex]=updatePlace

    res.status(200).json({place:updatePlace})


}

const deletePlace=(req,res,next)=>{
    const pid=req.params.pid
    if(!DUMMY_PLACES.filter(p=>p.id!==pid)){
        throw new HttpError('Could not find that place for that id', 404);
    }
    DUMMY_PLACES=DUMMY_PLACES.filter(p=>p.id!==pid)
    res.json({message:'Deleted place successfully!'})

}

exports.getPlaces=getPlaces
exports.getPlaceById=getPlaceById
exports.getPlacesByUserId=getPlacesByUserId
exports.createPlace=createPlace
exports.updatePlace=updatePlace
exports.deletePlace=deletePlace
