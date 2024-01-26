import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "flowbite-react";
import Loader from "../loader/Loader";

const CategoryWise = () => {
  const [books, setBooks] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    setIsLoading(true);

    fetch(`${process.env.REACT_APP_SERVER}/all-books?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setBooks(data);
      }
        );
  }, [searchParams]);
  return (
    <>
    {isLoading?(<div className="mt-24 "><Loader/></div>):(<div className="mt-28 px-4 lg:px-24">
      <h2 className="text-2xl lg:text-5xl font-bold text-center">
        {`${search.charAt(0).toUpperCase() + search.slice(1)} Category Books`}
      </h2>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map((book) => (
          <Link to={`/book/${book._id}`}>
            <Card className="h-[700px]">
              <img src={book.imageURL} alt="" className="h-96" />
              <h5 className="text-md font-bold  tracking-tight text-gray-900 dark:text-white">
                <p>{book.bookTitle}</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>{book.bookDescription.split(" ").slice(0,18).join(" ")+" ..."}</p>
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
    </div>)}
    
    </>
  );
};

export default CategoryWise;
