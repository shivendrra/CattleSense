
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await db.collection('blogs').orderBy('createdAt', 'desc').get();
        const fetchedBlogs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Modal for reading full blog
  const BlogModal = ({ blog, onClose }: { blog: BlogPost, onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-4xl min-h-[50vh] rounded-sm shadow-2xl relative flex flex-col my-10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10">
          <span className="material-symbols-outlined text-gray-600">close</span>
        </button>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded">{blog.category}</span>
             <span className="text-xs text-gray-400">{blog.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-darkBlue mb-8 leading-tight">{blog.title}</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600 font-light font-sans" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
             <span>Author: {blog.author}</span>
             <button onClick={onClose} className="text-darkBlue hover:underline">Close Article</button>
          </div>
        </div>
      </div>
    </div>
  );

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
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                onClick={() => setSelectedBlog(blog)}
                className="bg-white p-8 border border-gray-100 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded">{blog.category}</span>
                  <span className="text-xs text-gray-400">{blog.date}</span>
                </div>
                <h2 className="text-2xl font-serif text-darkBlue mb-3 group-hover:text-primary transition-colors">{blog.title}</h2>
                <p className="text-gray-500 font-light leading-relaxed mb-4 flex-grow line-clamp-3">{blog.excerpt}</p>
                <div className="mt-auto pt-4 border-t border-gray-50">
                   <span className="text-sm font-medium text-darkBlue flex items-center gap-1 group-hover:gap-2 transition-all">
                     Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}
    </div>
  );
};

export default Blog;
