import React from 'react';

const Blog: React.FC = () => {
  const blogs = [
    {
      title: "Understanding MRL: What Every Farmer Needs to Know",
      excerpt: "Maximum Residue Limits (MRL) define the maximum allowed concentration of antibiotic residues in food products. Learn why compliance is key to export success.",
      date: "Oct 24, 2024",
      category: "Education"
    },
    {
      title: "The One Health Approach to AMR",
      excerpt: "Human health, animal health, and environmental health are inextricably linked. We explore how AMR spills over between these sectors.",
      date: "Oct 18, 2024",
      category: "Science"
    },
    {
      title: "Government Initiatives for Livestock Safety 2024",
      excerpt: "A breakdown of the new subsidies and support systems launched by the Ministry of Fisheries, Animal Husbandry and Dairying.",
      date: "Sep 30, 2024",
      category: "News"
    },
    {
      title: "Case Study: How Ram Lal Increased Yield by 20%",
      excerpt: "By reducing unnecessary antibiotic usage and focusing on hygiene, a farmer in Haryana improved his herd's longevity and milk quality.",
      date: "Sep 15, 2024",
      category: "Stories"
    }
  ];

  return (
    <div className="min-h-screen bg-subtle py-20 font-sans">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
           <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Insights</span>
           <h1 className="text-5xl font-serif text-darkBlue mb-4">The CattleSense Blog</h1>
           <p className="text-gray-500 font-light">Latest news, success stories, and educational resources on sustainable farming.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogs.map((blog, idx) => (
            <div key={idx} className="bg-white p-8 border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded">{blog.category}</span>
                <span className="text-xs text-gray-400">{blog.date}</span>
              </div>
              <h2 className="text-2xl font-serif text-darkBlue mb-3 group-hover:text-primary transition-colors">{blog.title}</h2>
              <p className="text-gray-500 font-light leading-relaxed mb-4">{blog.excerpt}</p>
              <span className="text-sm font-medium text-darkBlue border-b border-darkBlue pb-0.5">Read Article</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;