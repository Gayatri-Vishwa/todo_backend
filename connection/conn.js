
import mongoose from "mongoose";

const conn= async ()=>{ //use async await or .then  is compulsory
    try{                                       
    await mongoose.connect("mongodb+srv://user:gayatri02%40@cluster0.khydod6.mongodb.net/usersdata?retryWrites=true&w=majority")  // connection string  copy from mongodb atlas  (username password apna) usersdata is the database name — MongoDB will create it automatically if it doesn’t exist.
        console.log("Connected to MongoDB");
   }
    catch(err)  {
        resp.status(500).send({message:err.message});//500 means server error
         console.log("Error connecting to MongoDB:", err);
    }
}







export default conn;
