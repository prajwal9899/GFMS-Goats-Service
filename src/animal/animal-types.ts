import mongoose, { Types } from "mongoose";

export interface Product {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    priceConfiguration: string;
    attributes: string;
    tenantId: string;
    categoryId: string;
    image: string;
}

export interface Filter {
    gender?: string;
    animalStatus?: string;
}

export interface Populate {
    path: string;
}

export interface PaginateQuery {
    page: number;
    limit: number;
    populate: Populate[];
}

export interface Animal {
    _id?: string;
    breed: string;
    tagNo: string;
    insuaranceNo: string;
    gender: string;
    howTheGoatWasObtained: string;
    isSold: boolean;
    dob?: string;
    purchaseDate?: string;
    dateOfEntryOnFarm?: string;
    weightAtPurchase?: string;
    weightAtSale?: string;
    weightAtBirth?: string;
    birthType?: string;
    ageOnPurchase?: number;
    buyingCost?: number;
    currentAge?: number;
    sellingCost?: number;
    motherTagNo?: string;
    fatherTagNo?: string;
    diedOn?: string;
    soldOn?: string;
    remark?: string;
    purchasePrice?: number;
    sellingPrice?: number;
    vaccines: Types.ObjectId[];
    weights: Types.ObjectId[];
}

export interface Vaccine {
    _id?: string;
    animalId: mongoose.Types.ObjectId;
    vaccineName: string;
    dateAdministered: Date;
}

export interface Weight {
    _id?: string;
    animalId: mongoose.Types.ObjectId;
    weight: number;
    dateAdministered: Date;
}
