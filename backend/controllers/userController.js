import userModel from "../models/userModel.js";


// Register User
export const registerUser = async (req, res) => {
  try {
    //console.log("backend success", req.body);
    const { name, email, password,address,
      gender,
      dob,
      phone } = req.body;

    if (!name || !email || !password || !dob || !address || !gender || !dob || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new userModel({ name, email, password ,address,
      gender,
      dob,
      phone, });
    //console.log("backend data",newUser)
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const admin = {
  email: 'admin@example.com',
  password: 'admin123', // Avoid hardcoding in production
};
// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === admin.email && password === admin.password) {
      return res.status(200).json({
        message:"Admin login succesfully"
        ,user: {
         
          email: admin.email,
          password:admin.password,
          isAdmin: true
        }
      });
    }
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get User Profile (Protected Route)
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validation
    if (!email || !newPassword ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     user.password = newPassword
    await user.updateOne();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


 export const updateUser = async (req, res) => {
  const { email, name, address, phone, gender, dob } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = name || user.name;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};