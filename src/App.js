import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import logo from '../src/assets/utb-logotipo.png'
import { DeleteFilled, EditFilled, SnippetsFilled, FileAddFilled } from '@ant-design/icons';


function App() {
  const [ unic, setUnic] = useState('nothing')
  const [datos, setDatos] = useState()
  const [ datosUnicos, setDatosUnicos] = useState()
  const [ nombre, setNombre] = useState({ FirstName: ""})
  const [ employee, setEmployee] = useState({ 
    LastName: "",
    FirstName: "",
    Title: "",
    ReportsTo: "",
    BirthDate: "",
    HireDate: "",
    Address:"",
    City: "",
    State: "",
    Country:  "",
    PostalCode: "",
    Phone: "",
    Fax: "",
    Email: ""      
  })

  const [codigo, setCodigo] = useState()
 
  //const [ newName, setNewName] = useState()
  //const [ updateName, setUpdateName] = useState()
  
 

  const getEmployees = async() =>{
    try {
      const resUsers = await axios('https://deacostac.pythonanywhere.com/employees')
      setDatos(resUsers.data.data)
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getEmployees()
  }, [])

 const handleDetalles = async(cod) => {
  try {
    const resOneUsers = await axios(`https://deacostac.pythonanywhere.com/employees/${cod}`)
    setDatosUnicos(resOneUsers.data.data)
    setUnic('showEmployee')
  } catch (error){
    console.log(error)
  }
  setEmployee({ 
    LastName: "",
    FirstName: "",
    Title: "",
    ReportsTo: "",
    BirthDate: "",
    HireDate: "",
    Address:"",
    City: "",
    State: "",
    Country:  "",
    PostalCode: "",
    Phone: "",
    Fax: "",
    Email: ""      
  })
  } 

  
  const handleDelete = async(cod) => {
    try {
      const resOneUsers = await axios.delete(`https://deacostac.pythonanywhere.com/delete/${cod}`)
      setDatosUnicos(resOneUsers.data.data)
      getEmployees()
    } catch (error){
      console.log(error)
    }
    setUnic('nothing')
    setEmployee({ 
      LastName: "",
    FirstName: "",
    Title: "",
    ReportsTo: "",
    BirthDate: "",
    HireDate: "",
    Address:"",
    City: "",
    State: "",
    Country:  "",
    PostalCode: "",
    Phone: "",
    Fax: "",
    Email: ""      
    })
    } 

  const handleUpdate = async () => {
    
    try {
      const resUpdate = await axios.put(`https://deacostac.pythonanywhere.com/employee/${codigo}`, nombre)
      console.log(resUpdate.data.data);
    }catch (error){
      console.log(error)
    } 
    setUnic('nothing')
    getEmployees()   
    setNombre({ FirstName: ""}) 
    setEmployee({ 
      LastName: "",
    FirstName: "",
    Title: "",
    ReportsTo: "",
    BirthDate: "",
    HireDate: "",
    Address:"",
    City: "",
    State: "",
    Country:  "",
    PostalCode: "",
    Phone: "",
    Fax: "",
    Email: ""      
    })       
  }  

  const handleChange = (e) => {
    setNombre({FirstName: e.target.value});
    console.log(nombre)
  }

  const handleChangeEmployee = (e) => {
    setEmployee({[e.target.id]: e.target.value})
    console.log(employee)
  }

  const handleModificar = (cod) => {
    setUnic('updateEmployee') 
    setCodigo(cod)
  }

  const handleShowAdd = () =>{
    setUnic('addEmployee')
    setEmployee({ 
      LastName: "",
    FirstName: "",
    Title: "",
    ReportsTo: "",
    BirthDate: "",
    HireDate: "",
    Address:"",
    City: "",
    State: "",
    Country:  "",
    PostalCode: "",
    Phone: "",
    Fax: "",
    Email: ""      
    })
  }

  const handleAdd = async () => {
    try {
      const resUpdate = await axios.post(`https://deacostac.pythonanywhere.com/employees`,{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }, data:{employee} })
      console.log(resUpdate.data.data);
    }catch (error){
      console.log(error)
    } 
    setUnic('nothing')
    getEmployees()        
  }

  return (
    <div className="App">
      <div className="header">
        <div><img src={logo} alt="utb-logo"></img></div>
      </div>
      <h1>Consumir APIRest</h1>
      <button onClick={() => handleShowAdd()}><FileAddFilled className="svg"/></button>
      <div >      
             <div className="containerTable">
             <table className="tabla">
           <tr className="head">
             <th className="table-header-id">Id</th>
             <th className="table-header">Nombre</th>
             <th className="table-header">Apellido</th>
             <th className="table-header">Email</th>
             <th className="table-header">Teléfono</th>
             <th className="table-header">Dirección</th>
             <th className="table-header">Cumpleaños</th>
             {/* <th>Cargo</th>
             <th>Pais</th>
             <th>Ciudad</th>
             <th>Estado</th>
             <th>Contratación</th>
             <th>Fax</th>
             <th>Código Postal</th>
             <th>Reportes</th> */}
           </tr>
            {datos?.map((item) => {
            return( 
             
              <tr>
                <td>{item.EmployeeId}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.Address}</td>
                <td>{item.BirthDate}</td>
                {/* <td>{item.Title}</td>
                <td>{item.Country}</td>
                <td>{item.City}</td>
                <td>{item.State}</td>
                <td>{item.HireDate}</td>
                <td>{item.Fax}</td>
                <td>{item.PostalCode}</td>
                <td>{item.ReportsTo}</td> */}
                <td className="detailbutton"><button  onClick={() => handleDetalles(item.EmployeeId)}><SnippetsFilled className="svg"/></button></td>
                <td className="updatebutton"><button  onClick={() => handleModificar(item.EmployeeId)}><EditFilled className="svg"/></button></td>
                <td className="deletebutton"><button  onClick={() => handleDelete(item.EmployeeId)}><DeleteFilled className="svg"/></button></td>
              </tr>

             
              
            )
            
          })}
          </table>
            </div>
            
          
      </div>
     { <div>
      {unic === 'showEmployee' && 
     
            
      <div className="containerEmployee">
      <table className="tabla">
    <tr className="head">
      <th>Id</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Email</th>
      <th>Teléfono</th>
      <th>Dirección</th>
      <th>Cumpleaños</th>
      <th>Cargo</th>
      <th>Pais</th>
      <th>Ciudad</th>
      <th>Estado</th>
      <th>Contratación</th>
      <th>Fax</th>
      <th>Código Postal</th>
      <th>Reportes</th>
    </tr>
     {datosUnicos?.map((item) => {
     console.log(item)
     return( 
      
       <tr>
         <td>{item.EmployeeId}</td>
         <td>{item.FirstName}</td>
         <td>{item.LastName}</td>
         <td>{item.Email}</td>
         <td>{item.Phone}</td>
         <td>{item.Address}</td>
         <td>{item.BirthDate}</td>
         <td>{item.Title}</td>
         <td>{item.Country}</td>
         <td>{item.City}</td>
         <td>{item.State}</td>
         <td>{item.HireDate}</td>
         <td>{item.Fax}</td>
         <td>{item.PostalCode}</td>
         <td>{item.ReportsTo}</td> 
       </tr>      
     )
     
   })}
   </table>
     </div>
      }

      </div> }
      { unic === "updateEmployee" &&
        <>
        <div>
          <h1>Modificar Nombre</h1>
        </div>
        <div>
        <label>Nombre</label><input placeholder="Digíte su nombre" value={nombre.FirstName} onChange={handleChange}></input>
      </div>
      <div>
          <button onClick={() => handleUpdate()}>Modificar</button>
        </div>
      </>
      }
      { unic === "addEmployee" &&
        <>
        <div>
          <h1>Agregar Empleado</h1>
        </div>
        <div className="containerAdd">
        <div className="addItem">
        <div className="left">
            <label className="label">Nombre</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su nombre" id="first_name" value={employee.FirstName} onChange={handleChangeEmployee}></input>
        </div>   
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Apellido</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Apellido" id="last_name" value={employee.LastName} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Email</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Email" id="email" value={employee.Email} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Telefono</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Telefono" id="phone" value={employee.Phone} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Direcciòn</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Direccion" id="address" value={employee.Address} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Cumpleaños</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Cumpleaños" id="birth_date" value={employee.BirthDate} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Cargo</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Cargo" id="title" value={employee.Title} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Pais</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Pais" id="country" value={employee.Country} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Ciudad</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Ciudad" id="city" value={employee.City} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Estado</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Estado" id="state" value={employee.State} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Contrataciòn</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su Fecha de contratacion" id="hire_date" value={employee.HireDate} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Fax</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su fax" id="fax" value={employee.Fax} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Codigo Postal</label>
        </div>
        <div className="right">
          <input placeholder="Digíte su codigo postal" id="postal_code" value={employee.PostalCode} onChange={handleChangeEmployee}></input>
        </div>
        </div>
        <div className="addItem">
        <div className="left">
          <label className="label">Reportes</label>
        </div>
        <div className="right">
          <input placeholder="Digíte sus reportes" id="reports_to" value={employee.ReportsTo} onChange={handleChangeEmployee}></input>
        </div>
        </div>
      </div>
      <div>
          <button onClick={() => handleAdd()}>Agregar</button>
        </div>
      </>
      }
    </div>
  );
}

export default App;
