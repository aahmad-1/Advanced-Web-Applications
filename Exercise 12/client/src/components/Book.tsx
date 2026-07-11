import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IBook } from "../types/Book";

const Book = () => {
    const { name } = useParams(); //note, we cant define tyhe type of the param as string or the url wont match
    const [book, setBook] = useState<IBook | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`/api/book/${name}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch book");
                }
                const data = await response.json();
                setBook(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchBook();
    }, [name]);

    if (!book) {
        return <h2 className="noBook">Book not found :c</h2>;
    }

    return (
        <div className="books">
            <h1>Books</h1>
            <p className="title">{book.name}</p>
            <p className="author">{book.author}</p>
            <p className="pages">{book.pages}</p>
        </div>
    );
};

export default Book;