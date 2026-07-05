"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        const id = (0, uuid_1.v4)(); // generates a unique id, like 'b18794e8-5d0d-417c-b361-ba38e78411b4' or something
        const extension = path_1.default.extname(file.originalname); // returns extension (bike.png returns .png)
        const originalFilename = path_1.default.parse(file.originalname).name; // returns only filename (bike.png returns just bike)
        cb(null, `${originalFilename}_${id}${extension}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
