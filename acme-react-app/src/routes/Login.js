import { useState } from 'react';
import ApiConfig from '../config/ApiConfig';
import axios from 'axios';
import { useCookies } from 'react-cookie';
const Login = () => {
  const setCookie = useCookies(['acme-user'])[1];
  let [ formState, setFormState ] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    register: false,
  })
  let [ error, setError ] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(
      formState.register ? `${ApiConfig.URL}/user/register` : `${ApiConfig.URL}/user/login`,
      formState
    ).then(res => {
      setCookie('acme-user', {username: res.data.username, token: res.data.token}, {maxAge: 60});
    }).catch(error => {
      setError(error);
    });
  }
  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  return(
    <main className="main">
      <h2 className="section-header">Login</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit} action={formState.register ? `${ApiConfig.URL}/register` : `${ApiConfig.URL}/login`} method="POST">
          <label className="login-label" htmlFor="username">Username</label>
          <input className="login-textbox" type="text" name="username" placeholder="username" value={formState.username} onChange={handleChange} required />

          <label className="login-label" htmlFor="password">Password</label>
          <input className="login-textbox" type="password" name="password" placeholder="password" value={formState.password} onChange={handleChange} required />

          {
            formState.register &&
              <>
                <label className="login-label" htmlFor="confirmPassword">Confirm Password</label>
                <input className="login-textbox" type="password" name="confirmPassword" placeholder="confirm password" value={formState.confirmPassword} onChange={handleChange} required />
              </>
          }

          <label className="login-label" htmlFor="register">New User</label>
          <input className="login-checkbox" type="checkbox" value="register" name="register" checked={formState.register} onChange={handleChange} />

          <button className="btn checkout-button">{formState.register ? "Register" : "Log in"}</button>
          {
            error &&
              <div className="error-box">
                <p>{typeof(error) === "string" ? error : JSON.stringify(error)}</p>
              </div>
          }
        </form>
      </div>
    </main>
  )
}

export default Login;
