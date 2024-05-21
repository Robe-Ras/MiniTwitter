import './Login.css';
import './LoginScript';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password
    };  

    fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registration successful:', data);
        Cookies.set('token', data.jwt);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/auth/local', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: email,
            password,
          }),
        });
        const data = await response.json();
        console.log('User logged in:', data);
        Cookies.set('token', data.jwt);
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div id="box">
      <div id="main"></div>

      <div id="loginform">
        <h1>SE CONNECTER</h1>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} /><br/>
        <button onClick={handleLogin}>Connection</button>
      </div>

      <div id="signupform">
        <h1>CRÉER UN COMPTE</h1>
        <input type="text" placeholder="Prénom Nom" onChange={(e) => setUsername(e.target.value)} /><br/>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} /><br/>
        <button onClick={handleRegister}>Créer</button>
      </div>

      <div id="login_msg">Vous avez déjà un compte ?</div>
      <div id="signup_msg">Vous n&apos;avez pas encore de compte ?</div>

      <button id="login_btn">Se connecter</button>
      <button id="signup_btn">S&apos;enregistrer</button>
    </div>
  );
};

export default Login;

