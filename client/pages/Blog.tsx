
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await db.collection('blogs').get();
        const fetchedBlogs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        // Sort by editorial date (descending)
        fetchedBlogs.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();

          // Handle invalid dates by falling back to 0 or createdAt if available
          const validDateA = isNaN(dateA) ? (a.createdAt?.toMillis() || 0) : dateA;
          const validDateB = isNaN(dateB) ? (b.createdAt?.toMillis() || 0) : dateB;

          return validDateB - validDateA;
        });

        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-subtle py-20 font-sans">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Insights</span>
          <h1 className="text-5xl font-serif text-darkBlue mb-4">The CattleSense Blog</h1>
          <p className="text-gray-500 font-light">Latest news, success stories, and educational resources on sustainable farming.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <span className="material-symbols-outlined text-4xl mb-2">article</span>
            <p>No articles published yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog.id}`}
                key={blog.id}
                className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group flex flex-col h-full rounded-sm overflow-hidden"
              >
                {/* Card Image */}
                <div className="h-64 w-full bg-gray-100 overflow-hidden relative">
                  {blog.imageUrl ? (
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                      <span className="material-symbols-outlined text-5xl">image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-darkBlue bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4 text-xs text-gray-400 flex items-center gap-2">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.author}</span>
                  </div>
                  <h2 className="text-2xl font-serif text-darkBlue mb-3 group-hover:text-primary transition-colors leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <span className="text-sm font-medium text-darkBlue flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
