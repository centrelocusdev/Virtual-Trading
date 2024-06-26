// import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
// import newsUser from '/news-user.svg';
// import newsNews from '/news-news.png';
import ClipLoader from "react-spinners/ClipLoader";
import Error from "../components/error";
import { userDashboardData } from "../requests/user-dashbaord";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";

const News_Calender = () => {
  const [screenWidth, setScreenWidth] = useState("");
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [dateState, setDateState] = useState(new Date());

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
    async function fetchNewsData() {
      try {
        setIsLoading(true);
        const res = await userDashboardData.newsData();
        if (res.status === "success") {
          setIsLoading(false);

          const selectedDate = new Date(dateState);
          selectedDate.setHours(0, 0, 0, 0);

          const newRes = res.data.filter((item) => {
            const date = new Date(item.created_at);
            date.setHours(0, 0, 0, 0);
            console.log("date", date);
            return date.getTime() === selectedDate.getTime();
          });
          console.log("new res", newRes);
          setNews(newRes);
        }
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchNewsData();
  }, [dateState]);
  if (isLoading && !isError) {
    return (
      <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-green2 flex gap-x-6">
        {screenWidth > 1023 ? <Sidebar2 active={"news-calender"} /> : ""}
        <div className="esm:w-full lg:w-4/5">
          <UserNav
            sidebarType={"sidebar2"}
            active={"news-calender"}
            title={"News Calender"}
          />
          <div className="w-full h-fit flex gap-x-2.5 mt-7">
            <div className="w-4/6">
              <div className="w-full min-h-h-150 rounded-2xl.1 bg-white py-1 px-5 flex items-center justify-center">
                <ClipLoader size={20} color="#683AB5" />
              </div>
            </div>
            <div className="w-2/6">
              <Calendar
                onChange={(e) => {
                  setDateState(e);
                }}
                value={dateState}
              />
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isError && !isLoading) {
    return (
      <Error
        title={"News Calender"}
        active={"news-calender"}
        sidebarType={"sidebar2"}
        content= {"Oops! Something went wrong. Try Again!"}
      />
    );
  }
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"news-calender"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          sidebarType={"sidebar2"}
          active={"news-calender"}
          title={"News Calender"}
        />
        <div className="w-full h-fit flex esm:flex-col md:flex-row gap-10 mt-7">
        <div className=" esm:flex md:hidden esm:w-full md:w-2/6 flex items-center flex-col">
            <Calendar
              onChange={(e) => {
                setDateState(e);
              }}
              value={dateState}
            />
            <div />
          </div>
          <div className="esm:w-full md:w-4/6 flex flex-col gap-y-9">
            {news && news.length > 0 ? (
              news.map((item) => {
                return (
                  <div
                    onClick={() => {
                      navigate("/news-calender-details", {
                        state: { data: item },
                      });
                    }}
                    key={item.id}
                    className="esm:flex-col esm:gap-10 sm:gap-0 sm:flex-row esm:items-center sm:items-start cursor-pointer w-full min-h-h-150 rounded-2xl.1 bg-white esm:py-5 sm:py-1 px-5 flex "
                  >
                    <img
                      className="esm:w-16 sm:w-8 esm:h-16 sm:h-8 esm:m-auto sm:mr-7 self-start mt-10"
                      src={`https://trade.thedelvierypointe.com${item.user_profile_picture}`}
                      alt="user"
                    />
                    <div className="flex flex-col esm:items-center sm:items-start mr-2.5 mt-10">
                      <div className="flex esm:flex-col sm:flex-row esm:items-center  sm:justify-between">
                        <span className="font-inter text-sm font-bold text-gray13 mr-4">
                          {item.user_full_name}
                        </span>
                        <span className="font-inter text-sm font-normal text-gray13">
                          {moment(item.created_at).format("DD-MMM-YYYY")}
                        </span>
                      </div>
                      <p className="font-inter text-base font-bold text-gray13 esm:text-center sm:text-start">
                        {item.title}
                      </p>
                      <p className="font-inter text-sm font-normal text-gray13 esm:text-center sm:text-start">
                        {`${item.content.slice(0, 200)}...`}
                      </p>
                    </div>
                    <img
                      className="w-40  h-40 self-center"
                      src={`${item.images}`}
                      alt="news"
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-2xl font-poppins font-bold text-red2 text-center mt-40">
                No News Today!
              </p>
            )}
          </div>
          <div className=" esm:hidden md:block esm:w-full md:w-2/6 flex items-center flex-col">
            <Calendar
              onChange={(e) => {
                setDateState(e);
              }}
              value={dateState}
            />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News_Calender;
