import express from "express";
import { registerUser, loginUser, getUserProfile, resetPassword,updateUser} from "../controllers/userController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:userId", getUserProfile);
router.put("/resetPasswords", resetPassword)
router.put("/updateUser", updateUser)
export default router;
