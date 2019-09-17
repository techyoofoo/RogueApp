import { Router } from "express";
// import { middleware as query } from "querymen";
// import { middleware as body } from "bodymen";
import { create, findAll, ValidateUser } from "./controller";


const router = new Router();

router.get("/", findAll);

router.post("/register", create);

router.post("/checklogin", ValidateUser);

export default router;
