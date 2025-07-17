import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Contact Section */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Contact Us</h3>
          <p>📍 Location</p>
          <p>📞 Call +01 1234567890</p>
          <p>✉️ demo@gmail.com</p>
        </div>

        {/* About App Section */}
        <div style={styles.column}>
          <h3 style={styles.heading}>DineSpot</h3>
          <p style={styles.text}>
            DineSpot helps you discover the best food spots around you. Find restaurants by location and cuisine — fast, easy, and reliable.
          </p>
          <div style={styles.socials}>
            <span style={styles.icon}>🌐</span>
            <span style={styles.icon}>🐦</span>
            <span style={styles.icon}>🔗</span>
            <span style={styles.icon}>📸</span>
            <span style={styles.icon}>📌</span>
          </div>
        </div>

        {/* Replaced Section: Top Locations */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Popular Locations</h3>
          <p>🍲 Madhapur</p>
          <p>🍛 Jubilee Hills</p>
          <p>🍕 Gachibowli</p>
          <p>🍜 Kukatpally</p>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>© 2025 All Rights Reserved By DineSpot</p>
        <p>Designed with ❤️ for food lovers</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'rgb(21, 4, 4)',
    color: '#fff',
    padding: '40px 20px 20px',
    fontFamily: 'Arial, sans-serif',
    width:'100%',
    height:'fit-content'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '20px',
    marginBottom: '30px',
  },
  column: {
    flex: '1',
    minWidth: '250px',
    maxWidth: '300px',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    fontFamily: 'cursive',
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.6',
  },
  socials: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    fontSize: '20px',
  },
  icon: {
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#1c1f24',
    padding: '4px',
    borderRadius: '50%',
    width: '28px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    textAlign: 'center',
    fontSize: '14px',
    borderTop: '1px solid #333',
    paddingTop: '10px',
    lineHeight: '1.6',
  },
};

export default Footer;
