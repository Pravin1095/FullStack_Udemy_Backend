const HttpError=require('../models/http-error')

const DUMMY_PLACES= [{
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

const getUserById=(req, res, next)=>{
    const userID=req.params.uid
    console.log('id',userID)
    const user=DUMMY_PLACES.find(u=>{
        return u.creator===userID
    })
    if(!user){
        const error=new Error('Could not find a place for the provided user id')
        error.code=404
       return next(new HttpError('Could not find a place for the provided user id', 404)) // Here we use next because it goes to next middleware in this way
        // res.status(404).json({message:'Could not find a place for the provided user id'})
    }
    
   res.json({user}) 
}

exports.getPlaceById=getPlaceById
exports.getUserById=getUserById
