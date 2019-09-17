import { Router } from "express";
import { create, fetchAllCompanys, updateCompanyById, deleteCompanyById } from "./controller";


const router = new Router();

router.post("/create_company", create);
router.get('/get_company_details', fetchAllCompanys);
router.put('/update_company/:id', updateCompanyById);
router.delete('/delete_company/:id', deleteCompanyById);

export default router;
