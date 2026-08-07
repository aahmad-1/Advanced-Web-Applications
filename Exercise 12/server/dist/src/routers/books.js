"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_1 = require("../models/Book");
const router = (0, express_1.Router)();
router.post("/book", async (req, res) => {
    try {
        const { name, author, pages } = req.body;
        // console.log("book details", req.body);
        const newBook = new Book_1.Book({ name, author, pages });
        await newBook.save();
        // console.log(newBook);
        res.status(200).send("ok"); // according to the moodle image(?)
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error creating book");
    }
});
router.get("/book/:name", async (req, res) => {
    try {
        const book = await Book_1.Book.findOne({ name: req.params.name });
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error fetching book");
    }
});
exports.default = router;
