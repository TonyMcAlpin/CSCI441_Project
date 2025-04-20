import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router();

router.post("/register", userController.registerUser);
router.post('/login', userController.loginUser);
router.post("/reset-password", userController.resetPassword);


router.get("/medications/:user_id", userController.getMedications);
router.get("/appointments/:user_id", userController.getAppointments);
router.get("/activities/:user_id", userController.getActivities);

router.get("/patients", userController.getPatients);

export default router;

