import { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

const BestSellerBooks = () => {
 
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/all-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 5)));
  }, []);
  return (
    <div>
      <BookCards books={books} headLine="Best Seller Books" />
    </div>
  );
};

export default BestSellerBooks;
