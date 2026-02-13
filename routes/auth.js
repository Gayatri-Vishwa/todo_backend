import { Router } from "express";
import User from "../models/user.models.js";   //User data model import
import bcrypt from "bcryptjs";

const router1 = Router();

// ✅ SIGN UP ROUTE
router1.post("/register", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { email, username, password } = req.body;
    // 1️⃣ Validate input
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }
  const hashedPass = bcrypt.hashSync(password, 10);
  const user = new User({ email, username, password: hashedPass });
  await user.save();
  res.status(201).json({ message: "User registered", user });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server error", error: error.message });
}

});





//SIGN UP  // //api to register user  returns promise so async await

// router1.post('/register', async (req, res) => {   //http://localhost:3000/api/v1/register 
//   try {
//    const { email, username, password} = req.body;             // destructuring req.body to get email username password // assuming req.body contains these fields //no  need to be same name as in db i,,//here if em,name,pass then----      req.body.em and store in variable email
//     const hashedPass =  bcrypt.hashSync(password);            //synchronous method does not require await smple 10 times hashing

//     const user = new User({ email, username, password: hashedPass });          // new keyword is compulsory for create new user //or  user({email:email,username:username,password:password});
//     await user.save();
//     res.status(201).json({  message: "User registered successfully", user });

//   } catch (error) {
//     res.status(500).json({ message:error.message });
//   }
// });


// LOGIN

router1.post('/login',async(req,res)=>{
  try {
   const user= await User.findOne({email:req.body.email});  // find user by email
   if(!user){
    return res.status(201).json({message:"User not found"});
   }
    const isPasswordValid= await bcrypt.compare(req.body.password,user.password); // compare password of input box  with this user  password (which email we check) 
    if( !isPasswordValid){
    return res.status(201).json({message:"invalid password"});
   }
   const {password,...others}= user._doc;  // destructuring to exclude password from user object (passwordn k alava sab dede in rest) (._doc is mongoose specific property)
     return res.status(201).json({others});
    //  return res.status(201).json({user}); // we can also send user object but password will be there also
} catch (error) {
    res.status(500).json({ message:error.message  });//500 means server error
  }
})

export default router1;


// (can not read password directly from database so we have to hash it)
    // hash password
    // const hashedPass = await bcrypt.hash(password, 10);       // hash password   //10 is salt rounds (how many times we want to hash)
    // const user = new User({ email, username, password: hashedPass });


//     Use await with bcrypt.compare for login.
// Use correct HTTP status codes: 200, 400, 401, 404, 500.
// Use await bcrypt.hash in register (or remove await if using hashSync).
// Use export default router; for ES6 modules.
// Improve error messages in catch blocks.