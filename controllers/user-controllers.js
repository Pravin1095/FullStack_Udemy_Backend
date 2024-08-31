const { v4: uuidv4 } = require('uuid');
const HttpError=require('../models/http-error')
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

const signup=(req, res, next)=>{
    const {name , email ,password}=req.body
    const hasUser=DUMMY_USERS.find(data=>data.email===email)
    if(hasUser){
        throw new HttpError('Could not create user. Email already exists', 422)
    }
    const updatedUser={
        id:uuidv4(),
        name:name,
        email:email,
        password:password
    }
    
    DUMMY_USERS.push(updatedUser)
    console.log('in signup', DUMMY_USERS)
    res.status(201).json({user : updatedUser})
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
