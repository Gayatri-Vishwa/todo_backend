//CRUD operations for List

import { Router } from "express";
import List from "../models/list.models.js";   //List data model import
import User from "../models/user.models.js";   //User data model import
const router2 = Router();

// add task to list (create)
router2.post('/addTask', async(req,resp)=>{
try {
    const  {title,body,id}= req.body;  //destructuring
const existingUser= await User.findById(id);  // find user by email then can add task only if user exist
if(existingUser){
const list= new List({title,body, user : existingUser._id});  // create new list item with userId reference
await list.save();  // save to database
existingUser.list.push(list._id);  // add list item to user's list array
await existingUser.save();  // save updated user
resp.status(201).json({message:"Task added successfully", list})
}
} catch (error) {
    resp.status(500).send({message:error.message});
}

})

//UPDATE task by id  (pur request)
router2.put('/updateTask/:id', async(req,resp)=>{
try {
    const  {title,body,id}= req.body;  //destructuring
const existingUser= await User.findById(id);  // find user by email then can add task only if user exist
if(existingUser){
const list =await List.findByIdAndUpdate(req.params.id,{title,body});  // update list item by id {title,body} can update
list.save();  // save to database
resp.status(200).json({message:"Task updated successfully", updatedTask: list })
}
} catch (error) {
    resp.status(500).send({message:error.message});
}
})


 

router2.delete('/deleteTask/:userId/:taskId', async (req, resp) => {
  try {
    const { userId, taskId } = req.params;

    // Remove taskId from user's list array
    const existingUser = await User.findByIdAndUpdate(userId, {
      $pull: { list: taskId },
    });

    if (!existingUser)
      return resp.status(404).json({ message: "User not found" });

    // Delete the task document itself
    await List.findByIdAndDelete(taskId);
    resp.status(201).json({ message: "Task deleted from backend successfully" });
  } catch (error) {
    resp.status(500).send({ message: error.message });
  }
});




// get all tasks of any user by user id 

router2.get('/getTasks/:userId', async(req,resp)=>{
    try {
        const lists = await List.find({ user: req.params.userId }).populate('user').sort({ createdAt: -1 });
console.log("Lists fetched:", lists);

        // const lists= await List.find({user: req.params.userId}).sort({createdAt:-1});  // find all list items by userId   //.sort({createdAt:-1})  last updated task last me aata h so we reverse it now  last updated item first me aayega
       if(lists.length>0){
        resp.status(200).json(lists);
       }
       else{
        resp.status(200).json({message:"No tasks found for this user"});
       }
    }
     catch (error) {
        resp.status(500).send({message:error.message});
    }   



});  
export default router2;