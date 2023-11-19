import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AddEmployee(){
        const [name, setName] = useState()
        const [age, setAge] = useState()
        const [dob, setDob] = useState()
        const [salary, setSalary] = useState()
        const [department, setDepartment] = useState()
        const navigate = useNavigate()

        const Submit = (e) => {
            e.preventDefault();
            axios.post("http://localhost:3001/addEmployee",{name,age,dob,salary,department})
            .then(result =>{
                console.log(result)
                navigate('/')
            } )
            .catch(err => console.log(err))
        }
    return(
        
        <div >
            <form onSubmit={Submit} className='container'>
                <h2> Employee Details</h2>
                <div>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Age</label>
                    <input type='number' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Date Of Birth</label>
                    <input type='text' placeholder='dd-mm-yyyy'
                    value={dob} onChange={(e) => setDob(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Salary</label>
                    <input type='number' placeholder='Enter Salary' onChange={(e) => setSalary(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Department</label>
                    <select type='text' onChange={(e) => setDepartment(e.target.value)} required>
        <option value=""> Department</option>
        
        <option value="IT">IT</option>
        <option value="UI/UX">UI/UX</option>
        <option value="HR And Operations">HR And Operations</option>
        <option value="Business Development">Business Development</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="R&D">R&D</option>
      </select>
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddEmployee;