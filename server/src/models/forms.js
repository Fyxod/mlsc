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
    }
}, {
    timestamps: true
});

const Form = mongoose.model("Response", formsSchema);

export default Form;