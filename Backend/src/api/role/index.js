import { Router } from "express";
import { create, getAll, updateRoleById, deleteRoleById, findRoleById } from "./controller";

const router = new Router();

router.post("/create", create);
router.get("/get", getAll);
router.put("/update/:id", updateRoleById);
router.delete("/delete/:id", deleteRoleById);
router.get("/get/:id", findRoleById);

export default router;
