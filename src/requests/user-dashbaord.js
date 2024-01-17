const Backend_URL = "https://trade.thedelvierypointe.com";
import axios from "axios";


async function getEducationalBlogs(){
    try{
        const educationalBlogs = await axios.get(`${Backend_URL}/api/blogs/ ` , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
          });
          if(educationalBlogs){
              return {status: "success" , data: educationalBlogs.data};
          }
    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}

export const userDashbaordData = {getEducationalBlogs};