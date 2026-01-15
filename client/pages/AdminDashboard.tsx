
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import firebase from 'firebase/compat/app';
import { Ticket, BlogPost, Job, JobApplication } from '../types';

const AdminDashboard: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'blogs' | 'jobs' | 'applications'>('tickets');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
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

  // Job Editor State
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [jobForm, setJobForm] = useState<Partial<Job>>({
    title: '',
    type: 'Full-time',
    location: '',
    department: '',
    description: '',
    is_active: true
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
      setTickets(ticketSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ticket[]);

      // Fetch Blogs
      const blogSnap = await db.collection('blogs').orderBy('createdAt', 'desc').get();
      setBlogs(blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[]);

      // Fetch Jobs
      const jobSnap = await db.collection('jobs').orderBy('createdAt', 'desc').get();
      setJobs(jobSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Job[]);

      // Fetch Applications
      const appSnap = await db.collection('applications').orderBy('appliedAt', 'desc').get();
      setApplications(appSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as JobApplication[]);

    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Ticket Actions ---
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

  // --- Blog Actions ---
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...blogForm,
        date: blogForm.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdAt: blogForm.createdAt || firebase.firestore.FieldValue.serverTimestamp()
      };

      if (blogForm.id) {
        await db.collection('blogs').doc(blogForm.id).update(payload);
      } else {
        await db.collection('blogs').add(payload);
      }

      setIsEditingBlog(false);
      setBlogForm({
        title: '', category: 'News', excerpt: '', content: '', author: 'Admin', authorUrl: '', imageUrl: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      fetchData();
    } catch (error) {
      console.error("Error saving blog", error);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await db.collection('blogs').doc(id).delete();
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  // --- Job Actions ---
  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...jobForm,
        createdAt: jobForm.createdAt || firebase.firestore.FieldValue.serverTimestamp()
      };
      if (jobForm.id) {
        await db.collection('jobs').doc(jobForm.id).update(payload);
      } else {
        await db.collection('jobs').add(payload);
      }
      setIsEditingJob(false);
      setJobForm({ title: '', type: 'Full-time', location: '', department: '', description: '', is_active: true });
      fetchData();
    } catch (error) {
      console.error("Error saving job", error);
    }
  };

  const deleteJob = async (id: string) => {
    if (!window.confirm("Delete this job opening?")) return;
    try {
      await db.collection('jobs').doc(id).delete();
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  const editJob = (job: Job) => {
    setJobForm(job);
    setIsEditingJob(true);
  };

  const deleteApplication = async (id: string) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await db.collection('applications').doc(id).delete();
      setApplications(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  };

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
          <button onClick={() => setActiveTab('tickets')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${activeTab === 'tickets' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <span className="material-symbols-outlined">confirmation_number</span> Support Tickets
          </button>
          <button onClick={() => setActiveTab('blogs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${activeTab === 'blogs' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <span className="material-symbols-outlined">article</span> Blog Management
          </button>
          <button onClick={() => setActiveTab('jobs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${activeTab === 'jobs' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <span className="material-symbols-outlined">work</span> Job Openings
          </button>
          <button onClick={() => setActiveTab('applications')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${activeTab === 'applications' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <span className="material-symbols-outlined">people</span> Job Applications
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
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <select value={ticket.status} onChange={(e) => handleTicketStatus(ticket.id, e.target.value)} className={`text-xs font-bold uppercase px-2 py-1 rounded border-none focus:ring-0 cursor-pointer ${ticket.status === 'open' ? 'bg-green-100 text-green-700' : ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{ticket.createdAt?.toDate().toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-darkBlue">{ticket.name}</div>
                          <div className="text-xs text-gray-400">{ticket.email}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{ticket.type}</td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={ticket.message}>{ticket.message}</td>
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
              <button onClick={() => { setBlogForm({ title: '', category: 'News', excerpt: '', content: '', author: 'Admin', authorUrl: '', imageUrl: '', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }); setIsEditingBlog(true); }} className="bg-darkBlue text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className={labelClass}>Title</label><input required className={inputClass} value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="e.g. Sustainable Cattle Farming" /></div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <select className={inputClass} value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}>
                        <option>News</option><option>Education</option><option>Stories</option><option>Science</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className={labelClass}>Cover Image URL</label><input className={inputClass} value={blogForm.imageUrl || ''} onChange={e => setBlogForm({ ...blogForm, imageUrl: e.target.value })} placeholder="https://..." /></div>
                    <div><label className={labelClass}>Publish Date</label><input className={inputClass} type="text" value={blogForm.date} onChange={e => setBlogForm({ ...blogForm, date: e.target.value })} placeholder="e.g. Oct 26, 2024" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className={labelClass}>Author Name</label><input required className={inputClass} value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} /></div>
                    <div><label className={labelClass}>Author Social URL</label><input className={inputClass} value={blogForm.authorUrl || ''} onChange={e => setBlogForm({ ...blogForm, authorUrl: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
                  </div>
                  <div><label className={labelClass}>Excerpt</label><textarea required className={`${inputClass} h-20`} value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} placeholder="Summary..." /></div>
                  <div><label className={labelClass}>HTML Content</label><textarea required className={`${inputClass} h-64 font-mono text-sm`} value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} placeholder="<p>Content...</p>" /></div>
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button className="bg-primary text-white px-8 py-3 rounded-sm font-medium hover:bg-red-700 transition-colors shadow-lg">{blogForm.id ? 'Update Article' : 'Publish Article'}</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-white p-6 border border-gray-200 hover:border-darkBlue transition-colors rounded-sm group relative flex flex-col">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button onClick={() => { setBlogForm(blog); setIsEditingBlog(true); }} className="p-2 bg-white shadow-md hover:text-blue-600 rounded-full border border-gray-100"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => deleteBlog(blog.id)} className="p-2 bg-white shadow-md hover:text-red-600 rounded-full border border-gray-100"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                    <span className="text-xs font-bold uppercase text-primary mb-2 block">{blog.category}</span>
                    <h3 className="text-xl font-serif text-darkBlue mb-2 leading-tight">{blog.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                    <div className="mt-auto text-xs text-gray-400 border-t border-gray-50 pt-3 flex justify-between"><span>{blog.date}</span><span>{blog.author}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- JOBS VIEW --- */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-darkBlue">Job Openings</h2>
              <button onClick={() => { setJobForm({ title: '', type: 'Full-time', location: '', department: '', description: '', is_active: true }); setIsEditingJob(true); }} className="bg-darkBlue text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">add</span> Post Job
              </button>
            </div>

            {isEditingJob ? (
              <div className="bg-white p-8 border border-gray-200 rounded-sm shadow-lg max-w-4xl mx-auto animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-darkBlue">{jobForm.id ? 'Edit Job Opening' : 'Post New Job'}</h3>
                  <button onClick={() => setIsEditingJob(false)} className="text-gray-400 hover:text-darkBlue">Cancel</button>
                </div>
                <form onSubmit={handleJobSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className={labelClass}>Job Title</label><input required className={inputClass} value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} placeholder="e.g. Frontend Engineer" /></div>
                    <div><label className={labelClass}>Type</label>
                      <select className={inputClass} value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value as any })}>
                        <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className={labelClass}>Location</label><input required className={inputClass} value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} placeholder="e.g. Remote / Noida" /></div>
                    <div><label className={labelClass}>Department</label><input required className={inputClass} value={jobForm.department} onChange={e => setJobForm({ ...jobForm, department: e.target.value })} placeholder="e.g. Engineering" /></div>
                  </div>
                  <div><label className={labelClass}>Description</label><textarea required className={`${inputClass} h-32`} value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })} placeholder="Job roles and responsibilities..." /></div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={jobForm.is_active} onChange={e => setJobForm({ ...jobForm, is_active: e.target.checked })} className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <label className="text-sm text-gray-700">Active (Visible to public)</label>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button className="bg-primary text-white px-8 py-3 rounded-sm font-medium hover:bg-red-700 transition-colors shadow-lg">{jobForm.id ? 'Update Job' : 'Post Job'}</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white p-6 border border-gray-200 hover:border-darkBlue transition-colors rounded-sm relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => editJob(job)} className="p-2 bg-white shadow-md hover:text-blue-600 rounded-full border border-gray-100"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => deleteJob(job.id)} className="p-2 bg-white shadow-md hover:text-red-600 rounded-full border border-gray-100"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif text-darkBlue">{job.title}</h3>
                      {!job.is_active && <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Inactive</span>}
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 uppercase tracking-wider mb-3">
                      <span>{job.department}</span><span>•</span><span>{job.location}</span><span>•</span><span>{job.type}</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-3">{job.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- APPLICATIONS VIEW --- */}
        {activeTab === 'applications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-darkBlue">Job Applications</h2>
              <div className="text-sm text-gray-500">Total: {applications.length}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Role Applied</th>
                      <th className="px-6 py-4">Links</th>
                      <th className="px-6 py-4">Intro</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{app.appliedAt?.toDate().toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-darkBlue">{app.applicantName}</div>
                          <div className="text-xs text-gray-400">{app.email}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{app.jobTitle}</td>
                        <td className="px-6 py-4 flex gap-2">
                          {app.cvLink && <a href={app.cvLink} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1"><span className="material-symbols-outlined text-sm">description</span> CV</a>}
                          {app.linkedInUrl && <a href={app.linkedInUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1"><span className="material-symbols-outlined text-sm">link</span> IN</a>}
                          {app.githubUrl && <a href={app.githubUrl} target="_blank" rel="noreferrer" className="text-gray-700 hover:underline flex items-center gap-1"><span className="material-symbols-outlined text-sm">code</span> GH</a>}
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={app.introduction}>{app.introduction}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteApplication(app.id)} className="text-red-500 hover:text-red-700"><span className="material-symbols-outlined text-lg">delete</span></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;