import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

const productOne = ProductFactory.create("a", "Product One", 100);
const productTwo = ProductFactory.create("a", "Product Two", 200);

describe("Test list product use case", () => {
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

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(productOne);
    await productRepository.create(productTwo);

    const usecase = new ListProductUseCase(productRepository);

    const { products } = await usecase.execute({});

    expect(products).toHaveLength(2);
    expect(products[0].id).toBe(productOne.id);
    expect(products[0].name).toBe(productOne.name);
    expect(products[0].price).toBe(productOne.price);
    expect(products[1].id).toBe(productTwo.id);
    expect(products[1].name).toBe(productTwo.name);
    expect(products[1].price).toBe(productTwo.price);
  });
});
