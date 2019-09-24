import { Router } from "express";
import { create } from "./controller";


const router = new Router();

//router.post("/create_company", create);
router.post("/create/:table_name", create);
export default router;
