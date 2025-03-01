import React from 'react';

function Home() {
  const handleLogin = () => {
    // Redirect to the Flask backend login endpoint
    window.location.href = "http://127.0.0.1:5000/login";
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="title">Welcome to Healthcare Website</h1>
        <p className="subtitle">Your health, our priority.</p>
        <button className="btn" onClick={handleLogin}>
          Login with Auth0
        </button>
      </div>
    </div>
  );
}

export default Home;
