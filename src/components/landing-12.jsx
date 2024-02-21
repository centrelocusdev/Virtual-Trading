import { useEffect, useState } from 'react';
import zigZag from '/zig-zag.png';
import { useNavigate } from 'react-router-dom';

const Landing12 = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => { 
    async function useAuth() {
      let auth = localStorage.getItem("token_access");
      console.log(auth);
      const isAuthenticated = auth !== null && auth !== "undefined" && auth!== "";
      setIsAuth(isAuthenticated);
      
    }
    useAuth();

  } , [])
  return (
    <div className='w-full bg-green10 h-h-30 flex justify-center items-center px-20 py-10 '>
      <div className="flex bg-gradient-to-br from-green12 to-white rounded-xl h-full" >
        <div className="py-16 px-10 w-2/3 ">
          <p className="text-3xl font-black  font-poppins mb-5">Choose the best TradesLo challenge for you and start trading now!</p>
          <p className="font-medium text-lg mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.</p>
          <button onClick={()=> {!isAuth ? navigate('/login') : navigate('/trading-platform')}} className="rounded-full text-white bg-purple1 font-inter py-2 px-10">Start Trading</button>
        </div>
        <img src={zigZag} alt="zigzag"/>
      </div>
    </div>
  )
}

export default Landing12