
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/shivendrra/', label: 'Linkedin' },
    { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/shivendrra_/', label: 'Instagram' },
    { icon: 'fa-brands fa-twitter', href: 'https://x.com/shivendrra_', label: 'Twitter' },
    { icon: 'fa-brands fa-github', href: 'https://github.com/shivendrra/CattleSense', label: 'GitHub' },
  ];

  return (
    <footer className="bg-black text-white py-16 border-t border-gray-900 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-baseline gap-2 mb-6">
              <img src="https://raw.githubusercontent.com/shivendrra/CattleSense/main/web/favicon.ico" alt="" className="w-12 h-12"/>
              <h3 className="font-serif text-5xl">CattleSense</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Pioneering digital livestock health monitoring in partnership with the Ministry of Fisheries, Animal Husbandry and Dairying.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                >
                  <i className={`${link.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-6 text-gray-400">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-6 text-gray-400">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-6 text-gray-400">Contact</h4>
            <p className="text-gray-500 text-sm mb-2">Tech Park, Noida, UP</p>
            <p className="text-gray-500 text-sm mb-4">+91 98765 43210</p>
            <a href="mailto:support@cattlesense.org" className="text-primary hover:text-white text-sm transition-colors">support@cattlesense.org</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-900 text-gray-600 text-xs">
          <p>© 2024 cattlesense.org by TwoFold. All rights reserved.</p>
          <p className="flex items-center gap-1">Designed for India <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-4 h-3 object-cover rounded-[1px]" /></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;