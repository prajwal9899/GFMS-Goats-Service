import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Animal, Vaccine, Weight } from "./animal-types";

const vaccineSchema = new mongoose.Schema(
  {
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
    vaccineName: {
      type: String,
      required: true,
    },
    dateAdministered: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const animalVaccineModel = mongoose.model<Vaccine>(
  "AnimalVaccine",
  vaccineSchema,
);

const weightSchema = new mongoose.Schema(
  {
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const animalWeightModel = mongoose.model<Weight>(
  "AnimalWeight",
  weightSchema,
);

const animalSchema = new mongoose.Schema<Animal>(
  {
    breed: {
      type: String,
      required: true,
    },
    tagNo: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    dateOfEntryOnFarm: {
      type: String,
    },
    weightAtPurchase: {
      type: String,
    },
    weightAtSale: {
      type: String,
    },
    weightAtBirth: {
      type: String,
    },
    purchaseDate: {
      type: String,
    },
    birthType: {
      type: String,
    },
    ageOnPurchase: {
      type: Number,
    },
    currentAge: {
      type: Number,
    },
    howTheGoatWasObtained: {
      type: String,
      required: true,
    },
    insuaranceNo: {
      type: String,
    },
    purchasePrice: {
        type: String,
      },
    motherTagNo: {
      type: String,
    },
    fatherTagNo: {
      type: String,
    },
    diedOn: {
      type: String,
    },
    soldOn: {
      type: String,
    },
    buyingCost: {
      type: Number,
    },
    sellingCost: {
      type: Number,
    },
    isSold: {
      type: Boolean,
    },
    vaccines: [{ type: mongoose.Schema.Types.ObjectId, ref: "AnimalVaccine" }],
    weights: [{ type: mongoose.Schema.Types.ObjectId, ref: "AnimalWeight" }],
  },
  { timestamps: true },
);

animalSchema.plugin(mongoosePaginate);

export const animalModel = mongoose.model<
  Animal,
  mongoose.PaginateModel<Animal>
>("Animal", animalSchema);
