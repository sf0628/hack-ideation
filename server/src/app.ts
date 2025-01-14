import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import gamesRoutes from "./routes/games";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

// enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// shows endpoints being accessed
app.use(morgan("dev"));
// allows to access/send json bodies
app.use(express.json());

app.use("/api/games", gamesRoutes);

// middleware for errors
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found.")); // http-errors: allows for better status codes
});
// WHY IS 404 ERROR NOT WORKING FOR FINDING NOTE THAT DOESNT EXIST

// error handler: use whenever and error has occurred
// next indicates that this is an error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});

export default app;