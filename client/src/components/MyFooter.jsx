import { Link } from "react-router-dom";

import { Footer } from "flowbite-react";
import { BsGithub, BsLinkedin} from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
const bookCategories = [
  "Fiction",
  "Non-Fiction",
  "History",
  "Finance",
  "Biography",
  "Horror",
  "Fantasy",
  "Self-Help",
  "Humour",
  "Romance",
  "Travel",
  "Children"
];
const MyFooter = () => {
  return (
    <Footer className="bg-black">
      <div className="w-full px-4 lg:px-24">
        <div className="grid w-full grid-cols-3 text-sm lg:text-lg gap-[2px] lg:gap-4  py-4 lg:py-8 md:grid-cols-4">
          
          {
            bookCategories.map((item,i)=>(<button key={i}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Link className="text-gray-300 hover:text-blue-800" to={`/category?q=${item.toLowerCase()}`}>{item}</Link>
            </button>))
          }
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 flex sm:flex-col sm:items-center sm:justify-center md:flex-row md:justify-between ">
          <p className="text-white w-full">Copyright @ Jayasurya</p>
          <div className="mt-4 w-full flex space-x-6 sm:mt-0 sm:justify-center md:justify-end">
            <Footer.Icon
              href="https://www.linkedin.com/in/jayasurya-e-bbbbb9207/"
              target="_blank"
              className="text-white"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="https://github.com/Jayasurya11"
              className="text-white  "
              target="_blank"
              icon={BsGithub}
            />
            <Footer.Icon href="mailto:jayasuryae11@gmail.com" className="text-white  " icon={IoMdMail} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default MyFooter;
