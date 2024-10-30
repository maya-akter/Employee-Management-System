import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useAuth } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../Styles/Button';
import { FaUser } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";



const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {


        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', user);

            if (response.data.success) {
                alert('Success');
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError('Server error');
            }

        }

    }

    return (
        <Wrapper className=''>
            <div className='container_div'>

                <Form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column align-items-center mb-4 user-div'>
                        <FaUser className='userIcon'/>
                        <p>Employee Managment System </p>
                        <p className='mt-3'> <RiErrorWarningLine />
                            <span className='organizer_email '>Sign in with your organizational Email</span></p>
                    </div>

                    <div className="" >
                        <label className='d-block'>Email</label>
                        <input type="email" name="email" value={user.email} onChange={handleInput} />
                    </div>

                    <div className="" >
                        <label className='d-block'>Password</label>
                        <input type="password" value={user.password} name="password" onChange={handleInput} />

                    </div>
                    {
                        error && <p className="error">{error}</p>
                    }

                    <Button type='submit' className=' '>Login</Button>
                </Form>
            </div>

        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;  /* Full viewport height for centering */
    background-color: #f5f5f5;  /* Optional background for contrast */

    .container_div {
        background-color: ${({ theme }) => theme.colors.white || '#fff'};
        padding: 40px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Optional shadow */
        border-radius: 10px;
        width: 350px;
    }

    label {
        font-size: 20px;
        
        margin-bottom: 4px;
       
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: none;
        border-bottom: 0.2px solid gray;
        outline: none;
        font-size: 16px;
        background-color: transparent; /* Transparent background */
        transition: border-color 0.3s;
       
    }

   
    
    .user-div{
        p{
            color: 	#324C7C;
        }
        .userIcon{
        font-size:70px;
        color: #7BADD2;
       
    }
    }
    

.organizer_email{
    font-size:12px;
}


    .error {
        color: red;
        font-size: 14px;
        margin-top: -15px;
        margin-bottom: 10px;
    }


`;





export default Login;