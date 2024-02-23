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
async function likeBlog(blogId){
    console.log("in the api" , blogId);
    try{
        const res = await axios.put(`${Backend_URL}/api/likes/${blogId}/` ,{}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }
          })
          console.log("liked blog", res);
          if(res.status === 204 || res.status === 201){
            return {status: "success" , data: res};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}

async function unLikeBlog(blogId){
    console.log(localStorage.getItem("token_access"));
    console.log(blogId);
    try{
        const res = await axios.delete(`${Backend_URL}/api/likes/${blogId} ` ,
           { headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_access")}`
            }}
          )
          console.log("unliked blog", res);
          if(res.status === 204 || res.status === 201){
            return {status: "success" , data: res};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}
async function userData(){
    try{
        const res = await axios.get(`${Backend_URL}/api/dashboard/` ,
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token_access")}`
          }}
        );
        console.log(res);
        if(res.status === 204 || res.status === 201 || res.status === 200){
            return {status: "success" , data: res.data};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}

async function newsData(){
    try{
        const res = await axios.get(`${Backend_URL}/api/news`);
        // console.log("in api" , res.data);
        if(res.status === 204 || res.status === 201 || res.status === 200){
            return {status: "success" , data: res.data};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}

async function updateProfile(formData){
    console.log("in api form data" , formData);
    const formDataNew = new FormData();
    
    formDataNew.append('first_name', formData.first_name);
    formDataNew.append('country_code', formData.country_code);
    formDataNew.append('country', formData.country);
    formDataNew.append('phone_number', formData.phone_number);
    formDataNew.append('emailNotification', formData.emailNotification);
    formDataNew.append('pushNotification', formData.pushNotification);
    formDataNew.append('profile_picture', formData.profile_image);
   
    for (const entry of formDataNew.entries()) {
        console.log(entry[0], entry[1]);
    }
    try{
        const res = await axios.patch(`${Backend_URL}/api/profile/` , formDataNew, 
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token_access")}`,
            },
          }
        );
        console.log("in api update profile" , res.data);
        if(res && res.data){
            return {status: "success" , data: res.data};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}

async function leaderboardData(){
    try{
        const res = await axios.get(`${Backend_URL}/api/leaderboard/` , 
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token_access")}`,
            },
          }
          );
        console.log("in api" , res.data);
        if(res && res.data){
            return {status: "success" , data: res.data};
        }

    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}
async function differentTypesOfTraders(){
    try{
        const res = await axios.get(`${Backend_URL}/api/certificate/` );
        console.log("in api traders" , res.data);
        if(res && res.data){
            return {status: "success" , data: res.data};
        }
    }catch(err){
        console.log("Error", err);
        return {status: "error", message: "Something went wrong!"};
    }
}
export const userDashboardData = {getEducationalBlogs , likeBlog , updateProfile, unLikeBlog , userData, newsData, leaderboardData , differentTypesOfTraders};