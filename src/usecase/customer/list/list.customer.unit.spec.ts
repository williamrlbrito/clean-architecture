import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("John street", 2023, "John zip", "John city")
);

const customerTwo = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Jane street", 2023, "Jane zip", "Jane city")
);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([customerOne, customerTwo])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test for listing customer use case", () => {
  it("should list all customers", async () => {
    const repository = MockRepository();
    const usecase = new ListCustomerUseCase(repository);

    const output = await usecase.execute({});

    expect(output.customers).toHaveLength(2);
    expect(output.customers[0].id).toBe(customerOne.id);
    expect(output.customers[0].name).toBe(customerOne.name);
    expect(output.customers[0].address.street).toBe(customerOne.Address.street);
    expect(output.customers[1].id).toBe(customerTwo.id);
    expect(output.customers[1].name).toBe(customerTwo.name);
    expect(output.customers[1].address.street).toBe(customerTwo.Address.street);
  });
});
