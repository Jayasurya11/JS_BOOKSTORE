import { useLoaderData,useNavigate} from "react-router-dom";

import { useContext, useEffect} from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";



const SingleBook = () => {
  const navigate=useNavigate();
  const { user } = useContext(AuthContext);
  
  const {
    _id,
    bookTitle,
    imageURL,
    bookDescription,
    price,
    authorName,
    category,
  } = useLoaderData();
  useEffect(()=>{

    
    window.scrollTo(0,0);
  },[])
  const handleCart = (id, email) => {
    if(user){
      fetch(`${process.env.REACT_APP_SERVER}/add-to-cart/${id}?email=${email}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Added to Cart",{
            className:"toast-message"
          });
          
        })
        .catch((err) => console.log(err));
    }
    else{
      navigate("/login");
    }
    
  };
  return (
    <div className="my-16 border-t-2 lg:border-t-0 border-gray-300 lg:my-28 px-4 flex sm: flex-col lg:flex-row justify-between lg:px-24">
      <h2 className="text-center font-bold mb-4 text-3xl block lg:hidden ">{bookTitle}</h2>
      <img src={imageURL} alt="" className="h-96" />
      <div className="pl-5 flex flex-col justify-between">
        <h2 className="text-center font-bold text-3xl hidden lg:block">{bookTitle}</h2>
        <p className="text-center font-bold text-lg my-2 sm:my-4">By: {authorName}</p>
        <p>{bookDescription}</p>
        <p>
          <span className="font-bold">Category: </span>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
        <p>
          <p className="font-bold">Price:<span className="line-through font-thin ml-3"> ₹ {parseInt(price)+180}</span><span className="font-thin ml-3">₹ {price}</span></p>
        </p>
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => {
              handleCart(_id, user?.email);
            }}
            className="block px-3 py-2 w-4/5 my-5 bg-blue-600 rounded-md"
          >
            Add to Cart
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
