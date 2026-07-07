import express, {Express} from "express" // copied from demo code and tweaked a bit
import path from "path"
import morgan from "morgan"
import mongoose, { Connection } from "mongoose"
import dotenv from "dotenv"
import userRouter from "./src/routes/user"
import topicRouter from "./src/routes/topic"

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT as string) || 3000

const mongoDB: string = "mongodb://localhost:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../public")))

app.use("/api/user", userRouter)
app.use("/api", topicRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});