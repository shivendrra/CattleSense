
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { db } from '../services/firebase';

const HelpSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'guides'>('faq');
  
  // Contact Form State
  const [ticket, setTicket] = useState({ name: '', email: '', type: 'Technical Issue', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const faqs = [
    { q: "Is CattleSense free for farmers?", a: "Yes, the basic profiling and health log features are free for individual farmers to encourage adoption and improve national data quality." },
    { q: "How is my data shared with the government?", a: "Data shared with the Ministry is aggregated and anonymized. It helps in understanding regional trends. Personal details are never exposed publicly." },
    { q: "Do I need internet access all the time?", a: "No. The mobile app works offline. You can record data in the field, and it will sync automatically once you reach an area with connectivity." },
    { q: "Can I use this for animals other than cows?", a: "Yes, CattleSense supports Cows, Buffaloes, Poultry, Goats, and Pigs." },
    { q: "I forgot my password, how do I reset it?", a: "Go to the Login page and click 'Forgot Password'. You will receive a reset link on your registered email." }
  ];

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await db.collection('tickets').add({
        ...ticket,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'open',
        source: 'help_center'
      });
      setStatus('success');
      setTicket({ name: '', email: '', type: 'Technical Issue', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-subtle py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Here to Help</span>
          <h1 className="text-5xl font-serif text-darkBlue mb-4">Help & Support Center</h1>
          <p className="text-gray-500 font-light">Find answers, contact our team, or browse resources.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 border-b border-gray-200">
           <button 
             onClick={() => setActiveTab('faq')}
             className={`px-8 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'faq' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-darkBlue'}`}
           >
             FAQs
           </button>
           <button 
             onClick={() => setActiveTab('contact')}
             className={`px-8 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'contact' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-darkBlue'}`}
           >
             Contact Us
           </button>
           <button 
             onClick={() => setActiveTab('guides')}
             className={`px-8 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'guides' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-darkBlue'}`}
           >
             User Guides
           </button>
        </div>

        {/* Content Area */}
        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-sm shadow-sm min-h-[400px]">
           
           {/* FAQs Tab */}
           {activeTab === 'faq' && (
             <div className="animate-fade-in">
               <h2 className="text-2xl font-serif text-darkBlue mb-8">Frequently Asked Questions</h2>
               <div className="space-y-4">
                 {faqs.map((item, i) => (
                   <div key={i} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                     <h3 className="text-lg font-semibold text-darkBlue mb-2 flex items-center gap-2">
                       <span className="text-primary material-symbols-outlined text-lg">help</span>
                       {item.q}
                     </h3>
                     <p className="text-gray-600 font-light leading-relaxed pl-7">{item.a}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Contact Tab */}
           {activeTab === 'contact' && (
             <div className="animate-fade-in grid lg:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-2xl font-serif text-darkBlue mb-4">Get in Touch</h2>
                  <p className="text-gray-500 mb-8 font-light">Fill out the form below and our support team will get back to you within 24 hours.</p>
                  
                  {status === 'success' ? (
                    <div className="bg-green-50 border border-green-200 p-6 text-center rounded">
                        <span className="material-symbols-outlined text-4xl text-green-600 mb-2">check_circle</span>
                        <h3 className="text-xl font-serif text-darkBlue mb-1">Ticket Submitted</h3>
                        <p className="text-gray-600 text-sm">We have received your message and will respond shortly.</p>
                        <button onClick={() => setStatus('idle')} className="mt-4 text-primary font-bold text-sm uppercase">Send another</button>
                    </div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-4">
                        {status === 'error' && (
                            <div className="bg-red-50 text-red-600 p-3 text-sm rounded border border-red-100">
                                Something went wrong. Please try again.
                            </div>
                        )}
                        <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                        <input 
                            name="name"
                            value={ticket.name}
                            onChange={handleInputChange}
                            type="text" 
                            required
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-darkBlue" 
                            placeholder="Your Name" 
                        />
                        </div>
                        <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                        <input 
                            name="email"
                            value={ticket.email}
                            onChange={handleInputChange}
                            type="email" 
                            required
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-darkBlue" 
                            placeholder="email@example.com" 
                        />
                        </div>
                        <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Issue Type</label>
                        <select 
                            name="type"
                            value={ticket.type}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-darkBlue text-gray-600"
                        >
                            <option>Technical Issue</option>
                            <option>Account Access</option>
                            <option>Data Query</option>
                            <option>Partnership</option>
                            <option>Other</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                        <textarea 
                            name="message"
                            value={ticket.message}
                            onChange={handleInputChange}
                            required
                            rows={4} 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-darkBlue" 
                            placeholder="Describe your issue..."
                        ></textarea>
                        </div>
                        <button 
                            disabled={status === 'submitting'}
                            className="bg-darkBlue text-white px-6 py-3 rounded hover:bg-black transition-colors disabled:opacity-70 flex items-center gap-2"
                        >
                            {status === 'submitting' ? 'Sending...' : 'Submit Ticket'}
                        </button>
                    </form>
                  )}
               </div>
               
               <div className="bg-subtle p-8 border border-gray-100 h-fit">
                  <h3 className="text-xl font-serif text-darkBlue mb-6">Direct Channels</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">call</span>
                       </div>
                       <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Phone Support</p>
                          <p className="text-darkBlue font-medium">+91 98765 43210</p>
                          <p className="text-xs text-gray-500">Mon-Fri, 9am - 6pm IST</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">mail</span>
                       </div>
                       <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Email Support</p>
                          <p className="text-darkBlue font-medium">support@cattlesense.org</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">location_on</span>
                       </div>
                       <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Office</p>
                          <p className="text-darkBlue font-medium">Tech Park, Sector 62, Noida, UP, India</p>
                       </div>
                    </div>
                  </div>
               </div>
             </div>
           )}

           {/* Guides Tab */}
           {activeTab === 'guides' && (
             <div className="animate-fade-in">
               <h2 className="text-2xl font-serif text-darkBlue mb-8">Role-Based Guides</h2>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "For Farmers", desc: "Learn how to log health records and check withdrawal periods.", link: "/guide/farmer", icon: "agriculture" },
                    { title: "For Vets", desc: "Manage prescriptions and monitor treatments remotely.", link: "/guide/vet", icon: "medical_services" },
                    { title: "For Researchers", desc: "Access datasets and understand API usage limits.", link: "/guide/researcher", icon: "science" },
                    { title: "For Consumers", desc: "How to scan QR codes and verify product safety.", link: "/guide/consumer", icon: "qr_code_scanner" },
                    { title: "For Policymakers", desc: "Interpreting regional compliance dashboards.", link: "/guide/policymaker", icon: "policy" }
                  ].map((guide, i) => (
                    <Link key={i} to={guide.link} className="block p-6 border border-gray-100 hover:border-primary hover:shadow-md transition-all group bg-gray-50/50 hover:bg-white">
                       <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary mb-4">{guide.icon}</span>
                       <h3 className="text-lg font-semibold text-darkBlue mb-2">{guide.title}</h3>
                       <p className="text-sm text-gray-500 font-light mb-4">{guide.desc}</p>
                       <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">Read Guide <span className="material-symbols-outlined text-xs">arrow_forward</span></span>
                    </Link>
                  ))}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
