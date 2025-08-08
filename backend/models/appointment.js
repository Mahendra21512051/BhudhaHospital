import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    doctorName: { type: String, required: true },
    speciality: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    fees: { type: Number, required: true },
  }, { timestamps: true });
  

const AppointmentModel= mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;