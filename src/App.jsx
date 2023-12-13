import "./App.css";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Kyc_ from "./pages/Kyc_";
import Registration from "./pages/Registration";
import Plan_Purchase from "./pages/Plan_Purchase";
import R_Payment from "./pages/R_Payment";
import Payment_Confirmation from "./pages/Payment_Confirmation";
import Otp from "./pages/otp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { Route, Routes } from "react-router-dom";

function App() {
  return (
   <>
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/kyc" element={<Kyc_ />} />
      <Route path="/" element={<Plan_Purchase />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/payment" element={<R_Payment />} />
      <Route path="/confirmation" element={<Payment_Confirmation />} />
      <Route path="/otp" element={<Otp />} />
    </Routes>
    <ToastContainer /></>

  );
}

export default App;
