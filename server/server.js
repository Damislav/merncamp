import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");
import dotenv from "dotenv";
import { readdirSync } from "fs";

const app = express();
dotenv.config();

// ¸db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ¸middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
