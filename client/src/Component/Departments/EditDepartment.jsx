import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.error) {
                    alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        }
        fetchDepartments();
    }, []);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setDepartment({...department,[name]:value});
    }


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8000/api/department/${id}`,department,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.data.success){
            navigate('/admin-dashboard/departments')
        }
    } catch (error) {
        if(error.response && !error.response.data.error){
            alert(error.response.data.error);
        }
    }

  }

    return (
        <>
            {
                depLoading ? <div>Loading...</div> :
                    <div className="container dep-container">

                        <div className="departmentadd p-4">

                            <form action="" onSubmit={handleSubmit}>
                                <h3 className="text-center">Edit Departments</h3>
                                <div className="mt-3">
                                    <label htmlFor="dep_name" className="mb-2">Department Name</label><br />
                                    <input type="text"
                                        placeholder="dep. name"
                                        name="dep_name"
                                        value={department.dep_name}
                                        className="inputfild"
                                        onChange={handleChange} />
                                </div>
                                <div className="mt-3 mb-3">
                                    <label htmlFor="description" className="mb-2">Description</label><br />
                                    <textarea
                                        name="description"
                                        value={department.description}
                                        placeholder="Description"
                                        className="inputfild"
                                        onChange={handleChange}>

                                    </textarea>
                                </div>
                                <button type="submit" className="active-link">Edit Department</button>
                            </form>
                        </div>
                    </div>
            }



        </>
    );
};

export default EditDepartment;