import { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

const OtherBooks = () => {
  const [books, setBooks] = useState([]);
 
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/all-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(11, 18)));
  }, []);
  return (
    <div>
      <BookCards books={books} headLine="Other Popular Books" />
    </div>
  );
};

export default OtherBooks;
