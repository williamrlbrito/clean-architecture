import { Notification } from "./notification";

describe("Unit tests for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const errorOne = {
      message: "error message one",
      context: "customer",
    };
    notification.addError(errorOne);

    expect(notification.messages("customer")).toBe(
      "customer: error message one"
    );

    const errorTwo = {
      message: "error message two",
      context: "customer",
    };

    notification.addError(errorTwo);

    expect(notification.messages("customer")).toBe(
      "customer: error message one, customer: error message two"
    );

    const errorThree = {
      message: "error message three",
      context: "order",
    };

    notification.addError(errorThree);

    expect(notification.messages("order")).toBe("order: error message three");
    expect(notification.messages("customer")).toBe(
      "customer: error message one, customer: error message two"
    );

    expect(notification.messages()).toBe(
      "customer: error message one, customer: error message two, order: error message three"
    );
  });
});
