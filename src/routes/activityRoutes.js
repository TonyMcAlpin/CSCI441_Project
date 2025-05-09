/* written by: Austin Hoelscher, Anthony McAlpin 
tested by: Austin Hoelscher, Anthony McAlpin 
debugged by: Austin Hoelscher, Anthony McAlpin */



import express from "express"
import activityController from "../controllers/activityController.js"

const router = express.Router();

router.get("/:id", activityController.getActivity);
router.get("/:user_id/average", activityController.getAverageActivity);  
router.get("/total/:user_id", activityController.getWeeklyTotalActivity);



router.post("/:user_id", activityController.addActivity);


router.put("/:id", activityController.updateActivity);

router.delete("/:id", activityController.deleteActivity);


export default router;
