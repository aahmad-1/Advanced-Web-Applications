"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // once again mostly same as demo code just tweaked a bit for the assignment
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
dotenv_1.default.config();
const router = (0, express_1.Router)();
// 1. Register
router.post("/register", (0, express_validator_1.body)("email").trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), // got valid regex email check from https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
(0, express_validator_1.body)("password").isLength({ min: 5 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const existingUser = await User_1.User.findOne({ email: req.body.email });
        // console.log(existingUser)
        if (existingUser) {
            return res.status(403).json({ message: "Email already in use" });
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(req.body.password, salt);
        const newUser = await User_1.User.create({
            email: req.body.email,
            password: hash
        });
        // console.log("User registered:", newUser.email)
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error(`Registration error: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// 2. login
router.post("/login", (0, express_validator_1.body)("email").trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), // got valid regex email check from https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
(0, express_validator_1.body)("password").isLength({ min: 5 }), async (req, res) => {
    try {
        const user = await User_1.User.findOne({ email: req.body.email });
        //console.log(user)
        if (!user) {
            return res.status(401).json({ message: "Login failed" });
        }
        const match = bcrypt_1.default.compareSync(req.body.password, user.password); //this compares entered password w/ hashed passowrd
        if (!match) { // if passwords dont match
            return res.status(401).json({ message: "Login failed" });
        }
        const jwtPayload = {
            id: user._id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, { expiresIn: "2h" }); // 2m too short, 2h instead
        console.log("User logged in:", user.email);
        return res.status(200).json({ success: true, token });
    }
    catch (error) {
        console.error(`Login error: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// 3. List users
router.get("/list", async (req, res) => {
    try {
        const users = await User_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error(`Error fetching users: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = router;
