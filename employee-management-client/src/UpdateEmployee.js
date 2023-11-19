import React from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'

function UpdateEmployee(){
    const {id} = useParams()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [dob, setDob] = useState()
    const [salary, setSalary] = useState()
    const [department, setDepartment] = useState()
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get('http://localhost:3001/getEmployee/' + id)
        .then(result => {
            console.log(result)
            setName(result.data.name)
            setAge(result.data.age)
            setDob(result.data.dob)
            setSalary(result.data.salary)
            setDepartment(result.data.department)
        })
        .catch(err => console.log(err))
    },[id])

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateEmployee/" + id,{name,age,dob,salary,department})
        .then(result =>{
            console.log(result)
            navigate('/')
        } )
        .catch(err => console.log(err))
    }

    return(
        <div>
            <form onSubmit={Update} className='container'>
                <h2>Edit Employee Details</h2>
                <div>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Age</label>
                    <input type='number' placeholder='Enter Age' value={age} onChange={(e) => setAge(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Date Of Birth</label>
                    <input type='text' placeholder='dd-mm-yyyy' value={dob} onChange={(e) => setDob(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Salary</label>
                    <input type='number' placeholder='Enter Salary' value={salary} onChange={(e) => setSalary(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor=''>Department</label>
                    <select type='text' value={department} onChange={(e) => setDepartment(e.target.value)} required>
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
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateEmployee;
