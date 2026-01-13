
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../services/firebase';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await db.collection('tickets').add({
        ...form,
        type: 'General Inquiry',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'open',
        source: 'contact_page'
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white py-20 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Get in Touch</span>
            <h1 className="text-5xl font-serif text-darkBlue mb-6">We'd love to hear from you.</h1>
            <p className="text-gray-500 font-light text-lg mb-10 leading-relaxed">
              Have questions about the platform, partnership opportunities, or need technical support? 
              Fill out the form or visit our office.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-darkBlue">
                   <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-darkBlue">Headquarters</h4>
                  <p className="text-gray-500 font-light">Tech Park, Sector 62<br/>Noida, Uttar Pradesh 201309<br/>India</p>
                </div>
              </div>

              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-darkBlue">
                   <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-darkBlue">Email Us</h4>
                  <p className="text-gray-500 font-light">partnerships@cattlesense.org<br/>support@cattlesense.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-subtle p-8 md:p-12 border border-gray-100">
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-5xl text-green-600 mb-4">mark_email_read</span>
                    <h3 className="text-2xl font-serif text-darkBlue mb-2">Message Sent</h3>
                    <p className="text-gray-500 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
                    <button onClick={() => setStatus('idle')} className="text-darkBlue font-bold underline">Send another message</button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded border border-red-100">
                        Unable to send message. Please try again later.
                    </div>
                )}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                    <input 
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        type="text" 
                        className="w-full p-4 border border-gray-200 focus:outline-none focus:border-darkBlue bg-white shadow-sm" 
                        placeholder="Your Name" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                    <input 
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        type="email" 
                        className="w-full p-4 border border-gray-200 focus:outline-none focus:border-darkBlue bg-white shadow-sm" 
                        placeholder="email@example.com" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                    <textarea 
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={4} 
                        className="w-full p-4 border border-gray-200 focus:outline-none focus:border-darkBlue bg-white shadow-sm" 
                        placeholder="How can we help?"
                    ></textarea>
                </div>
                <button 
                    disabled={status === 'submitting'}
                    className="w-full bg-darkBlue text-white py-4 font-medium hover:bg-black transition-colors disabled:opacity-70"
                >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
