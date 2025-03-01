import React from 'react';

function Login() {
  const handleLogin = () => {
    // Redirect to the Flask backend login endpoint
    window.location.href = "http://127.0.0.1:5000/login";
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <button className="btn" onClick={handleLogin}>
        Login with Auth0
      </button>
    </div>
  );
}

export default Login;
