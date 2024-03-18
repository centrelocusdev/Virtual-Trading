import Sidebar2 from "../components/sidebar2";
import UserNav from "../components/user-nav";
import { useState, useEffect, useReducer, useRef } from "react";
import { userDashboardData } from "../requests/user-dashbaord";
import { ClipLoader } from "react-spinners";
import { country } from "../data/country";
import { countryCodes } from "../data/countryCode";
import { Switch } from "@chakra-ui/react";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js/mobile";
import { toast } from "react-toastify";
// import logo from "/logo.jpg";
import {FcEditImage} from 'react-icons/fc';

function reducer(state, action) {
  switch (action.type) {
    case "updatePasswordStatus":
      return { ...state, password: action.payload };
    case "updatePhoneStatus":
      return { ...state, phone: action.payload };
    case "updateEmailStatus":
      return { ...state, email: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}

const Settings = () => {
  const initialState = {
    phone: "",
    password: "",
    email: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingLoading, setIsUploadingLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [screenWidth, setScreenWidth] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");
  const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC";
  const [isImagePreset, setIsImagePreset] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    country_code: "",
    country: "",
    email: "",
    phone_number: "",
    emailNotification: false,
    pushNotification: false,
    profile_image: undefined
  });

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

  async function fetchUserDetails() {
    try {
      setIsLoading(true);
      const res = await userDashboardData.userData();
      if (res.status === "success") {
        console.log("bhavya user", res.data);
        

        setFormData({
            first_name: res.data.user.name,
            country_code: res.data.user.country_code,
            country: res.data.user.country,
            email: res.data.user.username,
            phone_number: Number(res.data.user.phone_number),
            emailNotification: res.data.user.emailNotification,
            pushNotification: res.data.user.pushNotification,
            profile_image: res.data.user.profile_picture
        })
        setUserData(res.data.user);
        setIsImagePreset(true);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, [isUploadingLoading]);
  useEffect(() => {
    // console.log("user data", userData);
    console.log("form data" , formData);
  }, [formData]);

  function isValidNumber(mobile_number, code) {
    const phoneNumber = parsePhoneNumber(mobile_number, code);
    if (phoneNumber) {
      console.log(
        phoneNumber.country,
        phoneNumber.number,
        phoneNumber.isPossible(),
        phoneNumber.isValid(),
        // Note: `.getType()` requires `/max` metadata: see below for an explanation.
        phoneNumber.getType()
      );
    }
    const res = isValidPhoneNumber(mobile_number, code);

    console.log(res);
    return res;
  }
  function isValidEmail(email) {
    let regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (email == null) {
      return false;
    }
    console.log(email);
    console.log(regex.test(email));
    if (regex.test(email) == true) {
      return true;
    } else {
      return false;
    }
  }

  async function onChangeHandler(e) {
    if(e.target.type === 'file'){
      setIsImagePreset(false);
      console.log(e.target.type, e.target.files[0] , e.target);
      setSelectedPdf(e.target.files[0].name);
      setFormData(() => ({
        ...formData,
        [e.target.name]: e.target.files[0],
      }));
      return;
  }

    setFormData(() => ({
      ...formData,
      [e.target.name]: (e.target.name === 'pushNotification' || e.target.name === 'emailNotification') ? e.target.checked: e.target.value,
    }));

    if (e.target.name === "email") {
      const isValid = isValidEmail(e.target.value);
      if (isValid === true) {
        dispatch({ type: "updateEmailStatus", payload: "" });
      } else {
        dispatch({ type: "updateEmailStatus", payload: "Invalid Email" });
      }
    }

    if (e.target.name === "phone_number") {
      // const res = isValid_Mobile_Number(e.target.value);
      const numeric_code = formData.country_code;
      console.log(numeric_code);
      const res = countryCodes.filter((item) => {
        return item.numeric === numeric_code;
      });
      console.log(res);
      const alpha = res[0].alpha2;
      const isValid = isValidNumber(e.target.value, alpha);
      if (isValid === false) {
        dispatch({ type: "updatePhoneStatus", payload: "Invalid Number" });
        // console.log(res);
      } else if (isValid === true) {
        dispatch({ type: "updatePhoneStatus", payload: "" });
      }
    }
  }

  async function onSubmitHandler(e) {
    try {
      setIsUploadingLoading(true);
      e.preventDefault();
      if (state.phone === "Invalid Number") {
        toast.error("Add Valid Mobile Number");
        setIsUploadingLoading(false);
        return;
      }

      if (state.email === "Invalid Email") {
        toast.error("Add Valid Email Id");
        setIsUploadingLoading(false);
        return;
      }

      dispatch({ type: "updatePhoneStatus", payload: "" });
      console.log(formData);
     

      const res = await userDashboardData.updateProfile(formData);
      if(res.status === 'success'){
        toast.success("Profile has been updated successfully!");
      }
      setIsUploadingLoading(false);
    } catch (err) {
      console.log("Error", err);
      setIsUploadingLoading(false);
      setIsError(true);

    }
  }

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
      hiddenFileInput.current.click();
  };
  useEffect(() => {
console.log(formData.profile_image, isImagePreset);
  } ,[isImagePreset, formData])

  return (
    <div className="w-screen min-h-screen h-fit py-5 esm:pl-2 esm:pr-2 md:pl-5 md:pr-9 bg-green2 flex gap-x-6">
      {screenWidth > 1023 ? <Sidebar2 active={"settings"} /> : ""}
      <div className="esm:w-full lg:w-4/5">
        <UserNav
          title={"Settings"}
          sidebarType={"sidebar2"}
          active={"settings"}
        />
        <div className="w-full flex-col flex flex-wrap esm:justify-center bg-white rounded-lg py-20 md:justify-start esm:gap-x-10 2xl:gap-x-20 gap-y-12 h-fit md:p-2.5 mt-7">
          <p className="text-purple1 text-center mt-5 font-bold text-2xl">
            Edit
          </p>
          <div className="flex flex-col items-center m-auto gap-2">
                {/* {<img className='w-20 h-20 rounded-full' src={formData.profile_image=== undefined || formData === '' ? defaultImage: (isImagePreset ? formData.profile_image : URL.createObjectURL(formData.profile_image))} alt="profile-img"/>
                } */}
                {isLoading?
                 <img className='w-20 h-20 rounded-full' src={defaultImage}/>
                 :
                 isImagePreset ?
                 <img className='w-20 h-20 rounded-full' src={`https://trade.thedelvierypointe.com${formData.profile_image}`}/> 
                 :
                <img className='w-20 h-20 rounded-full' src={URL.createObjectURL(formData.profile_image)}/>
                 
                 }
                        
                <p>{selectedPdf}</p>
                <FcEditImage className="w-10 h-10" style={{cursor:"pointer"}} onClick={handleClick} size={40}/>
                <input 
                ref={hiddenFileInput} 
                style={{display: "none"}}
                accept='image/'
                id="fileUpload"
                className="custom-file-input"
                name="profile_image" 
                type="file" 
                onChange={onChangeHandler} 
                />
            </div>
          <div className="w-full esm:px-10 md:px-40 gap-y-16">
            <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
              <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label className="text-lg font-bold text-gray1 mb-2">
                  Name
                </label>
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  value={formData.first_name}
                  className="focus:outline-none rounded-4xl bg-green9 pt-1.5 pr-8 pb-1.5 pl-4 text-base font-bold text-gray3"
                  name="first_name"
                  type="text"
                  placeholder="Enter Full name"
                />
              </div>
              <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label
                  className="text-lg font-bold text-gray1 mb-2"
                  htmlFor="phone_number"
                >
                  Phone Number
                </label>
                <div className="flex items-center rounded-l-4xl w-full">
                  <div className="rounded-l-4xl h-full">
                    <select
                      name="country_code"
                      value={formData.country_code}
                      onChange={onChangeHandler}
                      className="font-bold bg-green9 text-gray3 focus:outline-none rounded-l-4xl h-full pt-1.5  pb-1.5 pl-4"
                    >
                      {countryCodes.map((item, i) => {
                        return (
                          <option
                            className="bg-green9"
                            value={item.numeric}
                            key={i}
                          >
                            {item.numeric}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    
                    className="font-bold bg-green9 focus:outline-none w-full rounded-r-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                      value={formData.phone_number}
                      onChange={onChangeHandler}
                    type="number"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
                <p className="text-base text-red-600">{state.phone}</p>

              </div>
            </div>
            <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
              <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label className="text-lg font-bold text-gray1 mb-2">
                  Email Address
                </label>
                <input
                disabled={true}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  value={formData.email}
                  className="focus:outline-none rounded-4xl bg-green9 pt-1.5 pr-8 pb-1.5 pl-4 text-base font-bold text-gray3"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
               <p className="text-base text-red-600">{state.email}</p>

              </div>
              <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label
                  className="text-lg font-bold text-gray1 mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <div className="relative w-full">
                  <select
                    required
                    id="country"
                    name="country"
                      onChange={onChangeHandler}
                    value={formData.country}
                    className="font-bold bg-green9 focus:outline-none w-full appearance-none rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                  >
                    {country.map((item) => {
                      return (
                        <option
                          value={item}
                          className="bg-green9 rounded-4xl pt-1.5 pr-8 pb-1.5 pl-4 text-gray3"
                          key={item}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-8 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-current text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 12.586z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
              <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label className="text-lg font-bold text-gray1 mb-2">
                  City
                </label>
                <input
                  className="focus:outline-none rounded-4xl bg-green9 pt-1.5 pr-8 pb-1.5 pl-4 text-base font-bold text-gray3"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                />
              </div>
              <div className="flex flex-col esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label className="text-lg font-bold text-gray1 mb-2">
                  Postal Code
                </label>
                <input
                  className="focus:outline-none rounded-4xl bg-green9 pt-1.5 pr-8 pb-1.5 pl-4 text-base font-bold text-gray3"
                  name="postal_code"
                  type="number"
                  placeholder="Enter Postal Code "
                />
              </div>
            </div> */}

            <div className="esm:flex-col flex lg:flex-row w-full gap-x-4 mb-4">
              <div className="flex items-center gap-x-5 esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label className="text-lg font-bold text-gray1 mb-2">
                  Push Notifications
                </label>
                <Switch isChecked={formData.pushNotification} onChange={onChangeHandler} name="pushNotification" colorScheme="purple" size="lg" />
              </div>
              <div className="flex items-center gap-x-5 esm:w-full lg:w-1/2 esm:mb-4 lg:mb-0">
                <label className="text-lg font-bold text-gray1 mb-2">
                  Email Notifications
                </label>
                <Switch onChange={onChangeHandler} isChecked={formData.emailNotification} name="emailNotification" colorScheme="purple" size="lg" />
              </div>
            </div>

            <div className="esm:flex-col flex lg:flex-row justify-center w-full gap-x-5 mb-4">
              <button onClick={onSubmitHandler} className="bg-purple1 font-poppins py-1 px-10 text-white rounded-full">
                {isUploadingLoading ? <ClipLoader size={10} color="white"/> : "Save" }
              </button>
              {/* <button className="rounded-full py-1 px-10 border-2 border-2-solid border-purple1 ">
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
