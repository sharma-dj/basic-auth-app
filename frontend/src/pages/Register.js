import React,{useState} from 'react'
import '../App.css'
import axios from 'axios'

const baseUrl = 'http://localhost:5000/users';
const initialState = {}

const Register = () => {
  const [value,setValue] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value; 
    console.log({'uname':name,email,password});
    
    axios.post(`${baseUrl}/add`, {
        'name':name,
        'email':email,
        'password': password
      }
    ).then((res) => {
      console.log('user added!');
    }).catch((err) =>
      console.log('Err'+err)
    );
  }

  return (
    <>
        <h3>Register</h3>
        <div className="container">
            <form action="#" onSubmit={(e) => handleSubmit(e)}>
                <label>Name</label>
                <input type="text" id="name" name="name" placeholder="Your name.." />

                <label>Email</label>
                <input type="text" id="email" name="email" placeholder="Your email.." />

                <label>Password</label>
                <input type="password" id="password" name="password" placeholder="Your password.." />

                <input type="submit" value="Submit" />
            </form>
        </div>
    </>
  )
}

export default Register