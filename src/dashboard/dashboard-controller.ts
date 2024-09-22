import { Request, Response } from "express";
import { animalModel } from "../animal/animal-model";
import { DashboardService } from "./dashboard-service";
// import createHttpError from "http-errors";
// import { Vaccine } from "./dashboard-types";

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}
  totalAnimal = async (req: Request, res: Response) => {
    try {
      const totalAnimal = await animalModel.countDocuments();
      res.json({ count: totalAnimal });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  totalMale = async (req: Request, res: Response) => {
    try {
      const totalMale = await animalModel.countDocuments({ gender: "male" });
      res.json({ count: totalMale });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  totalFemale = async (req: Request, res: Response) => {
    try {
      const totalFemale = await animalModel.countDocuments({
        gender: "female",
      });
      res.json({ count: totalFemale });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  totalkids0to3Months = async (req: Request, res: Response) => {
    try {
      const allAnimals = await animalModel.find({});
      if (allAnimals.length > 0) {
        const filteredRecords = allAnimals.filter((record) => {
          const ageInMonths = this.dashboardService.getAgeInMonths(
            record.dob as string,
          );
          return ageInMonths >= 0 && ageInMonths <= 3;
        });
        res.json({ count: filteredRecords.length });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  totalkids3to6Months = async (req: Request, res: Response) => {
    try {
      const allAnimals = await animalModel.find({});
      if (allAnimals.length > 0) {
        const filteredRecords = allAnimals.filter((record) => {
          const ageInMonths = this.dashboardService.getAgeInMonths(
            record.dob as string,
          );
          return ageInMonths >= 3 && ageInMonths <= 6;
        });
        res.json({ count: filteredRecords.length });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  totalkids6to9Months = async (req: Request, res: Response) => {
    try {
      const allAnimals = await animalModel.find({});
      if (allAnimals.length > 0) {
        const filteredRecords = allAnimals.filter((record) => {
          const ageInMonths = this.dashboardService.getAgeInMonths(
            record.dob as string,
          );
          return ageInMonths >= 6 && ageInMonths <= 9;
        });
        res.json({ count: filteredRecords.length });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
}
