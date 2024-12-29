import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

// connect to database
mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose connected.");
        // run server after connecting to database 
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(console.error);