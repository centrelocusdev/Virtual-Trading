import logo from "/logo.svg";
// import user from '/dashboard-account.png';
// import educationBlog from '/dashboard-educationblog.svg';
// import help from '/dashboard-help.svg';
// import news from  '/dash-news.png';
// import billing from '/billing.png';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
const Sidebar = ({ active }) => {
  const [activeTab, setActiveTab] = useState(active);

  return (
    <div className="w-1/5  h-fit shadow-box bg-white rounded-2xl.1 py-16 px-9 flex flex-col items-center gap-y-12">
      <div className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-5 w-full h-fit items-center">
          <img className="w-12 h-12" src={logo} alt="user" />
          <p className="text-xl font-inter font-semibold text-black">
            Virtual Trading
          </p>
        </div>
        <div className="w-full h-fit">
          <ul className="w-full h-fit flex flex-col py-7 gap-y-7">
            <Link to={"/user-dashbaord"}>
              <li
                onClick={() => setActiveTab("user-dashboard")}
                className={`${
                  activeTab === "user-dashboard"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                } hover:bg-purple2 hover:text-white  gap-x-7 flex justify-start items-center rounded-4xl cursor-pointer px-4 py-2 `}
              >
                {/* <img className='w-7 h-7' src={user} alt="help"/> */}
                <FaRegCircleUser
                  size={20}
                  color={`${
                    activeTab === "user-dashboard" ? "white" : "#683AB5"
                  }`}
                />
                <span className=" font-lato">Account</span>
              </li>
            </Link>

            <Link to={"/billing"}>
              <li
                onClick={() => setActiveTab("billing")}
                className={`${
                  activeTab === "billing"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                } hover:bg-purple2 hover:text-white  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2`}
              >
                {/* <img className='w-7 h-7' src={billing} alt="help"/> */}
                <RiBillLine
                  size={20}
                  color={`${activeTab === "billing" ? "white" : "#683AB5"}`}
                />
                <span className="font-lato">Billing</span>
              </li>
            </Link>

            <Link to={"/news-calender"}>
              <li
                onClick={() => setActiveTab("news")}
                className={`${
                  activeTab === "news"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                } hover:bg-purple2 hover:text-white  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2`}
              >
                {/* <img className='w-7 h-7' src={news} alt="help"/> */}
                <FaRegNewspaper
                  size={20}
                  color={`${activeTab === "news" ? "white" : "#683AB5"}`}
                />

                <span className="font-lato">News Calender</span>
              </li>
            </Link>

            <Link to="/educational-blog">
              <li
                onClick={() => setActiveTab("educational-blogs")}
                className={`hover:bg-purple2 hover:text-white ${
                  activeTab === "education-blog"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                }  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2 `}
              >
                {/* <img className='w-7 h-7' src={educationBlog} alt="help"/> */}
                <FaBook
                  size={20}
                  color={`${
                    activeTab === "educational-blogs" ? "white" : "#683AB5"
                  }`}
                />
                <span className="font-lato">Educational Blogs</span>
              </li>
            </Link>
            
            <Link to={"/help"}>
              <li
                onClick={() => setActiveTab("help")}
                className={`${
                  activeTab === "help"
                    ? "bg-purple1 text-white"
                    : "text-purple1"
                } hover:bg-purple2 hover:text-white  rounded-4xl gap-x-7 flex justify-start items-center cursor-pointer px-4 py-2`}
              >
                {/* <img className='w-7 h-7' src={help} alt="help"/> */}
                <IoMdHelpCircle
                  size={20}
                  color={`${activeTab === "help" ? "white" : "#683AB5"}`}
                />
                <span className="font-lato">Help</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <button className="px-11 py-4 hover:bg-purple2 bg-purple1 text-white rounded-4xl text-lg font-inter">
        Start Challenge
      </button>
    </div>
  );
};

export default Sidebar;
