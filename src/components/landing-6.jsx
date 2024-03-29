import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Landing_6 = () => {
    const StellarData = [
        {
            'title': "Account Size",
            'p1': "₹ 30,000",
            'p2': "₹ 50,000",
            'p3': "₹ 1,00,000"
        },
        {
            'title': "Profit Sharing (From Challenges)",
            'p1': "15 % (₹ 585)",
            'p2': "15 % (₹ 975)",
            'p3': "15 % (₹ 1950)"
        },
        {
            'title': "Phase 1 Profit Target",
            'p1': "8%",
            'p2': "8%",
            'p3': "8%"
        },
        {
            'title': "Phase 2 Profit Target",
            'p1': "5%",
            'p2': "5%",
            'p3': "5%"
        },
        {
            'title': "Maximum Daily Loss",
            'p1': "5%",
            'p2': "5%",
            'p3': "5%"
        },
        {
            'title': "Maximum Overall Loss",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        {
            'title': "Drawdown Type",
            'p1': "Balance based",
            'p2': "Balance based",
            'p3': "Balance based"
        },
        {
            'title': "Time Limit",
            'p1': "No Time Limit",
            'p2': "No Time Limit",
            'p3': "No Time Limit"
        },
        {
            'title': "Minimum Trading Days (Per Challenge)",
            'p1': "5",
            'p2': "5",
            'p3': "5"
        },
        {
            'title': "Commissions",
            'p1': "₹ 0.3 - 0.22 per lot",
            'p2': "₹ 0.3 - 0.22 per lot",
            'p3': "₹ 0.3 - 0.22 per lot"
        },
        {
            'title': "Profit Split",
            'p1': "upto 80%",
            'p2': "upto 80%",
            'p3': "upto 80%"
        },
        {
            "title": "Reset Account",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        {
            'title': "Refundable Amount",
            'p1': "₹ 1,800",
            'p2': "₹ 3,000",
            'p3': "₹ 4,500",
        },
        {
            'title': "Fees",
            'p1': "₹ 1,800",
            'p2': "₹ 3,000",
            'p3': "₹ 4,500",
        }
    ]
    const EvaluationData = [
        {
            'title': "Account Size",
            'p1': "₹ 30,000",
            'p2': "₹ 50,000",
            'p3': "₹ 1,00,000"
        },
        {
            'title': "Profit Sharing (From Challenges)",
            'p1': "15 % (₹ 450)",
            'p2': "15 % (₹ 750)",
            'p3': "15 % (₹ 1500)"
        },
        {
            'title': "Profit Target",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        {
            'title': "Maximum Daily Loss",
            'p1': "5%",
            'p2': "5%",
            'p3': "5%"
        },
        {
            'title': "Maximum Overall Loss",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        {
            "title": "Phase 1 Time Limit",
            "p1": "4 weeks",
            "p2": "4 weeks",
            "p3": "4 weeks"
        },
        {
            "title": "Phase 2 Time Limit",
            "p1": "8 weeks",
            "p2": "8 weeks",
            "p3": "8 weeks"
        },
        {
            'title': "Drawdown Type",
            'p1': "Balance based",
            'p2': "Balance based",
            'p3': "Balance based"
        },
        {
            'title': "Minimum Trading Days (Per Challenge)",
            "p1": '5',
            "p2": '5',
            "p3": "5",
        },
        {
            'title': "Commissions",
            'p1': "₹ 0.3 - 0.22 per lot",
            'p2': "₹ 0.3 - 0.22 per lot",
            'p3': "₹ 0.3 - 0.22 per lot"
        },
        {
            'title': "Profit Split",
            'p1': "upto 80%",
            'p2': "upto 80%",
            'p3': "upto 80%"
        },
        {
            "title": "Reset Account",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        {
            'title': "Refundable Amount",
            'p1': "₹ 1,500",
            'p2': "₹ 2,500",
            'p3': "₹ 3,500",
        },
        {
            'title': "Fees",
            'p1': "₹ 1,500",
            'p2': "₹ 2,500",
            'p3': "₹ 3,500",
        },
    ]
    const ExpressData = [
        {
            'title': "Account Size",
            'p1': "₹ 30,000",
            'p2': "₹ 50,000",
            'p3': "₹ 1,00,000"
        },
        {
            'title': "Profit Sharing (From Challenges)",
            'p1': "10 % (₹ 750)",
            'p2': "10 % (₹ 1250)",
            'p3': "10 % (₹ 2500)"
        },
        {
            'title': "Profit Target",
            'p1': "25%",
            'p2': "25%",
            'p3': "25%"
        },
       
        {
            'title': "Maximum Daily Loss",
            'p1': "5%",
            'p2': "5%",
            'p3': "5%"
        },
        {
            'title': "Maximum Overall Loss",
            'p1': "10%",
            'p2': "10%",
            'p3': "10%"
        },
        
        {
            'title': "Time Limit",
            'p1': "No Time Limit",
            'p2': "No Time Limit",
            'p3': "No Time Limit"
        },
        {
            'title': "Drawdown Type",
            'p1': "Balance based",
            'p2': "Balance based",
            'p3': "Balance based"
        },
        {
            'title': "Minimum Trading Days (Per Challenge)",
            'p1': "10",
            'p2': "10",
            'p3': "10"
        },
        {
            'title': "Commissions",
            'p1': "₹ 0.3 - 0.22 per lot",
            'p2': "₹ 0.3 - 0.22 per lot",
            'p3': "₹ 0.3 - 0.22 per lot"
        },
        {
            'title': "Profit Split",
            'p1': "upto 80%",
            'p2': "upto 80%",
            'p3': "upto 80%"
        },
        {
            "title": "Reset Account",
            'p1': "20%",
            'p2': "20%",
            'p3': "20%"
        },
        {
            'title': "Refundable Amount",
            'p1': "₹ 1,500",
            'p2': "₹ 2,500",
            'p3': "₹ 3,500",
        },
        {
            'title': "Fees",
            'p1': "₹ 1,500",
            'p2': "₹ 2,500",
            'p3': "₹ 3,500",
        },
    ]
    const navigate = useNavigate();
    const [activeTable , setActiveTable] = useState(StellarData);
    const [activeTab, setActiveTab] = useState("Stellar");

    return (
    <div id="start-challenge" className="w-full h-fit py-28 sm:px-12  md:px-60 2xl:px-80 bg-gradient-to-b from-white to-green5 ">
        <div className="w-full h-fit gap-y-12 flex flex-col">
            <p className="text-5xl font-bold text-purple1 text-center w-full">Choose the Best TradersLo Challenge</p>
            <div className="w-full h-fit gap-y-4 flex flex-col items-center">
                <div className="w-full py-8 flex esm:gap-8 md:gap-12 flex-wrap  justify-center">
                    <p onClick={()=> {setActiveTab("Stellar"); setActiveTable(StellarData)}} className={`${activeTab === 'Stellar' ? " bg-purple1 text-white" : "bg-white text-purple1"} hover:bg-white hover:text-purple1 hover:border-2 hover:border-purple1 border-2 border-solid border-white py-5 px-15 rounded-full  font-poppins font-bold text-xl.1 flex justify-center items-center cursor-pointer`}>Stellar</p>
                    <p onClick={()=> {setActiveTab("Evaluation"); setActiveTable(EvaluationData)}} className={`${activeTab === 'Evaluation' ? " bg-purple1 text-white" : "bg-white text-purple1"} hover:bg-white hover:text-purple1 hover:border-2 hover:border-purple1 border-2 border-solid border-white py-5 px-15 rounded-full font-poppins font-bold text-xl.1 flex justify-center items-center cursor-pointer`}>Evaluation</p>
                    <p onClick={()=> {setActiveTab("Express"); setActiveTable(ExpressData)}} className={`${activeTab === 'Express' ? " bg-purple1 text-white" : "bg-white text-purple1"} hover:bg-white hover:text-purple1 hover:border-2 hover:border-purple1 border-2 border-solid border-white py-5 px-15 rounded-full font-poppins font-bold text-xl.1 flex justify-center items-center cursor-pointer`}>Express</p>
                </div>
                <table className="esm:w-full 2xl:w-11/12 m-autocursor-pointer ">
                   {activeTable.map((item ,i) => {
                    return (
                        <tbody key={i}>
                        <tr className="w-full">
                            <td className={`bg-white text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.title}</td>
                            <td className={`bg-green7 text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p1}</td>
                            <td className={`bg-purple3 text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm  font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p2}</td>
                            <td className={`bg-green7 text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm  font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p3}</td>
                        </tr>
                        </tbody>
                    )
                   })}
                </table>
            </div>
            <button onClick={()=> {navigate('/plan')}} className="hover:bg-white hover:border-2 hover:border-solid hover:border-purple1 hover:text-purple1 border-2 border-solid border-purple1 rounded-full bg-purple1 text-white py-4 px-11 self-center">Start Challenge</button>
        </div>

    </div>
  )
}

export default Landing_6