import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useContext,useEffect,useState } from 'react';





const userContext = createContext();
const AuthContext = ({children})  =>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
  useEffect(()=>{
     const verifyUser = async()=>{
        try {
            const token = localStorage.getItem('token');
            const response = axios.get('http://localhost:8000/api/auth/verify',{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            if(response.data.success){
                setUser(response.data.user)
            }else{
                setUser(null);
                setLoading(false);
            }
        } catch (error) {
           if(error.response && !error.response.data.success){
            setUser(null)
           }
            
        }finally{
            setLoading(false);
        }
     }
     verifyUser();
  },[]); 




    const login=(user)=>{
        setUser(user);
    }
    const logout=()=>{
        setUser(null)
        localStorage.removeItem("token");
        console.log('click');
        
        
    }

   return  <userContext.Provider value={{user,login,logout,loading}}>{children}</userContext.Provider>
};
const useAuth=()=>{
    return useContext(userContext);
 }
AuthContext.propTypes = {
    children: PropTypes.node
};

export { AuthContext , useAuth};