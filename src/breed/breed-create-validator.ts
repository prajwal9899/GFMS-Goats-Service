import { body } from "express-validator";

export default [
    body("breedName").exists().withMessage("Breed Name is required")
];
