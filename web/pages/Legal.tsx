
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
    <p className="text-sm text-gray-400">Effective Date: October 26, 2024</p>

    <Section title="What are cookies?">
      <p>Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
    </Section>

    <Section title="How We Use Cookies">
      <p>We use cookies to improve your browsing experience, analyze our traffic, and personalize content. We categorize our cookies into the following types:</p>
      <ul className="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Essential Cookies:</strong> These are necessary for the website to function (e.g., maintaining your login session, security tokens). These cannot be switched off in our systems.</li>
        <li><strong>Analytics Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site. All information these cookies collect is aggregated and anonymous.</li>
        <li><strong>Marketing Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.</li>
      </ul>
    </Section>

    <Section title="Managing Your Preferences">
      <p>You can manage your cookie preferences at any time by visiting your <a href="/#/settings" className="text-primary hover:underline">Account Settings</a>. You can also block cookies via your browser settings, though this may impact the functionality of the website.</p>
    </Section>

    <Section title="Updates to this Policy">
      <p>We may update our Cookie Policy from time to time. We encourage you to review this policy periodically for any changes.</p>
    </Section>
  </LegalLayout>
);
