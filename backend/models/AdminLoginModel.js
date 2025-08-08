import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: 'admin'
  }
});

const AdminModel = mongoose.model("AdminLogin",adminSchema)
export default AdminModel;


