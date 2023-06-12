import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street", 2022, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "John updated",
  address: {
    street: "Street updated",
    number: 2023,
    zip: "Zip updated",
    city: "City updated",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test for customer update use case", () => {
  it("should update a customer", async () => {
    const repository = MockRepository();
    const usecase = new UpdateCustomerUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
