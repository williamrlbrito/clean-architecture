import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";

describe("Test create product use case", () => {
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

  it("should create a product", async () => {
    const input = {
      name: "Product Name",
      price: 10,
    };

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const input = {
      name: "",
      price: 10,
    };

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is greater than zero", async () => {
    const input = {
      name: "Product Name",
      price: -1,
    };

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
