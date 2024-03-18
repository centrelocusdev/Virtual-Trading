import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
// import Education_Card from "../components/education-card";
import { useState, useEffect } from "react";
import { userDashboardData } from "../requests/user-dashbaord";
import { ClipLoader } from "react-spinners";
import first from "/1st.png";
import second from "/2nd.png";
import third from "/3rd.png";
import trophy from "/trophy.png";
// import { useQuery } from "@tanstack/react-query";

const Leadboard = () => {
  const [screenWidth, setScreenWidth] = useState("");
  const [topUsers, setTopUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const defaultImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC";

  // const [blogs, setBlogs] = useState([]);

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

  useEffect(() => {
    async function fetchLeaerboardData() {
      setIsLoading(true);
      try {
        const res = await userDashboardData.leaderboardData();
        if (res.status === "success") {
          console.log(res.data);
          setTopUsers(res.data.leaderboard);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchLeaerboardData();
  }, []);

  return (
    <div className="w-screen min-h-screen h-fit py-5 esm:pl-2 esm:pr-2 md:pl-5 md:pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"leaderboard"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          title={"Leaderboard"}
          sidebarType={"sidebar2"}
          active={"leaderboard"}
        />
        <div className="w-full flex flex-col esm:items-center md:items-start esm:justify-center md:justify-start esm:gap-x-10 2xl:gap-x-20 gap-y-12 h-fit md:p-2.5 mt-7">
          <p className="text-3xl text-purple1 font-lato font-extrabold esm:text-center md:text-start ">
            Top Performers of the Week
          </p>
          <div className="flex flex-wrap esm:w-full esm:justify-center lg:w-5/6 md:justify-start gap-10">
            <div className="w-w-35 max-w-260 rounded-2xl  bg-white flex flex-col items-center justify-between pt-10 gap-8">
              <div className="flex flex-col items-center">
                <img className="h-5 w-8" src={second} alt="second" />
                {isLoading ?
                 <img
                 className="rounded-full h-16 w-16"
                 src={defaultImage}
                 alt="user"
               />
                :
                <img
                className="rounded-full h-16 w-16"
                src={`https://trade.thedelvierypointe.com${topUsers[1].profile_picture}`}
                alt="user"
              />
                }
               
              </div>
              {isLoading ? (
                <ClipLoader size={20} color="#683AB5" />
              ) : (
                <>
                  <p className="text-base font-semibold">
                    {topUsers.length > 0 && topUsers[1].first_name}
                  </p>
                  <div className="flex  items-center gap-5 justify-center border bg-blue5 border-solid border-yellow3 w-full rounded-2xl">
                    <img className="h-11 w-11" src={trophy} alt="trophy" />
                    <p className="text-xl font-semibold font-poppins ">
                      Rs. {topUsers.length > 0 && topUsers[1].overall_profit}
                    </p>
                    <p className="text-sm font-inter">Profit</p>
                  </div>
                </>
              )}
            </div>
            <div className="w-w-35 max-w-260 rounded-2xl  bg-white flex flex-col items-center justify-between pt-10 gap-8">
              <div className="flex flex-col items-center">
                <img className="h-5 w-8" src={first} alt="first" />
                {isLoading?
                 <img
                 className="rounded-full h-16 w-16"
                 src={defaultImage}
                 alt="user"
               />
                :
                <img
                className="rounded-full h-16 w-16"
                src={`https://trade.thedelvierypointe.com${topUsers[0].profile_picture}`}
                alt="user"
              />
                }
              </div>
              {isLoading ? (
                <ClipLoader size={20} color="#683AB5" />
              ) : (
                <>
                  <p className="text-base font-semibold">
                    {topUsers.length > 0 && topUsers[0].first_name}
                  </p>
                  <div className="flex  items-center gap-5 justify-center border bg-blue5 border-solid border-yellow3 w-full rounded-2xl">
                    <img className="h-11 w-11" src={trophy} alt="trophy" />
                    <p className="text-xl font-semibold font-poppins ">
                      Rs. {topUsers.length > 0 && topUsers[0].overall_profit}
                    </p>
                    <p className="text-sm font-inter">Profit</p>
                  </div>
                </>
              )}
            </div>
            <div className="w-w-35 max-w-260 rounded-2xl  bg-white flex flex-col items-center justify-between pt-10 gap-8">
              <div className="flex flex-col items-center">
                <img className="h-5 w-8" src={third} alt="third" />
                {isLoading?
                 <img
                 className="rounded-full h-16 w-16"
                 src={defaultImage}
                 alt="user"
               />
                :
                <img
                className="rounded-full h-16 w-16"
                src={`https://trade.thedelvierypointe.com${topUsers[2].profile_picture}`}
                alt="user"
              />
                }
              </div>{" "}
              {isLoading ? (
                <ClipLoader size={20} color="#683AB5" />
              ) : (
                <>
                  <p className="text-base font-semibold">
                    {topUsers.length > 0 && topUsers[2].first_name}
                  </p>
                  <div className="flex items-center gap-5 justify-center border bg-blue5 border-solid border-yellow3 w-full rounded-2xl">
                    <img className="h-11 w-11" src={trophy} alt="trophy" />
                    <p className="text-xl font-semibold font-poppins ">
                      Rs. {topUsers.length > 0 && topUsers[2].overall_profit}
                    </p>
                    <p className="text-sm font-inter">Profit</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="text-3xl esm:text-center md:text-start text-purple1 font-lato font-extrabold mt-2">
            Leadboard
          </p>
          <table className="w-full esm:items-center md:items-start flex flex-col  gap-5">
            <tr className="w-5/6 flex ">
              <th className="text-xl text-start w-1/3 ">Rank</th>
              <th className="text-xl text-start w-1/3 ">Name</th>
              <th className="text-xl text-start w-1/3 ">Profit</th>
            </tr>
            {isLoading ? (
              <ClipLoader size={20} color="#683AB5" />
            ) : (
              topUsers &&
              topUsers.length > 0 &&
              topUsers.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white shadow-box w-5/6 flex rounded-md "
                  >
                    <td className="text-base py-2 px-2 w-1/3 text-start">
                      {index + 1}
                    </td>
                    <td className="text-base py-2 px-2 w-1/3 text-start">
                      {item.first_name}
                    </td>
                    <td className="text-base py-2 px-2 w-1/3 text-start">
                      {item.overall_profit}
                    </td>
                  </tr>
                );
              })
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leadboard;
