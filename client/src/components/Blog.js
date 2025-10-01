import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Blog.css';
import blogs from './BlogData';

export default function Blog() {
  const allBlogs = [
    "Precision Dairy Farming: How Technology Can Help",
    "Optimizing Heat Detection in Dairy Cattle",
    "Heat Detection in Cattle: Improving Reproductive Efficiency",
    "Steps to Boost Profitability of a Dairy Farm",
    "Lumpy Skin Disease in India: What Farmers Need to Know",
    "From Ancient Fields to Future Farms: Smart Livestock Practices"
  ];

  return (
    <div className="blog-page container-fluid gx-0">

      {/* Section 1 - Header / Lander */}
      <section className="blog-header text-center">
        <h1 className="blog-title">Our Blogs</h1>
        <p className="blog-subtitle">
          Explore insights, expert advice, and the latest trends in livestock management,
          antimicrobial usage, and sustainable farming practices.
        </p>
        <br />
        <hr className='hr-divider'/>
      </section>

      {/* Section 2 - Top Blogs */}
      <section className="top-blogs container mb-5">
        <h2 className="section-heading">Top Fetched Articles</h2>
        <div className="row mx-auto">
          {blogs.map((blog, i) => (
            <div key={i} className="col-md-4 mb-4 d-flex">
              <div className="blog-card">
                <img src={blog.img} alt={blog.title} className="blog-img" />
                <div className="blog-content p-3">
                  <span className="blog-date">{blog.date}</span>
                  <h5 className="blog-card-title">{blog.title}</h5>
                  <p className="blog-desc">{blog.desc}</p>
                  <Link to={`/blog/${blog.id}`} className="btn btn-custom mt-auto">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 - All Blogs */}
      <section className="all-blogs container my-5">
        <h2 className="section-heading">Explore More Articles</h2>
        <div className="row">
          {allBlogs.map((title, i) => (
            <div key={i} className="col-md-6 mb-3">
              <div className="all-blog-item p-3">
                <span className="material-symbols-outlined me-2">article</span>
                {title}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}