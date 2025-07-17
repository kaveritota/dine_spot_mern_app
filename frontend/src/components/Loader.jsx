 import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Loader;
