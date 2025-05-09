/* written by:  
tested by: Isaac Nevarez-Saenz
debugged by: Isaac Nevarez-Saenz */

import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router();

router.post("/register", userController.registerUser);
router.post('/login', userController.loginUser);
router.post("/reset-password", userController.resetPassword);


router.get("/medications/:user_id", userController.getMedications);
router.get("/appointments/:user_id", userController.getAppointments);
router.get("/activities/:user_id", userController.getActivities);
router.get("/requests/:user_id", userController.getRequests);

router.get("/patients", userController.getPatients);
router.get("/:id", userController.getUser);
router.get("/goal/:user_id", userController.getActivityGoal);

router.put("/goal/:user_id", userController.setActivityGoal);

export default router;

