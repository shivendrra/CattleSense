import React from 'react';

const Careers: React.FC = () => {
  const jobs = [
    { title: "Senior Backend Engineer", type: "Full-time", location: "Remote / Noida", dept: "Engineering" },
    { title: "Veterinary Liaison Officer", type: "Contract", location: "Punjab (Field)", dept: "Operations" },
    { title: "Product Marketing Manager", type: "Full-time", location: "Noida", dept: "Growth" },
  ];

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

        <div className="space-y-4">
           {jobs.map((job, i) => (
             <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-100 hover:border-darkBlue transition-colors bg-subtle group cursor-pointer">
               <div>
                 <h3 className="text-xl font-serif text-darkBlue mb-1">{job.title}</h3>
                 <div className="flex gap-4 text-xs text-gray-500 uppercase tracking-wider">
                   <span>{job.dept}</span>
                   <span>•</span>
                   <span>{job.location}</span>
                   <span>•</span>
                   <span>{job.type}</span>
                 </div>
               </div>
               <div className="mt-4 md:mt-0">
                 <span className="text-primary font-medium group-hover:underline">View Details</span>
               </div>
             </div>
           ))}
        </div>
        
        <div className="mt-12 text-center text-gray-500 font-light">
          Don't see a fit? Email your CV to <a href="mailto:careers@cattlesense.in" className="text-darkBlue underline">careers@cattlesense.in</a>
        </div>
      </div>
    </div>
  );
};

export default Careers;