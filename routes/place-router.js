const express=require('express')

const router=express.Router()

router.get('/',(req,res)=>{
    console.log('Get request in places')
    res.json({message:'It works'})
})

module.exports=router