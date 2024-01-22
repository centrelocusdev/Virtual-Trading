import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Kyc_ from "./pages/Kyc_";
import Registration from "./pages/Registration";
import Plan_Purchase from "./pages/Plan_Purchase";
import R_Payment from "./pages/R_Payment";
import Payment_Confirmation from "./pages/Payment_Confirmation";
import UserDashboard from "./pages/UserDashboard";
import Account_Overview from "./pages/Account_Overview";
import TradingOverview from "./pages/Trading-Overview";
import Education_Blog from "./pages/Education_Blog";
import Education_Blog_Details from "./pages/Education_Blog_Details";
// import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import { Route, Routes } from "react-router-dom";

function App() {
  return (
   <>
    <Routes>
      {/* <Route path="/landing" element={<Landing />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/kyc" element={<Kyc_ />} />
      <Route path="/plan" element={<Plan_Purchase/>}/>
      <Route path="/" element={<Landing/>} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/payment" element={<R_Payment />} />
      <Route path="/confirmation" element={<Payment_Confirmation />} />
      <Route path="/user-dashboard" element={<UserDashboard/>}/>
      <Route path="/account-overview" element={<Account_Overview/>}/>
      <Route path="/trading-overview" element={<TradingOverview/>}/>
      <Route path="/educational-blogs" element={<Education_Blog/>}/>
      <Route path="/blog_details" element={<Education_Blog_Details/>}/>
    </Routes>
    <ToastContainer /></>

  );
}

export default App;
