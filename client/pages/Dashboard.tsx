
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Line } from 'recharts';
import StatCard from '../components/StatCard';
import HaryanaMap from '../components/HaryanaMap';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { alerts } = useData();
  const [selectedYear, setSelectedYear] = useState('2024');

  // Filter alerts relevant to general public/researchers
  const publicAlerts = alerts.filter(a => a.targetRole.includes('researcher') || a.targetRole.includes('consumer'));

  // -- Mock Data --

  // 1. MRL Compliance Trend (Graph)
  const mrlTrendData = [
    { month: 'Jan', compliance: 82, violations: 18 },
    { month: 'Feb', compliance: 85, violations: 15 },
    { month: 'Mar', compliance: 84, violations: 16 },
    { month: 'Apr', compliance: 89, violations: 11 },
    { month: 'May', compliance: 91, violations: 9 },
    { month: 'Jun', compliance: 93, violations: 7 },
  ];

  // 2. AMU by Drug Class (Graph)
  const amuClassData = [
    { name: 'Tetracyclines', value: 400 },
    { name: 'Penicillins', value: 300 },
    { name: 'Sulfonamides', value: 200 },
    { name: 'Macrolides', value: 150 },
    { name: 'Others', value: 100 },
  ];

  // Logged In User Data Clusters
  const dataClusters = [
    { id: 'DS-2401', name: 'Karnal Dairy Belt - Longitudinal AMU', size: '2.4 GB', date: 'Oct 24, 2024', access: 'Open' },
    { id: 'DS-2402', name: 'Hisar Poultry MRL Sampling', size: '1.1 GB', date: 'Oct 20, 2024', access: 'Restricted' },
    { id: 'DS-2403', name: 'Gurugram Peri-urban Livestock Census', size: '850 MB', date: 'Oct 15, 2024', access: 'Open' },
  ];

  const renderPublicVisuals = () => (
    <>
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon="analytics" label="National MRL Compliance" value="93%" trend="+2.1%" />
          <StatCard icon="medication_liquid" label="Avg AMU (mg/PCU)" value="142" trend="-5%" />
          <StatCard icon="location_on" label="Monitored Districts" value="22" trend="Haryana" />
          <StatCard icon="science" label="Samples Analyzed" value="12.5k" trend="This Month" />
      </div>

      {/* Main Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Graph 1: MRL Compliance Trend */}
        <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-darkBlue">MRL Compliance Trend</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Last 6 Months</span>
             </div>
             <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={mrlTrendData}>
                   <defs>
                     <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#8FA31E" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#8FA31E" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                   <Tooltip contentStyle={{backgroundColor: '#fff', borderColor: '#e5e7eb'}} />
                   <Legend verticalAlign="top" height={36}/>
                   <Area type="monotone" dataKey="compliance" name="Compliance %" stroke="#8FA31E" fillOpacity={1} fill="url(#colorCompliance)" />
                   <Line type="monotone" dataKey="violations" name="Violations %" stroke="#B45253" strokeWidth={2} dot={false} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
        </div>

        {/* Graph 2: AMU Distribution */}
        <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm">
             <h3 className="text-xl font-serif text-darkBlue mb-6">Antimicrobial Usage by Drug Class</h3>
             <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={amuClassData} layout="vertical" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 12}} width={100} />
                   <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#fff', borderColor: '#e5e7eb'}} />
                   <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} name="Usage Volume (kg)" />
                 </BarChart>
               </ResponsiveContainer>
             </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm mb-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="text-xl font-serif text-darkBlue">Regional AMU Heatmap: Haryana</h3>
              <p className="text-sm text-gray-400 mt-1">Satellite visualization of reported usage intensity.</p>
            </div>
         </div>
         <div className="w-full">
             <HaryanaMap />
         </div>
      </div>
    </>
  );

  const renderLoggedInData = () => (
    <div className="bg-white border border-gray-100 p-8 rounded-sm animate-fade-in">
        <div className="flex justify-between items-end mb-6">
            <div>
                <h3 className="text-xl font-serif text-darkBlue">Available Data Clusters</h3>
                <p className="text-sm text-gray-500 mt-1">Granular datasets available for your account type.</p>
            </div>
            <button className="bg-primary text-white px-4 py-2 text-sm font-medium rounded shadow hover:bg-red-700 transition-colors">
                Request Custom Dataset
            </button>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Dataset ID</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Access</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {dataClusters.map((data) => (
                     <tr key={data.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">{data.id}</td>
                        <td className="px-6 py-4 font-medium text-darkBlue">{data.name}</td>
                        <td className="px-6 py-4 text-gray-500">{data.size}</td>
                        <td className="px-6 py-4 text-gray-500">{data.date}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${data.access === 'Open' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                {data.access}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <button className="text-primary hover:underline font-medium text-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">download</span> Download
                            </button>
                        </td>
                     </tr>
                 ))}
              </tbody>
            </table>
        </div>
    </div>
  );

  const renderLoginCTA = () => (
    <div className="bg-darkBlue text-white p-10 rounded-sm text-center flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-5xl mb-4 text-gray-500">lock</span>
        <h3 className="text-2xl font-serif mb-2">Unlock Granular Data</h3>
        <p className="text-gray-400 max-w-lg mb-8 font-light">
            Researchers and Analysts can access detailed datasets, CSV exports, and API endpoints by logging in.
        </p>
        <Link to="/login" className="bg-white text-darkBlue px-8 py-3 font-medium rounded hover:bg-gray-100 transition-colors shadow-lg">
            Login to Access Data
        </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-subtle p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-serif text-darkBlue">
                Public Health Dashboard
                </h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Live Data</span>
            </div>
            <p className="text-gray-500 font-light">
              Monitoring AMU & MRL compliance across India's livestock sector.
            </p>
          </div>
          <div className="flex gap-3">
             <select 
               value={selectedYear}
               onChange={(e) => setSelectedYear(e.target.value)}
               className="bg-white border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-darkBlue transition-colors rounded-sm"
             >
               <option value="2024">Year: 2024</option>
               <option value="2023">Year: 2023</option>
             </select>
             <button className="bg-white border border-gray-200 text-darkBlue hover:border-darkBlue px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 rounded-sm shadow-sm">
               <span className="material-symbols-outlined text-sm">share</span> Share
             </button>
          </div>
        </div>

        {/* Public Visualizations (Visible to All) */}
        {renderPublicVisuals()}

        {/* Conditional Data Access Section */}
        <div className="mt-8">
            {currentUser ? renderLoggedInData() : renderLoginCTA()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
