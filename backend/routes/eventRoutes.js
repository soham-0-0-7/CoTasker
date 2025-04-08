import mongoose from "mongoose";
import express from "express";

import { Router } from 'express';
const app = express();
const EventRouter = Router();

import Event from "../modules/eventSchema.js";
import User from "../modules/userSchema.js";
import Task from "../modules/taskSchema.js";
EventRouter.post("/create", async (req,res) =>{
    try{
        console.log("hello")
        const { title, date, contributors } = req.body;
        const contributorsArray = contributors.split(",").map(str => str.trim());
        const member_ids = [];

        
        console.log("hello2")
        for(const member of contributorsArray) {
            // for each email, if that user exists
            const user = await User.findOne({
                email: member
            });
            if(user) member_ids.push(user);
            if(!user){
                return res.status(500).json({error : "Invalid email entered"})
            }
        }
        console.log(1);

        const new_event = new Event({
            title: title,
            date: date,
            contributors: member_ids
        })
        console.log(2);
        await Event.create(new_event);
        console.log(new_event);
        console.log(3);

        res.status(200).json({message : "event creation success"})

    } catch (error){
        res.status(500).json({ error : "Invalid fields"})
    }
})

EventRouter.post("/getEvents" , async (req,res) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        const u_id = user._id;
        const events = await Event.find({contributors: u_id});

        res.status(200).json({
            event_list: events
        })
    } catch (event){
        res.status(500).json({error : "error ocurred"})
    }
})

EventRouter.delete("/delete" , async (req,res) => {
    try{
        const {id} = req.body;
        const event = await Event.findOne({
            id : Number(id)
        });
        console.log(1)
        if(!event){
            res.status(500).json({error : "event not found"})
        }
        
        console.log(2)

        
        const result = await Task.deleteMany({ event: event._id });
    
        console.log(21)
        const result2 = await Event.deleteOne({id : id});
        
        console.log(31)

        res.status(200).json({
            message : "event deleted",
            tasks : result,
            event : result2,
        })
    } catch (error){
        res.status(500).json({error : "error ocurred"})
    }
})

export default EventRouter;