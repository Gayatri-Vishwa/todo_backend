import mongoose from "mongoose";

const listSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true   // ye field hona chahiye , can not empty or null
    },
    body:{
        type:String,
        required:true 
    },
       user:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
             }  // reference to user model should be capital U same as in user model file
        ]

},{ timestamps: true });

export default mongoose.model("List",listSchema);  // list is the name of collection in mongodb database  ,ref to user model in user model list field