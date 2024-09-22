import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { vaccineModel } from "./vaccine-modal";
import { Vaccine } from "./vaccine-types";

export class VaccineController {
  // constructor(private logger: Logger) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }

    const breed: Vaccine = { ...req.body };
    const newAnimal = await vaccineModel.create(breed);

    console.log(`Animal category`, { id: newAnimal._id });
    res.json({ id: newAnimal._id });
  };

  index = async (req: Request, res: Response) => {
    const data = await vaccineModel.find({});

    res.json({
      data,
      // total: products.total,
      // pageSize: products.limit,
      // currentPage: products.page,
    });
    // const { q, tenantId, categoryId, isPublish } = req.query;
    // const filters: Filter = {};

    // if (
    //     categoryId &&
    //     mongoose.Types.ObjectId.isValid(categoryId as string)
    // ) {
    //     filters.categoryId = new mongoose.Types.ObjectId(
    //         categoryId as string,
    //     );
    // }

    // const products = await this.animalService.getProducts(
    //     q as string,
    //     filters,
    //     {
    //         page: req.query.page ? parseInt(req.query.page as string) : 1,
    //         limit: req.query.limit
    //             ? parseInt(req.query.limit as string)
    //             : 1,
    //     },
    // );

    // const finalProducts = (products.data as Product[]).map((product) => {
    //     return {
    //         ...product,
    //     };
    // });
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

  // getSingle = async (req: Request, res: Response) => {
  //     const { animalId } = req.params;
  //     if (!animalId) {
  //         res.json("Animal not found");
  //     }
  //     const data = await animalModel.find({ _id: animalId });
  //     res.json(data);
  // };
}
