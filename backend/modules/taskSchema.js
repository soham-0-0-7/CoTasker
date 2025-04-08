import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;
const { SchemaTypes } = mongoose;

const TaskSchema = new Schema({

  title: {
    type: String,
    required: [true, 'task name is required'],
  },
  desc:{
    type:String,
  },
  dueDate: {
    type: Date,
    required:  [true, 'task date is required'],
  },
  assignedTo: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: SchemaTypes.ObjectId,
    ref: "Event",
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
