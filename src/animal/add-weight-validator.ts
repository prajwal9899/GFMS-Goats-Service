import { body } from "express-validator";

export default [
    body("weight").exists().withMessage("Weight is required"),
    body("dateAdministered")
        .exists()
        .withMessage("Date Administered is required"),
];
