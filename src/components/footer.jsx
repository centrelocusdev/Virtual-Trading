import facebook from '/ic_round-facebook.svg';
import twitter from '/devicon_twitter.svg';
import youtube from '/mdi_youtube.svg';
import instagram from '/bi_instagram.svg';
import { auth } from '../requests/auth';
import { toast } from "react-toastify";
import { useState } from 'react';

const Footer = () => {
  const [email ,setEmail] = useState("");
  async function handleSubscribe(){
    try{
    const res = await auth.subscribe(email);
    if(res.status === 'success'){
    console.log(res);
    toast.success(res.data.message);
    }

    }catch(err){
      console.log(err);
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="w-full h-fit bg-green5 flex   justify-center items-center gap-y-10 py-5 md:px-16">
     <div className="w-full h-fit bg-green5  flex flex-col py-6 esm:px-5 md:px-16 gap-y-10">
     <div className="w-full h-fit flex esm:flex-col sm:flex-row esm:items-center sm:items-start justify-between gap-20">
        <div className="flex flex-col esm:w-full esm:items-center sm:items-start sm:w-2/6 gap-y-4">
          <p className="text-2xl font-bold font-poppins esm:text-center sm:text-start">Stay Updated!</p>
          <p className="text-sm font-poppins esm:text-center sm:text-start">Subscribe to get all the exclusive updates about the trading industry from the industry veterans. We will even rush our selective podcasts and top-notch ebooks to your mailbox.</p>
          <div className="flex sm:w-full esm:flex-col md:flex-row justify-between gap-2">
            <input onChange={(e) => {setEmail(e.target.value)}} className="pl-2.5 pt-2.5 pb-2.5 pr-20 border-none rounded-md placeholder:text-xs font-semibold" type="email" name="email" placeholder="Enter Your Email"/>
            <button onClick={handleSubscribe}   className="py-1.5 px-4 bg-purple1 text-white rounded-full">Subscribe</button>
          </div>
        </div>
        <div className="flex flex-col esm:w-full sm:w-1/6 esm:items-center sm:items-start gap-y-4">
          <div className="flex flex-col gap-y-2">
          <p className='text-xs font-semibold font-poppins esm:text-center sm:text-start'>MODELS</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Stellar Challenge</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Express Challenge</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Evaluation Challenge</p>
          </div>
          <div className="flex flex-col esm:item-center sm:text-start gap-y-2">
          <p className='text-xs font-semibold font-poppins esm:text-center sm:text-start'>Community</p>
          <div className="flex items-center justify-between gap-x-3">
            <img className='h-5 w-5' src={twitter} alt='twitter'/>
            <img className='h-5 w-5' src={facebook} alt='facebook'/>
            <img className='h-5 w-5' src={youtube} alt='youtube'/>
            <img className='h-5 w-5' src={instagram} alt='instagram'/>
          </div>
          </div>
         <div className="flex flex-col gap-y-2">
         <p className='text-xs font-semibold font-poppins esm:text-center sm:text-start'>EDUCATION</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Blogs</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>New Calender</p>
         </div>
        </div>
        <div className="flex flex-col esm:w-full sm:w-1/6 esm:items-center sm:items-start gap-y-4">
          <p className='text-xs font-poppins font-semibold esm:text-center sm:text-start'>QUICK LINKS</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>FAQ</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Terms of Service</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Privacy Policy</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Cookie Disclosure</p>
          <p className='text-xs font-poppins esm:text-center sm:text-start'>Contact Us</p>
        </div>
     </div>
      <div className='flex justify-between w-full esm:flex-col sm:flex-row gap-10'>
        <p className='text-xs esm:w-full sm:w-1/2 font-normal esm:text-center sm:text-start'>The information on the Website is provided solely for analysis purposes only and should not be construed as financial, investment, tax, or other advice. Nothing on the Website or in our Services represents a solicitation, advice, endorsement, or offer to purchase or sell stocks or other financial instruments by its agents, employees, contractors, or any connected entities. You are solely responsible for assessing the benefits and risks associated with the use of any information or other content on the Website. All investments include substantial risk, and an individuals investment decisions are solely his/her obligation.</p>
        <p className='text-xs esm:w-full sm:w-1/2 font-normal esm:text-center sm:text-start'>All information on the Website is provided “as is”, with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information, and without warranty of any kind, express or implied. Its partners, employees, or agents, shall in no way be responsible to you or anyone else for any decision made or action taken in reliance on the information on the Website, or for any consequential, special, or similar damages, even if warned of the potential of such damages. Purchases should not be regarded as deposits. All program charges are utilized for working expenses including, however not restricted to, staff, innovation, and other business-related costs. It is an officially registered Business Company, Registration number: xyz,  with our registered officelocatedatxyz</p>
      </div>
      <p className="text-base text-black text-center">© 2023, All Rights Reserved</p>
     </div>
    </div>
  )
}

export default Footer;