import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import routes from "./routes";
import swaggerDocument from "../swagger.json";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
