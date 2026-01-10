import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    { q: "Is CattleSense free for farmers?", a: "Yes, the basic profiling and health log features are free for individual farmers to encourage adoption and improve national data quality." },
    { q: "How is my data shared with the government?", a: "Data shared with the Ministry is aggregated and anonymized. It helps in understanding regional trends. Personal details are never exposed publicly." },
    { q: "Do I need internet access all the time?", a: "No. The mobile app works offline. You can record data in the field, and it will sync automatically once you reach an area with connectivity." },
    { q: "Can I use this for animals other than cows?", a: "Yes, CattleSense supports Cows, Buffaloes, Poultry, Goats, and Pigs." },
  ];

  return (
    <div className="min-h-screen bg-white py-20 font-sans">
      <div className="container mx-auto px-6 max-w-3xl">
         <div className="text-center mb-16">
           <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Support</span>
           <h1 className="text-5xl font-serif text-darkBlue mb-6">Frequently Asked Questions</h1>
         </div>

         <div className="space-y-4">
           {faqs.map((item, i) => (
             <div key={i} className="bg-white p-8 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors shadow-sm">
               <h3 className="text-lg font-semibold text-darkBlue mb-3">{item.q}</h3>
               <p className="text-gray-600 font-light leading-relaxed">{item.a}</p>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default FAQ;