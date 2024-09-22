import { body } from "express-validator";

export default [
    body("vaccineName").exists().withMessage("Vaccine Name is required")
];
