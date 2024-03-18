import dashScreen from '/dash-screens.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Landing13 = () => {
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
    <div className='bg-purple4 w-full esm:h-fit md:h-h-30 flex esm:gap-x-5 md:gap-x-0 '>
      <img className='esm:w-1/2 md:w-1/3 esm:hidden md:block' src={dashScreen} alt='dash-screen'/>
      <div className='esm:w-full md:w-2/3 md:pr-10 self-center esm:py-10 esm:px-5 md:py-0 md:px-0'>
        <p className='text-white text-2xl font-bold font-poppins mb-5'>Choose the best TradesLo challenge for you and start trading now!</p>
        <p className='text-white text-lg font-normal font-inter mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus </p>
        <button onClick={()=> {!isAuth ? navigate('/login') : navigate('/trading-platform')}}  className="rounded-full text-white bg-purple1 font-inter py-2 px-10"  >Start Trading</button>
      </div>

    </div>
  )
}

export default Landing13