const mongoose=require('mongoose')

const Schema=mongoose.Schema

const placeSchema=new Schema({
    title : {type : String, required : true},
    description : {type : String, required: true},
    image : {type : String, required: true},  // it is stored as url. we can't store an image as a file because it contradicts database usage . Database should be fast and image file slows it down
    address : {type : String, required: true},
    location:{
        lat :{type : String, required : true},
        lng: {type : String, required :true}
    },
    creator : {type : String, required: true}
})

module.exports= mongoose.model('Place', placeSchema)