const express=require('express')
const bodyParser=require('body-parser')
const HttpError=require('./models/http-error')
const mongoose=require('mongoose')

const url='mongodb://apravin3210:B3EiLC-vRuFUw8B@cluster1-shard-00-00.4p7ka.mongodb.net:27017,cluster1-shard-00-01.4p7ka.mongodb.net:27017,cluster1-shard-00-02.4p7ka.mongodb.net:27017/places_test?ssl=true&replicaSet=atlas-euhcrs-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster1'
const placeRouter=require('./routes/place-router')
const userRouter=require('./routes/user-router')
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/places', placeRouter)  //Now we have added the route as a middleware in app.js . By giving /api/places in 1st argument we filter the routes according to this
app.use('/api/users', userRouter )

app.use((req,res, next)=>{
    const error=new HttpError('Could not find this route', 404)
    throw error
})

app.use((error, req,res,next)=>{
    console.log('check',error)
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'An unknown error occured'})
})

mongoose.connect(url).then(()=>{
    console.log('Connection successful')
    app.listen(5000)
}).catch((err)=>{
    console.log(err)
})
