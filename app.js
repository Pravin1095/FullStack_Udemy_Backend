const express=require('express')
const bodyParser=require('body-parser')

const placeRouter=require('./routes/place-router')
const app=express();

app.use('/api/places', placeRouter)  //Now we have added the route as a middleware in app.js . By giving /api/places in 1st argument we filter the routes according to this

app.use((error, req,res,next)=>{
    console.log('check',error)
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'An unknown error occured'})
})
app.listen(5000)