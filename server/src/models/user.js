import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter the username"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
    regActive: {
        type: Boolean,
        default: false
    }
}, {
  timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;