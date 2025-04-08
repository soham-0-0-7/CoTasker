import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";


const { Schema } = mongoose;
const { SchemaTypes } = mongoose;

const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(mongoose);

const EventSchema = new Schema({
    id: {
        type: Number,
        unique: true,
      },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  contributors: [
    {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

EventSchema.plugin(AutoIncrement, { inc_field: "id" });
const Event = mongoose.model("Event", EventSchema);
export default Event;
