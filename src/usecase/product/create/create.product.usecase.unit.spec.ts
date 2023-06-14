import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product Name",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({ ...input, name: "" })).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is greater than zero", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({ ...input, price: -1 })).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
