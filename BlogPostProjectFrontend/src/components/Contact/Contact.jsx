import React, { useState } from 'react';
import './Contact.css'; 
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ContactForm } from '../../redux/actions/authActions';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [popup, setPopup] = useState({ visible: false, message: '', color: '' });
   const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    
    try {
        dispatch(ContactForm(formData));
        setPopup({ visible: true, message: 'Message Send successful!..', color: 'green' });

        setTimeout(() => {
          setPopup({ visible: false, message: '', color: '' });
          // setIsLogin(true); // Redirect to login form
        }, 3000);

       setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
       });
    } catch (error) {
        
    }
  };

  return (
    <section className="contact-page">
         {popup.visible && (
        <div
          style={{
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: popup.color,
          }}
        >
          {popup.message}
        </div>
      )}
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Whether you have a question, feedback, or just want to say hi, feel free to reach out!</p>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="contact-info">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: <a href="mailto:support@yourblog.com">support@yourblog.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
        <p>Address: 123 Your Street, Your City, Your Country</p>
      </div>

      {/* Optional Map Section */}
      <div className="map-section">
      <h2>Find Us Here</h2>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509366!2d144.95373531531674!3d-37.816279979751594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774e4a8431e259!2sYour%20Business%20Location!5e0!3m2!1sen!2sus!4v1694953651942!5m2!1sen!2sus"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    </section>
  );
}

export default ContactPage;
