import { body } from "express-validator";

export default [
    body("vaccineName").exists().withMessage("Vaccine Name is required"),
    body("dateAdministered")
        .exists()
        .withMessage("Date Administered is required"),
];
