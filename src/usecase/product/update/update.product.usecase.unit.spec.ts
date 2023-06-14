import ProductFactory from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create("a", "Product", 10);

const input = {
  id: product.id,
  name: "Product updated",
  price: 20,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test for product update use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const usecase = new UpdateProductUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error when product not found", async () => {
    const repository = MockRepository();
    repository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new UpdateProductUseCase(repository);

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
  });

  it("should throw an error when name is missing", async () => {
    const repository = MockRepository();
    const usecase = new UpdateProductUseCase(repository);

    await expect(usecase.execute({ ...input, name: "" })).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is greater than zero", async () => {
    const repository = MockRepository();
    const usecase = new UpdateProductUseCase(repository);

    await expect(usecase.execute({ ...input, price: -1 })).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
