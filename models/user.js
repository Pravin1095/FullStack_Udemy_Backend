const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')

const Schema=mongoose.Schema

const userSchema=new Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique : true},  //the unique property sets index for each email and queries it faster compared to other properties. To achieve this we need to install mongoose-unique-validator and add this as a plugin so our emails will be queried faster
    password: {type: String, required: true, minlength :6},
    image: {type: String, required: true},
    places: {type: String, required: true},
})

userSchema.plugin(uniqueValidator)

module.exports=mongoose.model('User', userSchema)