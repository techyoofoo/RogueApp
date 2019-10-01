import { Router } from "express";
// import { middleware as query } from "querymen";
// import { middleware as body } from "bodymen";
import { create, findAll, ValidateUser, updateUserById, deleteUserById, findUserById } from "./controller";


const router = new Router();

router.get("/get", findAll);
router.post("/create", create);
router.post("/login", ValidateUser);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);
router.get("/get/:id", findUserById);

export default router;
