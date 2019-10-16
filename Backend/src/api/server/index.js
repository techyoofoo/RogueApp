import { Router } from "express";
import { create, findServerById, testConnection } from "./controller";

const router = new Router();

router.post("/create", create);
router.get("/get/:id", findServerById);
router.post("/testconnection", testConnection);

export default router;