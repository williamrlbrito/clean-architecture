import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      }),
    };
  }
}

export { ListProductUseCase };
