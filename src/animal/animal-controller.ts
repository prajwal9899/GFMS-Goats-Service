import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { AnimalService } from "./animal-service";
// import { Logger } from "winston";
import { Filter, Animal, Vaccine, Weight } from "./animal-types";
import {
    animalModel
} from "./animal-model";

export class AnimalController {
    constructor(
        private animalService: AnimalService
    ) {}
    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        const animal: Animal = { ...req.body };
        const newAnimal = await this.animalService.createAnimal(
            animal
        );
        res.json({ id: newAnimal });
    };

    // update = async (req: Request, res: Response, next: NextFunction) => {
    //     const result = validationResult(req);
    //     if (!result.isEmpty()) {
    //         return next(createHttpError(400, result.array()[0].msg as string));
    //     }

    //     const { productId } = req.params;

    //     const productData = await this.animalService.getProduct(productId);

    //     if (!productData) {
    //         return next(createHttpError(404, "Product not found"));
    //     }

    //     if ((req as AuthRequest).auth.role !== Roles.ADMIN) {
    //         const tenant = (req as AuthRequest).auth.tenant;

    //         if (productData.tenantId !== String(tenant)) {
    //             return next(
    //                 createHttpError(
    //                     403,
    //                     "You are not allowed to access this product",
    //                 ),
    //             );
    //         }
    //     }

    //     let imageName: string | undefined;
    //     let oldImage: string | undefined;

    //     if (req.files?.image) {
    //         oldImage = await this.animalService.getProductImage(productId);
    //         const image = req.files.image as UploadedFile;
    //         imageName = uuidv4();

    //         await this.storage.upload({
    //             filename: imageName,
    //             fileData: image.data.buffer,
    //         });

    //         await this.storage.delete(oldImage!);
    //     }

    //     const {
    //         name,
    //         description,
    //         priceConfiguration,
    //         attributes,
    //         tenantId,
    //         categoryId,
    //         isPublish,
    //     } = req.body;

    //     const product = {
    //         name,
    //         description,
    //         priceConfiguration: JSON.parse(priceConfiguration as string),
    //         attributes: JSON.parse(attributes as string),
    //         tenantId,
    //         categoryId,
    //         isPublish,
    //         image: imageName ? imageName : (oldImage as string),
    //     };

    //     const updatedProduct = await this.animalService.updateProduct(
    //         productId,
    //         product,
    //     );

    //     //? Send product to kafka
    //     await this.broker.sendMessage(
    //         "product",
    //         JSON.stringify({
    //             id: updatedProduct._id,
    //             priceConfiguration: mapToObject(
    //                 updatedProduct.priceConfiguration as unknown as Map<
    //                     string,
    //                     any
    //                 >,
    //             ),
    //         }),
    //     );

    //     console.log(`Created category`, { id: productId });
    //     res.json({ id: productId });
    // };

    index = async (req: Request, res: Response) => {
        const { q, gender, animalStatus } = req.query;
        const filters: Filter = {};

        if (gender) filters.gender = gender as string;
        if (animalStatus) filters.animalStatus = animalStatus as string;

        const animals = await this.animalService.getAnimals(
            q as string,
            filters,
            {
                page: req.query.page ? parseInt(req.query.page as string) : 1,
                limit: req.query.limit
                    ? parseInt(req.query.limit as string)
                    : 1,
                populate: [{ path: "vaccines" }, { path: "weights" }]
            },
        );

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
