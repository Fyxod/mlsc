const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to mongo');
    
}).catch((err)=>{
    console.log(err);
    
});

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: (true, "Please enter the username")
    },
    password: {
        type: String,
        required: (true, "Please enter your password")
    }

})

const formsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: (true, "Please enter your name")
    },
    email: {
        type: String,
        required: (true, "Please enter your email")
    },
    phoneNumber: {
        type: String,
        required: (true, "Please enter your phone number")
    },
    departments: {
        type: String,
        enum: ['Tech', 'Design', 'Management'],
        required: true
    }
})

const Admin = mongoose.model("admin", adminSchema)
const FormsData = mongoose.model("response", formsSchema)

module.exports = {
    Admin,
    FormsData
}