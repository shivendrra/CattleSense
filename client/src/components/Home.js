import React, { useState } from 'react';
import './styles/Home.css';
import SummarySection from './sub/SummarySection';
import ProfileSection from './sub/ProfileSection';
import MapSection from './sub/MapSection';
import InsightSection from './sub/InsightSection';

export default function Home() {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const openSummary = () => setIsSummaryOpen(true);
  const closeSummary = () => setIsSummaryOpen(false);

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
        </div>
      </div>

      <SummarySection isOpen={isSummaryOpen} onClose={closeSummary} />
    </>
  );
}