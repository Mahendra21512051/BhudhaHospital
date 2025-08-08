import express from 'express';
import { addDoctor, getDoctor, deleteDoctor, editDoctor,getDoctorById} from '../controllers/adminController.js';
import {adminLogin} from "../controllers/adminLoginControlller.js" 
// import { verifyAdmin } from "../middlewares/authmiddleware.js";// ✅ fixed
import upload from '../middlewares/multer.js'; // Also include `.js` if using modules

const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor);
adminRouter.get("/getDoctors", getDoctor);
adminRouter.post("/adminlogin" , adminLogin);
adminRouter.delete("/deleteDoctor/:id", deleteDoctor);
adminRouter.put("/updatedoctor/:id",  upload.single('image'), editDoctor);
adminRouter.get("/getDoctordataByid/:id", getDoctorById)

export default adminRouter;
