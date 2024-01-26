import Banner from "../components/Banner";
import BestSellerBooks from "./BestSellerBooks";
import FavBook from "./FavBook";
import OtherBooks from "./OtherBooks";
import PromoBanner from "./PromoBanner";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <BestSellerBooks />

      <FavBook />
      <PromoBanner />
      <OtherBooks />
      <Reviews />
    </div>
  );
};

export default Home;
