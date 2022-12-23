import React,{useState,useEffect} from 'react'
import '../App.css'
import axios from 'axios'
import Forminput from '../componets/Forminput';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'

const baseUrl = 'http://localhost:5000/users';
const initialState = {
  "name" : "",
  "email" : "",
  "password" : "",
  "isMember" : false
}

const Register = () => {
  const [values,setValues] = useState(initialState)

  const {registerUser,user,loginUser} = useAppContext()
  const navigate = useNavigate()

  const toggleMember = () => {
    setValues({...values, isMember:!values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name,email,password,isMember} = values
    console.log({'uname':name,email,password});
    
    if(!email || !password || (!isMember && !name)) {
      return
    }

    const currentUser = {name, email, password}

    if(isMember) {
      console.log('Already a member');
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  }

  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate('/')
      },2000)
    }
  },[user,navigate])

  return (
    <>
        <h3>{!values.isMember ? 'Login' : 'Register' }</h3>
        <div className="container">
            <form action="#" onSubmit={(e) => handleSubmit(e)}>
            { values.isMember && (
                <Forminput label="Name" id="name" name="name" placeholder="Your name .." type="text" value={values.name} handleChange={handleChange} />
            )}
                <Forminput label="Email" id="email" name="email" placeholder="Your email .." type="text" value={values.email} handleChange={handleChange} />
                <Forminput label="Password" id="password" name="password" placeholder="password" type="password" value={values.password} handleChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
            <label>{ values.isMember ? 'Already a member?' : 'Not a member yet?'}</label>
            <button onClick={toggleMember}>{values.isMember ? 'Login' : 'Register'}</button>
        </div>
    </>
  )
}

export default Register