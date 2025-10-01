import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles/Footer.css';
import cow1 from "../assets/img/cow1.jpg";

const Footer = () => {
  const location = useLocation();
  const authPaths = ['/auth/login', '/auth/signup'];

  if (authPaths.includes(location.pathname)) {
    return null;
  }

  const companyLinks = [
    { name: 'About', href: '/about', external: false },
    { name: 'Careers', href: '/careers', external: false },
    { name: 'Brand Center', href: '/brand-center', external: false },
    { name: 'Blogs', href: '/blogs', external: false }
  ];

  const helpLinks = [
    { name: 'Contact Us', href: '/contact', external: false },
    { name: 'FAQs', href: '/help#faq', external: false },
    { name: 'Twitter', href: 'https://x.com/shivendrra_', external: true },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/legal#privacy-policy', external: false },
    { name: 'Licensing', href: '/legal#licensing', external: false },
    { name: 'Terms & Conditions', href: '/legal#terms-and-conditions', external: false }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', href: '/', label: 'Facebook', external: false },
    { icon: 'fab fa-instagram', href: 'https://www.instagram.com/shivendrra_/', label: 'Instagram', external: true },
    { icon: 'fab fa-twitter', href: 'https://x.com/shivendrra_', label: 'Twitter', external: true },
    { icon: 'fab fa-github', href: 'https://github.com/shivendrra/CattleSense', label: 'GitHub', external: true },
  ];

  const renderLink = (link, children) => {
    if (link.external) {
      return (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return <Link to={link.href}>{children}</Link>;
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-4">
            <img src={cow1} alt="" className='logo-cow' />
            <p className='web-title'>CattleSense</p>
            <p className='web-title-des'>by <a className='web-title-url' href="https://shivendrra.vercel.app/" target="_blank" rel="noopener noreferrer">@shivendrra</a></p>
          </div>

          <div className="col-lg-2 footer-section col-md-6 col-sm-6 mb-4">
            <h5 className="footer-title">COMPANY</h5>
            <ul className="footer-links">
              {companyLinks.map((link, index) => (
                <li key={index}>{renderLink(link, link.name)}</li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 footer-section col-md-6 col-sm-6 mb-4">
            <h5 className="footer-title">HELP CENTER</h5>
            <ul className="footer-links">
              {helpLinks.map((link, index) => (
                <li key={index}>{renderLink(link, link.name)}</li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 footer-section col-md-6 col-sm-6 mb-4">
            <h5 className="footer-title">LEGAL</h5>
            <ul className="footer-links">
              {legalLinks.map((link, index) => (
                <li key={index}>{renderLink(link, link.name)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-4">
              <p className="copyright">© 2025 <span className='web-title-footer'>CattleSense</span>™ by <strong>TwoFold</strong></p>
            </div>
            <div className="col-md-4">
              <p class="middle">Made for responsible livestock stewardship • India</p>
            </div>
            <div className="col-md-4">
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  renderLink(social, <i className={social.icon}></i>, social.label)
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;