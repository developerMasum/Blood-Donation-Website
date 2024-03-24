import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cookieParser())

// PARSER
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello World!",
  });
});

app.use("/api/v1", router)

app.use(globalErrorHandler);
app.use(notFoundRoute);



export default app;
