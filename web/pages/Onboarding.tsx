
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, ResearcherProfile } from '../types';

const Onboarding: React.FC = () => {
  const { currentUser, completeOnboarding, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.is_profile_complete) {
      navigate('/dashboard');
    } else if (currentUser?.onboarding_step) {
      setStep(currentUser.onboarding_step);
    }
  }, [currentUser, navigate]);

  const [basicInfo, setBasicInfo] = useState({
    role: currentUser?.role || 'consumer',
    phone: currentUser?.phone || '',
  });

  const [researcherData, setResearcherData] = useState<Partial<ResearcherProfile>>({
    institution_name: '', institution_type: 'university', research_area: ''
  });

  if (!currentUser) return null;

  const handleBasicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        role: basicInfo.role as User['role'],
        phone: basicInfo.phone,
      });
      // Consumers skip directly to finish
      if (basicInfo.role === 'consumer') {
          await completeOnboarding(4);
          navigate('/dashboard');
      } else {
          await completeOnboarding(2);
          setStep(2);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let roleSpecificData = {};
      
      switch (currentUser.role) {
        case 'researcher': roleSpecificData = researcherData; break;
        default: break;
      }

      await completeOnboarding(4, roleSpecificData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const InputClass = "w-full p-3.5 border border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:border-darkBlue focus:bg-white transition-all text-sm text-darkBlue shadow-sm";
  const LabelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5";

  return (
    <div className="min-h-screen bg-subtle py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 border border-gray-100 shadow-xl rounded-sm">
        
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-4xl text-primary mb-2">
            {step === 1 ? 'person_add' : 'work'}
          </span>
          <h2 className="text-3xl font-serif text-darkBlue">
            {step === 1 ? 'Profile Setup' : 'Researcher Verification'}
          </h2>
          <p className="text-gray-500 mt-2">Complete your profile to access data.</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleBasicSubmit} className="space-y-6">
            <div>
              <label className={LabelClass}>Account Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['consumer', 'researcher'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setBasicInfo({ ...basicInfo, role: r as any })}
                    className={`p-4 border text-left capitalize transition-all rounded-md ${basicInfo.role === r ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={LabelClass}>Mobile Number (Optional)</label>
              <input 
                type="tel" 
                value={basicInfo.phone} 
                onChange={(e) => setBasicInfo({...basicInfo, phone: e.target.value})}
                className={InputClass}
                placeholder="+91 98765 43210" 
              />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-darkBlue text-white py-3.5 font-medium hover:bg-black transition-colors flex justify-center items-center gap-2 rounded-md shadow-lg">
              {loading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
              {basicInfo.role === 'consumer' ? 'Complete Setup' : 'Next Step'}
            </button>
          </form>
        )}

        {step === 2 && currentUser.role === 'researcher' && (
          <form onSubmit={handleRoleSubmit} className="space-y-6">
             <div>
                 <label className={LabelClass}>Institution Name</label>
                 <input required className={InputClass} value={researcherData.institution_name} onChange={e => setResearcherData({...researcherData, institution_name: e.target.value})} />
              </div>
              <div>
                 <label className={LabelClass}>Research Area / Purpose</label>
                 <textarea required className={InputClass} value={researcherData.research_area} onChange={e => setResearcherData({...researcherData, research_area: e.target.value})}></textarea>
              </div>

            <button disabled={loading} type="submit" className="w-full bg-primary text-white py-3.5 font-medium hover:bg-red-700 transition-colors flex justify-center items-center gap-2 rounded-md shadow-lg">
               {loading ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : 'Finish Setup'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
