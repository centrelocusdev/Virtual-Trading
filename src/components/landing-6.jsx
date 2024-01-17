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
    <div id="start-challenge" className="w-full h-fit py-5 px-80 bg-gradient-to-b from-white to-bg_medium ">
        <div className="w-full h-fit  gap-y-12 flex flex-col">
            <p className="text-5xl font-bold text-black text-center w-full">Choose the Best TradersLo Challenge</p>
            <div className="w-full h-fit gap-y-4 flex flex-col">
                <div className="w-full px-15 py-8 flex gap-x-24 justify-around">
                    <p onClick={()=> {setActiveTab("Stellar"); setActiveTable(StellarData)}} className={`${activeTab === 'Stellar' ? "bg-bg_Medium text-font_blue1 border-2 border-font_blue1 border-solid" : "bg-font_blue1 text-white"} hover:bg-bg_Medium hover:text-font_blue1 hover:border-2 hover:border-font_blue1 py-5 px-15 rounded-2xl.1  font-poppins font-bold text-xl.1 flex justify-center items-center cursor-pointer`}>Stellar</p>
                    <p onClick={()=> {setActiveTab("Evaluation"); setActiveTable(EvaluationData)}} className={`${activeTab === 'Evaluation' ? "bg-bg_Medium text-font_blue1 border-2 border-font_blue1 border-solid" : "bg-font_blue1 text-white"} hover:bg-bg_Medium hover:text-font_blue1 hover:border-2 hover:border-font_blue1 py-5 px-15 rounded-2xl.1 font-poppins font-bold text-xl.1 flex justify-center items-center cursor-pointer`}>Evaluation</p>
                    <p onClick={()=> {setActiveTab("Express"); setActiveTable(ExpressData)}} className={`${activeTab === 'Express' ? "bg-bg_Medium text-font_blue1 border-2 border-font_blue1 border-solid" : "bg-font_blue1 text-white"} hover:bg-bg_Medium hover:text-font_blue1 hover:border-2 hover:border-font_blue1 py-5 px-15 rounded-2xl.1 font-poppins font-bold text-xl.1 flex justify-center items-center cursor-pointer`}>Express</p>
                </div>
                <table className="w-11/12 m-autocursor-pointer ">
                   {activeTable.map((item ,i) => {
                    return (
                        <tbody key={i}>
                        <tr className="w-full "  >
                            <td className={`bg-white text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.title}</td>
                            <td className={`bg-blue4 text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p1}</td>
                            <td className={`bg-bg_Medium text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm  font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p2}</td>
                            <td className={`bg-blue5 text-black py-2.5 px-3 border border-solid border-gray5 w-1/4 text-sm  font-inter text-start ${i === 0 ? "font-semibold": ""} `}>{item.p3}</td>
                        </tr>
                        </tbody>
                    )
                   })}
                </table>
            </div>
            <button onClick={()=> {navigate('/plan')}} className="rounded-md bg-font_blue1 text-white py-4 px-11 self-center">Start Challenge</button>
        </div>

    </div>
  )
}

export default Landing_6