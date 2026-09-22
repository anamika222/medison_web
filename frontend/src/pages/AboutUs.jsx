import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaUserTie, 
  FaBullseye, 
  FaHistory, 
  FaHospital, 
  FaCheckCircle, 
  FaQuoteLeft,
  FaAward,
  FaBed,
  FaUserMd,
  FaSmile,
  FaEye,
  FaRocket,
  FaHeartbeat,
  FaStethoscope,
  FaAmbulance
} from 'react-icons/fa';

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language; // 'en' অথবা 'bn'

  // Django API Data State
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. Django API থেকে ডাটা লোড করা
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/about-us-data/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAboutData(data[0] || {});
        } else {
          setAboutData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching about data:", err);
        setLoading(false);
      });
  }, []);

  // URL Hash অনুযায়ী নির্দিষ্ট সেকশনে স্মুথ স্ক্রোল করা
  useEffect(() => {
    const hash = location.pathname.split('/about/')[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location, loading]);

  // স্ট্যাটস আইকন ডাইনামিকালি দেখানোর জন্য Helper Function
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FaBed': return <FaBed size={28} />;
      case 'FaUserMd': return <FaUserMd size={28} />;
      case 'FaAward': return <FaAward size={28} />;
      case 'FaSmile': return <FaSmile size={28} />;
      case 'FaHeartbeat': return <FaHeartbeat size={28} />;
      case 'FaStethoscope': return <FaStethoscope size={28} />;
      case 'FaAmbulance': return <FaAmbulance size={28} />;
      default: return <FaBed size={28} />;
    }
  };

  // ডাইনামিক ফিল্ড রিডার (API ডাটাতে যদি title_bn / title_en থাকে)
  const getField = (obj, fieldName) => {
    if (!obj) return '';
    return obj[`${fieldName}_${currentLang}`] || obj[fieldName] || '';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0', fontSize: '1.2rem', color: '#0046AD' }}>
        {t('loading_about')}
      </div>
    );
  }

  // ModelViewSet অনুযায়ী ডাটা হ্যান্ডেলিং
  const { overview, stats, executives, timeline } = aboutData || {};
  
  
  const overviewTitle = getField(overview, 'title') || getField(aboutData, 'title') || t('who_we_are_title');
  const overviewSubtitle = getField(overview, 'subtitle') || getField(aboutData, 'subtitle') || t('who_we_are_subtitle');
  const featuresList = overview?.features || aboutData?.features;
  const whoWeAreImage = overview?.who_we_are_image || aboutData?.who_we_are_image;

  // Hero Section Image
  const heroBgImage = aboutData?.hero_bg_image || overview?.hero_bg_image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop";

  return (
    <div style={{ backgroundColor: '#F8FAFC', color: '#1E293B', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Inline Keyframe Animations & CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatAnim {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .animate-fade-in-1 {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in-2 {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-3 {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }

        .floating-badge {
          animation: floatAnim 4s ease-in-out infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 70, 173, 0.1);
        }

        .sticky-tab-bar {
          position: sticky;
          top: 70px;
          z-index: 100;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .tab-btn {
          padding: 1rem 1.5rem;
          color: #475569;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
          display: inline-block;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }
        .tab-btn:hover {
          color: #0046AD;
          border-bottom-color: #0046AD;
        }

        .timeline-box::before {
          content: '';
          position: absolute;
          left: -29px;
          top: 20px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #0046AD;
          border: 3px solid #fff;
          box-shadow: 0 0 0 3px rgba(0, 70, 173, 0.2);
        }

        .video-container {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          background: #000;
        }
      `}</style>

      {/* Hero Banner Section */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 43, 107, 0.88) 0%, rgba(0, 70, 173, 0.78) 100%), url(${heroBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff',
        padding: '7rem 1.5rem 5.5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="animate-fade-in-1">
            <span 
              className="floating-badge"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 20px', 
                borderRadius: '30px', 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                letterSpacing: '1px',
                display: 'inline-block',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }}
            >
              🏥 {t('hero_welcome')}
            </span>
          </div>

          <h1 
            className="animate-fade-in-2" 
            style={{ 
              fontSize: '3.2rem', 
              fontWeight: '800', 
              margin: '1.2rem 0', 
              lineHeight: 1.2,
              textShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            {t('hero_title')}
          </h1>

          <p 
            className="animate-fade-in-3" 
            style={{ 
              fontSize: '1.15rem', 
              opacity: 0.95, 
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Navigation Anchor Bar */}
      <div className="sticky-tab-bar">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '1rem', overflowX: 'auto', whiteSpace: 'nowrap', padding: '0 1rem' }}>
          <a href="#who-we-are" className="tab-btn">{t('whoWeAre')}</a>
          <a href="#hospital-video" className="tab-btn">{t('video_tour')}</a>
          <a href="#message-of-chairman" className="tab-btn">{t('messageChairman')}</a>
          <a href="#vision-and-mission" className="tab-btn">{t('visionMission')}</a>
          <a href="#journey" className="tab-btn">{t('journey')}</a>
          <a href="#executive-committee" className="tab-btn">{t('executiveCommittee')}</a>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        
        {/* 1. Who We Are + Full Width Video */}
        <section id="who-we-are" style={{ scrollMarginTop: '140px', marginBottom: '5rem' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FaHospital /> {t('whoWeAre')}
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', margin: '0.5rem 0 1.2rem 0' }}>
              {overviewTitle}
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
              {overviewSubtitle}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
              {featuresList?.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: '#1E293B' }}>
                  <FaCheckCircle color="#0046AD" size={18} /> {getField(item, 'title')}
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 2. Message of Chairman */}
        <section id="message-of-chairman" style={{ scrollMarginTop: '140px', marginBottom: '5rem' }}>
          <div className="glass-card" style={{ padding: '3.5rem 2.5rem', background: '#ffffff', borderLeft: '6px solid #0046AD' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={overview?.chairman_image || aboutData?.chairman_image || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop"} 
                  alt="Chairman" 
                  style={{ width: '220px', height: '220px', borderRadius: '50%', objectFit: 'cover', border: '6px solid #F1F5F9', boxShadow: '0 12px 25px rgba(0,0,0,0.1)' }} 
                />
                <h3 style={{ margin: '1.2rem 0 0 0', fontSize: '1.3rem', fontWeight: '800', color: '#0F172A' }}>
                  {getField(overview, 'chairman_name') || getField(aboutData, 'chairman_name')}
                </h3>
                <p style={{ margin: 0, color: '#E31B23', fontWeight: '700', fontSize: '0.9rem' }}>
                  {getField(overview, 'chairman_role') || getField(aboutData, 'chairman_role')}
                </p>
              </div>

              <div>
                <FaQuoteLeft size={40} color="rgba(0, 70, 173, 0.15)" />
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0046AD', margin: '0.5rem 0 1rem 0' }}>
                  {t('messageChairman')}
                </h3>
                <p style={{ color: '#334155', lineHeight: 1.8, fontSize: '1.05rem', fontStyle: 'italic' }}>
                  "{getField(overview, 'chairman_message') || getField(aboutData, 'chairman_message')}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Vision & Mission */}
        <section id="vision-and-mission" style={{ scrollMarginTop: '140px', marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              <FaBullseye /> {t('our_guiding_principles')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', margin: '0.4rem 0' }}>
              {t('visionMission')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem 2rem', background: '#ffffff', position: 'relative' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 70, 173, 0.1)', color: '#0046AD', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <FaEye size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.8rem' }}>
                {t('our_vision')}
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.98rem', margin: 0 }}>
                {getField(overview, 'vision_text') || getField(aboutData, 'vision_text')}
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem 2rem', background: '#ffffff', position: 'relative' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(227, 27, 35, 0.1)', color: '#E31B23', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <FaRocket size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.8rem' }}>
                {t('our_mission')}
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.98rem', margin: 0 }}>
                {getField(overview, 'mission_text') || getField(aboutData, 'mission_text')}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Journey */}
        <section id="journey" style={{ scrollMarginTop: '140px', marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              <FaHistory /> {t('our_history')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', margin: '0.4rem 0' }}>
              {t('journey_title')}
            </h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', borderLeft: '3px solid #E2E8F0', paddingLeft: '2rem' }}>
            {timeline?.map((item) => (
              <div key={item.id} className="timeline-box" style={{ position: 'relative', marginBottom: '2.5rem' }}>
                <span style={{ background: '#0046AD', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                  {item.year}
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: '0.6rem 0 0.3rem 0' }}>
                  {getField(item, 'title')}
                </h4>
                <p style={{ color: '#64748B', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>
                  {getField(item, 'description')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Executive Committee */}
        <section id="executive-committee" style={{ scrollMarginTop: '140px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              <FaUserTie /> {t('leadership')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', margin: '0.4rem 0' }}>
              {t('executiveCommittee')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {executives?.map((person) => (
              <div key={person.id} className="glass-card" style={{ overflow: 'hidden', textAlign: 'center', background: '#ffffff' }}>
                <img src={person.image} alt={person.name} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
                    {getField(person, 'name')}
                  </h4>
                  <p style={{ margin: '4px 0 2px 0', color: '#0046AD', fontSize: '0.88rem', fontWeight: '700' }}>
                    {getField(person, 'role')}
                  </p>
                  <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.8rem' }}>
                    {getField(person, 'qualifications')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;