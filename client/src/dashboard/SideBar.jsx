
import { Link } from "react-router-dom";
import {
  
  HiOutlineCloudUpload,
} from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";

import { IoHome } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaUser } from "react-icons/fa6";
const SideBar = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="border">
    
    <nav className="flex flex-col sm:w-screen lg:w-[250px]  lg:fixed top-0 left-0 justify-start lg:h-screen border bg-teal-300">
      <div className="flex justify-start  lg:justify-center sm:gap-4 lg:gap-2  items-center border-b-2 border-gray-300 h-20">
        {user?.photoURL?(<img src={user?.photoURL} alt="" className="ml-4 lg:ml-0 w-12 h-12"/>):(<FaUser className="ml-4 text-sm "/>)}
        <p className="text-sm">{user?.displayName || user?.email}</p>
      </div>
      <div className="flex flex-row lg:flex-col justify-evenly items-center lg:h-60  py-4 gap-4">
      <Link className="hover:text-blue-700 flex items-center  text-sm lg:text-lg" to="/"><IoHome/>Back to Home</Link>
      <Link className="hover:text-blue-700 flex items-center text-sm lg:text-lg" to="/admin/dashboard/upload"><HiOutlineCloudUpload/>Upload Book</Link>
      <Link className="hover:text-blue-700 flex items-center text-sm lg:text-lg" to="/admin/dashboard/"><FiEdit/>Manage Books</Link>
      <Link className="hover:text-blue-700 flex items-center text-sm lg:text-lg" to="/logout"><IoIosLogOut/>Log Out</Link>
      </div>
    </nav>
    </div>
  );
};

export default SideBar;
