import express from "express"
import medicationController from "../controllers/medicationController.js"

const router = express.Router();

router.get("/:id", medicationController.getMedication);
router.post("/:user_id", medicationController.addMedication);
router.put("/:id", medicationController.updateMedication);
router.delete("/:id", medicationController.deleteMedication);


export default router;
