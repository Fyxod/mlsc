import mongoose from "mongoose";

const formsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"]
    },
    department: {
        type: String,
        enum: ['Tech', 'Design', 'Management'],
        required: true
    },
    futureVision: {
        type: String,
        required: [true, "Please answer the question"]
    },
    projectLinks: {
        type: String
    },
    videoGame: {
        type: String,
        required: [true, "Please answer the question"]
    },
    remarks: {
        type: String
    },
    timeStamp: {
        type: String,
        required: true
    }
});

const Form = mongoose.model("Response", formsSchema);

export default Form;