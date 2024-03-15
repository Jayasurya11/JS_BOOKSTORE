import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { Dropdown } from "flowbite-react";
import { IoCartOutline } from "react-icons/io5";

import logo from "../assets/modified.png"
const Navbar = () => {
  const { user } = useContext(AuthContext);
  
  const [cart,setCart]=useState([]);
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "History",
    "Finance",
    "Biography",
    "Horror",
    "Fantasy",
    "Self-help",
    "Humour",
    "Romance",
    "Travel",
    "Children"
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const getTotalItems=()=>{
    var count=0;
    cart?.map((item)=>count+=item.quantity);
    return count;
  }
  useEffect( () => {
    const getCart= async ()=>{
      await fetch(`${process.env.REACT_APP_SERVER}/usercart?q=${user?.email}`)
      .then((res)=>res.json())
      .then((data)=>{setCart(data.cart)
      })
      .catch(err=>console.log(err));
    }
    getCart();
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  });
  const navItems = [
    { link: "Home", path: "/" },
    
    { link: "Shop", path: "/shop" },
    { link: "Admin", path: "/admin/dashboard" },
  ];
  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 right-0 left-0 bg-blue-300" : ""
        }`}
      >
        <div className="flex flex-row justify-between items-start text-base gap-2 ">
          <Link
            to="/"
            className="text-2xl font-bold cursor-pointer text-blue-700 flex items-center gap-2"
          >
            {/* <IoBookOutline className="inline-block" /> */}
            {/* 
             */}
             <img width="30px" src={logo} alt=""/>
            <span className="text-[8px] font-bold lg:text-xl">JS BOOKSTORE</span>
          </Link>
          <ul className="md:flex space-x-12 hidden ">
            {navItems.map(({ link, path },index) => (
              <Link
                key={index}
                to={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-blue-700"
              >
                {link}
              </Link>
            ))}
            <Dropdown label="SELECT BY CATEGORY" inline>
              {bookCategories.map((category) => (
                <Dropdown.Item>
                  <Link className="cursor-pointer" to={`/category?q=${category.toLowerCase()}`}>{category}</Link>
                </Dropdown.Item>
              ))}
            </Dropdown>
            
            
          </ul>
          
          <div className="flex justify-end  items-center gap-2 lg:gap-16">
          {user?(<li className="flex items-center text-[10px] lg:text-[16px] ">{user.displayName ||  user.email+" 👤" } {user.photoURL?(<img src={user.photoURL} alt=""  className="ml-[15px] w-[25px] h-[25px] lg:w-[40px] lg:h-[40px] rounded-full"/>):""}</li>):<Link to="/login">SIGN IN</Link>}
            <Link to="/cart" className="text-md mr-4 lg:text-2xl">
              <div className="flex relative"><IoCartOutline /><span className=" lg:ml-[2px] rounded-full px-1 text-sm font-semibold absolute top-[-10px] bg-orange-200 left-4 lg:left-5">{getTotalItems()}</span></div>
            </Link>
            {user?(<Link className="text-black hidden lg:block text-xs lg:text-[16px] hover:text-blue-700 cursor-pointer" to="/logout">LOG OUT</Link>):""}
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
          </div>
        </div>
        <div
          className={`space-y-4 px-4 mt-24 py-7 bg-blue-700 ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          <div className="flex flex-col justify-start gap-1 ">
          {navItems.map(({ link, path }) => (
            <Link
              onClick={toggleMenu}
              key={path}
              to={path}
              className=" text-base text-white uppercase cursor-pointer hover:text-blue-300"
            >
              {link}
            </Link>
          ))}
          {user?(<Link className="text-white block hover:text-red-400 cursor-pointer" to="/logout">LOG OUT</Link>):""}
          <div className="text-base text-white hover:text-red-400 cursor-pointer">
            <Dropdown label="SELECT BY CATEGORY" inline>
              <ul className="columns-2">
              {bookCategories.map((category,i) => (
                
                <Dropdown.Item key={i}>
                  
                  <Link  onClick={toggleMenu} className="cursor-pointer" to={`/category?q=${category.toLowerCase()}`}>{category}</Link>
                </Dropdown.Item>
              ))}
              </ul>
            </Dropdown>
          </div>
          </div>
          
          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
