import { Router } from "express";
import { create, findServerById } from "./controller";

const router = new Router();

router.post("/create", create);
router.get("/get/:id", findServerById);

export default router;