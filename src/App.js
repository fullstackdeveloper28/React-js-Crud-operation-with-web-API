/* import logo from './logo.svg'; */
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users,setUser]=useState([]);
  const [id, setId] = useState('0');
  const [loginName, setLoginName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  function AddUpdate() {
    let items = { id, loginName, name, password, mobile }
    fetch('http://localhost:54780/Angular/api/AddUpdate',
      {
        method: "POST",
        headers:
        {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(items)
      }).then((result)=>{
        result.json().then((resp)=>
        {
          console.warn(resp);
          alert(resp[0].Status)
          GetUsers();
        })
      })
  }
useEffect(()=>
{
  GetUsers();
},[])
  function GetUsers() {
   
    fetch('http://localhost:54780/Angular/api/UsersDetails').then((result)=>{
        result.json().then((resp)=>
        {
          setUser(resp);
        })
      })
  }
  function selectUser(id)
  {
   let item= users[id-1];
   setId(item.Id);
   setLoginName(item.LoginName)
   setName(item.Name)
   setPassword(item.Password)
   setMobile(item.Mobile)
   console.warn(item);
  }
  function deleteUser(id)
  {
    let items = { id }
    fetch('http://localhost:54780/Angular/api/UserDelete',
      {
        method: "POST",
        headers:
        {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(items)
      }).then((result)=>{
        result.json().then((resp)=>
        {
          console.warn(resp);
          alert(resp[0].Status)
          GetUsers();
        })
      })
  }
  return (
    <div className="App">
      <h1>React JS CRUD Operation with web API</h1>
      <div><input type='hidden' value={id} onChange={(e) => { setId(e.target.value) }} placeholder='login name'></input></div>
      <div><input type='text' value={loginName} onChange={(e) => { setLoginName(e.target.value) }} placeholder='login name'></input></div>
      <div><input type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='name'></input></div>
      <div><input type='text' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='pasword'></input></div>
      <div><input type='text' value={mobile} onChange={(e) => { setMobile(e.target.value) }} placeholder='mobile'></input></div>
      <div><button type="button" onClick={AddUpdate} >Add/Update</button></div>
      <br />
      <table border="1" className="App a1">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Login Name</th>
            <th>Name</th>
            <th>Password</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item,i)=>(
          <tr key={i}>
            <td>{i+1}</td>
            <td>{item.Id}</td>
            <td>{item.LoginName}</td>
            <td>{item.Name}</td>
            <td>{item.Password}</td>
            <td>{item.Mobile}</td>
            <td>
              <button onClick={()=> selectUser(i+1)}>Edit</button>
              <button onClick={()=> deleteUser(item.Id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
