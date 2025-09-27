import React, { useState } from 'react';
import './styles/Home.css';
import './styles/GraphSection.css';
import SummarySection from './sub/SummarySection';
import ProfileSection from './sub/ProfileSection';
import MapSection from './sub/MapSection';
import InsightSection from './sub/InsightSection';
import GraphSection from './sub/GraphSection';

export default function Home() {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const openSummary = () => setIsSummaryOpen(true);
  const closeSummary = () => setIsSummaryOpen(false);

  const amuTrendData = [
    { month: 'Jan', value: 12 }, { month: 'Feb', value: 15 }, { month: 'Mar', value: 8 },
    { month: 'Apr', value: 22 }, { month: 'May', value: 18 }, { month: 'Jun', value: 25 },
    { month: 'Jul', value: 20 }, { month: 'Aug', value: 16 }, { month: 'Sep', value: 14 },
    { month: 'Oct', value: 19 }, { month: 'Nov', value: 23 }, { month: 'Dec', value: 17 }
  ];

  const complianceData = [
    { month: 'Jan', value: 95 }, { month: 'Feb', value: 92 }, { month: 'Mar', value: 98 },
    { month: 'Apr', value: 89 }, { month: 'May', value: 96 }, { month: 'Jun', value: 94 },
    { month: 'Jul', value: 97 }, { month: 'Aug', value: 91 }, { month: 'Sep', value: 93 },
    { month: 'Oct', value: 95 }, { month: 'Nov', value: 98 }, { month: 'Dec', value: 96 }
  ];

  const lineChartConfig = {
    title: 'AMU Trends',
    subtitle: 'Antimicrobial Usage - Last 12 Months',
    icon: 'trending_up',
    color: '#84994F',
    yAxisMax: 30
  };

  const barChartConfig = {
    title: 'MRL Compliance Rate',
    subtitle: 'Maximum Residue Limits - Monthly Performance',
    icon: 'verified',
    color: '#1B3C53',
    barColor: '#456882',
    yAxisMax: 120
  };

  return (
    <>
      <div className="home">
        <div className="container-fluid">
          <div className="row g-3 h-100">
            <div className="col-lg-7 d-flex">
              <div className="left-column flex-fill">
                <ProfileSection />
                <MapSection />
              </div>
            </div>

            <div className="col-lg-5 d-flex">
              <InsightSection onExpandClick={openSummary} />
            </div>
          </div>
          <GraphSection lineData={amuTrendData} barData={complianceData} lineConfig={lineChartConfig} barConfig={barChartConfig} />
        </div>
      </div>

      <SummarySection isOpen={isSummaryOpen} onClose={closeSummary} />
    </>
  );
}