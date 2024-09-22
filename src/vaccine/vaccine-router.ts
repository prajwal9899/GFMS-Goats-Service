import express from "express";
import { asyncWrapper } from "../common/utils/wrapper";
import createVaccineValidator from "./vaccine-create-validator";
import { VaccineController } from "./vaccine-controller";

const router = express.Router();

const vaccineController = new VaccineController();

router.post(
    "/",
    createVaccineValidator,
    asyncWrapper(vaccineController.create),
);

// router.post(
//     "/:animalId",
//     authenticate,
//     canAccess([Roles.ADMIN, Roles.MANAGER]),
//     asyncWrapper(vaccineController.getSingle),
// );

router.get("/", asyncWrapper(vaccineController.index));

export default router;
