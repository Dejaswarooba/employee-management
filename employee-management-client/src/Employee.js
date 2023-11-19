import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'


function Employee(){
    const [employee, setEmployee] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [showBackButton, setShowBackButton] = useState(false);
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [salaryFilter, setSalaryFilter] = useState('');
    const [averageSalary, setAverageSalary] = useState(null);


   

    useEffect(() => {
        fetchEmployeeData();
      }, []);
    
      const fetchEmployeeData = () => {
        axios.get('http://localhost:3001')
          .then(result => setEmployee(result.data))
          .catch(err => console.log(err));
      };
    

      const calculateAverageSalary = (filteredEmployees) => {
        const totalSalary = filteredEmployees.reduce((acc, employee) => acc + employee.salary, 0);
        const avgSalary = totalSalary / (filteredEmployees.length || 1);
        setAverageSalary(avgSalary);
      };
    
      const handleCalculateAverageSalary = () => {
        calculateAverageSalary(employee);
      };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteEmployee/'+id)
        .then(result => {
            console.log(result.data)
            window.location.reload()
        })

    
        .catch(err => console.log(err))
    }

    const handleSearch = () => {
        const queryParams = [];
        if (searchTerm) {
          queryParams.push(`term=${searchTerm}`);
        }
        
        if (salaryFilter) {
          queryParams.push(`salary=${salaryFilter}`);
        }
    
        const queryString = queryParams.join('&');
    
        axios.get(`http://localhost:3001/searchEmployee?${queryString}`)
          .then(result => {
            setEmployee(result.data);
            setShowBackButton(true);
          })
          .catch(err => console.log(err));
      };

      const handleDepartmentFilter = () => {
        const queryParams = [];
        if (departmentFilter) {
            queryParams.push(`department=${departmentFilter}`);
          }
          const queryString = queryParams.join('&');
    
          axios.get(`http://localhost:3001/searchEmployee?${queryString}`)
            .then(result => {
              setEmployee(result.data);
              setShowBackButton(true);
            })
            .catch(err => console.log(err));

      }
      const handleSalaryFilter = () => {
        const queryParams = [];
        if (salaryFilter) {
            queryParams.push(`salary=${salaryFilter}`);
          }
      
          const queryString = queryParams.join('&');
      
          axios.get(`http://localhost:3001/searchEmployee?${queryString}`)
            .then(result => {
              setEmployee(result.data);
              setShowBackButton(true);
            })
            .catch(err => console.log(err));
      }
    
      const handleBack = () => {
        setShowBackButton(false);
        setSearchTerm('');
        setDepartmentFilter('');
        setSalaryFilter('');
        setAverageSalary(null);
        fetchEmployeeData();
      };

    return(
        <div className='container'>
            <div className='header'>
            <Link to="/create" className='button' >Add Employee</Link>
            <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
        <option value="">Select Department</option>
        
        <option value="IT">IT</option>
        <option value="UI/UX">UI/UX</option>
        <option value="HR And Operations">HR And Operations</option>
        <option value="Business Development">Business Development</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="R&D">R&D</option>
      </select>
      <button className='button' onClick={handleDepartmentFilter}>Filter</button>
      <select value={salaryFilter} onChange={(e) => setSalaryFilter(e.target.value)}>
        <option value="">Salary Range</option>
        
        <option value="0-10000">0-100000</option>
        <option value="10000-20000">10000-20000</option>
        <option value="20000-30000">20000-30000</option>
        <option value="30000-40000">30000-40000</option>
        <option value="40000-50000">40000-50000</option>
        <option value="50000-60000">50000-60000</option>
        <option value="60000-70000">60000-70000</option>
        <option value="70000-80000">70000-80000</option>
        <option value="80000-90000">80000-90000</option>
        <option value="90000-100000">90000-100000</option>
        <option value="100000-">Above 100000</option>
       
      </select>
      <button className='button' onClick={handleSalaryFilter}>Filter</button>
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='button' onClick={handleSearch}>Search</button>
            </div>
            <div className='table-section'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Date Of Birth</th>
                        <th>Salary - In Rupees</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map((employees) => {
                           return <tr>
                                <td className='td'>{employees.name}</td>
                                <td className='td'>{employees.age}</td>
                                <td className='td'>{employees.dob}</td>
                                <td className='td'>{employees.salary}</td>
                                <td className='td'>{employees.department}</td>
                                <td className='action'>
                                <Link className='button' to={`/update/${employees._id}`}>Edit</Link>

                                    <button className='button' onClick={(e) => handleDelete(employees._id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
           
            <button onClick={handleCalculateAverageSalary} className='calculate-btn button'>Calculate Average Salary</button>
            </div>
      {averageSalary !== null && <p>Average Salary: {averageSalary}</p>}

            {showBackButton && <button className='back-btn button'onClick={handleBack}>Back to Home</button>}
        </div>
    )
}

export default Employee;
