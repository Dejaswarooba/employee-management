const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Employees')

const app = express()

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://dejaswaroobabalaji:afHePoHfj2vC6EkC@cluster0.nwwo0jm.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: true, // Disable SSL validation (for debugging only)
});

app.get('/', (req,res) => {
    UserModel.find({})
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.get('/getEmployee/:id', (req,res) =>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.put("/updateEmployee/:id",(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name: req.body.name,age: req.body.age,dob: req.body.dob,salary: req.body.salary,department: req.body.department})
    .then(employees => res.json(employees))
    .catch(err => res.json(err))

})

app.delete('/deleteEmployee/:id', (req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post("/addEmployee",(req,res)=>{
    UserModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))

})

app.get('/searchEmployee', (req, res) => {
    const searchTerm = req.query.term;
    const departmentFilter = req.query.department;
    const salaryFilter = req.query.salary;
    const query = {};
  
    if (searchTerm) {
      query.$or = [{ name: new RegExp(searchTerm, 'i') }, { department: new RegExp(searchTerm, 'i') }];
    }
  
    if (departmentFilter) {
      query.department = new RegExp(departmentFilter, 'i');
    }
  
    if (salaryFilter) {
      const salaryRange = salaryFilter.split('-');
      query.salary = { $gte: salaryRange[0], $lte: salaryRange[1] };
    }
  
    UserModel.find(query)
      .then(employees => res.json(employees))
      .catch(err => res.json(err));
  });

  app.get('/averageSalary', (req, res) => {
    UserModel.aggregate([{ $group: { _id: null, averageSalary: { $avg: '$salary' } } }])
      .then(result => res.json({ averageSalary: result[0].averageSalary || 0 }))
      .catch(err => res.json({ averageSalary: 0 }));
  });

app.listen(3001,() => {
    console.log("Server is Running")
})
