interface InputListCustomerDto {}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
};

interface OutputListCustomerDto {
  customers: Customer[];
}

export { InputListCustomerDto, OutputListCustomerDto };
