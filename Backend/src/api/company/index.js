import { Router } from "express";
import { createCompany, fetchAllCompany, updateCompanyById, deleteCompanyById, findCompanyById } from "./controller";


const router = new Router();

//router.post("/create_company", create);
router.post("/create", createCompany);
router.get("/get", fetchAllCompany);
router.put("/update/:id", updateCompanyById);
router.delete("/delete/:id", deleteCompanyById);
router.get("/get/:id", findCompanyById);

export default router;
