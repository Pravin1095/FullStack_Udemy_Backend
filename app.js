const express=require('express')
const bodyParser=require('body-parser')

const placeRouter=require('./routes/place-router')
const app=express();

app.use('/api/places', placeRouter)  //Now we have added the route as a middleware in app.js . By giving /api/places in 1st argument we filter the routes according to this

app.listen(5000)