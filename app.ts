import express, { Request, Response } from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./loggerMiddleware";
import { processTimeMiddleware } from "./processTimeMiddleware";
import datasource from "./db/data-source";



const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);
server.use('/employee',employeeRouter);

const init = async ()=>{
  try{
    await datasource.initialize();
    console.log('connected');
  }
  catch{
    console.error('failed to connect to DB');
    process.exit(1);
  }
  server.listen(3000, () => {
  console.log("server listening to 3000");
});

}
init();




