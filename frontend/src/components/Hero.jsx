import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { 
  FaUserMd, 
  FaCalendarCheck, 
  FaTint, 
  FaNotesMedical, 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const DEFAULT_SLIDES = [
  { id: 1, image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1600&auto=format&fit=crop" },
  { id: 2, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop" },
  { id: 3, image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop" }
];

const Hero = () => {
  const { t } = useTranslation();
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  const QUICK_SERVICES = [
    { id: 1, title: t('find_doctor'), icon: <FaUserMd size={32} />, link: "/doctors", clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)", bgColor: "#003b93" },
    { id: 2, title: t('takeAppointment'), icon: <FaCalendarCheck size={32} />, link: "/take-appointment", clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 92%)", bgColor: "#C41219" },
    { id: 3, title: t('tests'), icon: <FaTint size={32} />, link: "/tests", clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)", bgColor: "#0046AD" },
    { id: 4, title: t('mrd_services'), icon: <FaNotesMedical size={32} />, link: "/services", clipPath: "polygon(0 0, 100% 8%, 100% 92%, 0 90%)", bgColor: "#E31B23" }
  ];

  useEffect(() => {
    let isMounted = true;
    axios.get(`${API_BASE_URL}/api/banner-slides/`) 
      .then(res => {
        if (isMounted && res.data && res.data.length > 0) {
          setSlides(res.data);
        }
      })
      .catch((err) => {
        console.warn("Banner load failed, using fallback slides:", err);
      });

    return () => { isMounted = false; };
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [slides.length, handleNext]);

  const renderAnimatedWords = (text, slideIndex, baseDelay = 0, speed = 0.12) => {
    if (!text) return null;
    return text.split(" ").map((word, index) => (
      <span
        key={`${slideIndex}-${word}-${index}`}
        className="animated-word"
        style={{ animationDelay: `${baseDelay + index * speed}s` }}
      >
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <section className="hero-section">
      {/* 1. HERO SLIDER */}
      <div className="hero-slider-container">
        {slides.map((slide, index) => {
          const imageUrl = slide.image?.startsWith('http') 
            ? slide.image 
            : `${API_BASE_URL}${slide.image}`;

          return (
            <div
              key={slide.id || index}
              className={`slide-bg ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 10, 30, 0.45), rgba(0, 10, 30, 0.55)), url(${imageUrl})`,
              }}
            />
          );
        })}

        <div className="hero-content-wrapper">
          <div className="hero-text-box">
            <span className="hero-tagline">
              {renderAnimatedWords(t('hero_welcome'), currentSlide, 0.1)}
            </span>

            <h1 className="hero-title">
              {renderAnimatedWords(t('hero_title'), currentSlide, 0.4)}
            </h1>

            <div className="hero-subtitle-box">
              <p className="hero-subtitle">
                {renderAnimatedWords(t('hero_subtitle'), currentSlide, 0.8, 0.06)}
              </p>

              <p className="hero-bio">
                {renderAnimatedWords(t('hero_bio'), currentSlide, 1.2, 0.06)}
              </p>
            </div>

            <div key={`btn-group-${currentSlide}`} className="hero-btn-group animate-fade-in-btn">
              <Link to="/take-appointment" className="hero-btn-primary">
                {t('book_appointment')}
              </Link>

              <Link to="/doctors" className="hero-btn-secondary">
                {t('find_doctor')}
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button onClick={handlePrev} className="nav-btn nav-btn-left" aria-label="Previous Slide">
          <FaChevronLeft size={18} />
        </button>

        <button onClick={handleNext} className="nav-btn nav-btn-right" aria-label="Next Slide">
          <FaChevronRight size={18} />
        </button>
      </div>

      {/* 2. QUICK SERVICES (FOLDING PANEL) */}
      <div className="quick-services-container">
        <div className="quick-services-grid">
          {QUICK_SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              style={{
                backgroundColor: service.bgColor,
                '--card-clip-path': service.clipPath,
              }}
              className="quick-folding-card"
            >
              <div className="card-icon-wrapper">
                {service.icon}
              </div>

              <h4 className="card-title">
                {service.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          background-color: #0f172a;
          color: #fff;
          overflow: hidden;
          padding-bottom: 2rem;
        }

        .hero-slider-container {
          position: relative;
          min-height: 65vh;
          width: 100%;
          overflow: hidden;
        }

        .slide-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1);
          transition: opacity 1.2s ease-in-out, transform 6s ease-out;
          filter: brightness(1.05) contrast(1.05);
          z-index: 0;
        }

        .slide-bg.active {
          opacity: 1;
          transform: scale(1.05);
          z-index: 1;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          margin: 0 auto;
          padding: 4rem 1.5rem 5rem 1.5rem;
          min-height: 65vh;
          display: flex;
          align-items: center;
        }

        .hero-text-box {
          max-width: 650px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        .hero-tagline {
          background-color: #0046AD;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 5px 14px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          margin-bottom: 0.8rem;
          box-shadow: 0 4px 12px rgba(0, 70, 173, 0.4);
        }

        .hero-title {
          font-size: 2.6rem;
          font-weight: 800;
          line-height: 1.25;
          margin: 0.2rem 0 0.8rem 0;
          color: #ffffff;
        }

        .hero-subtitle-box {
          border-left: 4px solid #0052cc;
          padding-left: 1rem;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 0.95rem;
          font-weight: 700;
          color: #60a5fa;
          margin: 0 0 0.4rem 0;
        }

        .hero-bio {
          font-size: 1rem;
          color: #f1f5f9;
          margin: 0;
        }

        .hero-btn-group {
          display: flex;
          gap: 0.8rem;
        }

        .hero-btn-primary {
          background: linear-gradient(135deg, #0052cc 0%, #003b93 100%);
          color: #fff;
          padding: 0.75rem 1.6rem;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0, 82, 204, 0.4);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 82, 204, 0.6);
        }

        .hero-btn-secondary {
          background-color: rgba(0, 0, 0, 0.4);
          color: #fff;
          border: 2px solid #ffffff;
          padding: 0.75rem 1.6rem;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .hero-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .nav-btn {
          position: absolute;
          top: 45%;
          z-index: 3;
          background-color: rgba(0, 0, 0, 0.4);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
        }

        .nav-btn-left { left: 15px; }
        .nav-btn-right { right: 15px; }

        .quick-services-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: -2.5rem auto 0 auto;
          padding: 0 1rem;
        }

        .quick-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0px;
        }

        .quick-folding-card {
          color: #ffffff;
          padding: 1.8rem 1rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          clip-path: var(--card-clip-path);
          transition: transform 0.3s ease;
        }

        .quick-folding-card:hover {
          transform: translateY(-4px);
        }

        .card-icon-wrapper {
          background-color: rgba(255, 255, 255, 0.15);
          width: 54px;
          height: 54px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.8rem;
        }

        .card-title { margin: 0; font-size: 0.9rem; font-weight: 800; }

        .animated-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(15px);
          animation: wordAppear 0.4s forwards cubic-bezier(0.2, 0.65, 0.6, 1);
        }

        @keyframes wordAppear {
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-btn {
          opacity: 0;
          animation: fadeIn 0.6s forwards ease-in-out;
          animation-delay: 1.5s;
        }

        @keyframes fadeIn { to { opacity: 1; } }

        @media (max-width: 768px) {
          .quick-services-container { margin-top: -1.5rem; }
          .quick-folding-card { clip-path: none !important; margin-bottom: 8px; border-radius: 8px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;