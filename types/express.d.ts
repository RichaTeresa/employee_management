import { Jwtpayload } from "../dto/jwt-payload";

declare global{
    namespace Express{
        interface Request{
            user?:Jwtpayload
        }
    }
}