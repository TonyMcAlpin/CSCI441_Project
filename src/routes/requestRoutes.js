import express from "express"
import requestController from "../controllers/requestController.js"

const router = express.Router();

router.get("/:id", requestController.getRequest);
router.post("/:provider_id", requestController.makeRequest);
router.put("/:id", requestController.acceptDenyRequest);


export default router;