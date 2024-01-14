import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "flowbite-react";

const CategoryWise = () => {
  const [books, setBooks] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/all-books?q=${search}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [searchParams]);
  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-xl lg:text-5xl font-bold text-center">
        {`${search.charAt(0).toUpperCase() + search.slice(1)} Category Books`}
      </h2>
      <div className="grid gap-2 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map((book) => (
          <Link to={`/book/${book._id}`}>
            <Card>
              <img src={book.imageURL} alt="" className="h-96" />
              <h5 className="text-md font-bold  tracking-tight text-gray-900 dark:text-white">
                <p>{book.bookTitle}</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>{book.bookDescription.slice(0, 100)}</p>
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                  <span className="font-bold">₹</span> {book.price}
                </p>
              </p>
              <button className="bg-blue-700 font-semibold text-white py-2 rounded">
                Buy Now
              </button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryWise;
