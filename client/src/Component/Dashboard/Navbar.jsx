import styled from "styled-components";
import { useAuth } from "../../Context/authContext";


const Navbar = () => {
    const { user ,logout} = useAuth();
    return (
        <Wrapper className="d-flex justify-content-between">
            <div className="d-flex ">
                <p className="">EMS</p>
                <p className="px-5">{user.name}</p>
            </div>
            <button className="btn text-danger" onClick={()=>logout()}>Logout </button>
        </Wrapper>
    );
};



const Wrapper = styled.div`
 background:${({theme})=>theme.colors.white};
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

`




export default Navbar;