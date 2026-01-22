
import React from 'react';

const About: React.FC = () => {
  const assetUrl = "https://raw.githubusercontent.com/shivendrra/CattleSense/dev/assets/";

  const team = [
    { name: 'Shivendra', role: 'Team Lead & Fullstack Dev', img: 'shiv.svg', desc: 'Architecting the scalable infrastructure.' },
    { name: 'Sachin', role: 'Frontend Engineer', img: 'sachin.svg', desc: 'Crafting intuitive user interfaces.' },
    { name: 'Shailesh', role: 'Data Scientist', img: 'shailesh.svg', desc: 'Analyzing trends and AMU patterns.' },
    { name: 'Savita', role: 'Backend Engineer', img: 'savita.svg', desc: 'Ensuring data integrity and security.' },
    { name: 'Riya', role: 'UI/UX Designer', img: 'riya.svg', desc: 'Designing for accessibility in rural areas.' },
    { name: 'Prashant', role: 'Quality Assurance', img: 'prashant.svg', desc: 'Testing for reliability in field conditions.' },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="bg-subtle py-24 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Our Mission</span>
          <h1 className="text-5xl md:text-6xl font-serif text-darkBlue mb-8">Safeguarding Public Health</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Antimicrobials are vital for animal health, but their misuse threatens us all. 
            We built CattleSense to bridge the gap between farm productivity and food safety.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
          <div>
             <h2 className="text-3xl font-serif text-darkBlue mb-6">The Story Behind CattleSense</h2>
             <div className="prose prose-lg text-gray-600 font-light">
               <p className="mb-4">
                 We are Team TwoFold, a group of passionate technologists from India. Observing the livestock industry, we noticed a critical gap: while production was increasing, safety standards regarding antibiotic residues were often overlooked due to a lack of easy-to-use monitoring tools.
               </p>
               <p className="mb-4">
                 Inappropriate and excessive use of drugs results in antimicrobial residues in animal-derived food products and contributes to the rise of Antimicrobial Resistance (AMR)—a major global threat.
               </p>
               <p>
                 We asked ourselves: <em>How can we make high-tech monitoring accessible to the average farmer while providing authorities with the data they need?</em> CattleSense is our answer.
               </p>
             </div>
          </div>
          <div className="bg-gray-50 p-10 border border-gray-100 rounded-sm">
             <h3 className="text-xl font-serif text-darkBlue mb-6">Strategic Objectives</h3>
             <ul className="space-y-6">
               {[
                 "Improve antimicrobial stewardship practices at the farm level.",
                 "Enhance compliance with MRL norms and regulatory frameworks.",
                 "Provide real-time availability of AMU data for authorities.",
                 "Enable data-driven decision-making to inform policy.",
                 "Reduce antimicrobial residues in the food supply chain."
               ].map((item, i) => (
                 <li key={i} className="flex gap-4 items-start group">
                   <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-sm">check</span>
                   </span>
                   <span className="text-gray-700 font-light">{item}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="border-t border-gray-100 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-darkBlue mb-4">Meet Team TwoFold</h2>
            <p className="text-gray-500 font-light">The minds dedicated to solving the AMR crisis.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group bg-white border border-gray-100 p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full overflow-hidden border border-gray-100 transition-all">
                    <img src={`${assetUrl}avatar/${member.img}`} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-darkBlue">{member.name}</h4>
                    <p className="text-xs text-primary font-bold uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-light pl-1 border-l-2 border-gray-100 group-hover:border-primary transition-colors">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
