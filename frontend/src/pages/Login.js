import React from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:5000/users';

const Login = () => {

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.get(`${baseUrl}/${email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.password == password) {
          console.log('Login successfull');
        } else {
          console.log('Login failed');
        }
      }).catch((err) =>
        console.log('Err'+err)
      );
  }

  return (
    <>
        <h3>Login</h3>
        <div className="container">
            <form action="#" onSubmit={(e) => handleLogin(e)}>
                <label>Email</label>
                <input type="text" id="email" name="email" placeholder="Your email.." />

                <label>Password</label>
                <input type="password" id="password" name="password" placeholder="Your password.." />

                <input type="submit" value="Login" />
            </form>
        </div>
    </>
  )
}

export default Login
