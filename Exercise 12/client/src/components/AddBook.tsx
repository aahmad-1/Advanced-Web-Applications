import { useState } from "react";
import type { IBook } from "../types/Book";

const AddBook = () => {
    const [name, setName] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);

    const addBook = async (book: IBook) => {
        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error("Failed to add book");
            }
            return await response.text();

        } catch (error) {
            console.error(error);
        }
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newBook: IBook = { name, author, pages };
        await addBook(newBook);
        window.location.href = `/book/${encodeURIComponent(name)}`;
    };

    return (
        <div className="form-container">
            <form className="bookForm" onSubmit={submit}>
                <input id="name" type="text" placeholder="Book Title" value={name} onChange={(e) => setName(e.target.value)} />
                <input id="author" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input id="pages" type="number" placeholder="Pages" value={pages} onChange={(e) => setPages(Number(e.target.value))} />
                <input id="submit" type="submit" value="Add Book" />
            </form>
        </div>
    );
};

export default AddBook;