
import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import RoleCard from '../components/RoleCard';

const Lander: React.FC = () => {
  const assetUrl = "https://raw.githubusercontent.com/shivendrra/CattleSense/dev/assets/";

  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans text-darkBlue">
      {/* Hero Section (Kept as requested) */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img 
              src={`${assetUrl}svg/mainbackground.svg`} 
              alt="Farm Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-darkBlue/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-darkBlue via-transparent to-transparent opacity-90"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10 text-white max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-medium tracking-widest uppercase mb-6 text-secondary">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Live Monitoring Active
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-none tracking-tight">
              Purity in every <br/>
              <span className="text-secondary italic">drop & grain.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              CattleSense ensures antimicrobial stewardship and MRL compliance, bridging the gap between farm productivity and food safety for a healthier tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/login" className="px-8 py-4 bg-primary text-white font-medium hover:bg-white hover:text-darkBlue transition-all duration-300 shadow-xl rounded-sm min-w-[180px]">
                  Get Started
               </Link>
               <button onClick={() => window.open('https://youtu.be/WuULaBwaClc?si=jKsqmmeKKq2aQlZF', '_blank')} className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium hover:bg-white/10 transition-all rounded-sm min-w-[180px] flex items-center justify-center gap-2 backdrop-blur-sm">
                  <span className="material-symbols-outlined">play_circle</span> Watch Video
               </button>
            </div>

            <div className="mt-16 flex justify-center items-center gap-12 text-white/40 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="text-center">
                 <div className="text-2xl font-serif text-white mb-1">10k+</div>
                 <div className="text-[10px] uppercase tracking-widest">Livestock</div>
               </div>
               <div className="h-8 w-px bg-white/20"></div>
               <div className="text-center">
                 <div className="text-2xl font-serif text-white mb-1">99%</div>
                 <div className="text-[10px] uppercase tracking-widest">Safety Score</div>
               </div>
                <div className="h-8 w-px bg-white/20"></div>
               <div className="text-center">
                 <div className="text-2xl font-serif text-white mb-1">ISO</div>
                 <div className="text-[10px] uppercase tracking-widest">Certified</div>
               </div>
            </div>
         </div>
      </section>

      {/* Ministry Collaboration Section */}
      <section className="bg-orange-50 border-b border-orange-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
             <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 opacity-90">
                {/* Placeholder for Ministry Emblem */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Satyamev Jayate" className="w-full h-full object-contain" />
             </div>
             <div className="max-w-2xl">
               <span className="text-orange-700 font-bold tracking-widest uppercase text-xs mb-2 block">In Collaboration With</span>
               <h3 className="text-2xl md:text-3xl font-serif text-darkBlue mb-2">
                 Department of Animal Husbandry & Dairying
               </h3>
               <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Ministry of Fisheries, Animal Husbandry and Dairying, Government of India</p>
               <p className="mt-4 text-gray-500 font-light leading-relaxed">
                 CattleSense is proud to align with the National Action Plan on Antimicrobial Resistance (NAP-AMR), working directly with government bodies to ensure safer food standards and sustainable livestock practices across India.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* The Crisis Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
               <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-2 block">The Silent Pandemic</span>
               <h2 className="text-4xl md:text-5xl font-serif text-darkBlue mb-6 leading-tight">
                 Why Antimicrobial <br/> Resistance Matters.
               </h2>
               <div className="space-y-6 text-lg text-gray-500 font-light leading-relaxed">
                 <p>
                   Inappropriate use of antibiotics in livestock is a primary driver of Antimicrobial Resistance (AMR). When these drugs fail, simple infections become life-threatening—for both animals and humans.
                 </p>
                 <p>
                   Furthermore, drug residues in milk and meat (exceeding Maximum Residue Limits or MRL) pose severe chronic health risks to consumers.
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-8 mt-12">
                 <div>
                   <div className="text-4xl font-serif text-primary mb-1">10M</div>
                   <div className="text-xs uppercase tracking-wider text-gray-400">Predicted deaths by 2050 due to AMR</div>
                 </div>
                 <div>
                   <div className="text-4xl font-serif text-primary mb-1">73%</div>
                   <div className="text-xs uppercase tracking-wider text-gray-400">Global antimicrobials used in animals</div>
                 </div>
               </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="bg-gray-100 rounded-lg p-2">
                 <img src={`${assetUrl}img/cow2.jpg`} alt="Cattle Health" className="w-full rounded shadow-2xl filter brightness-90 contrast-125" />
               </div>
               <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-xl border-l-4 border-primary max-w-xs hidden md:block">
                 <p className="font-serif text-xl italic text-darkBlue">"One Health"</p>
                 <p className="text-sm text-gray-500 mt-2">Recognizing that the health of people is closely connected to the health of animals and our shared environment.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-subtle relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Our Technology</span>
             <h2 className="text-4xl font-serif text-darkBlue mb-6">A Digital Shield for Livestock</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="medication_liquid" 
              title="Precise AMU Tracking" 
              desc="Digital logbooks replace paper trails. Record specific dosages, frequency, and reasons for every drug administered."
            />
             <FeatureCard 
              icon="gavel" 
              title="MRL Compliance Alerts" 
              desc="Smart algorithms calculate withdrawal periods based on the drug and species, alerting farmers before sale."
            />
             <FeatureCard 
              icon="query_stats" 
              title="National Heatmaps" 
              desc="Aggregated data allows authorities to visualize disease outbreaks and resistance hotspots in real-time."
            />
            <FeatureCard 
              icon="qr_code_scanner" 
              title="Traceability Tags" 
              desc="RFID and QR integration ensures that every product can be traced back to its farm of origin."
            />
            <FeatureCard 
              icon="verified_user" 
              title="Vet Verification" 
              desc="A dual-check system where prescriptions must be digitally verified by licensed veterinarians."
            />
            <FeatureCard 
              icon="phone_iphone" 
              title="Offline-First Mobile" 
              desc="Designed for rural India. Works seamlessly in low-connectivity areas, syncing data when online."
            />
          </div>
        </div>
      </section>

      {/* Stakeholder Ecosystem */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">The Ecosystem</span>
              <h2 className="text-3xl md:text-4xl font-serif text-darkBlue mb-4">Empowering Every Stakeholder</h2>
              <p className="text-gray-500 font-light">CattleSense connects the fragmented livestock sector into a unified, transparent network.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RoleCard 
              role="Farmers" 
              image={`${assetUrl}svg/farmers.svg`}
              desc="Gain access to health records, automated withdrawal alerts, and better market prices for certified safe produce."
              link="/guide/farmer"
            />
            <RoleCard 
              role="Veterinarians" 
              image={`${assetUrl}svg/veterinary.svg`}
              desc="Streamline practice management, monitor treatments remotely, and ensure adherence to prescriptions."
              link="/guide/vet"
            />
            <RoleCard 
              role="Consumers" 
              image={`${assetUrl}svg/consumer.svg`}
              desc="Scan QR codes on products to see the full health history and verify safety standards before buying."
              link="/guide/consumer"
            />
             <RoleCard 
              role="Researchers" 
              image={`${assetUrl}svg/researcher.svg`}
              desc="Access anonymized, high-quality datasets to study epidemiology and resistance patterns."
              link="/guide/researcher"
            />
             <RoleCard 
              role="Policymakers" 
              image={`${assetUrl}svg/policymaker.svg`}
              desc="Make evidence-based decisions with real-time dashboards on regional compliance and usage."
              link="/guide/policymaker"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-darkBlue text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
           <h2 className="text-4xl md:text-5xl font-serif mb-6">Join the Movement</h2>
           <p className="text-xl text-gray-400 font-light mb-10 leading-relaxed">
             Whether you own one cow or manage a district, your contribution matters. 
             Help us build a safer, healthier future for India.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/login" className="bg-primary hover:bg-white hover:text-darkBlue text-white px-10 py-4 font-medium transition-all shadow-lg border border-transparent">
               Register Now
             </Link>
             <Link to="/contact" className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-10 py-4 font-medium transition-all">
               Contact Support
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Lander;
