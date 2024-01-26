import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const BookCards = ({ headLine, books }) => {
  const navigate=useNavigate();
  const handleClick=(id)=>{
    navigate(`/book/${id}`)
    // window.scrollTo(0,0);
  }
  return (
    <div className=" px-4 lg:px-24">
      <h2 className="text-xl lg:text-5xl text-center font-bold text-black my-8">{headLine}</h2>
      <div className="mx-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper w-full "
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              
             <div className="h-[490px] ">
              
                <div className="relative">
                  <img src={book.imageURL} alt="" width="400px" className="h-80"/>
                  
                </div>
                <div className="border border-gray-200  py-2 h-36">
                  <div className="px-4">
                    <h3 className="font-xs font-semibold">{book.bookTitle}</h3>
                    <p>{book.authorName}</p>
                    <p>Price: ₹{book.price}</p>
                    <button className="px-8 py-1 bg-blue-700 rounded-lg" onClick={()=>{handleClick(book._id)}} >Buy</button>
                  </div>
                </div>
              {/* </Link> */}
              </div>
              
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookCards;
