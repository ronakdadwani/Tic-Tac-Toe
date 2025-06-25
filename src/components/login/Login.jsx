import { useState, useEffect } from 'react';
import './Login.css';

const IMAGE_COUNT = 5;
const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
];

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrent(next);
        setNext((next + 1) % IMAGE_COUNT);
        setFade(false);
      }, 900); // fade duration
    }, 8000);
    return () => clearInterval(interval);
  }, [next]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    } else {
      setError('Please enter your name.');
    }
  };

  // Placeholder handlers for social logins
  const handleGoogleLogin = () => {
    setError('Google login not implemented yet.');
  };
  const handleFacebookLogin = () => {
    setError('Facebook login not implemented yet.');
  };

  return (
    <div className="login-bg-carousel-fade">
      <div
        className="login-bg-img base"
        style={{ backgroundImage: `url(${IMAGE_URLS[current]})` }}
      ></div>
      <div
        className={`login-bg-img top${fade ? ' show' : ''}`}
        style={{ backgroundImage: `url(${IMAGE_URLS[next]})` }}
      ></div>
      <div className="login-bg-overlay"></div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">Tic-Tac-Toe</div>
          <h2>Sign In</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button type="submit">Login</button>
          <div className="divider"><span>or</span></div>
          <button type="button" className="social-btn google" onClick={handleGoogleLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="" />
            Login with Google
          </button>
          <button type="button" className="social-btn facebook" onClick={handleFacebookLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
            Login with Facebook
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </div>
    
  );
}

export default Login; 