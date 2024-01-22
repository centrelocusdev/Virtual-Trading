import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import Education_Card from "../components/education-card";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import heart from "/edu_heart_black.svg";
import share from "/education_share.svg";
import time from "/edu-time.svg";
import userPic from "/edu-user.png";
import verificationtick from "/edu_verification_green.svg";

const Education_Blog_Details = () => {
  const [screenWidth, setScreenWidth] = useState("");

  const location = useLocation();
  console.log(location.state);
  const blogs = location.state.blogs;
  const data = location.state.data;
  const date =new Date(data.created_at).toLocaleDateString();
  const filteredData = data.content.split("/");
  console.log("hey", filteredData);

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
    <div className="w-screen min-h-screen h-fit py-5 esm:pl-2 esm:pr-2 md:pl-5 md:pr-9 bg-green2 flex gap-x-6">
      {screenWidth >= 1024 ? <Sidebar2 active={"educational-blogs"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          sidebarType={"sidebar2"}
          title={"Educational Blogs"}
          active={"educational-blogs"}
        />
        <div className="w-full flex esm:flex-col md:flex-row h-fit min-h-screen py-7 gap-x-10 ">
          <div className="w-5/7 p-7 flex flex-col gap-y-7  text-black font-poppins text-xl.1 font-semibold">
            <div className="flex justify-between">
              <div>{data.title}</div>
              <div className="flex gap-2">
                <div className="h-12 w-12 flex justify-center items-center rounded-2xl.1 border border-solid border-font_blue1">
                  <img className="h-6 w-6" src={share} alt="heart" />
                </div>
                <div className="h-12 w-12 flex justify-center items-center rounded-2xl.1 border border-solid border-font_blue1">
                  <img className="h-6 w-6" src={heart} alt="heart" />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex gap-5 w-full">
                <div className="flex items-center gap-2">
                  <img className="h-12 w-12" src={userPic} alt="profile" />
                  <p className="esm:text-xl lg:text-sm font-poppins text-black">
                    SoulCurry
                  </p>
                  <img
                    className="h-4 w-4"
                    src={verificationtick}
                    alt="verification_tick"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <img className="w-4 h-4" src={time} alt="time" />
                  <p className="esm:text-xl lg:text-sm font-poppins font-semibold">
                    {date}
                  </p>
                </div>
              </div>
            </div>
            <img className="h-h-30 rounded-2xl.2 w-full" src={`https://trade.thedelvierypointe.com${data.images}`} alt="blog_image"/>
            <div>
              {filteredData &&
                filteredData.length > 0 &&
                filteredData.map((item) => {
                  return (
                    <p
                      key={item}
                      className="font-poppins text-black font-normal text-base mb-5"
                    >
                      {item}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="w-3/7 esm:hidden md:flex flex-col gap-x-8 gap-y-8">
            {blogs &&
              blogs.length > 0 &&
              blogs.map((item) => {
                return <Education_Card data={item} key={item.id} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education_Blog_Details;
