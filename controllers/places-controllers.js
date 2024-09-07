const HttpError=require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')

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
const getPlaceById=(req, res, next)=>{
    const placeID=req.params.pid
    console.log('id',placeID)
    const place=DUMMY_PLACES.find(p=>{
        return p.id===placeID
    })
    console.log('place',place)
    if(!place){
        // const error=new Error('Could not find a place for the provided id')
        // error.code=404
        throw new HttpError('Could not find a place for the provided id', 404)
        // res.status(404).json({message:'Could not find a place for the provided id'})
    }
    
        res.json({place}) 
}

const getPlacesByUserId=(req, res, next)=>{
    const userID=req.params.uid
    console.log('id',userID)
    const places=DUMMY_PLACES.filter(u=>{
        return u.creator===userID
    })
    if(!places || places.length===0){
        // const error=new Error('Could not find a place for the provided user id')
        // error.code=404
       return next(new HttpError('Could not find place for the provided user id', 404)) // Here we use next because it goes to next middleware in this way
        // res.status(404).json({message:'Could not find a place for the provided user id'})
    }
    
   res.json({places}) 
}

const createPlace=(req,res,next)=>{
    const {title,description,coordinates, address, creator}=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log('error', errors)
        throw new HttpError('Invalid inputs passed . Please check your data', 422)
    }
    const createdPlace={
        id:uuidv4(),
        title:title,
        description:description,
        location:coordinates,
        address:address,
        creator:creator

    }
    DUMMY_PLACES.push(createdPlace)
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

exports.getPlaceById=getPlaceById
exports.getPlacesByUserId=getPlacesByUserId
exports.createPlace=createPlace
exports.updatePlace=updatePlace
exports.deletePlace=deletePlace
