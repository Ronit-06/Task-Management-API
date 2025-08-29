import mongoose from "mongoose";

// Define the schema for logging actions
const logSchema = new mongoose.Schema({
    action: { type: String, required: true },
    user: { type: String, required: false},
    details : { type: String },
    timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model("log", logSchema);

export default Log;