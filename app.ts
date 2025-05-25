import express, { Request, Response } from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { processTimeMiddleware } from "./middlewares/processTimeMiddleware";
import datasource from "./db/data-source";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRouter from "./routes/auth.route"
import { authMiddleware } from "./middlewares/auth.Middleware";
import { LoggerService } from "./services/logger.service";
import { departmentRouter } from "./routes/department.route";

const server = express();
const logger=LoggerService.getInstance('app()')

server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use('/employee',authMiddleware,employeeRouter);
server.use('/department',departmentRouter)
server.use('/auth',authRouter)

server.use(errorMiddleware)


const init = async ()=>{
  try{
    await datasource.initialize();
    logger.info('database connected');
  }
  catch{
    logger.error('failed to connect to DB');
    process.exit(1);
  }
  server.listen(3000, () => {
  logger.info("server listening to 3000");
});

}
init();




