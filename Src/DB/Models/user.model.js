import mongoose from "mongoose";
import {GenderEnum,RoleEnum,ProviderEnum} from "../../Utils/enums/user.enum.js";
const userSchema = new mongoose.Schema({
   firstName:{
      type:String,
      required:[true,"First Name is required"],
      minLength:3,
      maxLength:50
   },
   lastName:{
      type:String,
      required:[true,"Last Name is required"],
      minLength:3,
      maxLength:50
   },
   email:{
       type:String,
       required:[true,"Email is required"],
       unique:true,
   },
   password:{
    type:String,
    required:function(){
        return this.provider === ProviderEnum.System;
    },
    minLength:6,
    maxLength:100
   },
   DOB:Date,
   phoneNumber:String,
   gender:{
      type:String,
      enum: Object.values(GenderEnum),
      default:GenderEnum.Male
   },
   role:{
      type:String,
      enum: Object.values(RoleEnum),
      default:RoleEnum.User
   },
   provider:{
      type:String,
      enum: Object.values(ProviderEnum),
      default:ProviderEnum.System
   },
   confirmeEmail:Date,
   profilePicture:String,
},
  {
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    versionKey:false,
    collection:"Users"
});
userSchema.virtual("userName").set(function (value) {
    const [firstName, lastName] = value.split(" ")||[];
    this.set({firstName, lastName});
})
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
const User = mongoose.model("User",userSchema);
export default User;