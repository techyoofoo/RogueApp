import { Router } from "express";
import { getCommissionByClientId } from "./controller";

const router = new Router();

router.get("/get/:id", getCommissionByClientId);

export default router;