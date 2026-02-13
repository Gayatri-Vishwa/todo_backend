import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,   // ye field hona chahiye , can not empty or null
        unique:true      // no two user can have same email
    },
    username:{
        type:String,
        // required:true   //we will make on ui 
    },
    password:{
        type:String,
        required:true 
    },
    list:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
         }  // reference to list model should be capital L same as in list model file
    ]

},{ timestamps: true });

export default mongoose.model("User",userSchema);  // list is the name of collection in mongodb database