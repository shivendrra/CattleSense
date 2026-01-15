
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { BlogPost } from '../types';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const doc = await db.collection('blogs').doc(id).get();
        if (doc.exists) {
          setBlog({ id: doc.id, ...doc.data() } as BlogPost);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-2xl font-serif text-darkBlue mb-4">{error || 'Article not found'}</h2>
      <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
    </div>
  );

  return (
    <article className="min-h-screen bg-white font-sans pb-20">

      {/* 1. Hero Image (Full Width) */}
      <div className="w-full h-[50vh] md:h-[65vh] relative bg-gray-100">
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-darkBlue text-gray-700">
            <span className="material-symbols-outlined text-6xl opacity-20">image</span>
          </div>
        )}
      </div>

      {/* 2. Content Container */}
      <div className="container mx-auto px-6 max-w-6xl py-12 md:py-16">

        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-4">
          {blog.category && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
              {blog.category}
            </span>
          )}
          <span className="text-sm text-gray-500 font-medium">{blog.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-darkBlue mb-8 leading-tight">
          {blog.title}
        </h1>

        {/* Author Section */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-8 mb-10">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-serif text-xl">
            {blog.author.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Written By</span>
            {blog.authorUrl ? (
              <a href={blog.authorUrl} target="_blank" rel="noopener noreferrer" className="text-darkBlue font-medium hover:text-primary transition-colors flex items-center gap-1">
                {blog.author} <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            ) : (
              <span className="text-darkBlue font-medium">{blog.author}</span>
            )}
          </div>
        </div>

        {/* Content */}
        {/* 
            Typography Improvements:
            - prose-lg: Increases font size for better readability.
            - prose-headings:font-serif: Uses the custom serif font for headers.
            - leading-8: Increases line height for body text (relaxed reading).
            - text-gray-700: Slightly softer than pure black.
        */}
        <div
          className="
            prose prose-lg max-w-none 
            prose-headings:font-serif prose-headings:text-darkBlue prose-headings:font-normal prose-headings:mb-4 prose-headings:mt-10
            prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-6 prose-p:font-light
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-darkBlue prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-5 prose-li:text-gray-700 prose-li:mb-2
            prose-img:rounded-sm prose-img:shadow-sm prose-img:w-full prose-img:my-10
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:rounded-r-sm
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer Link */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-gray-500 hover:text-darkBlue transition-colors font-medium group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span> Back to Articles
          </Link>
        </div>

      </div>
    </article>
  );
};

export default BlogPostPage;
