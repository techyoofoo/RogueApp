import { Router } from "express";
import { create, fetchAllProducts, updateProductById, deleteProductById } from "./controller";


const router = new Router();

router.post("/create_product", create);
router.get('/get_products', fetchAllProducts);
router.put('/update_product/:id', updateProductById);
router.delete('/delete_product/:id', deleteProductById);

export default router;
