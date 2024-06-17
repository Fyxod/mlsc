const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to mongo');
    
}).catch((err)=>{
    console.log(err);
    
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: (true, "Please enter the username")
    },
    password: {
        type: String,
        required: (true, "Please enter your password")
    }

})

const User = mongoose.model("user", userSchema)

module.exports = {
    User
}