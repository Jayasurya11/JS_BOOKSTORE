
import bookPic from "../assets/awardbooks.png";

const PromoBanner = () => {
  return (
    <div className="mt-16 py-12 bg-teal-100 px-4 lg:px-24 ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-2xl lg:text-5xl font-bold mb-6 leading-snug ">
            2023 National Book Awards for Self-Help Shortlist
          </h2>
        </div>
        <div>
          <img src={bookPic} alt="" className="w-96 h-48 lg:h-60" />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
