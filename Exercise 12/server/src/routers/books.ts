import { Router, Request, Response } from "express";
import { Book } from "../models/Book";

const router = Router();

router.post("/book", async (req: Request, res: Response) => {
    try {
        const {name, author, pages} = req.body;
        const newBook = new Book({name, author, pages});
        await newBook.save();
        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating book");
    }
});

router.get("/book/:name", async (req: Request, res: Response) => {
    try {
        const book = await Book.findOne({name: req.params.name});

        if (!book) {
            return res.status(404).send("Book not found");
        }

        res.json(book);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching book");
    }
});

export default router;