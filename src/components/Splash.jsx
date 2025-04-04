import React, { useEffect } from 'react';
import './Splash.css'; // Import the dedicated CSS file

const Splash = ({ onFinish, duration = 3000 }) => {
  useEffect(() => {
    // Set up timer to redirect after duration
    const redirectTimer = setTimeout(() => {
      onFinish();
    }, duration);
    
    // Clean up timer on unmount
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [duration, onFinish]);
  
  return (
    <div className="splash-container">
      <div className="splash-content">
          <h1 className="splash-title">Welcome to SokoGarden</h1>
          
          <img 
            src="/assets/images/shopping-cart.gif" 
            alt="Shopping Cart" 
            className="splash-image"
          />
          
          <p className="splash-text">Loading amazing products...</p>
      </div>
    </div>
  );
};

export default Splash;