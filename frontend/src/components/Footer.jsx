import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaExclamationTriangle, 
  FaFileAlt, 
  FaExternalLinkAlt,
  FaChevronRight,
  FaHeartbeat,
  FaPaperPlane,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaShieldAlt,
  FaUserNurse
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0F172A',
      color: '#CBD5E1',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      marginTop: '4rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Top Emergency Highlight Banner */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          marginBottom: '3.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#EF4444',
              padding: '1rem',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaExclamationTriangle size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
                  24/7 Emergency Medical Response
                </h4>
                <span style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34D399',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: '20px'
                }}>
                  ● Live Service
                </span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
                Instant Ambulance, Critical ICU, and Blood Bank Services in Patuakhali.
              </p>
            </div>
          </div>
          <a 
            href="tel:01334-931870, 01334-931871" 
            style={{
              background: 'linear-gradient(90deg, #2563EB 0%, #4F46E5 100%)',
              color: '#ffffff',
              fontWeight: '700',
              padding: '0.85rem 1.8rem',
              borderRadius: '14px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.95rem',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
            }}
          >
            <FaPhoneAlt size={14} /> Emergency: 01334-931870, 01334-931871
          </a>
        </div>

        {/* Main Columns Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Col 1: Brand & Bio */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
              <div style={{
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#60A5FA',
                padding: '10px',
                borderRadius: '12px',
                display: 'flex'
              }}>
                <FaHeartbeat size={24} />
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', letterSpacing: '0.5px' }}>
                MEDISON
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              Medison Hospital is dedicated to offering state-of-the-art diagnostic care, automated lab reports, and specialized treatment with world-class medical personnel.
            </p>
            
            {/* Newsletter */}
            <div style={{ marginTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#E2E8F0', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Subscribe to Health Updates
              </span>
              <div style={{ display: 'flex', backgroundColor: '#1E293B', borderRadius: '10px', padding: '4px', border: '1px solid #334155' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    width: '100%'
                  }}
                />
                <button style={{
                  backgroundColor: '#2563EB',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Patient Portal Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #334155', paddingBottom: '0.6rem', marginBottom: '1.2rem' }}>
              Patient Portal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/download-report" style={{ color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaChevronRight size={10} color="#3B82F6" /> Download Test Report
                </Link>
              </li>
              <li>
                <Link to="/doctors" style={{ color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaChevronRight size={10} color="#3B82F6" /> Find Doctor & Book
                </Link>
              </li>
              <li>
                <Link to="/tests" style={{ color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaChevronRight size={10} color="#3B82F6" /> Diagnostic Test Prices
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaChevronRight size={10} color="#3B82F6" /> Specialized Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Administration */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #334155', paddingBottom: '0.6rem', marginBottom: '1.2rem' }}>
              Administration
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
              <li>
                <a href="http://127.0.0.1:8000/medison_dashboard_management/" target="_blank" rel="noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFileAlt size={12} color="#64748B" /> Hospital Dashboard <FaExternalLinkAlt size={10} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                </a>
              </li>
              <li>
                <Link to="/about" style={{ color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaUserNurse size={12} color="#64748B" /> About Our Hospital
                </Link>
              </li>
              <li style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaShieldAlt size={12} color="#34D399" /> HIPAA & ISO Certified
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Center */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #334155', paddingBottom: '0.6rem', marginBottom: '1.2rem' }}>
              Contact Center
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: '#94A3B8' }}>
              <p style={{ margin: 0, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <FaMapMarkerAlt size={14} color="#60A5FA" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Medison Healthcare Center, College Road, Patuakhali</span>
              </p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaEnvelope size={14} color="#60A5FA" style={{ flexShrink: 0 }} />
                <span>support@medisonpatuakhali.com</span>
              </p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaClock size={14} color="#60A5FA" style={{ flexShrink: 0 }} />
                <span>24 Hours Open (365 Days)</span>
              </p>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '1.2rem' }}>
              {[
                { icon: <FaFacebookF size={12} />, href: "#" },
                { icon: <FaTwitter size={12} />, href: "#" },
                { icon: <FaLinkedinIn size={12} />, href: "#" },
                { icon: <FaYoutube size={12} />, href: "#" }
              ].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: '#CBD5E1',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} Medison Hospital Management System. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>System Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;