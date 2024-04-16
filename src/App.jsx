// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
import Trading_Platform from "./pages/Trading_Platform";
// import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trading_Platform_Detail from "./pages/Trading_Platform_Detail";
import News_Calender from "./pages/News_Calender";
import News_Calender_Details from "./pages/News_Calender_Details";
import { Provider } from "react-redux";
import store from "./store/store";
import ResetPlanPurchase from "./pages/reset-plan-purchase";
import ResetPlanPurchase2 from "./pages/reset-plan-purchase2";
// import PrivateRoute from "./PrivateRoute";
import { Outlet, Navigate } from "react-router-dom";
import Leadboard from "./pages/leadboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Settings from "./pages/setting";
import Certificates from "./pages/certificates";
import Hall_of_fame from "./pages/hall_of_fame";
import { TradingOverviewProvider } from "./Contexts/tradingOverviewContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
import { Route, Routes } from "react-router-dom";
import Faqs from "./pages/faq";

function useAuth() {
  let auth = localStorage.getItem("token_access");
  console.log(auth);
  const isAuthenticated = auth !== null && auth !== "undefined" && auth !== "";
  return isAuthenticated;
}

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
function App() {
  return (
    <>
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <TradingOverviewProvider>
            <Routes>
              {/* <Route path="/landing" element={<Landing />} /> */}
              <Route element={<PrivateOutlet />}>
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route
                  path="/account-overview"
                  element={<Account_Overview />}
                />
                <Route path="/trading-overview" element={<TradingOverview />} />
                <Route
                  path="/trading-platform"
                  element={<Trading_Platform />}
                />
                <Route
                  path="/trading-platform-detail"
                  element={<Trading_Platform_Detail />}
                />
                <Route
                  path="/reset-plan-purchase"
                  element={<ResetPlanPurchase />}
                />
                <Route
                  path="/reset-plan-purchase2"
                  element={<ResetPlanPurchase2 />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/leaderboard" element={<Leadboard />} />
                <Route path="/certificates" element={<Certificates />} />
              </Route>
              {/* <PrivateRoute path="/user-dashboard" element={<UserDashboard/>} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/hall-of-fame" element={<Hall_of_fame />} />
              <Route path="/kyc" element={<Kyc_ />} />
              <Route path="/plan" element={<Plan_Purchase />} />
              <Route path="/" element={<Landing />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/payment" element={<R_Payment />} />
              <Route path="/confirmation" element={<Payment_Confirmation />} />
              {/* <Route path="/user-dashboard" element={<UserDashboard/>}/> */}
              <Route path="/educational-blogs" element={<Education_Blog />} />
              <Route
                path="/blog_details"
                element={<Education_Blog_Details />}
              />
              <Route path="/news-calender" element={<News_Calender />} />
              <Route
                path="/news-calender-details"
                element={<News_Calender_Details />}
              />
              <Route path="/faqs" element={<Faqs />} />
            </Routes>
            </TradingOverviewProvider>
            <ToastContainer />
          </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
