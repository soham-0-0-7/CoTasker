import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import EventRouter from "./routes/eventRoutes.js"
import TaskRouter from "./routes/taskRoutes.js"
import UserRouter from "./routes/userRoutes.js"
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use('/',(req,res)=>{
//     res.json({
//         msg : "Yes the backend is working"
//     })
// })
app.use("/api/users" , UserRouter);
app.use("/api/events" , EventRouter);
app.use("/api/tasks" , TaskRouter);


async function main() {
    await mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_CoTasker);
    console.log('Connected to database');
    app.listen(port, () => console.log('Server listening on port: ' + port));
}

main();