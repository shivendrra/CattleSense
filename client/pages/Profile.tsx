
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const assetUrl = "https://raw.githubusercontent.com/shivendrra/CattleSense/dev/assets/";

  if (!currentUser) return <div className="p-10 text-center">Please login</div>;

  return (
    <div className="min-h-screen bg-subtle pb-12">
      {/* Profile Header */}
      <div className="bg-darkBlue text-white pb-24">
        <div className="container mx-auto px-6 py-12">
           <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="relative">
                <img 
                  src={currentUser.photoURL || `${assetUrl}svg/farmer1.svg`} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white/10 object-cover bg-white" 
                />
             </div>
             <div className="text-center md:text-left">
               <h1 className="text-4xl font-serif mb-2">{currentUser.displayName}</h1>
               <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                 <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wide uppercase text-gray-300 border border-white/10">{currentUser.role}</span>
                 <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wide uppercase text-gray-300 border border-white/10">ID: {currentUser.uid.slice(0,8)}</span>
               </div>
               <div className="flex items-center gap-6 text-sm text-gray-400">
                 <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span> {currentUser.email}</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white shadow-sm border border-gray-100 min-h-[300px] p-8 rounded-sm">
           <h3 className="text-xl font-serif text-darkBlue mb-6">Account Status</h3>
           <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 border border-gray-100 rounded">
                 <h4 className="font-semibold text-darkBlue mb-2">Data Access Level</h4>
                 <p className="text-sm text-gray-500">
                    {currentUser.role === 'researcher' 
                     ? "Full Researcher Access: You can view and export aggregated national datasets." 
                     : "Public Access: You can view summary dashboards and public health alerts."}
                 </p>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-100 rounded">
                 <h4 className="font-semibold text-darkBlue mb-2">API Keys</h4>
                 {currentUser.role === 'researcher' ? (
                   <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded text-sm text-gray-600 font-mono">
                     <span>sk_live_xxxxxxxx</span>
                     <button className="text-primary hover:text-darkBlue ml-auto">Copy</button>
                   </div>
                 ) : (
                   <p className="text-sm text-gray-500">Upgrade to Researcher account to generate API keys.</p>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
