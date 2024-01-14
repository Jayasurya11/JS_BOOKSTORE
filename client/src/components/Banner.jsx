import { toast } from "react-toastify";
import BannerCard from "../home/BannerCard";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate=useNavigate();
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
  const handleSearch=(e)=>{
    e.preventDefault();
    const bookName=titleCase(e.target.name.value);
    fetch(`${process.env.REACT_APP_SERVER}/search-book?q=${bookName}`).then((res)=>res.json()).then(data=>navigate(`/book/${data._id}`)).catch((err)=>toast("Not Found ",{
      className:"toast-message"
    }))

  }
  return (
    <div className="px-4 lg:px-24 bg-sky-200 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-20 lg:py-40">
        <div className="md:w-1/2 h-full space-y-8">
          <h2 className="text-5xl font-bold leading-snug text-black ">
            Buy and Sell Your Books{" "}
            <span className="text-blue-700">for the best prices </span>
          </h2>
          <p className="md:w-4/5">
          JS Bookstore is an online platfrom which has an extensive library of books which anyone can buy from anywhere around the world.
          with JS Bookstore you have access to all kind of educational, motivation and career book to keep you going in any areas.
          If you have any questions or feedback, don't hesitate to contact at jayasuryae11@gmail.com
          </p>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              name="name"
              id="search"
              placeholder="Search a book"
              className="py-2 px-2 rounded-s-sm outline-none"
            />
            <button type="submit" className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 ">
              search
            </button>
          </form>
        </div>
        <div>
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
