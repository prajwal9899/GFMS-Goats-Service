import { body } from "express-validator";

export default [
    body("tagNo").exists().withMessage("Tag no name is required"),
    body("breed").exists().withMessage("Breed is required"),
    body("gender").exists().withMessage("Gender is required"),
    body("howTheGoatWasObtained")
        .exists()
        .withMessage("How The Animal Was Obtained is required"),
];
