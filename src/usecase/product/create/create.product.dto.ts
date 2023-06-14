interface InputCreateProductDto {
  name: string;
  price: number;
}

interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}

export { InputCreateProductDto, OutputCreateProductDto };
