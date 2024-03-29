// import heart from "/edu-heart.svg";
import time from "/edu-time.svg";
import verificationtick from "/edu_verification_green.svg";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { userDashboardData } from "../requests/user-dashbaord";
import { useLocation } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const Education_Card = ({ data, blogs }) => {
  const location = useLocation();
  const url = location.pathname;
  const queryClient = useQueryClient();

  const {
    images,
    title,
    user_full_name,
    user_profile_picture,
    created_at,
    user_has_liked,
    likes_count,
    id,
  } = data;
  const date = new Date(created_at).toLocaleDateString();

  const { mutate: handleLikeBlog } = useMutation({
    mutationFn: userDashboardData.likeBlog,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  const { mutate: handleUnlikeBlog } = useMutation({
    mutationFn: userDashboardData.unLikeBlog,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  const navigate = useNavigate();

  // async function handleLikeBlog() {
  //   try {
  //     const res = await userDashboardData.likeBlog(id);
  //     console.log("ui like blog", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // async function handleUnlikeBlog() {
  //   try {
  //     const res = await userDashboardData.unLikeBlog(id);
  //     console.log("ui unlike blog", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return (
    <div className="max-w-306 esm:w-270 xl:w-260 2xl:w-306 h-24h bg-white justify-around rounded-2xl.2 py-3.5 esm:px-10 xl:px-6 flex flex-col gap-y-5">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <img
            className="h-8 w-8"
            src={`https://trade.thedelvierypointe.com${user_profile_picture}`}
            alt="profile"
          />
          <p className="esm:text-xl lg:text-sm font-poppins text-black">
            {user_full_name}
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
      <img className="w-full h-163 rounded-2xl.2" src={images} alt="blog" />

      <p className="font-semibold font-poppins esm:text-xl xl:text-base text-black">
        {title}
      </p>
      <div className="w-full flex justify-between">
        {url === "/educational-blogs" ? (
          <div className="h-12 w-12 flex justify-center items-center rounded-2xl.1 border border-solid border-purple1">
            {user_has_liked ? (
            <FaHeart
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleUnlikeBlog(id);
              }}
              size={20}
              color="#f02849"
            />
            ) : (
            <FaRegHeart
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleLikeBlog(id);
              }}
              size={20}
              color="#683AB5"
            />
            )}
          </div>
        ): <p>{likes_count} {likes_count <= 1 ? "like" : "likes"}</p>}

        <button
          onClick={() => {
            navigate("/blog_details", { state: { blogs: blogs, data: data } });
          }}
          className="rounded-2xl.2 bg-purple1 text-white py-2 esm:px-11 xl:px-8 2xl:px-11 flex items-center justify-center esm:text-2xl lg:text-lg xl:text-base 2xl:text-lg font-inter"
        >
          Read More
        </button>
      </div>
      {url === '/educational-blogs' && <p className="esm:text-xl lg:text-lg font-poppins text-black">
        {likes_count} {likes_count <= 1 ? "like" : "likes"}
      </p>}
      
    </div>
  );
};

export default Education_Card;
