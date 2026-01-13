
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import firebase from 'firebase/compat/app';
import { Ticket, BlogPost } from '../types';

const AdminDashboard: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'blogs'>('tickets');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  // Blog Editor State
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    category: 'News',
    excerpt: '',
    content: '',
    author: 'Admin',
    authorUrl: '',
    imageUrl: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });

  const ADMIN_EMAIL = 'shivharsh44@gmail.com';

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        navigate('/dashboard');
      } else {
        fetchData();
      }
    }
  }, [currentUser, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Tickets
      const ticketSnap = await db.collection('tickets').orderBy('createdAt', 'desc').get();
      const fetchedTickets = ticketSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ticket[];
      setTickets(fetchedTickets);

      // Fetch Blogs
      const blogSnap = await db.collection('blogs').orderBy('createdAt', 'desc').get();
      const fetchedBlogs = blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketStatus = async (id: string, newStatus: string) => {
    try {
      await db.collection('tickets').doc(id).update({ status: newStatus });
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus as any } : t));
    } catch (error) {
      console.error("Failed to update ticket", error);
    }
  };

  const deleteTicket = async (id: string) => {
    if (!window.confirm("Delete this ticket permanently?")) return;
    try {
      await db.collection('tickets').doc(id).delete();
      setTickets(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Failed to delete ticket", error);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...blogForm,
        // Ensure we have a date, fallback to today if cleared
        date: blogForm.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdAt: blogForm.createdAt || firebase.firestore.FieldValue.serverTimestamp()
      };

      if (blogForm.id) {
        await db.collection('blogs').doc(blogForm.id).update(payload);
      } else {
        await db.collection('blogs').add(payload);
      }

      setIsEditingBlog(false);
      resetBlogForm();
      fetchData(); // Refresh list
    } catch (error) {
      console.error("Error saving blog", error);
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      category: 'News',
      excerpt: '',
      content: '',
      author: 'Admin',
      authorUrl: '',
      imageUrl: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await db.collection('blogs').doc(id).delete();
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  const editBlog = (blog: BlogPost) => {
    setBlogForm(blog);
    setIsEditingBlog(true);
  };

  // Explicitly ensuring text color is darkBlue for readability
  const inputClass = "w-full p-3 border border-gray-300 bg-white rounded focus:border-darkBlue focus:ring-1 focus:ring-darkBlue outline-none text-darkBlue placeholder-gray-400 transition-all text-sm";
  const labelClass = "block text-xs font-bold text-gray-600 uppercase mb-2";

  if (authLoading || loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-darkBlue text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-serif">Admin Console</h1>
          <p className="text-xs text-gray-500 mt-1">{currentUser?.email}</p>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${activeTab === 'tickets' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <span className="material-symbols-outlined">confirmation_number</span> Support Tickets
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${activeTab === 'blogs' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <span className="material-symbols-outlined">article</span> Blog Management
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">

        {/* --- TICKETS VIEW --- */}
        {activeTab === 'tickets' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-darkBlue">Support & Data Requests</h2>
              <div className="text-sm text-gray-500">Total: {tickets.length}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-gray-500">Status</th>
                      <th className="px-6 py-4 text-gray-500">Date</th>
                      <th className="px-6 py-4 text-gray-500">User</th>
                      <th className="px-6 py-4 text-gray-500">Type</th>
                      <th className="px-6 py-4 text-gray-500">Message</th>
                      <th className="px-6 py-4 text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <select
                            value={ticket.status}
                            onChange={(e) => handleTicketStatus(ticket.id, e.target.value)}
                            className={`text-xs font-bold uppercase px-2 py-1 rounded border-none focus:ring-0 cursor-pointer ${ticket.status === 'open' ? 'bg-green-100 text-green-700' :
                                ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                              }`}
                          >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {ticket.createdAt?.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-darkBlue">{ticket.name}</div>
                          <div className="text-xs text-gray-400">{ticket.email}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{ticket.type}</td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={ticket.message}>
                          {ticket.message}
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteTicket(ticket.id)} className="text-red-500 hover:text-red-700">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- BLOGS VIEW --- */}
        {activeTab === 'blogs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-darkBlue">Blog Management</h2>
              <button
                onClick={() => { resetBlogForm(); setIsEditingBlog(true); }}
                className="bg-darkBlue text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-black transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add</span> New Article
              </button>
            </div>

            {isEditingBlog ? (
              <div className="bg-white p-8 border border-gray-200 rounded-sm shadow-lg max-w-4xl mx-auto animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-darkBlue">{blogForm.id ? 'Edit Article' : 'Create Article'}</h3>
                  <button onClick={() => setIsEditingBlog(false)} className="text-gray-400 hover:text-darkBlue">Cancel</button>
                </div>
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  {/* Row 1: Title & Category */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Title</label>
                      <input required className={inputClass}
                        value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                        placeholder="e.g. Sustainable Cattle Farming"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <select className={inputClass}
                        value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}>
                        <option>News</option>
                        <option>Education</option>
                        <option>Stories</option>
                        <option>Science</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Image URL & Date */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Cover Image URL</label>
                      <input className={inputClass}
                        value={blogForm.imageUrl || ''} onChange={e => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                        placeholder="https://..."
                      />
                      {blogForm.imageUrl && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">check_circle</span> Image Preview Active
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Publish Date</label>
                      <input className={inputClass}
                        type="text"
                        value={blogForm.date} onChange={e => setBlogForm({ ...blogForm, date: e.target.value })}
                        placeholder="e.g. Oct 26, 2024"
                      />
                    </div>
                  </div>

                  {/* Row 3: Author Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Author Name</label>
                      <input required className={inputClass}
                        value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Author Social URL (One Only)</label>
                      <input className={inputClass}
                        value={blogForm.authorUrl || ''} onChange={e => setBlogForm({ ...blogForm, authorUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Excerpt (Short Summary)</label>
                    <textarea required className={`${inputClass} h-20`}
                      value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      placeholder="A brief description for the blog card..."
                    />
                  </div>

                  <div>
                    <label className={labelClass}>HTML Content</label>
                    <p className="text-xs text-gray-500 mb-2">Write raw HTML. Supported tags: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;img&gt;.</p>
                    <textarea required className={`${inputClass} h-64 font-mono text-sm`}
                      value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="<p>Start writing your article here...</p>"
                    />
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button className="bg-primary text-white px-8 py-3 rounded-sm font-medium hover:bg-red-700 transition-colors shadow-lg">
                      {blogForm.id ? 'Update Article' : 'Publish Article'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-white p-6 border border-gray-200 hover:border-darkBlue transition-colors rounded-sm group relative flex flex-col">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button onClick={() => editBlog(blog)} className="p-2 bg-white shadow-md hover:text-blue-600 rounded-full border border-gray-100">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button onClick={() => deleteBlog(blog.id)} className="p-2 bg-white shadow-md hover:text-red-600 rounded-full border border-gray-100">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>

                    {blog.imageUrl && (
                      <div className="h-40 -mx-6 -mt-6 mb-4 bg-gray-100 overflow-hidden">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    <span className="text-xs font-bold uppercase text-primary mb-2 block">{blog.category}</span>
                    <h3 className="text-xl font-serif text-darkBlue mb-2 leading-tight">{blog.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                    <div className="mt-auto text-xs text-gray-400 border-t border-gray-50 pt-3 flex justify-between">
                      <span>{blog.date}</span>
                      <span>{blog.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
