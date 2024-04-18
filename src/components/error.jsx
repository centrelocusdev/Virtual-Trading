import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import { useState, useEffect } from "react";
import { MdError } from "react-icons/md";
const Error = ({active, sidebarType, title, content}) => {
  const [screenWidth, setScreenWidth] = useState("");
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 esm:px-5 lg:px-0 lg:pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={active} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          sidebarType={sidebarType}
          active={active}
          title={title}
        />
         <div className="w-3/5 m-auto justify-center  flex mt-52  items-center flex-col">
         <MdError size={100} color="#D34645" />
          <p className="text-3xl text-red2 text-center">{content}</p></div>
      </div>
     
    </div>
  );
};

export default Error;
