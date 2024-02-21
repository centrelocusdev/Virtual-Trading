import logo from "/logo.svg";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { Link } from "react-scroll";

const Nav = () => {
  console.log(window.location.href);
  const [openOptions, setOpenOptions] = useState(false);
  const [Isauth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token_access");
    if (token) {
      setIsAuth(true);
    }
  }, []);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await auth.logout();
      if (res && res.status === "success") {
        toast.success(res.message);
        setIsAuth(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      id="navbar"
      className="w-full bg-green5 h-fit flex justify-between items-center px-20 py-2 "
    >
      <div
        onClick={() => {
          navigate("/");
        }}
        className="cursor-pointer flex justify-between items-center gap-2"
      >
        <img className="h-10 w-10 rounded-full" src={logo} alt="logo" />
        <p className="font-inter font-base font-semibold text-black">
          TradesLO
        </p>
      </div>
      <div className="flex gap-10 items-center">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer font-base font-medium text-black font-inter"
        >
          Home
        </span>
       {(window.location.href == "http://127.0.0.1:5173/" || window.location.href ==  "https://virtual-trading.netlify.app/") && <Link
          to="start-challenge"
          spy={true}
          smooth={true}
          offset={100}
          duration={500}
         
        >
          <span className="cursor-pointer font-base font-medium text-black font-inter">
            Models
          </span>
        </Link>}
        <span
          onClick={() => {
            navigate("/faqs");
          }}
          className="cursor-pointer font-base font-medium text-black font-inter"
        >
          FAQ
        </span>
        <div
          onClick={() => {
            setOpenOptions(!openOptions);
          }}
          className=" cursor-pointer flex gap-5 items-center"
        >
          <span className="text-base font-medium text-black font-inter">
            More
          </span>
          <IoIosArrowDown />
        </div>
        {openOptions && (
          <ul
            className={`${
              Isauth ? "top-16 right-60 " : "top-16 right-20"
            }flex z-50 flex-col w-fit h-fit gap-2 absolute `}
          >
            <Link
              to="about-us"
              spy={true}
              smooth={true}
              offset={80}
              duration={500}
            >
              {(window.location.href == "http://127.0.0.1:5173/" || window.location.href ==  "https://virtual-trading.netlify.app/") && <li className=" text-black font-medium font-inter cursor-pointer font-base bg-white rounded-md flex items-center justify-center drop-shadow-lg py-2 px-20">
                About Us
              </li>}
            </Link>
            <li className=" text-black font-medium font-inter cursor-pointer font-base bg-white rounded-md flex items-center justify-center drop-shadow-lg py-2 px-20">
              Hall of Fame
            </li>
          </ul>
        )}
        {Isauth ? (
          <>
            <span
              onClick={() => {
                navigate("/account-overview");
              }}
              className="cursor-pointer font-base font-medium text-black font-inter"
            >
              Dashboard
            </span>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="py-2 px-8 bg-purple1 rounded-4xl text-white text-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="py-2 px-8 bg-purple1 rounded-4xl text-white text-lg"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
