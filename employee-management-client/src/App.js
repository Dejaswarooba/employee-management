import { useState } from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Employee from './Employee';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
function App() {
  const [count, setCount] = useState(0)
  return (
    
    
    <div className='outer'>
      <h2 className='title'>EMPLOYEE MANAGEMENT SYSTEM</h2>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Employee/>}></Route>
            <Route path='/create' element={<AddEmployee/>}></Route>
            <Route path='/update/:id' element={<UpdateEmployee/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


