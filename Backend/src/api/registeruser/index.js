import { Router } from "express";
// import { middleware as query } from "querymen";
// import { middleware as body } from "bodymen";
import { create, findAll, ValidateUser } from "./controller";


const router = new Router();

router.get("/get/:table_name", findAll);

router.post("/create/:table_name", create);

router.post("/login/:table_name", ValidateUser);

export default router;
