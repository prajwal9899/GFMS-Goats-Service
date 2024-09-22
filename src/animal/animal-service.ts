/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { paginationLabels } from "../config/pagination";
import {
    Filter,
    Animal,
    PaginateQuery,
    Product,
    Vaccine,
    Weight,
} from "./animal-types";
import {
    animalModel,
    animalVaccineModel,
    animalWeightModel,
} from "./animal-model";
import mongoose, { Types } from "mongoose";

export class AnimalService {
    async createAnimal(animal: Animal) {
        return (await animalModel.create(animal)) as Animal;
    }

    async addVaccine(vaccineData: Vaccine, animalId: string) {
        try {
            const vaccine = new animalVaccineModel(vaccineData);
            await vaccine.save();
            const animal = await animalModel.findById(animalId);
            if (animal && vaccine) {
                animal.vaccines.push(new mongoose.Types.ObjectId(vaccine._id));
                await animal.save();
            }
            return vaccine;
        } catch (error) {
            console.log(error);
        }
    }

    async addWeight(weightData: Weight, animalId: string) {
        try {
            const weight = new animalWeightModel(weightData);
            await weight.save();
            const animal = await animalModel.findById(animalId);
            if (animal && weight) {
                animal.weights.push(new mongoose.Types.ObjectId(weight._id));
                await animal.save();
            }
            return weight;
        } catch (error) {
            console.log(error);
        }
    }

    async getAnimals(q: string, filters: Filter, paginateQuery: PaginateQuery) {
        const searchQueryRegexp = new RegExp(q, "i");
        const matchQuery = {
            ...filters,
            tagNo: searchQueryRegexp,
        };

        const animalsData = animalModel.paginate(matchQuery, paginateQuery);

        return animalsData;
    }
}
