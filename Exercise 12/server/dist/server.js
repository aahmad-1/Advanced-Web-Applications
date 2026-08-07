"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const books_1 = __importDefault(require("./src/routers/books"));
const app = (0, express_1.default)();
const port = 1234;
const mongoDBURL = "mongodb://127.0.0.1:27017/testdb";
mongoose_1.default.connect(mongoDBURL);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use("/api", books_1.default);
if (process.env.NODE_ENV === "development") {
    const corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use((0, cors_1.default)(corsOptions));
    // added after task 5
}
else if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client/dist")));
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../../client/dist/index.html"));
    }); // the one on moodle didnt work, ai gave this
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
