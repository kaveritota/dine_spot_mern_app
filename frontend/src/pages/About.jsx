 import React from 'react';
 import Footer from '../components/Footer';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>

      <p style={styles.paragraph}>
        <strong>DineSpot</strong> is a restaurant discovery platform built to help users explore the best places to eat in their city. From local favorites to trending cuisines, DineSpot simplifies the way people find food around them by offering a seamless and intuitive browsing experience.
      </p>

      <p style={styles.paragraph}>
        Whether you're searching by location or cuisine, DineSpot aims to deliver relevant and nearby options with ease. The platform is built with a focus on speed, simplicity, and usability across all devices.
      </p>

      {/* <h2 style={styles.subheading}>Technology Stack</h2>
      <p style={styles.paragraph}>
        DineSpot is developed using the MERN stack — <strong>MongoDB, Express.js, React.js, and Node.js</strong>. It leverages modern UI practices to provide a smooth and responsive user experience.
      </p> */}
       {/* <Footer/> */}
    </div>
    
     
  );
};

const styles = {
  container: {
    maxWidth: '100%',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#2c3e50',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '24px',
    marginTop: '30px',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
};

export default About;
