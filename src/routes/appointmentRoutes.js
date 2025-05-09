/* written by: Austin Hoelscher, Anthony McAlpin 
tested by: Austin Hoelscher, Anthony McAlpin 
debugged by: Austin Hoelscher, Anthony McAlpin */

import express from "express"
import appointmentController from "../controllers/appointmentController.js"

const router = express.Router();

router.get("/:id", appointmentController.getAppointment);
router.post("/:user_id", appointmentController.addAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);


export default router;
