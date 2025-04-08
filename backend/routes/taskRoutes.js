import express from "express";
import mongoose from "mongoose";

const app = express();
const TaskRouter = express.Router();

import Event from "../modules/eventSchema.js";
import Task from "../modules/taskSchema.js";
import User from "../modules/userSchema.js";
TaskRouter.post("/create" , async (req,res) => {
    try{
        const { title, dueDate,desc, assignedTo , eventId } = req.body;

        const at = await User.findOne({
            email: assignedTo
        })

        if(!at){
            return res.status(500).json({ error: "User not found" });
        }
        
        const event = await Event.findOne({
            id : Number(eventId)
        })
        const newTask = new Task({
            title : title,
            desc: desc,
            dueDate : dueDate,
            assignedTo : at,
            event : event,
        })
         console.log(newTask)

        const t = await Task.create(newTask);
        res.status(200).json({message : "success"})
    } catch (error){
        res.status(500).json({error: "Invalid fields"})
    }
})

TaskRouter.post("/getTasks", async (req,res) => {
    try {
        const { eventId } = req.body;
        const event= await Event.findOne({
            id : eventId
        })
        const tasks = await Task.find({
            event : event._id
        })
        res.status(200).json({
            task_list: tasks
        })
    } catch (error){
        res.status(500).json({error : "error occured"})
    }
})

TaskRouter.delete("/delete", async (req, res) => {
    try {
      const { taskId } = req.body;
  
      // Validate the task ID
      if (!taskId) {
        return res.status(500).json({ message: "Task ID is required" });
      }
  
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(500).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Server error while deleting task" });
    }
  });
  

export default TaskRouter;