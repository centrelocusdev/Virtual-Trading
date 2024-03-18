import { useEffect, useState } from 'react';
import zigZag from '/zig-zag.png';
import { useNavigate } from 'react-router-dom';

const Landing12 = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => { 
    async function checkAuth() {
      let auth = localStorage.getItem("token_access");
      console.log(auth);
      const isAuthenticated = auth !== null && auth !== "undefined" && auth!== "";
      setIsAuth(isAuthenticated);
      
    }
    checkAuth();
  } , [])
  return (
    <div className='w-full bg-green10 h-fit min-h-h-30 flex justify-center items-center esm:px-5 md:px-20 py-10 '>
      <div className="flex esm:flex-col md:flex-row bg-gradient-to-br from-green12 to-white rounded-xl h-full" >
        <div className="py-16 md:px-10 esm:w-full md:w-2/3 flex flex-col esm:items-center md:items-start ">
          <p className="text-3xl font-black  font-poppins mb-5 esm:text-center md:text-start">Choose the best TradesLo challenge for you and start trading now!</p>
          <p className="font-medium text-lg mb-5 esm:text-center md:text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.</p>
          <button onClick={()=> {!isAuth ? navigate('/login') : navigate('/trading-platform')}} className="esm:self-center md:self-start rounded-full text-white bg-purple1 font-inter py-2 px-10">Start Trading</button>
        </div>
        <img className='esm:hidden md:block' src={zigZag} alt="zigzag"/>
      </div>
    </div>
  )
}

export default Landing12