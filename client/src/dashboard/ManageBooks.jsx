import React, { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../context/AuthProvider";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";


const ManageBooks = () => {
 
  const { user } = useContext(AuthContext);
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/all-books`)
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }, []);
  const handleDelete = (id) => {
    if(user?.email==="suryakohli11@gmail.com" || user?.email==="jayasuryae11@gmail.com"){
      fetch(`${process.env.REACT_APP_SERVER}/book/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        toast.error(`Deleted `,{
          className:"toast-message"
        });
        console.log(data);
      });
    }
    else{
      toast.warn("Only Jayasurya E can delete ",{
        className:"toast-message"
      });
      toast.info("But you can upload or edit",{
        className:"toast-message"
      })
    }
  };
  return (
    <div className="px-4 lg:absolute lg:left-[250px] lg:px-8  ">
      <h2 className="text-3xl font-bold ml-12 ">Book Inventory</h2>

      
      <div className="mt-4 mx-1 lg:mx-12 py-4 rounded-t  gap-1 grid grid-cols-8 lg:grid-cols-11 font-bold  bg-gray-500">
      <p className="text-center col-span-1">NO.</p>
      <p className="text-center col-span-2">TITLE</p>
      <p className="hidden lg:block text-center col-span-2 ">AUTHOR</p>
      <p className="hidden lg:block text-center">CATEGORY</p>
      <p className="text-center col-span-2">IMAGE</p>
      <p className="text-center">PRICE</p>
      <p className="text-center col-span-2">MODIFY</p>

    </div>
    <div className="mx-1 lg:mx-12  border-[1px]  border-gray-300 shadow-xl">
        {allBooks?.map((item,index)=>(<div className="grid grid-cols-8 lg:grid-cols-11 border-[1px] items-center py-4 gap-1   ">
        <p className="text-center col-span-1 ">{index+1}</p>
        <p className="text-sm col-span-2 lg:text-lg text-center">{item.bookTitle}</p>
        <p className="hidden lg:block text-sm lg:text-lg text-center col-span-2 ">{item.authorName}</p>
        <p className="hidden lg:block text-center">{item.category}</p>
        <div className="flex justify-center col-span-2 "><img src={item.imageURL} alt="" className="sm:w-[30px] sm:h-[30px] lg:w-[100px] lg:h-[100px]"/></div>
        <p className="text-center">{item.price}</p>
        <div className="flex justify-center items-center col-span-2 "><Link
                  to={`/admin/dashboard/edit-books/${item._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 lg:mr-5"
                >
                  Edit
                </Link>
                /
                <button
                  onClick={() => handleDelete(item._id)}
                  className=" font-semibold text-red-700  hover:bg-sky-600 "
                >
                  <RiDeleteBin6Line/>
                </button></div>
        </div>))
        }
      </div>

    </div>
  );
};

export default ManageBooks;
