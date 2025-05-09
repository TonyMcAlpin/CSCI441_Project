/* written by:  
tested by: Isaac Nevarez-Saenz
debugged by: Isaac Nevarez-Saenz */

import express from "express"
import requestController from "../controllers/requestController.js"

const router = express.Router();

router.get("/:id", requestController.getRequest);
router.post("/:provider_id", requestController.makeRequest);
router.put("/:id", requestController.acceptDenyRequest);

router.put("/cancel/:id", requestController.cancelRequest); 
router.put("/close/:id", requestController.closeRequest); 

export default router;