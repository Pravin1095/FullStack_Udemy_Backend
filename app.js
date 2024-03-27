const express=require('express')
const bodyParser=require('body-parser')

const placeRouter=require('./routes/place-router')
const app=express();

app.use(placeRouter)  //Now we have added the route as a middleware in app.js

app.listen(5000)