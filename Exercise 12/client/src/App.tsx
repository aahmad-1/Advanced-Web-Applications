import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./components/AddBook";
import Book from "./components/Book";
import Error from "./components/Error";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><h1 className="head">books</h1><AddBook /></>} />
                <Route path="/book/:name" element={<Book />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;