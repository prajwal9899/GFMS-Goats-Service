/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { asyncWrapper } from "../common/utils/wrapper";
// import authenticate from "../common/middlewares/authenticate";
// import { canAccess } from "../common/middlewares/canAccess";
// import { Roles } from "../common/constants";
// import logger from "../config/logger";
import createBreedValidator from "./breed-create-validator";
import { BreedController } from "./breed-controller";

const router = express.Router();

const breedController = new BreedController();

router.post(
    "/",
    // authenticate,
    // canAccess([Roles.ADMIN, Roles.MANAGER]),
    createBreedValidator,
    asyncWrapper(breedController.create),
);

// router.post(
//     "/:animalId",
//     authenticate,
//     canAccess([Roles.ADMIN, Roles.MANAGER]),
//     asyncWrapper(breedController.getSingle),
// );

router.get("/", asyncWrapper(breedController.index));

export default router;
