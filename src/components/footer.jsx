import facebook from '/ic_round-facebook.svg';
import twitter from '/devicon_twitter.svg';
import youtube from '/mdi_youtube.svg';
import instagram from '/bi_instagram.svg';
const Footer = () => {
  return (
    <div className="w-full h-fit bg-green5 flex  justify-center items-center gap-y-10 py-5 px-16">
     <div className="w-full h-fit bg-green5  flex flex-col py-6 px-16 gap-y-10">
     <div className="w-full h-fit flex justify-between gap-x-20">
        <div className="flex flex-col items-start w-2/6 gap-y-4">
          <p className="text-2xl font-bold font-poppins">Stay Updated!</p>
          <p className="text-sm font-poppins">Subscribe to get all the exclusive updates about the trading industry from the industry veterans. We will even rush our selective podcasts and top-notch ebooks to your mailbox.</p>
          <div className="flex justify-between gap-x-2">
            <input className="pl-2.5 pt-2.5 pb-2.5 pr-20 border-none rounded-md placeholder:text-xs font-semibold" type="email" name="email" placeholder="Enter Your Email"/>
            <button className="py-1.5 px-4 bg-purple1 text-white rounded-full">Subscribe</button>
          </div>

        </div>
        <div className="flex flex-col w-1/6 items-start gap-y-4">
          <div className="flex flex-col gap-y-2">
          <p className='text-xs font-semibold font-poppins'>MODELS</p>
          <p className='text-xs font-poppins'>Stellar Challenge</p>
          <p className='text-xs font-poppins'>Express Challenge</p>
          <p className='text-xs font-poppins'>Evaluation Challenge</p>
          </div>
          <div className="flex flex-col gap-y-2">
          <p className='text-xs font-semibold font-poppins'>Community</p>
          <div className="flex items-center justify-between gap-x-3">
            <img className='h-5 w-5' src={twitter} alt='twitter'/>
            <img className='h-5 w-5' src={facebook} alt='facebook'/>
            <img className='h-5 w-5' src={youtube} alt='youtube'/>
            <img className='h-5 w-5' src={instagram} alt='instagram'/>
          </div>
          </div>
         <div className="flex flex-col gap-y-2">
         <p className='text-xs font-semibold font-poppins'>EDUCATION</p>
          <p className='text-xs font-poppins'>Blogs</p>
          <p className='text-xs font-poppins'>New Calender</p>
         </div>
        </div>
        <div className="flex flex-col w-1/6 items-start gap-y-4">
          <p className='text-xs font-poppins font-semibold'>QUICK LINKS</p>
          <p className='text-xs font-poppins'>FAQ</p>
          <p className='text-xs font-poppins'>Terms of Service</p>
          <p className='text-xs font-poppins'>Privacy Policy</p>
          <p className='text-xs font-poppins'>Cookie Disclosure</p>
          <p className='text-xs font-poppins'>Contact Us</p>
        </div>
     </div>
      <div className='flex justify-between w-full gap-x-10'>
        <p className='text-xs w-1/2 font-normal'>The information on the Website is provided solely for analysis purposes only and should not be construed as financial, investment, tax, or other advice. Nothing on the Website or in our Services represents a solicitation, advice, endorsement, or offer to purchase or sell stocks or other financial instruments by its agents, employees, contractors, or any connected entities. You are solely responsible for assessing the benefits and risks associated with the use of any information or other content on the Website. All investments include substantial risk, and an individuals investment decisions are solely his/her obligation.</p>
        <p className='text-xs w-1/2 font-normal'>All information on the Website is provided “as is”, with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information, and without warranty of any kind, express or implied. Its partners, employees, or agents, shall in no way be responsible to you or anyone else for any decision made or action taken in reliance on the information on the Website, or for any consequential, special, or similar damages, even if warned of the potential of such damages. Purchases should not be regarded as deposits. All program charges are utilized for working expenses including, however not restricted to, staff, innovation, and other business-related costs. It is an officially registered Business Company, Registration number: xyz,  with our registered officelocatedatxyz</p>
      </div>
      <p className="text-base text-black text-center">© 2023, All Rights Reserved</p>
     </div>
    </div>
  )
}

export default Footer;