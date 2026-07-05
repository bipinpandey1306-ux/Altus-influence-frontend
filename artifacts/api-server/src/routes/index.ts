import { Router, type IRouter } from "express";
import healthRouter from "./health";
import influencersRouter from "./influencers";
import campaignsRouter from "./campaigns";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(influencersRouter);
router.use(campaignsRouter);
router.use(statsRouter);

export default router;
