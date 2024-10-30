import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";


const Setting = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not matched");
        } else {
            try {
                const response = await axios.put("http://localhost:8000/api/setting/change-password",
                    setting,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                if (response.data.success) {
                    navigate('/admin-dashboard/employees');
                    setError("");
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error);
                }
            }
        }
    }



    return (
        <Wrapper className="container d-flex justify-content-center">


            <div className="departmentadd">
                
                <form action="" className="px-4" onSubmit={handleSubmit}>
                    <div className="mt-3 mb-3">
                        {/* <label htmlFor="" className="mb-2">Old Password</label><br /> */}
                        <input type="password" name="oldPassword" placeholder="Old password" onChange={handleChange} required />
                    </div>
                    <div className="mt-3 mb-3">
                        {/* <label htmlFor="" className="mb-2">New Password</label><br /> */}
                        <input type="password" name="newPassword" placeholder="New password" onChange={handleChange} required />
                    </div>
                    <div className="mt-3 mb-3">
                        {/* <label htmlFor="" className="mb-2">Confirm Password</label><br /> */}
                        <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required />
                    </div>
                    <p className="text-danger">{error}</p>
                    <div>
                        <button type="submit" className="submit_btn  m-auto d-flex justify-content-center fs-5 mt-4">Change Password</button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`

.departmentadd{
    background:white;
    width:400px;
    height:350px;
    margin:50px 0;
    padding:20px;
}
display:flex;
margin-top:100px;
.submit_btn{
    width:100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.login_btn_background};
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover{
               background-color:${({ theme }) => theme.colors.login_btnHover_background};
        }
}
input{
    width:100%;
    padding:10px;
    border:none;
    border-bottom:0.2px solid gray;
}
`

export default Setting;