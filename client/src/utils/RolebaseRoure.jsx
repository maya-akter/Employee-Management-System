import { useAuth } from "../Context/authContext";
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
const RolebaseRoure = ({children,requiredRole}) => {
    const {user,loading} = useAuth();
    if(loading){
        return <div>Loading....</div>
    }
    if(!requiredRole.includes(user.role)){
        <Navigate to='/unauthorized' />
    }
    return user ? children:<Navigate to='/login' />
   
};


RolebaseRoure.propTypes = {
    children: PropTypes.node,
    requiredRole: PropTypes.node
   };
//    RolebaseRoure.propTypes = {
//     requiredRole: PropTypes.node
//    };

export default RolebaseRoure;