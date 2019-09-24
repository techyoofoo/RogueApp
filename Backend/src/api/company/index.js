import { Router } from "express";
import { createCompany, fetchAllCompany, updateCompanyById, deleteCompanyById,findCompanyById } from "./controller";


const router = new Router();

//router.post("/create_company", create);
router.post("/create/:table_name", createCompany);
router.get('/get/:table_name', fetchAllCompany);
router.put('/update/:table_name/:id', updateCompanyById);
router.delete('/delete/:table_name/:id', deleteCompanyById);
router.get('/get/:table_name/:id', findCompanyById);

export default router;
