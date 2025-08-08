import express from 'express';

import { bookAppointment, getAppointmentsByUser, cancelAppointment, getAllAppointment} from "../controllers/appointmentController.js";
const appointmentsRoutes = express.Router();

appointmentsRoutes.post("/book", bookAppointment);
appointmentsRoutes.post("/getAppointment", getAppointmentsByUser);
appointmentsRoutes.delete("/deleteAppointment/:id",cancelAppointment);
appointmentsRoutes.get("/getAllAppointment",getAllAppointment);

export default appointmentsRoutes;
