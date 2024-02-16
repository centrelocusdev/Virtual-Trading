import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import whatCusSays from '/what-customer-says.png';
import greenStar from '/green-star.png';
import customer from '/customer.png';
const Landing_7 = () => {
  
  return (
    <div className={`w-full h-fit bg-white pt-40`}>
      <div className="flex flex-col gap-y-5 w-3/5 m-auto items-center mb-20">
        {/* <p className="text-gray9 font-semibold font-montserrat text-center text-2xl">
          TESTIMONIALS
        </p> */}
        <p className="text-6xl font-poppins mb-5 text-purple1 font-extrabold  text-center">
          What Our Customers Say
        </p>
        <p className="text-lg text-gray2 text-center font-poppins mx-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>
      </div>
      <div className={`w-11/12 m-auto flex flex-col gap-16 `}>
        <div className="flex w-full gap-20 px-20">
          <div className="px-10  py-10 flex rounded-4xl.1 bg-green12 w-1/2 gap-5 border-b-4 borer-b-solid border-b-green13">
            <img className="h-20 w-20" src={customer} alt="user"/>
            <div className="flex flex-col">
              <p className="text-lg font-poppins font-extrabold mb-2">Courtney Henry</p>
              <p className="text-sm font-poppins mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
              <div className="flex">
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
              </div>

            </div>
          </div>
          <div className="px-10  py-10 flex rounded-4xl.1 bg-green12 w-1/2 gap-5 border-b-4 borer-b-solid border-b-green13">
            <img className="h-20 w-20" src={customer} alt="user"/>
            <div className="flex flex-col">
              <p className="text-lg font-poppins font-extrabold mb-2">Courtney Henry</p>
              <p className="text-sm font-poppins mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
              <div className="flex">
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
              </div>

            </div>
          </div>
        </div>
        <div className="flex w-full gap-20 px-20">
          <div className="px-10  py-10 flex rounded-4xl.1 bg-green12 w-1/2 gap-5 border-b-4 borer-b-solid border-b-green13">
            <img className="h-20 w-20" src={customer} alt="user"/>
            <div className="flex flex-col">
              <p className="text-lg font-poppins font-extrabold mb-2">Courtney Henry</p>
              <p className="text-sm font-poppins mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
              <div className="flex">
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
              </div>

            </div>
          </div>
          <div className="px-10  py-10 flex rounded-4xl.1 bg-green12 w-1/2 gap-5 border-b-4 borer-b-solid border-b-green13">
            <img className="h-20 w-20" src={customer} alt="user"/>
            <div className="flex flex-col">
              <p className="text-lg font-poppins font-extrabold mb-2">Courtney Henry</p>
              <p className="text-sm font-poppins mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
              <div className="flex">
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
                <img className="h-5 w-5" src={greenStar} alt="star"/>
              </div>

            </div>
          </div>
        </div>
       
      
      </div>
      <img className="w-full mt-10 bottom-0" src={whatCusSays} alt="frame"/>
    </div>
  );
};

export default Landing_7;
