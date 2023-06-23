import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { ListCustomerUseCase } from "../../../usecase/customer/list/list.customer.usecase";
import { CustomerPresenter } from "../presenters/customer.presenter";
const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const input = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    };

    const output = await usecase.execute(input);
    res.status(201).json(output);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    res.status(200).format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.toXML(output)),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { customerRoute };
