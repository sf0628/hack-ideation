import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

// ensures that environment variables are valid/not undefined
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
});