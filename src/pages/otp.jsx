import { useState } from "react";
import { auth } from "../requests/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: location.state.email,
    otp: ""
  });

  async function onChangeHandler(e) {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }
  async function onSubmitHandler(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await auth.registrationOtpVerification(formData);
      if (res && res.status === 'success') {
        console.log("in the otp", res);
        setLoading(false);
        toast.success(res.message);
        setTimeout(() => {
          navigate("/purchase");
        }, 2000);
      }else if(res && res.status === "error"){
        console.log("in the otp", res);
        toast.error(res.message);
      } 
      setLoading(false);
    } catch (err) {
      console.log("Error", err.message);
    }
  }

    return (
        <div className="flex min-h-screen justify-center items-center w-screen h-fit px-18 py-20 relative bg-bg_Light flex-col">
          <p className="text-font_blue1 text-4xl  font-bold text-center font-sans mb-5">
            {" "}
            OTP Verification
          </p>
          <div className="w-1/3 h-fit justify-center items-center">
            <form onSubmit={onSubmitHandler} className="flex flex-col w-full h-fit">
              {/* <div className="flex flex-col mb-5">
                <label className="text-lg font-bold text-gray1" htmlFor="email">
                  Email
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-base text-gray3"
                  value={formData.email}
                  onChange={onChangeHandler}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div> */}
              <div className="flex flex-col">
                <label className="text-lg font-bold text-gray1" htmlFor="otp">
                  OTP
                </label>
                <input
                  className="rounded-4xl pt-4 pr-8 pb-4 pl-4 text-base text-gray3"
                  value={formData.otp}
                  onChange={onChangeHandler}
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <button className="px-11 py-4 bg-font_blue1 text-white rounded-md w-1/2 mt-10 self-center">
              {loading ? (
                <div className="flex justify-center items-center gap-5 m-0 text-base">
                  Loading...
                  <ClipLoader size={20} color="#0F4C81" />
                </div>
              ) : (
                "Submit"
              )}
              </button>
            </form>
          </div>
        </div>
      );
}

export default Otp