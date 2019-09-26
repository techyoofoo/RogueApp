import { Router } from "express";
import { create ,getAll} from "./controller";

const router = new Router();

router.post("/create/:table_name", create);
router.get("/get/:table_name", getAll);

export default router;
