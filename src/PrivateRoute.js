import {Navigate} from 'react-router-dom';

export const PrivateRoute = ({ children}) => {
    let auth = localStorage.getItem("token");
    const isAuthenticated =  (auth!==null && auth!=='undefined');
        
    if (isAuthenticated ) {
      return children
    }
      
    return <Navigate to="/" />
  }