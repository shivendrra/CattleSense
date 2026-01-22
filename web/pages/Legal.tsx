import React from 'react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-white py-20 font-sans text-darkBlue">
    <div className="container mx-auto px-6 max-w-4xl">
      <h1 className="text-5xl font-serif mb-12 pb-6 border-b border-gray-100">{title}</h1>
      <div className="space-y-12">
        {children}
      </div>
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h3 className="text-2xl font-semibold mb-4 text-darkBlue">{title}</h3>
    <div className="text-gray-600 leading-relaxed text-base space-y-4 font-light">
      {children}
    </div>
  </section>
);

export const PrivacyPolicy: React.FC = () => (
  <LegalLayout title="Privacy Policy">
    <p className="text-sm text-gray-400">Last Updated: October 26, 2024</p>
    <Section title="1. Information We Collect">
      <p>We collect information regarding livestock health, geolocation of farms, and user contact details. This data is used solely for the purpose of monitoring health trends and ensuring compliance.</p>
    </Section>
    <Section title="2. Data Usage">
      <p>Aggregated, anonymized data may be shared with government bodies like the Department of Animal Husbandry & Dairying for policy making. Personal identifiable information is never sold to third parties.</p>
    </Section>
    <Section title="3. Data Security">
      <p>We use industry-standard encryption to protect your data. Access is restricted to authorized personnel only.</p>
    </Section>
  </LegalLayout>
);

export const TermsOfService: React.FC = () => (
  <LegalLayout title="Terms of Service">
    <Section title="1. Acceptance of Terms">
      <p>By using CattleSense, you agree to these terms. You must verify that all data entered regarding livestock health and medication is accurate to the best of your knowledge.</p>
    </Section>
    <Section title="2. User Responsibilities">
      <p>Farmers and Veterinarians are responsible for maintaining the confidentiality of their account credentials. Any falsification of health records is a violation of our terms and may lead to account termination.</p>
    </Section>
    <Section title="3. Liability">
      <p>CattleSense provides data for informational purposes. While we strive for accuracy, we are not liable for economic losses incurred due to farm management decisions based on our data.</p>
    </Section>
  </LegalLayout>
);

export const CookiePolicy: React.FC = () => (
  <LegalLayout title="Cookie Policy">
    <Section title="Use of Cookies">
      <p>We use cookies to enhance your experience, specifically to maintain your login session and remember your dashboard preferences.</p>
      <p>We do not use tracking cookies for advertising purposes.</p>
    </Section>
  </LegalLayout>
);