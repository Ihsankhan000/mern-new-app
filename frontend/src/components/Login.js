import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"", password:""});
   const navigate = useNavigate();
  
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/login", {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:credentials.email, password: credentials.password})
       });
       const json = await response.json();  
       console.log(json);
       if(json.success){
        // save the authtoken and redirect
        localStorage.setItem('token', json.authtoken)
        props.showAlert("Logged in Successfully", "success");
        navigate('/')
       }else{
        props.showAlert("Invalid Details", "danger")
       }
  }

  

  return (
    <div className='mt-3'>
      <h2 className='my-3'>Login to continue to NoteBook</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value={credentials.email}  onChange={onchange} className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={credentials.password} onChange={onchange} className="form-control" id="password" name='password'/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
