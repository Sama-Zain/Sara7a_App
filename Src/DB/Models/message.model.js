import mongoose ,{SchemaTypes} from "mongoose";
const { Schema } = mongoose;
const messageSchema = new mongoose.Schema({
     content:{
        type:String,
        required:true,
        min: [2, "Message must be at least 2 characters"],
        max: [500, "Message must be less than 500 characters"],
        trim: true
     },
     senderId:{
        type:SchemaTypes.ObjectId,
        ref:"User",
     },
     receiverId:{
        type:SchemaTypes.ObjectId,
        required:true,
        ref:"User",
     },
     
},
  {
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey:false,
    collection:"Messages"
});
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;