import React, { useState } from 'react';
import './styles/Dashboard.css';
import StatsCards from './sub/dashboard/StatsCards';
import AMUTrends from './sub/dashboard/AMUTrends';
import LivestockDistribution from './sub/dashboard/LivestockDistribution';
import RegionalCompliance from './sub/dashboard/RegionalCompliance';
import DrugUsage from './sub/dashboard/DrugUsage';
import AlertsPanel from './sub/dashboard/AlertsPanel';
import ActivityLog from './sub/dashboard/ActivityLog';
import ExportSection from './sub/dashboard/ExportSection';

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  const amuTrendData = [
    { month: 'Jan', usage: 145, limit: 200 },
    { month: 'Feb', usage: 132, limit: 200 },
    { month: 'Mar', usage: 178, limit: 200 },
    { month: 'Apr', usage: 156, limit: 200 },
    { month: 'May', usage: 189, limit: 200 },
    { month: 'Jun', usage: 167, limit: 200 }
  ];

  const complianceData = [
    { region: 'UP', compliant: 94, nonCompliant: 6 },
    { region: 'Punjab', compliant: 89, nonCompliant: 11 },
    { region: 'Haryana', compliant: 96, nonCompliant: 4 },
    { region: 'Rajasthan', compliant: 87, nonCompliant: 13 },
    { region: 'MP', compliant: 92, nonCompliant: 8 }
  ];

  const livestockDistribution = [
    { name: 'Cattle', value: 18450, color: '#B45253' },
    { name: 'Buffalo', value: 15230, color: '#234C6A' },
    { name: 'Goat', value: 8920, color: '#8FA31E' },
    { name: 'Poultry', value: 2840, color: '#FFB823' },
    { name: 'Pig', value: 230, color: '#57B4BA' }
  ];

  const drugUsageData = [
    { drug: 'Amoxicillin', usage: 234, status: 'normal' },
    { drug: 'Tetracycline', usage: 189, status: 'warning' },
    { drug: 'Penicillin', usage: 156, status: 'normal' },
    { drug: 'Oxytetracycline', usage: 198, status: 'alert' },
    { drug: 'Enrofloxacin', usage: 142, status: 'normal' }
  ];

  const alertData = [
    { id: 1, farm: 'Farm #UP-1247', issue: 'MRL Limit Exceeded', severity: 'critical', time: '2 hours ago' },
    { id: 2, farm: 'Farm #PB-0892', issue: 'Withdrawal Period Active', severity: 'warning', time: '5 hours ago' },
    { id: 3, farm: 'Farm #HR-3421', issue: 'Veterinary Verification Pending', severity: 'info', time: '1 day ago' },
    { id: 4, farm: 'Farm #RJ-5643', issue: 'High AMU Detected', severity: 'warning', time: '2 days ago' }
  ];

  const recentActivities = [
    { id: 1, type: 'prescription', user: 'Dr. Rajesh Kumar', action: 'Prescribed Amoxicillin', farm: 'Farm #UP-1247', time: '30 mins ago' },
    { id: 2, type: 'update', user: 'Lalu Yadav', action: 'Updated livestock health', farm: 'Farm #UP-1247', time: '1 hour ago' },
    { id: 3, type: 'inspection', user: 'Inspector Sharma', action: 'Completed farm inspection', farm: 'Farm #PB-0892', time: '3 hours ago' },
    { id: 4, type: 'alert', user: 'System', action: 'Flagged excessive AMU', farm: 'Farm #RJ-5643', time: '5 hours ago' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header mx-3">
        <h1>AMU & MRL Monitoring Dashboard</h1>
        <p>Real-time monitoring and compliance tracking</p>
        <div className="dashboard-filters row g-2">
          <div className="col-md-4 col-lg-4 mx-auto">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="form-select"
            >
              <option value="all">All Regions</option>
              <option value="up">Uttar Pradesh</option>
              <option value="punjab">Punjab</option>
              <option value="haryana">Haryana</option>
              <option value="rajasthan">Rajasthan</option>
            </select>
          </div>
          <div className="col-md-4 col-lg-4 mx-auto">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="form-select"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div className="col-md-4 col-lg-4 mx-auto">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="form-select"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <StatsCards />

        <div className="row g-3 mb-3">
          <div className="col-lg-8">
            <AMUTrends data={amuTrendData} />
          </div>
          <div className="col-lg-4">
            <LivestockDistribution data={livestockDistribution} />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-lg-6">
            <RegionalCompliance data={complianceData} />
          </div>
          <div className="col-lg-6">
            <DrugUsage data={drugUsageData} />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-lg-6">
            <AlertsPanel alerts={alertData} />
          </div>
          <div className="col-lg-6">
            <ActivityLog activities={recentActivities} />
          </div>
        </div>

        <ExportSection />
      </div>
    </div>
  );
}
