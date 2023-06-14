import ProductFactory from "../../../domain/product/factory/product.factory";
import { ListProductUseCase } from "./list.product.usecase";

const productOne = ProductFactory.create("a", "Product One", 100);
const productTwo = ProductFactory.create("a", "Product Two", 200);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([productOne, productTwo])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test for listing product use case", () => {
  it("should list all products", async () => {
    const repository = MockRepository();
    const usecase = new ListProductUseCase(repository);

    const output = await usecase.execute({});

    expect(output.products).toHaveLength(2);
    expect(output.products[0].id).toBe(productOne.id);
    expect(output.products[0].name).toBe(productOne.name);
    expect(output.products[0].price).toBe(productOne.price);
    expect(output.products[1].id).toBe(productTwo.id);
    expect(output.products[1].name).toBe(productTwo.name);
    expect(output.products[1].price).toBe(productTwo.price);
  });
});
