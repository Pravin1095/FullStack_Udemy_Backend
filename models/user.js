const mongoose=require('mongoose')
const uniqueValidator=require('@ladjs/mongoose-unique-validator')

const Schema=mongoose.Schema

const userSchema=new Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},  //the unique property sets index for each email and queries it faster compared to other properties. To achieve this we need to install mongoose-unique-validator and add this as a plugin so our emails will be queried faster
    password: {type: String, required: true, minlength :6},
    image: {type: String, required: true},
    places: [{type: mongoose.Types.ObjectId, required: true, ref:'Place'}], //using square brackets we tell mongoose that there can be multiple places also can be stored
})

// userSchema.plugin(uniqueValidator) //also this unique validator makes sure tht no email is being repeated

module.exports=mongoose.model('User', userSchema)