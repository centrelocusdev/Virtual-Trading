import Sidebar2 from "../components/sidebar2"
import UserNav from "../components/user-nav"
import Education_Card from "../components/education-card"
import { useState, useEffect } from "react"
const Education_Blog = () => {
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
    <div className="w-screen min-h-screen h-fit py-5 esm:pl-2 esm:pr-2 md:pl-5 md:pr-9 bg-gradient-to-r from-bg_Medium to-blue8 flex gap-x-6">
    {screenWidth>1024 ? <Sidebar2 active={"educational-blogs"}/>: ""}
    <div className="esm:w-full lg:w-4/5">
    <UserNav sidebarType={"sidebar2"} title={"Educational Blogs"} active={"educational-blogs"}/>
    <div className="w-full flex flex-wrap esm:justify-center md:justify-start esm:gap-x-10 2xl:gap-x-20 gap-y-12 h-fit md:p-2.5 mt-7">
        <Education_Card/>
        <Education_Card/>
        <Education_Card/>
        <Education_Card/>
    </div>
    </div>
</div>
  )
}

export default Education_Blog