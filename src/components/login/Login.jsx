import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

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
          Login with Google
        </button>
        <button type="button" className="social-btn facebook" onClick={handleFacebookLogin}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
          Login with Facebook
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

export default Login; 