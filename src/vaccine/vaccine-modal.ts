import mongoose from "mongoose";
import { Vaccine } from "./vaccine-types";

const breedSchema = new mongoose.Schema<Vaccine>(
    {
        vaccineName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const vaccineModel = mongoose.model<Vaccine>("Vaccine", breedSchema);
