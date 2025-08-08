import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Add Doctor Controller
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
      slots_booked
    } = req.body;

    const parsedSlots = JSON.parse(slots_booked);

    // Image upload (from multer file)
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
      folder: "doctors",
    });

    // Remove local file after uploading to Cloudinary
    fs.unlinkSync(file.path);

    // Create doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address, // Make sure address comes as JSON string from frontend
      available,
      slots_booked: parsedSlots,
      image: cloudinaryResult.secure_url,
    });

    const savedDoctor = await newDoctor.save();

    return res.status(200).json({
      message: "Doctor created successfully",
      doctor: savedDoctor,
    });
  } catch (error) {
    console.error("Doctor creation error:", error);
    return res.status(500).json({
      message: "Failed to create the doctor",
      error,
    });
  }
};
//getAll doctor controller 
export const getDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    return res.status(200).json({
      message: "Doctors fetched successfully",
      doctors
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message
    });
  }
};
//edit the doctors information 
export const editDoctor = async (req, res) => {
  try {
    console.log("its check data");
    const { id } = req.params;
    console.log("its backend id",req.params);

    // Fields from frontend
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
      slots_booked
    } = req.body;
    console.log("ita data",req.body);

    // Find doctor by ID
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Handle image update if a new file is uploaded
    if (req.file) {
      const file = req.file;

      // Upload new image to Cloudinary
      const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
        folder: "doctors",
      });

      // Delete local file after upload
      fs.unlinkSync(file.path);

      // Update image URL
      doctor.image = cloudinaryResult.secure_url;
    }

    const parsedSlots = typeof slots_booked === 'string'
      ? JSON.parse(slots_booked)
      : slots_booked;

    // Update other fields
    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.password = password || doctor.password;
    doctor.speciality = speciality || doctor.speciality;
    doctor.degree = degree || doctor.degree;
    doctor.experience = experience || doctor.experience;
    doctor.about = about || doctor.about;
    doctor.fees = fees || doctor.fees;
    doctor.address = address || doctor.address;
    doctor.available = available || doctor.available;
    doctor.slots_booked = parsedSlots || doctor.slots_booked;

    const updatedDoctor = await doctor.save();

    return res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Edit doctor error:", error);
    return res.status(500).json({
      message: "Failed to update doctor",
      error: error.message,
    });
  }
};
//deleteDoctor controller
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await doctorModel.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
      data: deletedDoctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the doctor",
      error: error.message,
    });
  }
};
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    ;

    const response = await doctorModel.findById(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found for editing",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved doctor for editing",
      doctor: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get doctor by ID",
      error: error.message,
    });
  }
};
