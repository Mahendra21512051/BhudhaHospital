// controllers/adminController.js
import AdminModel from "../models/AdminLoginModel.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // Use .env in production

// POST /api/admin/adminlogin
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
 

  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// GET /api/admin/profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
