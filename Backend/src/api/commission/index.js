import { Router } from "express";
import { getCurrentCommission, getSummaryCommission, getHistoricalCommission } from "./controller";

const router = new Router();

router.get("/currentcommission/get/:cid", getCurrentCommission);
router.get("/summarycommission/get/:cid", getSummaryCommission);
router.get("/historicalcommission/get/:cid/:crid", getHistoricalCommission);
export default router;