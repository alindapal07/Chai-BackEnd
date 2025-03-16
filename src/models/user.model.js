import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const userSchema=new Schema({
   userName:{
    type: String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
   },
   email:{
    type: String,
    required:true,
    unique:true,
    lowercase:true,
   },
   fullname:{
    type: String,
    required:true,
    index:true
   },
    avatar:{
    type: String,   //cloudnary url
    required:true,
    unique:true,
    lowercase:true,
   },
   coverimage:{
    type: String,   //cloudnary url
   },
   watchHistory:[
     {
    type:Schema.Types.ObjectId,
    ref:"video"
     }
    ],
    password:{
        type:string,
        required:[true,'password is required']
    },
    refreshToken:{
        type:string,
    }
},
{
  timestamps: true
});

if(!this.isModified("password")) return next();
userSchema.pre('save',async function (next){
      this.password=bcrypt.hash(this.password,10);
      next();
});

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken=function(){
    return jsonwebtoken.sign({
        id:this.id,
        email:this.email,
        userName:this.userName,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}



userSchema.methods.generateRefreshToken=function(){
    return jsonwebtoken.sign({
        id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
 


export default User=mongoose.model("User",userSchema);