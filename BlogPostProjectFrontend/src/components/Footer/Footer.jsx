
import React from 'react';
import './FooterStyle.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>Info</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#">Free Resources</a></li>
            <li><a href="#">Popular Articles</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-col newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe for the latest updates and articles:</p>
          <form action="#">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Your Blog Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
