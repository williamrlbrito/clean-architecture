import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { UpdateProductUseCase } from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "../create/create.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const repository = new ProductRepository();
    const createUsecase = new CreateProductUseCase(repository);
    const updateUsecase = new UpdateProductUseCase(repository);

    const input = {
      name: "Product",
      price: 10,
    };

    const product = await createUsecase.execute(input);

    const output = {
      id: product.id,
      name: "Product Updated",
      price: 20,
    };

    const result = await updateUsecase.execute(output);

    expect(result).toEqual(output);
  });

  it("should throw an error when product not found", async () => {
    const repository = new ProductRepository();
    const usecase = new UpdateProductUseCase(repository);

    const input = {
      id: "",
      name: "Product",
      price: 10,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
  });

  it("should throw an error when name is missing", async () => {
    const repository = new ProductRepository();
    const createUsecase = new CreateProductUseCase(repository);
    const updateUsecase = new UpdateProductUseCase(repository);

    const input = {
      name: "Product",
      price: 10,
    };

    const product = await createUsecase.execute(input);

    const output = {
      id: product.id,
      name: "",
      price: 20,
    };

    await expect(updateUsecase.execute(output)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is greater than zero", async () => {
    const repository = new ProductRepository();
    const createUsecase = new CreateProductUseCase(repository);
    const updateUsecase = new UpdateProductUseCase(repository);

    const input = {
      name: "Product",
      price: 10,
    };

    const product = await createUsecase.execute(input);

    const output = {
      id: product.id,
      name: "Product Updated",
      price: -1,
    };

    await expect(updateUsecase.execute(output)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
