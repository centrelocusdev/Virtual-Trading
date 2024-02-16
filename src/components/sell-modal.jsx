import ModalCreate from "/modal-create.png";
import ModalConfirm from "/modal-confirm.png";
import sellTick from '/sell-tick.png';
import { useState } from "react";
// import { useState } from "react";
const SellModal = ({
  closeSellModal,
  quantity,
  changeQuantity,
  livePrice,
  isSellDone,
  stockTransaction,
  changeSellLimit,
  sellLimit,
  sellLimitError
}) => {
  const [transactionType, setTransactionType] = useState('market');

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  let date = formatDate(new Date());
  return (
    <div
      className={`flex top-0 w-screen z-200 min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur  justify-center items-center fixed`}
    >
      <div className={`w-1/2 h-fit bg-white flex flex-col mx-auto`}>
        <div className="w-full h-fit flex">
          <div className={`w-1/2 flex justify-center gap-5 py-4 ${isSellDone ? "bg-gray17" : "bg-red2"} `}>
            <img src={ModalCreate} alt="create" />
            <span className="text-white  font-bold ">Create</span>
          </div>
          <div className={`w-1/2 flex justify-center gap-5 py-4 ${isSellDone? "bg-red2" : "bg-gray17"}`}>
            <img src={ModalConfirm} alt="confirm" />
            <span className="text-white font-bold  ">Confirm</span>
          </div>
        </div>
        {isSellDone ? (
          <div className="flex flex-col items-center min-h-h-400 pt-10">
            <p className="text-2xl text-black underline text-center mt-10 mb-5">
              Order Confirmed
            </p>
            <img className="h-30 w-30 mb-10" src={sellTick} alt="buy-tick"/>
            <p className="text-green3 underline cursor-pointer font-bold text-lg" onClick={() => {closeSellModal()}}>Go to platform</p>
           </div> 
        ) : (
          <div className="flex flex-col min-h-h-400">
            <p className="text-2xl text-black underline text-center mt-10">
              Sell
            </p>
            <div className="flex gap-5 justify-center items-center mt-10 px-5">
              <select value={transactionType} onChange={(e)=> {setTransactionType(e.target.value)} } className="w-60 pl-2 border-2 border-solid border-black rounded py-1 cursor-pointer">
              <option value={"market"}>Market</option>
                <option value={"limit"}>Limit</option>
              </select>
              <div className="flex border-2 border-solid border-gray-200 py-2 gap-2 px-2 items-center rounded">
                <p>Quantity:</p>
                <input
                  value={quantity}
                  onChange={(e) => {
                    changeQuantity(e.target.value);
                  }}
                  type="number"
                  placeholder="0"
                  className="w-28 py-1 border-2 border-solid pl-2 border-black rounded"
                />
              </div>
              <p className="w-28 py-1 border-2 border-solid pl-2 border-black rounded">
                {(livePrice * quantity).toFixed(2)}
              </p>
            </div>
            {transactionType === 'market' ?
              <p className="mt-5 bg-red2 rounded-md text-white py-3 w-80 mb-5 px-10 text-center m-auto">
              {(livePrice * quantity).toFixed(2)}/-
              </p>
             :
             <div className="flex flex-col self-center mt-5 mb-5 gap-2 items-center bg-red2 py-2  w-80 rounded-md px-2 ">
             <div className="flex gap-10">
             <p className="w-1/3 text-white">Limit:</p>
             <input
                 value={sellLimit}
                 onChange={(e) => {
                   changeSellLimit(e.target.value)
                 }}
                 type="number"
                 placeholder="0"
                 className="focus:outline-none w-2/3 py-1  pl-2 border-black rounded"
               />
             </div>
             {sellLimitError != null  && <p className="text-red2 bg-white rounded-md text-center font-bold">{sellLimitError}</p>}                
           </div>
              }
           
            <div className="bg-red2 rounded-md w-80 text-white m-auto py-3 px-2 flex">
              <span className="w-1/2 border-r border-r-solid border-r-white">
                Volume: {quantity}
              </span>
              <span className="self-start w-1/2 pl-2">As On: {date} </span>
            </div>
            <button onClick={() => { stockTransaction('SELL')}} className="self-center mb-1 text-lg text-center text-white bg-red2 font-semibold rounded-4xl w-60 py-2 mt-10">
              Place Order
            </button>
            <p
              onClick={() => closeSellModal()}
              className="text-base text-center mb-5 underline cursor-pointer"
            >
              Close
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellModal;
