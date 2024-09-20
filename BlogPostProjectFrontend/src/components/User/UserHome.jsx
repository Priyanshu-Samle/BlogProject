
import React from 'react';
import './UserHome.css'; 

function HomePage() {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-text">
                    <h1>Welcome to Our Blog</h1>
                    <p>Discover insights, stories, and the latest news in the world of blogging.</p>
                    <button className="cta-btn">Explore Now</button>
                </div>
                <div className="hero-video">
                    <video autoPlay muted loop>
                        <source src="https://media.istockphoto.com/id/1480492583/video/asian-female-student-study-computer-cafe-woman-read-news-girl-internet-learn.mp4?s=mp4-640x640-is&k=20&c=YrqJuGlIz42PqKRTU5YBExDfTceBDE3s2SxTNJ0-DtA=" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Featured Blogs Section */}
            <section className="featured-blogs">
                <h2>Featured Blogs</h2>
                <div className="blogs-container">
                    {/* Blog 1 */}
                    <div className="blog-card">
                        <img src="https://media.istockphoto.com/id/922745190/photo/blogging-blog-concepts-ideas-with-worktable.jpg?s=612x612&w=0&k=20&c=xR2vOmtg-N6Lo6_I269SoM5PXEVRxlgvKxXUBMeMC_A=" alt="Blog 1" />
                        <div className="blog-content">
                            <h3>How to Start a Blog in 2024</h3>
                            <p>Starting a blog has never been easier. Here's everything you need to know...</p>
                        </div>
                    </div>

                    {/* Blog 2 */}
                    <div className="blog-card">
                        <img src="https://lerablog.org/wp-content/uploads/2018/01/gtrgrtgfgfgs.jpg" alt="Blog 2" />
                        <div className="blog-content">
                            <h3>Tips for Writing Engaging Content</h3>
                            <p>Creating content that resonates with your audience is key. Learn the best practices...</p>
                        </div>
                    </div>

                    {/* Blog 3 */}
                    <div className="blog-card">
                        <img src="https://www.shutterstock.com/image-photo/cropped-image-female-holding-smartphone-600nw-1099878668.jpg" alt="Blog 3" />
                        <div className="blog-content">
                            <h3>The Future of Blogging</h3>
                            <p>What does the future hold for blogging? Here are some trends you need to watch out for...</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery Section */}
            <section className="image-gallery">
                <h2>Image Gallery</h2>
                <div className="gallery-container">
                    <img src="https://media.gettyimages.com/id/689231117/photo/wooden-bricks-spelling-the-word-blog.jpg?s=612x612&w=gi&k=20&c=o44dfRIcNgvGgYew9I9pLKyRe_5nX7IERVGjwkqbCGQ=" alt="Gallery 1" />
                    <img src="https://webartdevelopers.com/blog/wp-content/uploads/2019/02/Gallery-Blog-web-and-mobile-website-template.jpg" alt="Gallery 2" />
                    <img src="https://cdn.pixabay.com/photo/2014/08/27/08/11/blogging-428955_640.jpg" alt="Gallery 3" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAnd58fNFBJJnw_sraQRCX5W_1COmm3gMjcA&s" alt="Gallery 4" />
                </div>
            </section>
        </div>
    );
}

export default HomePage;
