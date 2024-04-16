import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { stockAPI } from "../requests/stock";
import { userDashboardData } from "../requests/user-dashbaord";

const TradingOverviewContext = createContext();

function TradingOverviewReducer(state, action) {
  switch (action.type) {
    case "SETCHARTDATA":
      return { ...state, chartData: action.payload };
    case "SETTRANSACTIONDATA":
      return { ...state, transactions: action.payload };
    case "SETISLOADING":
      return { ...state, isLoading: action.payload };
    case "SETISLOADING2":
      return { ...state, isLoading2: action.payload };
    case "SETISERROR":
      return { ...state, isError: action.payload };
      case "SETPAGES":
      return { ...state, total_pages: action.payload };
      case "SETSELECTEDPAGEBUTTON":
        return { ...state, selectedPageButton: action.payload };
        case "SETTOTALBUTTONS":
        return { ...state, totalButtons: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}

function TradingOverviewProvider({ children }) {
  const [token , setToken] = useState(localStorage.getItem("token_access"));
  const initialState = {
    chartData: {},
    transactions: [],
    total_pages: 1,
    isLoading: false,
    isLoading2: false,
    isError: false,
    selectedPageButton: 1,
    totalButtons: []
  };
  const [tradingOverviewState, dispatch ] = useReducer(
    TradingOverviewReducer,
    initialState,
  );

  async function fetchUserTransactionHistory(page_number) {
    try {
      dispatch({ type: "SETISLOADING2", payload: true });
      const res = await stockAPI.getAllTransactionsOfUser2(page_number);
      if (res.status === "success") {
        console.log("transactions", res.data);
        dispatch({type: "SETPAGES" , payload: res.data[res.data.length-1].total_pages});
        res.data.pop();
        let data = res.data.map((item) => {
          const dateString = item.transaction_date;
          const dateObject = new Date(dateString);

          const year = dateObject.getFullYear();
          const month = dateObject.getMonth() + 1; // Month starts from 0
          const day = dateObject.getDate();
          const hours = dateObject.getHours();
          const minutes = dateObject.getMinutes();
          const seconds = dateObject.getSeconds();

          const formattedDate = `${day}/${month}/${year}  (${hours}:${minutes}:${seconds})`;
          item.transaction_date = formattedDate;
          return item;
        });
        // let final = data.reverse();
        dispatch({ type: "SETTRANSACTIONDATA", payload: data});
        dispatch({ type: "SETISLOADING2", payload: false });
      } else if (res.status === "error") {
          throw new Error("Somehting went wrong");
      }
    } catch (err) {
      console.log("2nd error", err);
      dispatch({ type: "SETISERROR", payload: true });
      dispatch({ type: "SETISLOADING2", payload: false });
    }
  }

  async function fetchUserDetails() {
    try {
      dispatch({ type: "SETISLOADING", payload: true });
      const res = await userDashboardData.userData();
      if (res.status === "success") {
        console.log("p h", res.data.performance_history);
        const ph = res.data.performance_history;
        let data = [];
        let categories = [];
        if (ph.length > 0) {
          for (let i = 0; i < ph.length; i++) {
            data.push(Number(ph[i].value));
            categories.push(ph[i].date);
          }

          let series = [
            {
              name: "Portfolio",
              data: data,
            },
          ];

          let options = {
            chart: {
              width: 1500,
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "Portfolio Analysis",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: categories,
            },
            yaxis: {
              tickAmount: 10,
            },
           
          };
          let finalData = {
            series: series,
            options: options,
          };
          console.log("final data", finalData);
          dispatch({ type: "SETCHARTDATA", payload: finalData });
        }
      }
      dispatch({ type: "SETISLOADING", payload: false });
    } catch (err) {
      dispatch({ type: "SETISLOADING", payload: false });
      dispatch({ type: "SETISERROR", payload: true });
      console.log(err);
    }
  }

  async function fetchTransactionsData(page_number){
      await fetchUserTransactionHistory(page_number);
  }

  function handleSelectedPageButton(page){
    dispatch({type: 'SETSELECTEDPAGEBUTTON' , payload: page})
  }
  function handleTotalButtons(buttons){
    console.log("buttons is ctx" , buttons);
    dispatch({type: 'SETTOTALBUTTONS' , payload: buttons})
  }
  function handlePaginationButtonsArray(){
    let arr = [];
    if (tradingOverviewState.total_pages === 1) {
      arr[0] = 1;
    } else if (tradingOverviewState.total_pages === 2) {
      arr[0] = 1;
      arr[1] = 2;
    } else {
      arr[0] = 1;
      arr[1] = 2;
      arr[2] = 3;
    }
    handleTotalButtons(arr);
  }

  useEffect(() => {
    handlePaginationButtonsArray();
  },[tradingOverviewState.total_pages])
  useEffect(() => {
    console.log("this is token", token);
    if (token) {
      fetchTransactionsData();
    }
  }, [token]);

  useEffect(() => {
    console.log("this is token", token);
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  return (
    <TradingOverviewContext.Provider value={{tradingOverviewState , fetchTransactionsData ,handleSelectedPageButton , handleTotalButtons}}>
      {children}
    </TradingOverviewContext.Provider>
  );
}

function useTradingOverview() {
  const context = useContext(TradingOverviewContext);
  if(context === undefined) throw new Error("Using TradingOverview Context outside of the T O P.")
  return context;
}

export { TradingOverviewContext, TradingOverviewProvider, useTradingOverview };
