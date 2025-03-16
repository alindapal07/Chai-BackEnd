import mongoose,{Schema} from "mongoose";
import mongooseAggregate from "mongoose-paginate-v2"

const videoSchema=new Schema({
        videoFile:{
            type:string, //cloudnary url
            required:true,
        },
        thumpNail:{
            type:string, //cloudnary url
            required:true,
        },
        title:{
            type:string, 
            required:true,
        },
        description:{
            type:string, 
            required:true,
        },
        duration:{
            type:Number, //cloudnary url 
            required:true,
        },
        views:{
            type: Number,
            default:0 ,
        },
        isPublished:{
            type:Boolean,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
        }
        
},
{
    timestamps:true,
})

videoSchema=mongoose.plugin(mongooseAggregatepaginate)

export default video= mongoose.model("video",videoSchema);