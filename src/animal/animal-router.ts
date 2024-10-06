import express from "express";
import { asyncWrapper } from "../common/utils/wrapper";
// import authenticate from "../common/middlewares/authenticate";
// import { canAccess } from "../common/middlewares/canAccess";
// import { Roles } from "../common/constants";
import { AnimalController } from "./animal-controller";
import { AnimalService } from "./animal-service";
// import logger from "../config/logger";
import createGoatValidator from "./create-animal-validator";
import addVaccineValidator from "./add-vaccine-validator";
import addWeightValidator from "./add-weight-validator";

const router = express.Router();

const animalService = new AnimalService();
const animalController = new AnimalController(animalService);

router.post(
  "/",
  // authenticate,
  // canAccess([Roles.ADMIN, Roles.MANAGER]),
  createGoatValidator,
  asyncWrapper(animalController.create),
);

router.post(
  "/excel-upload",
  // authenticate,
  // canAccess([Roles.ADMIN, Roles.MANAGER]),
  createGoatValidator,
  asyncWrapper(animalController.excelUpload),
);

router.post(
  "/vaccine/:animalId",
  // authenticate,
  addVaccineValidator,
  asyncWrapper(animalController.addVaccine),
);

router.post(
  "/weight/:animalId",
  // authenticate,
  addWeightValidator,
  asyncWrapper(animalController.addWeight),
);

router.post(
  "/:animalId",
  // authenticate,
  // canAccess([Roles.ADMIN, Roles.MANAGER]),
  asyncWrapper(animalController.getSingle),
);

// router.put(
//     "/:productId",
//     authenticate,
//     canAccess([Roles.ADMIN, Roles.MANAGER]),
//     fileUpload({
//         limits: { fileSize: 500 * 1024 }, //500kb
//         abortOnLimit: true,
//         limitHandler: (req, res, next) => {
//             const error = createHttpError(400, "File size exceeds the limit");
//             next(error);
//         },
//     }),
//     updateProductValidator,
//     asyncWrapper(productController.update),
// );

router.get("/", asyncWrapper(animalController.index));

export default router;
