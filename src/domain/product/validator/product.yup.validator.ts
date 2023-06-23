import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        price: yup.number().min(0, "Price must be greater than zero"),
      });

      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
          price: entity.price,
        },
        { abortEarly: false }
      );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}

export { ProductYupValidator };
