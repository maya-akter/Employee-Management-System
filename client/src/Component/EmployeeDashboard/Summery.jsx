// import PropTypes from 'prop-types';
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../Context/authContext";


const Summery = () => {
    const {user} = useAuth();
    return (
        <div className='d-flex mx-4 '>
            <div className=''>
               <FaUser/>
            </div>
            <div>
            <p>Welcome Back</p>
            <p>{user.name}</p>
            </div>
        </div>
    );
};



// Summery.propTypes = {
//     icon: PropTypes.elementType.isRequired, 
//     text: PropTypes.string.isRequired,
//     number: PropTypes.number.isRequired,
//    };
export default Summery;