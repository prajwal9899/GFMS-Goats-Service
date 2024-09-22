import mongoose from "mongoose";
import { Breed } from "./breed-types";

const breedSchema = new mongoose.Schema<Breed>(
    {
        breedName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const breedModel = mongoose.model<Breed>("Breed", breedSchema);
