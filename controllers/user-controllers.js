const { v4: uuidv4 } = require('uuid');
const HttpError=require('../models/http-error')
const {validationResult} = require('express-validator')
const User=require('../models/user')

let DUMMY_USERS=[
    {
        id: 'u1',
        name: 'Pravin' ,
        email:'test@test.com',
        password: 'testers'  
    }
]

const getUserName=(req, res, next)=>{
    res.status(200).json({users: DUMMY_USERS})
}

const signup=async (req, res, next)=>{
    const {name , email ,password, places}=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log('error', errors)
        return next(new HttpError('Invalid inputs passed . Please check your data', 422))
    }
    // const hasUser=DUMMY_USERS.find(data=>data.email===email)
    // if(hasUser){
    //     throw new HttpError('Could not create user. Email already exists', 422)
    // }
    // const updatedUser={
    //     id:uuidv4(),
    //     name:name,
    //     email:email,
    //     password:password
    // }
    
    // DUMMY_USERS.push(updatedUser)
    // console.log('in signup', DUMMY_USERS)

    let existingUser
    let createdUser
    try{
    existingUser=await User.findOne({email : email})
    
    

    if(existingUser){
        const error=new HttpError('User already exists. Please login instead', 422)
        return next(error)
    }

    createdUser=new User({
name, 
email,
image: 'dummy url',
password,
places
    })
    await createdUser.save()
}

    catch(err){
const error = new HttpError('Signing up failed. please try again', 500)
return next(err)
    }
    res.status(201).json({user : createdUser.toObject({getters: true})})
}

const login=(req, res, next)=>{
    const {email,password}= req.body
    console.log('dum', DUMMY_USERS)
    const checkMail=DUMMY_USERS.find(user=>
        user.email===email
    )
    if(!checkMail || checkMail.password!==password){
        // res.status(404).json({message:'Mail ID unavailable'})
        throw new HttpError('Could not find the provided credentiaals', 401)
    }
   res.json({message: 'Login successful'})
    
}

exports.getUserName=getUserName
exports.signup=signup
exports.login=login
