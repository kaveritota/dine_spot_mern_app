  import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import bgImage from '../assets/Background.png';  
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://dine-spot-mern-app.onrender.com/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('userToken', data.token);
      alert('Login successful!');
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      localStorage.setItem('userToken', token);
      alert('Google login successful!');
      navigate('/');
    } catch (error) {
      setError('Google Sign-in failed');
      console.error(error);
    }
  };

  return (
    <div style={{
      height: '100vh',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '25px',
        padding: '35px',
        width: '65%',
        maxWidth: '400px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        height:'500px',
        marginTop:'90px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px', fontWeight: 500 ,color:'#cd5d0dff'}}>Welcome!</h2>
        <p style={{ textAlign: 'center', color: '#040609ff', marginBottom: '20px' }}>Already have an account? Login </p>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontWeight: 500 }}>{error}</p>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #121316ff',
              outline: 'none',
              width:'100%'
            }}
          />

          <div style={{ position: 'relative' }}>
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '12px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #111316ff',
                width: '100%',
                outline: 'none'
              }}
            />
            <span
              onClick={() => setShowPwd(!showPwd)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#5f6368'
              }}
            >
              {showPwd ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a73e8',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#cd5d0dff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>

          <div style={{ textAlign: 'center', color: '#5f6368' }}>or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#fff',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <FcGoogle size={20} /> Sign in with Google
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ color: '#5f6368' }}>New user?</span>
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={{
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                color: '#cd5d0dff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;     