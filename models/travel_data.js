const mongoose=require('mongoose');

const travelSchema=new mongoose.Schema({
    safe_travel_distance:{type:Number,required:true},
    moderate_travel_distance:{type:Number,required:true},
    risky_travel_distance:{type:Number,required:true},
    safe_travel_duration:{type:Number,required:true},
    moderate_travel_duration:{type:Number,required:true},
    risky_travel_duration:{type:Number,required:true},
    avg_speed:{type:Number,required:true},
    total_travel_distance:Number,
    total_travel_duration:Number,
    date:{type:Date,default:Date.now()}
})

module.exports=mongoose.model('travels',travelSchema)