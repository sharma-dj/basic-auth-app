import React,{useState} from 'react'
import '../App.css'
import axios from 'axios'
import Forminput from '../componets/Forminput';

const baseUrl = 'http://localhost:5000/users';
const initialState = {
  "name" : "",
  "email" : "",
  "password" : "",
  "isMember" : false
}

const Register = () => {
  const [values,setValues] = useState(initialState)

  const toggleMember = () => {
    setValues({...values, isMember:!values.isMember})
  }

  const handleChange = (e) => {
    console.log(e.target);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value; 
    console.log({'uname':name,email,password});
    
    // axios.post(`${baseUrl}/add`, {
    //     'name':name,
    //     'email':email,
    //     'password': password
    //   }
    // ).then((res) => {
    //   console.log('user added!');
    // }).catch((err) =>
    //   console.log('Err'+err)
    // );
  }

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