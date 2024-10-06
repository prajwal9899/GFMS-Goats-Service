import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { AnimalService } from "./animal-service";
import { Filter, Animal, Vaccine, Weight } from "./animal-types";
import { animalModel } from "./animal-model";
import { calculateDate } from "../utils/utils";

export class AnimalController {
  constructor(private animalService: AnimalService) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const animal: Animal = { ...req.body };
    const newAnimal = await this.animalService.createAnimal(animal);
    res.json({ id: newAnimal });
  };

  excelUpload = async (req: Request, res: Response) => {
    const jsonData = req.body;
    const newUpdatedData = calculateDate(jsonData);
    res.json(newUpdatedData);
  };

  index = async (req: Request, res: Response) => {
    const { q, gender, animalStatus } = req.query;
    const filters: Filter = {};

    if (gender) filters.gender = gender as string;
    if (animalStatus) filters.animalStatus = animalStatus as string;

    const animals = await this.animalService.getAnimals(q as string, filters, {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 1,
      populate: [{ path: "vaccines" }, { path: "weights" }],
    });

    res.json({
      data: animals.docs,
      total: animals.totalDocs,
      pageSize: animals.limit,
      currentPage: animals.page,
    });
  };

  addVaccine = async (req: Request, res: Response, next: NextFunction) => {
    const { animalId } = req.params;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const vaccine: Vaccine = { ...req.body, animalId };
    const newVaccine = await this.animalService.addVaccine(
      vaccine as unknown as Vaccine,
      animalId,
    );
    res.json({ id: newVaccine });
  };

  addWeight = async (req: Request, res: Response, next: NextFunction) => {
    const { animalId } = req.params;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const weight: Weight = { ...req.body, animalId };
    const newWeight = await this.animalService.addWeight(
      weight as unknown as Weight,
      animalId,
    );
    res.json({ id: newWeight });
  };

  getSingle = async (req: Request, res: Response) => {
    const { animalId } = req.params;
    if (!animalId) {
      res.json("Animal not found");
    }
    const newData = await animalModel
      .findById(animalId)
      .populate("vaccines")
      .populate("weights");
    res.json(newData);
  };
}
