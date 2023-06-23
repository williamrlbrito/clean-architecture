import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";

class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
      });

      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
        },
        { abortEarly: false }
      );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}

export { CustomerYupValidator };
