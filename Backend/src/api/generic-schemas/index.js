import { Router } from "express";
import { create, getAll, updateById, deleteById, findById } from "./controller";


const router = new Router();

router.post("/crud/create/:table_name", create);
router.get("/crud/get/:table_name", getAll);
router.put("/crud/update/:table_name/:id", updateById);
router.delete("/crud/delete/:table_name/:id", deleteById);
router.get("/crud/get/:table_name/:id", findById);

export default router;
