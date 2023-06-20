import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";

const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const input = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(input);
    res.status(201).json(output);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute({});
    res.status(200).json(output);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { productRouter };
