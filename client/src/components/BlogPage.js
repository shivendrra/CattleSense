import React from "react";
import { useParams } from "react-router-dom";
import blogs from "./BlogData";
import "./styles/Blog.css";

export default function BlogPost() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) return <h2 className="text-center mt-5">Blog not found</h2>;

  return (
    <>
    <div className="blog-post">
      <div className="blog-header">
        <img src={blog.img} alt={blog.title} />
      </div>

      <div className="container py-5">
        <h1 className="mb-3">{blog.title}</h1>
        <p className="text-muted">{blog.date}</p>
        <div className="blog-content">
          {blog.content.split("\n").map((para, i) => (
            <p key={i} className="blog-para">{para}</p>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
