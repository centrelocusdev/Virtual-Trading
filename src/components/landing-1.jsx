import banner from '/landing-banner.gif';
import facebook from '/ic_round-facebook.svg';
import twitter from '/devicon_twitter.svg';
import youtube from '/mdi_youtube.svg';
import instagram from '/bi_instagram.svg';
import { useNavigate } from 'react-router-dom';
const Landing_1 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-h-98 bg-bg_Light flex justify-center items-center px-56 py-12">
        <div className='w-full h-fit bg-bg_Light gap-x-12 flex items-center'>
        <div className='w-1/2 h-fit flex flex-col items-start gap-y-5'>
           <div className='flex flex-col items-start gap-y-2'>
            <p className='text-4xl font-extrabold font-poppins text-blue3'>Lorem Ipsum verds</p>
            <p className='text-4xl font-extrabold font-poppins text-blue3'>kejfoo.</p>
           </div>
            <p className='text-gray8 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam  voluptates sed beatae?</p>
            {/* <Link href="/plan"> */}
            <button onClick={()=> {navigate('/plan')}} className='px-11 py-4 bg-font_blue1 text-white text-lg rounded-md'>Start Challenge</button>
            {/* </Link> */}
            <div className='flex gap-x-5 items-center'>
                <p className='text-xs font-semibold tracking-low text-blue3'>JOIN OUR COMMUNITY</p>
                <div className='flex gap-x-6 items-center'>
                <img className='h-5 w-5' src={twitter} alt='twitter'/>
                <img className='h-5 w-5' src={facebook} alt='facebook'/>
                <img className='h-5 w-5' src={youtube} alt='youtube'/>
                <img className='h-5 w-5' src={instagram} alt='instagram'/>
                </div>
            </div>


        </div>
        <img className='w-1/2 h-fit' src={banner} alt='banner'/>
        </div>
    </div>
  )
}

export default Landing_1