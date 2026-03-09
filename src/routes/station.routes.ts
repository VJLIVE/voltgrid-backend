import { Router } from "express";

import {
  createStation,
  getStations,
  updateStation,
  deleteStation
} from "../controllers/station.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

/* both roles can view stations */
router.get(
  "/",
  authenticate,
  authorize("admin", "driver"),
  getStations
);

/* admin only */
router.post(
  "/",
  authenticate,
  authorize("admin"),
  createStation
);

/* admin only */
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateStation
);

/* admin only */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteStation
);

export default router;