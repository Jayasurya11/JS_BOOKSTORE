
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa6";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Avatar } from "flowbite-react";
// import required modules
import Profile from "../assets/profile.jpg";
import Profile_2 from "../assets/profile-2.jpg";
import Profile_7 from "../assets/profile-7.jpg";
import Profile_5 from "../assets/profile-5.jpg";
import Profile_6 from "../assets/profile-4.png";
import { Pagination } from "swiper/modules";

const Reviews = () => {
  return (
    <div className="my-12 px-4 lg:px-24">
      <h2 className="text-xl lg:text-5xl font-bold text-center mb-10 leading-snug">
        Customers Reviews{" "}
      </h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="shadow-2xl bg-white py-8 px-4  md:m-5 rounded-lg border">
            <div className="space-y-6">
              <div className="text-amber-500 flex gap-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="mt-7 h-64">
                <p className="mb-5">
                  I love shopping for books on this website! The user-friendly
                  interface makes it easy to find my favorite genres, and the
                  extensive collection ensures I always discover something new
                  and exciting.
                </p>
                <Avatar
                  img={Profile}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium ">Rachel Green</h5>
                <p className="text-base">Team Lead, Microsoft</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="shadow-2xl bg-white h-60 py-8 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6">
              <div className="text-amber-500 flex gap-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="mt-7 h-64">
                <p className="mb-5">
                  The quick delivery and excellent packaging of my orders have
                  made this online bookshop my go-to choice. They consistently
                  provide a hassle-free shopping experience, and their customer
                  service is top-notch.
                </p>
                <Avatar
                  img={Profile_2}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium ">Monica Geller</h5>
                <p className="text-base">Consultant, Amazon</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="shadow-2xl bg-white py-8 h-60 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6">
              <div className="text-amber-500 flex gap-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="mt-7 h-64">
                <p className="mb-5">
                  Fantastic prices and regular discounts make this book website
                  a budget-friendly option for avid readers. The website layout
                  is intuitive, making it a breeze to navigate and explore
                  different titles.
                </p>
                <Avatar
                  img={Profile_7}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium ">Chandler Bing</h5>
                <p className="text-base">CEO, ABC Company</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="shadow-2xl bg-white py-8 h-2/5 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6">
              <div className="text-amber-500 flex gap-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="mt-7 h-64">
                <p className="mb-5">
                  I appreciate the detailed book descriptions and customer
                  reviews, helping me make informed choices. The recommendations
                  feature is also spot-on, introducing me to books I might have
                  missed otherwise.
                </p>
                <Avatar
                  img={Profile_5}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium ">Phoebe Buffay</h5>
                <p className="text-base">Software Engineer, Google</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="shadow-2xl bg-white py-8 h-2/5 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6">
              <div className="text-amber-500 flex gap-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="mt-7 h-64">
                <p className="mb-5">
                  Efficient return and refund processes make me feel secure
                  about my purchases. The website's search functionality is
                  powerful, making it easy to find specific titles or authors
                  among the vast catalog.
                </p>
                <Avatar
                  img={Profile_6}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium ">Joey Tribbiani</h5>
                <p className="text-base">Business Executive, Trading Company</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
