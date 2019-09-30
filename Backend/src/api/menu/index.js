import { Router } from "express";
import { create, getAll, updateMenuById, deleteMenuById, findMenuById } from "./controller";


const router = new Router();

router.post("/create", create);
router.get("/get", getAll);
router.put("/update/:id", updateMenuById);
router.delete("/delete/:id", deleteMenuById);
router.get("/get/:id", findMenuById);

export default router;
