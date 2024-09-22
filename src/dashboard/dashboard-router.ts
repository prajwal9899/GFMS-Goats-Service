import express from "express";
import { asyncWrapper } from "../common/utils/wrapper";
import { DashboardController } from "./dashboard-controller";
import { DashboardService } from "./dashboard-service";

const router = express.Router();

const dashboardService = new DashboardService();
const dashboardController = new DashboardController(dashboardService);

router.get("/totalAnimal", asyncWrapper(dashboardController.totalAnimal));
router.get("/totalMale", asyncWrapper(dashboardController.totalMale));
router.get("/totalFemale", asyncWrapper(dashboardController.totalFemale));
router.get("/totalkids0to3Months", asyncWrapper(dashboardController.totalkids0to3Months));
router.get("/totalkids3to6Months", asyncWrapper(dashboardController.totalkids3to6Months));
router.get("/totalkids6to9Months", asyncWrapper(dashboardController.totalkids6to9Months));

export default router;
