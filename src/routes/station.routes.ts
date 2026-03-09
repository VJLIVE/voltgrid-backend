import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get all stations");
});

router.post("/", (req, res) => {
  res.send("Create station");
});

router.put("/:id", (req, res) => {
  res.send("Update station");
});

router.delete("/:id", (req, res) => {
  res.send("Delete station");
});

export default router;