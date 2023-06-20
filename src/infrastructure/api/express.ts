import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRoute } from "./routes/customer.route";
import { productRouter } from "./routes/product.route";
import ProductModel from "../product/repository/sequelize/product.model";

const app: Express = express();
app.use(express.json());
app.use("/customers", customerRoute);
app.use("/products", productRouter);

let sequelize: Sequelize;

async function initSequelize() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

initSequelize();

export { app, sequelize };
