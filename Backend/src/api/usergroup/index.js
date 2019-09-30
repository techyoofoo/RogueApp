import { Router } from "express";
import { create, getAll, updateGroupById, deleteGroupById, findGroupById } from "./controller";

const router = new Router();

router.post("/create", create);
router.get("/get", getAll);
router.put("/update/:id", updateGroupById);
router.delete("/delete/:id", deleteGroupById);
router.get("/get/:id", findGroupById);

export default router;
