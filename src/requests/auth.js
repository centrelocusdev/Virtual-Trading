const Backend_URL = "https://trade.thedelvierypointe.com";
import axios from "axios";

async function registration(formData) {
  try {
    if(formData.password != formData.confirm_password){
        return {status: "error", message: "Password mismatch!"};
      }
    // console.log("in the request reg1", formData);
    const res = await axios.post(`${Backend_URL}/api/register/`, formData);
    // console.log("in the request reg1", res);
    if(res && res.data && res.data.detail){
        return {status: "success", message: res.data.detail};
    }
    return res;
  } catch (err) {
    console.log("Error", err.message);
    return {status: "error", message: "Something went wrong!"};
  }
}
async function registrationOtpVerification(formData) {
    try {
      // console.log("in the request reg2", formData);
      const res = await axios.post(`${Backend_URL}/api/register/otp/`, formData);
      // console.log("in the request reg2", res);
      if(res && res.statusText === 'Created'){
        localStorage.setItem("token_access" , res.data.access);
        localStorage.setItem("token_refresh" , res.data.refresh);
        return {status: "success", message: "Signup successful!"};
      }
    } catch (err) {
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }
  async function login(formData) {
    try {
      // console.log("in login req", formData);
      const res = await axios.post(`${Backend_URL}/api/login/`, formData);
      console.log("in login req", res);
      if(res && res.statusText === 'OK'){
        localStorage.setItem("token_access" , res.data.access);
        localStorage.setItem("token_refresh" , res.data.refresh);
          return {status: "success", message: "Login Successful!"};
      }
      return res;
    } catch (err) {
      console.log("Error", err);
      return {status: "error", message: "Something went wrong!"};
    }
  }

  async function logout() {
    try {
      // console.log("in login req", formData);
      const res = await axios.post(`${Backend_URL}/api/logout/` , 
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
      );
      console.log("logout" , res);
      
      if(res && res.status === 205){
        localStorage.setItem("token_access" , "");
        localStorage.setItem("token_refresh" , "");
          return {status: "success", message: "Logout Successful!"};
      }
      
    } catch (err) {
      console.log("Error", err);
      return {status: "error", message: "Something went wrong!"};
    }
  }


  async function forgotPassword(email) {
    try {
      // console.log("in login req", formData);
      const res = await axios.post(`${Backend_URL}/api/password_reset/`, {
        "email" : email
      });
      if(res && res.data && res.data.status && res.data.status === 'OK'){
        return {status: "success"};
      }else{
        return {status: "error"};
      }
    } catch (err) {
      console.log("Error", err);
      return {status: "error", message: "Something went wrong!"};
    }
  }
  async function resetPassword(newPassword, token) {
    try {
      // console.log("in login req", formData);
      const res = await axios.post(`${Backend_URL}/api/password_reset/confirm/`, {
        "password": newPassword,
        "token": token
      });
      if(res && res.data && res.data.status && res.data.status === 'OK'){
        return {status: "success"};
      }else{
        return {status: "error"};
      }
    } catch (err) {
      console.log("Error", err);
      return {status: "error", message: "Something went wrong!"};
    }
  }
  async function getRegistrationPurchasePlanDetails (){
    try{
      const res = await axios.get(`${Backend_URL}/api/plans/`);
      return res;
    }catch(err){
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }

  async function getCouponData (){
    try{
      const coupons = await axios.get(`${Backend_URL}/api/coupons/`);
      return coupons.data;
    }catch(err){
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }
  
  async function resetAccount(formData) {
    try {
      const res = await axios.post(`${Backend_URL}/api/reset-account/`, formData);
      console.log("in the reset account", res);
      if(res && res.data){
          return {status: "success", data: res.data};
      }
    } catch (err) {
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }

  async function subscribe(email) {
    try {
      console.log(email);
      const res = await axios.post(`${Backend_URL}/api/subscribe/`, {email} ,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        },
      }
      );
      console.log("in the subscribe api", res);
      if(res && res.data){
          return {status: "success", data: res.data};
      }
    } catch (err) {
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }

export const auth = { 
  registration ,
   registrationOtpVerification ,
    login ,
     getRegistrationPurchasePlanDetails,
     getCouponData,
     forgotPassword,
     resetPassword,
     logout,
     resetAccount,
     subscribe
    
    };
