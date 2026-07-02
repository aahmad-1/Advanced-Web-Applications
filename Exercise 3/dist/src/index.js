"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let users = [];
// 1. Hello world route
router.get("/hello", (req, res) => {
    res.json({
        msg: "Hello world!"
    });
});
// 2. ID echoing
router.get("/echo/:id", (req, res) => {
    res.json({
        id: req.params.id
    });
});
// 3. POST request
router.post("/sum", (req, res) => {
    const numbers = req.body.numbers;
    const sum = numbers.reduce((total, current) => total + current, 0);
    res.json({
        sum: sum
    });
});
// 4. back-end communication
router.post("/users", (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.json({
        message: "User successfully added"
    });
});
router.get("/users", (req, res) => {
    res.status(201).json(users);
});
exports.default = router;
