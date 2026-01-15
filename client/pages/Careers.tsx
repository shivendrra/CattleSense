
import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import firebase from 'firebase/compat/app';
import { Job } from '../types';

const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Application Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cvLink: '',
    linkedInUrl: '',
    githubUrl: '',
    introduction: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await db.collection('jobs')
          .where('is_active', '==', true)
          .get();

        const fetchedJobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Job[];
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplying(true);
    setSubmitStatus('idle');
  };

  const closeApplication = () => {
    setIsApplying(false);
    setSelectedJob(null);
    setFormData({ name: '', email: '', cvLink: '', linkedInUrl: '', githubUrl: '', introduction: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Word count check for introduction
    if (name === 'introduction') {
      const words = value.trim().split(/\s+/);
      if (words.length > 150) {
        // Prevent typing more words, but allow deleting chars
        if (value.length > formData.introduction.length) return;
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitStatus('submitting');
    try {
      await db.collection('applications').add({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        applicantName: formData.name,
        email: formData.email,
        cvLink: formData.cvLink,
        linkedInUrl: formData.linkedInUrl,
        githubUrl: formData.githubUrl,
        introduction: formData.introduction,
        appliedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      setSubmitStatus('success');
      setTimeout(closeApplication, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus('error');
    }
  };

  const wordCount = formData.introduction.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="min-h-screen bg-white py-20 font-sans">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Join the Team</span>
          <h1 className="text-5xl font-serif text-darkBlue mb-6">Build for Impact</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Work on challenges that matter. We are looking for mission-driven individuals to help us secure the future of food safety.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center p-10 bg-gray-50 border border-gray-100 rounded-sm">
            <p className="text-gray-500">No current openings. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} onClick={() => handleApplyClick(job)} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-100 hover:border-darkBlue transition-colors bg-subtle group cursor-pointer rounded-sm">
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-darkBlue mb-1">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 uppercase tracking-wider mb-2">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-light line-clamp-2">{job.description}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                  <span className="text-primary font-medium group-hover:underline flex items-center gap-1">
                    Apply Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 font-light">
          Don't see a fit? Email your CV to <a href="mailto:careers@cattlesense.in" className="text-darkBlue underline">careers@cattlesense.in</a>
        </div>
      </div>

      {/* Application Modal */}
      {isApplying && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkBlue/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-serif text-darkBlue">Apply for {selectedJob.title}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{selectedJob.location} • {selectedJob.type}</p>
              </div>
              <button onClick={closeApplication} className="text-gray-400 hover:text-darkBlue">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              {submitStatus === 'success' ? (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                  <h4 className="text-2xl font-serif text-darkBlue mb-2">Application Submitted!</h4>
                  <p className="text-gray-500">Thank you for your interest. We will review your application and get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                      <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded focus:border-darkBlue focus:outline-none bg-gray-50" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded focus:border-darkBlue focus:outline-none bg-gray-50" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CV / Resume Link (Google Drive/Dropbox)</label>
                    <input required type="url" name="cvLink" value={formData.cvLink} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded focus:border-darkBlue focus:outline-none bg-gray-50" placeholder="https://..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">LinkedIn Profile</label>
                      <input required type="url" name="linkedInUrl" value={formData.linkedInUrl} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded focus:border-darkBlue focus:outline-none bg-gray-50" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">GitHub Profile (Optional)</label>
                      <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded focus:border-darkBlue focus:outline-none bg-gray-50" placeholder="https://github.com/..." />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase">Introduction</label>
                      <span className={`text-xs ${wordCount > 150 ? 'text-red-500' : 'text-gray-400'}`}>{wordCount}/150 words</span>
                    </div>
                    <textarea
                      required
                      name="introduction"
                      value={formData.introduction}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded focus:border-darkBlue focus:outline-none bg-gray-50 h-32 text-sm"
                      placeholder="Tell us about yourself and why you're a good fit..."
                    ></textarea>
                  </div>

                  {submitStatus === 'error' && <p className="text-red-600 text-sm">Failed to submit. Please check your connection and try again.</p>}

                  <button
                    disabled={submitStatus === 'submitting'}
                    type="submit"
                    className="w-full bg-darkBlue text-white py-3.5 rounded font-medium hover:bg-black transition-colors disabled:opacity-70"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;