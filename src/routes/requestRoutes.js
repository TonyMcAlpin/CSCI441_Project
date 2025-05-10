/* written by: Austin Hoelscher 
tested by: Isaac Nevarez-Saenz, Austin Hoelscher 
debugged by: Isaac Nevarez-Saenz, Austin Hoelscher  */

import express from "express"
import requestController from "../controllers/requestController.js"

const router = express.Router();

router.get("/:id", requestController.getRequest);
router.post("/:provider_id", requestController.makeRequest);
router.put("/:id", requestController.acceptDenyRequest);

router.put("/cancel/:id", requestController.cancelRequest); 
router.put("/close/:id", requestController.closeRequest); 

export default router;