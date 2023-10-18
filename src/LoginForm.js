import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Handle login started"); // Debugging

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registered successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully!');

        // Debugging
        console.log("Attempting to navigate to /dashboard");
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error:", error); // Debugging
    }
  };

  return (
    <div className="login-form">
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={handleLogin} className="form-container">
        <label className="form-label">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="form-label">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="center-button">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="center-button">
        {isSignUp ? 'Already registered? Log in!' : 'New here? Sign up!'}
      </button>
    </div>
  );
  
};

export default Login;






