import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";
import * as dotenv from "dotenv";

dotenv.config();

const datasource=new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    database:process.env.DATABASE,
    username:process.env.DB_USERNAME,
    password:"postgres",
    extra: {max:5,min:2},
    synchronize:false,
    logging:false,
    namingStrategy:new SnakeNamingStrategy(),
    entities:["dist/entities/*.js"],
    migrations:["dist/db/migrations/*.js"]
})

export default datasource

