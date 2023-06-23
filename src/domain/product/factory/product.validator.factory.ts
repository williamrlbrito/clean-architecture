import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import { ProductYupValidator } from "../validator/product.yup.validator";

class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}

export { ProductValidatorFactory };
