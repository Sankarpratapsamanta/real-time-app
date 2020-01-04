const express=require('express');
const router=express.Router();
const Travel=require('../models/travel_data');
router.get('/api',(req,res)=>{
    Travel.find({}).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json({message:err})
    })
})

router.post('/api',async(req,res)=>{
    const data=new Travel({
        safe_travel_distance:req.body.safe_travel_distance,
        moderate_travel_distance:req.body.moderate_travel_distance,
        risky_travel_distance:req.body.risky_travel_distance,
        safe_travel_duration:req.body.safe_travel_duration,
        moderate_travel_duration:req.body.moderate_travel_duration,
        risky_travel_duration:req.body.risky_travel_duration,
        avg_speed:req.body.avg_speed,
        total_travel_distance:req.body.total_travel_distance,
        total_travel_duration:req.body.total_travel_duration,
    })
    try{
        const savedData=await data.save();
        res.json(savedData);
    }catch(err){
        res.json({message:err});
    }
  
});

module.exports=router