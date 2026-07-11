import express, { Express, Request, Response } from "express";
import mongoose, { Connection } from "mongoose";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import path from "path";
import booksRouter from "./src/routers/books";

const app: Express = express();
const port = 1234;

const mongoDBURL = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDBURL);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", booksRouter);

if (process.env.NODE_ENV === "development") {
    const corsOptions: CorsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));
    // added after task 5
} else if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../../client/dist")));

    app.get("/{*splat}", (req: Request, res: Response) => { // the one on moodle didnt work with express 5
        res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"));
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});