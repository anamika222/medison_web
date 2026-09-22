import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import {
    FaPhoneAlt,
    FaAmbulance,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaBars,
    FaTimes,
    FaBullhorn,
    FaCalendarCheck,
    FaChevronDown
} from 'react-icons/fa';

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

    const aboutDropdownItems = [
        { label: t("whoWeAre"), link: "/about/who-we-are" },
        { label: t("executiveCommittee"), link: "/about/executive-committee" },
        { label: t("messageChairman"), link: "/about/message-of-chairman" },
        { label: t("journey"), link: "/about/journey" },
        { label: t("visionMission"), link: "/about/vision-and-mission" },
    ];

    const departmentItems = [
        { label: t("cardiology"), link: "/departments#cardiology" },
        { label: t("neurology"), link: "/departments#neurology" },
        { label: t("orthopedics"), link: "/departments#orthopedics" },
        { label: t("pediatrics"), link: "/departments#pediatrics" },
        { label: t("gynecology"), link: "/departments#gynecology" },
        { label: t("gastroenterology"), link: "/departments#gastroenterology" },
        { label: t("urology"), link: "/departments#urology" },
        { label: t("icu"), link: "/departments#icu" },
    ];

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>

            {/* Dynamic Inline CSS Animation & Dropdown Style */}
            <style>{`
        @keyframes marqueeAnimation {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .marquee-hover-pause:hover {
          animation-play-state: paused !important;
        }
        .appointment-box-btn {
          background-color: #0046AD !important;
          color: #ffffff !important;
          border: 2px solid #0046AD;
          padding: 0.53rem 1.2rem !important;
          border-radius: 6px;
          font-weight: 700 !important;
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0, 70, 173, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .appointment-box-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(0, 70, 173, 0.35);
        }
        .appointment-box-btn::before, .appointment-box-btn::after {
          display: none !important;
        }

        /* 🔴 ড্রপডাউন এবং নির্দিষ্ট মেনু আইটেমের টপ বর্ডার ও সুডো এলিমেন্ট রিমুভ করার সিএসএস */
        .no-top-border,
        .no-top-border::before,
        .no-top-border::after,
        .no-top-border > *,
        .no-top-border > *::before,
        .no-top-border > *::after {
          border-top: none !important;
          outline: none !important;
        }
        .no-top-border::before,
        .no-top-border::after {
          content: none !important;
          display: none !important;
        }

        /* Dropdown Styles */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #ffffff;
          min-width: 230px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
          border-radius: 8px;
          padding: 0.5rem 0;
          border-top: 3px solid #0046AD !important;
          z-index: 1000;
          list-style: none;
        }
        .dropdown-item {
          display: block;
          padding: 0.65rem 1.2rem;
          color: #334155 !important;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.2s ease;
          border-top: none !important;
        }
        .dropdown-item:hover {
          background-color: #f1f5f9;
          color: #0046AD !important;
          padding-left: 1.5rem;
        }

        /* Language switcher element specificity */
        .nav-lang-switcher::before,
        .nav-lang-switcher::after {
          display: none !important;
          content: none !important;
        }
        .nav-lang-switcher {
          border-top: none !important;
        }
      `}</style>

            {/* Top Bar Contact & Social */}
            <div
                className="top-bar-bg"
                style={{
                    backgroundColor: '#0046AD',
                    color: '#ffffff',
                    padding: '8px 2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '3rem',
                    flexWrap: 'wrap'
                }}
            >
                {/* Contact Info & Address */}
                <div className="top-info-wrapper" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaPhoneAlt style={{ fontSize: '1rem' }} /> {t('hotline')}: <strong>01334-931870, 01334-931871</strong>
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaAmbulance style={{ fontSize: '1.2rem' }} /> {t('ambulance')}: <strong>+880 1334 931871</strong>
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaEnvelope style={{ fontSize: '1rem' }} /> <strong>info@medisonhospital.com</strong>
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaMapMarkerAlt style={{ fontSize: '1.1rem' }} /> <strong>{t('address')}</strong>
                    </span>
                </div>

                {/* Social Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <a href="https://web.facebook.com/medisonspecializedhospitalandtraumacentre/" style={{ color: '#ffffff', fontSize: '1.1rem' }} title="Facebook"><FaFacebookF /></a>
                </div>
            </div>

            {/* Main Branding & Running Notice Center Bar */}
            <div className="flex-between" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Left Side: Logo */}
                <div className="flex-center" style={{ gap: '0.8rem', minWidth: '200px' }}>
                    <div className="flex-center" style={{ width: '42px', height: '42px', backgroundColor: 'rgba(227, 27, 35, 0.1)', color: '#E31B23', fontSize: '1.6rem', borderRadius: '8px' }}>
                        ➕
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: '#0046AD', fontSize: '1.6rem', letterSpacing: '1px' }}>MEDISON</h2>
                        <p style={{ margin: '2px 0 0 0', color: '#E31B23', fontWeight: 600, fontSize: '0.8rem' }}>
                            <Typewriter
                                key={i18n.language}
                                words={[t('specializedHospital'), t('traumaCentre')]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </p>
                    </div>
                </div>

                {/* Center Side: Running Scrolling Notice */}
                <div
                    style={{
                        flex: 1,
                        margin: '0 2rem',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        backgroundColor: '#F2F7FA',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        border: '1px solid #E3EBF3'
                    }}
                >
                    <div
                        className="marquee-hover-pause"
                        style={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            animation: 'marqueeAnimation 18s linear infinite',
                            color: '#0046AD',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <FaBullhorn style={{ color: '#E31B23' }} />
                            🚨 <strong>{t('latestNotice')}:</strong> {t('noticeText')}
                        </span>
                    </div>
                </div>

                {/* Right Side: Emergency Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/emergency" style={{ backgroundColor: '#E31B23', color: '#fff', textDecoration: 'none', padding: '0.6rem 1rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        ⚡ {t('emergency')}
                    </Link>

                    <button className="mobile-toggle-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className={`nav-center-bar ${isMobileOpen ? 'mobile-open' : ''}`}>
                <ul className="nav-center-list" style={{ display: 'flex', alignItems: 'center' }}>
                    <li className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMobileOpen(false)}>
                        <Link to="/">{t('home')}</Link>
                    </li>

                    {/* About Us Menu with Dropdown */}
                    <li
                        className={`no-top-border ${location.pathname.startsWith('/about') ? 'active' : ''}`}
                        style={{ position: 'relative', cursor: 'pointer', borderTop: 'none' }}
                        onMouseEnter={() => setAboutDropdownOpen(true)}
                        onMouseLeave={() => setAboutDropdownOpen(false)}
                    >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderTop: 'none' }}>
                            {t('aboutUs')} <FaChevronDown size={11} style={{ transition: '0.3s', transform: aboutDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </span>

                        {/* Dropdown Menu Items */}
                        {aboutDropdownOpen && (
                            <div className="dropdown-menu">
                                {aboutDropdownItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.link}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setAboutDropdownOpen(false);
                                            setIsMobileOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>

                    {/* Departments Dropdown */}
                    <li
                        className={`no-top-border ${location.pathname.startsWith('/departments') ? 'active' : ''}`}
                        style={{ position: 'relative', cursor: 'pointer', borderTop: 'none' }}
                        onMouseEnter={() => setDeptDropdownOpen(true)}
                        onMouseLeave={() => setDeptDropdownOpen(false)}
                    >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderTop: 'none' }}>
                            {t('departments')} <FaChevronDown size={11} style={{ transition: '0.3s', transform: deptDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </span>

                        {deptDropdownOpen && (
                            <div className="dropdown-menu">
                                {departmentItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.link}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setDeptDropdownOpen(false);
                                            setIsMobileOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>

                    <li className={location.pathname === '/services' ? 'active' : ''} onClick={() => setIsMobileOpen(false)}>
                        <Link to="/services">{t('services')}</Link>
                    </li>
                    <li className={location.pathname === '/doctors' ? 'active' : ''} onClick={() => setIsMobileOpen(false)}>
                        <Link to="/doctors">{t('doctors')}</Link>
                    </li>
                    <li className={location.pathname === '/tests' ? 'active' : ''} onClick={() => setIsMobileOpen(false)}>
                        <Link to="/tests">{t('tests')}</Link>
                    </li>

                    {/* Always-Solid Styled Box Button for "Take an Appointment" */}
                    <li style={{ marginLeft: '0.5rem' }} onClick={() => setIsMobileOpen(false)}>
                        <Link to="/take-appointment" className="appointment-box-btn">
                            <FaCalendarCheck /> {t('takeAppointment')}
                        </Link>
                    </li>

                    {/* Language Switcher */}
                    <li className="nav-lang-switcher" style={{ marginLeft: '8rem', display: 'flex', alignItems: 'center', borderTop: 'none' }}>
                        <LanguageSwitcher />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;