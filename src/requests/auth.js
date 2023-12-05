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
      // console.log("in login req", res);
      if(res && res.statusText === 'OK'){
        localStorage.setItem("token_access" , res.data.access);
        localStorage.setItem("token_refresh" , res.data.refresh);
          return {status: "success", message: "Login Successful!"};
      }
      return res;
    } catch (err) {
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }
  async function getRegistrationPurchasePlanDetails (){
    try{
      const res = await axios.get(`${Backend_URL}/api/plans/`);
      // console.log(res);
      return res;
    }catch(err){
      console.log("Error", err.message);
      return {status: "error", message: "Something went wrong!"};
    }
  }
  

export const auth = { registration , registrationOtpVerification , login , getRegistrationPurchasePlanDetails};
