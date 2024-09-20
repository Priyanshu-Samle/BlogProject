import React from 'react';
import './AboutPage.css';  // Ensure this CSS file is linked

function AboutPage() {
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Our Blog</h1>
        <p>Discover insightful articles, tutorials, and the latest trends in our blog. Created to inspire and educate.</p>
      </div>

      {/* Project Overview */}
      <div className="project-overview">
        <h2>About Our Blog Project</h2>
        <p>
          Our blog platform is built for sharing knowledge, insights, and experiences. Whether you are a tech enthusiast,
          a creative writer, or someone who loves reading informative content, this blog has something for everyone. 
          Powered by modern technologies like <strong>React</strong> and <strong>Node.js</strong>, we ensure a seamless 
          and fast experience for both content creators and readers.
        </p>
        <p>
          We prioritize user experience with features like dynamic content loading, responsive design, and secure authentication.
          Additionally, our blog supports <strong>CRUD operations</strong> (Create, Read, Update, Delete) allowing users to interact with the content easily.
        </p>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Features</h2>
        <ul>
          <li>Responsive design across all devices</li>
          <li>Efficient image uploads using <strong>Cloudinary</strong></li>
          <li>Dynamic blog listing using <strong>MongoDB</strong> and <strong>Axios</strong></li>
          <li>Real-time event management and user tracking</li>
          <li>Protected and public routing with secure authentication</li>
          <li>Categories and tags for filtering content</li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet the Team</h2>
        <p>
          This project is developed and maintained by a team of passionate developers. From front-end to back-end,
          we work tirelessly to bring you a smooth and engaging experience. Want to know more about us? Feel free to
          get in touch.
        </p>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h3>Start Exploring Now!</h3>
        <p>Join our community of readers and writers. Create your first blog post today or explore our vast collection of articles.</p>
        <button className="cta-button">Explore Blog</button>
      </div>
    </section>
  );
}

export default AboutPage;
    