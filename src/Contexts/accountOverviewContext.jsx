import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { userDashboardData } from "../requests/user-dashbaord";

const AccountOverviewContext = createContext();

function AccountOverviewReducer(state, action) {
  switch (action.type) {
    case "SETUSERDATA":
      return { ...state, userData: action.payload };
    case "SETISLOADING":
      return { ...state, isLoading: action.payload };
    case "SETNEWSLOADING":
      return { ...state, isNewsLoading: action.payload };
    case "SETISERROR":
      return { ...state, isError: action.payload };
    case "SETNEWSDATA":
      return { ...state, news: action.payload };
  }
}

function AccountOverviewProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token_access"));

  const initialState = {
    userData: {},
    isLoading: false,
    isError: false,
    news: [],
    isNewsLoading: false,
  };
  const [ AccountOverviewState, dispatch ] = useReducer(
    AccountOverviewReducer,
    initialState
  );

  // for news
  useEffect(() => {
    async function fetchNewsData() {
      try {
        dispatch({ type: "SETNEWSLOADING", payload: true });
        const res = await userDashboardData.newsData();
        if (res.status === "success") {
          console.log("new res", res.data);
          let data = res.data.slice(0, 3);
          dispatch({ type: "SETNEWSDATA", payload: data });
        }
        dispatch({ type: "SETNEWSLOADING", payload: false });
      } catch (err) {
        dispatch({ type: "SETNEWSLOADING", payload: false });
        dispatch({ type: "SETISERROR", payload: true });
      }
    }
    fetchNewsData();
  }, []);

  async function fetchUserDetails() {
    try {
      dispatch({ type: "SETISLOADING", payload: true });
      const res = await userDashboardData.userData();
      if (res.status === "success") {
        console.log("dashboard data", res.data);
        dispatch({ type: "SETUSERDATA", payload: res.data });
      }
      dispatch({ type: "SETISLOADING", payload: false });
    } catch (err) {
      dispatch({ type: "SETISLOADING", payload: false });
      dispatch({ type: "SETISERROR", payload: true });
    }
  }
  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  return (
    <AccountOverviewContext.Provider value={{AccountOverviewState , fetchUserDetails }}>
      {children}
    </AccountOverviewContext.Provider>
  );
}

function useAccountOverview() {
  const context = useContext(AccountOverviewContext);
  if (context === undefined)
    throw new Error(
      "Using Account Overview Context outside of the Account Overview Provider."
    );
  return context;
}

export { useAccountOverview, AccountOverviewProvider };
