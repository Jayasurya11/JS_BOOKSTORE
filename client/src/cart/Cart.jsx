import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { RiDeleteBin6Line } from "react-icons/ri";

import empty_cart from "../assets/banner-books/cart1.png"
import { toast } from "react-toastify";
import Loader from "../loader/Loader";


const Cart = () => {
 
  const { user } = useContext(AuthContext);
  
  const email= user?.email;
  const [isLoading, setIsLoading] = useState(false);
  
  const [userCart,setUserCart]=useState([]);

  
  const checkout=()=>{
    
    fetch(`${process.env.REACT_APP_SERVER}/create-checkout-session`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",

      },
      body:JSON.stringify(userCart)
    }).then(res=>res.json()).then(({url})=>window.location=url).catch(err=>console.log(err))
  }
  const removeItem=async (id,email)=>{
   
    await fetch(`${process.env.REACT_APP_SERVER}/remove-from-cart?emailid=${email}&item=${id}`)
    .then((res)=>res.json())
    .then(data=>{
      toast.error("Removed from Cart",{
        className:"toast-message" 
      }) 
      
      setUserCart(data.cart);
      
    })
  }
  const getTotal=()=>{
    console.log(user);
    var total=0;
    for(let i=0;i<userCart.length;i++){
      total=total+ parseInt(userCart[i].price)*parseInt(userCart[i].quantity)
    }
    
    return total;
  }
  const handleIncrease=(id)=>{
    fetch(`${process.env.REACT_APP_SERVER}/updatecart/increase?q=${email}&v=${id}`).then(data=>data.json()).then(res=>
    setUserCart(res.cart)).catch(err=>console.log(err))
  }
  const handleDecrease=(id,index)=>{
    
    fetch(`${process.env.REACT_APP_SERVER}/updatecart/decrease?q=${email}&v=${id}`).then(data=>data.json()).then(res=>
    setUserCart(res.cart)).catch(err=>console.log(err));
    
  }
  useEffect(() => {
   
    const getCart= async ()=>{
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_SERVER}/usercart?q=${email}`)
      .then((res)=>res.json())
      .then((data)=>{
        
        setUserCart(data.cart);
        setIsLoading(false);
      })
      .catch(err=>console.log(err));
    }
    getCart();
    
    
  },[email]);
  return (
    
    <>
    {isLoading?(<div className="mt-24 "><Loader/></div>):(<>
    {userCart.length>0?(<>
    <div className="mt-28 mx-4 lg:mx-12 pb-4 grid grid-cols-6 gap-2  lg:grid-cols-7 font-bold border-b-2 border-gray-200">
      <p className="text-center text-xs lg:text-lg">Book Title</p>
      <p className="text-center text-xs lg:text-lg">Author Name</p>
      <p className="hidden lg:block text-center text-xs lg:text-lg">Category</p>
      <p className="text-center text-xs lg:text-lg">Book Image</p>
      <p className="text-center text-xs lg:text-lg">Price</p>
      <p className="text-center text-xs lg:text-lg">Quanity</p>
      <p className="text-center text-xs lg:text-lg">Remove</p>

    </div>
    
      <div className="px-4 lg:px-12">
        {userCart?.map((item,index)=>(<div className="grid grid-cols-6 lg:grid-cols-7 pb-4 gap-2 my-8 border-b-2 border-gray-200 ">
        <p className="text-sm lg:text-lg text-center">{item.bookTitle}</p>
        <p className="text-sm lg:text-lg text-center  ">{item.authorName}</p>
        <p className="hidden lg:block text-center">{item.category.charAt(0).toUpperCase()+item.category.slice(1)}</p>
        <div className="flex justify-center"><img src={item.imageURL} alt="" className="sm:w-[30px] sm:h-[30px] lg:w-[100px] lg:h-[100px]"/></div>
        <div className="flex justify-center"><p className="text-center">{item.price}</p></div>
        <div className="flex justify-center"><button className="w-[20px] h-[24px] text-center bg-[1px] bg-gray-400" onClick={()=>{handleDecrease(item._id,index)}}>-</button><span className="lg:px-2  border-y h-[24px]">{item.quantity}</span><button className="w-[20px] h-[24px] bg-[1px] bg-gray-400" onClick={()=>{handleIncrease(item._id)}}>+</button></div>
        <button  className="flex justify-center" onClick={()=>{removeItem(item._id,email)}}><RiDeleteBin6Line/></button>
        </div>))
        }
      </div>
      <div className="flex justify-end">
      <div className="px-8 lg:px-24">
        
        <div className="flex justify-between w-full"><p>TOTAL</p><pre>{`:₹${getTotal()}`.padEnd(8)}</pre></div>
        <div className="flex justify-between w-full"><p>TAX</p><pre >{`:₹0`.padEnd(8)}</pre></div>
        <div className="flex justify-between w-full"><p>DELIVERY CHARGE</p><pre>{`:₹0`.padEnd(7)} </pre></div>
        <div className="flex justify-between w-full border-y border-gray-400"><p>NET TOTAL</p><pre>{`:₹${getTotal()}`.padEnd(8)}</pre></div>
        
        
        <button  className="block px-3 py-2  w-full my-5 bg-blue-600 rounded-md" onClick={checkout}>Checkout</button>
      </div>
      </div>
      </>
      ):
      (<div className="mt-20 flex justify-center"><img src={empty_cart} alt=""/></div>)}</>)}

    </>
  );
};

export default Cart;
