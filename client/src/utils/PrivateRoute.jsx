import { useAuth } from "../Context/authContext";
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
const PrivateRoute = ({children}) => {
const {user,loading} = useAuth();
    if(loading){
        return <div>Loading....</div>
    }

    return user ? children:<Navigate to='/login' />
        
   
};




PrivateRoute.propTypes = {
    children: PropTypes.node
   };
   



export default PrivateRoute;