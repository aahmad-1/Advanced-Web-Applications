import express, { Express } from "express"; // copied demo code for this week agian
import path from "path";
import mongoose, { Connection } from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

import router from "./src/routes/index";
import userRouter from "./src/routes/user";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT as string) || 3000;

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});