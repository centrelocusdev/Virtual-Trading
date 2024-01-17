import Footer from "../components/footer"
import Nav from "../components/nav"
import Landing_1 from '../components/landing-1';
import stripe from '/landing-strip.png';
import Landing_3 from "../components/landing-3";
import Landing_4 from "../components/landing-4";
import Landing_5 from "../components/landing-5";
import Landing_6 from "../components/landing-6";
import Landing_7 from "../components/landing-7";
import Landing_8 from "../components/landing-8";
import Landing_9 from "../components/landing-9";
const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen h-fit bg-bg_Light">
      <Nav/>
      <Landing_1/>
      <img className="w-full h-64" src={stripe} alt="strip"/>
      <Landing_3/>
      <Landing_4/>
      <Landing_5/>
      <Landing_6/>
      <Landing_7/>
      <Landing_8/>
      <Landing_9/>
      <Footer/>
    </div>
    
  )
}

export default Landing