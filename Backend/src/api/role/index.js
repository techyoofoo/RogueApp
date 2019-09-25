import { Router } from "express";
import { createRole ,getAllRoles} from "./controller";

const router = new Router();

router.post("/create/:table_name", createRole);
router.get("/get/:table_name", getAllRoles);

export default router;
