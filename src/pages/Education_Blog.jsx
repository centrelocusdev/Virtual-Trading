import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import Education_Card from "../components/education-card";
import { useState, useEffect } from "react";
import { userDashbaordData } from "../requests/user-dashbaord";
const Education_Blog = () => {
  const [screenWidth, setScreenWidth] = useState("");
  const [blogs, setBlogs] = useState([]);

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

  async function fetchEducationalBlogs() {
    try {
      const data = await userDashbaordData.getEducationalBlogs();
      console.log(data);
      if (data.status === "success" && data && data.data) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchEducationalBlogs();
  }, []);
  return (
    <div className="w-screen min-h-screen h-fit py-5 esm:pl-2 esm:pr-2 md:pl-5 md:pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"educational-blogs"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          title={"Educational Blogs"}
          sidebarType={"sidebar2"}
          active={"educational-blogs"}
        />
        <div className="w-full flex flex-wrap esm:justify-center md:justify-start esm:gap-x-10 2xl:gap-x-20 gap-y-12 h-fit md:p-2.5 mt-7">
          {blogs &&
            blogs.length > 0 &&
            blogs.map((item) => {
              return <Education_Card data={item} blogs={blogs}  key={item.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Education_Blog;
