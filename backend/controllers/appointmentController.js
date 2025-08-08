import Appointment from "../models/appointment.js";

// Book an appointment
export const bookAppointment = async (req, res) => {
    try {
      const {
        userId,
        doctorId,
        doctorName,
        speciality,
        appointmentDate,
        appointmentTime,
        fees,
      } = req.body;
  
      // Basic validation
      if (!userId || !doctorId || !doctorName || !speciality || !appointmentDate || !appointmentTime || !fees) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Check for existing appointment
      const existingAppointment = await Appointment.findOne({
        userId,
        doctorId,
        appointmentDate,
        appointmentTime,
      });
  
      if (existingAppointment) {
        return res.status(409).json({ success: false, message: "Appointment already booked for this slot" });
      }
  
      // Create new appointment
      const newAppointment = new Appointment({
        userId,
        doctorId,
        doctorName,
        speciality,
        appointmentDate,
        appointmentTime,
        fees,
      });
  
      await newAppointment.save();
  
      res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        appointment: newAppointment,
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  //get Appointment by user
  export const getAppointmentsByUser = async (req, res) => {
    try {
      const { userId } = req.body;
      
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      const userAppointments = await Appointment.find({ userId });
  
      res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        appointments: userAppointments,
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  // Cancel Appointment by user Controller
  export const cancelAppointment = async (req, res) => {
    try {
      const appointmentId = req.params.id;
  
      if (!appointmentId) {
        return res.status(400).json({ success: false, message: "Appointment ID is required" });
      }
  
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }
  
      await Appointment.findByIdAndDelete(appointmentId);
  
      res.status(200).json({
        success: true,
        message: "Appointment cancelled successfully",
      });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  //get All Appointment by user to Show the All Appoinment to the Admin
  export const getAllAppointment = async (req, res) => {
    try {
      const appointments = await Appointment.find()
        .populate("userId", "name") // Only get name from user
        .select("-updatedAt"); // Still fetch everything else
  
      // Clean and format each appointment
      const cleanedData = appointments.map((appointment) => {
        const obj = appointment.toObject();
  
        return {
          userName: obj.userId?.name || "Unknown",
          doctorName: obj.doctorName,
          speciality: obj.speciality,
          appointmentDate: obj.appointmentDate,
          appointmentTime: obj.appointmentTime,
          fees: obj.fees,
          createdAt: obj.createdAt
        };
      });
      res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        data: cleanedData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch all appointments",
        error: error.message,
      });
    }
  };
  
  