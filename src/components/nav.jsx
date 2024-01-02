import logo from '/logo.svg';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-bg_Light h-fit flex justify-between items-center px-6 py-2 ">
      <div className='flex justify-between items-center gap-2'>
        <img className='h-10 w-10' src={logo} alt='logo'/>
        <p className='font-inter font-base font-semibold text-black'>Virtual Trading</p>
      </div>
      <div className='flex gap-10'>
        <span className='font-base font-medium text-black font-inter'>Home</span>
        <span className='font-base font-medium text-black font-inter'>Models</span>
        <span className='font-base font-medium text-black font-inter'>FAQ</span>
        <select className='font-base font-medium text-black font-inter bg-bg_Light focus:outline-none'>
          <option className='font-base font-medium text-black font-inter'>More</option>
          <option className='font-base font-medium text-black font-inter'>Option1</option>
          <option className='font-base font-medium text-black font-inter'>Option2</option>
          <option className='font-base font-medium text-black font-inter'>Option3</option>
          <option className='font-base font-medium text-black font-inter'>Option4</option>
        </select>
      </div>
      <button onClick={()=> {navigate('/login')}} className='py-4 px-11 bg-font_blue1 rounded-md text-white text-lg'>Login</button>
    </div>
  )
}

export default Nav