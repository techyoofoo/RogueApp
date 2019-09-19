import { Router } from "express";
import { create } from "./controller";

router.post("/createToken", create);