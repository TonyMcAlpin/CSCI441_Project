import express from "express"
import activityController from "../controllers/activityController.js"

const router = express.Router();

router.get("/:id", activityController.getActivity);
router.post("/:user_id", activityController.addActivity);
router.put("/:id", activityController.updateActivity);
router.delete("/:id", activityController.deleteActivity);


export default router;