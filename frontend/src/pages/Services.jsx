import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Icons
import {
  FaSearch,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaChevronDown,
  FaTimes,
  FaPaperPlane,
  FaUserMd,
  FaSpinner
} from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_URL || 'http://127.0.0.1:8000';

const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Dynamic API Data & Loading States
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch Services Data from Backend API
  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/services/`);
        if (!response.ok) {
          throw new Error('Failed to fetch services.');
        }
        const data = await response.json();
        const formattedData = Array.isArray(data) ? data : data.results || [];
        if (isMounted) setServicesData(formattedData);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => { isMounted = false; };
  }, []);

  // Form Submit API Request
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) return;

    setIsSubmitting(true);

    const payload = {
      service: selectedService.id,
      name: formData.name,
      phone: formData.phone,
      note: formData.note
    };

    try {
      const response = await fetch(`${API_BASE_URL}/service-requests/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit service request.');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedService(null);
        setFormData({ name: '', phone: '', note: '' });
      }, 2500);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['All', 'Emergency', 'Inpatient', 'Specialized', 'Digital', 'Home Care', 'Facility'];

  // Language Aware Data Parsing Helper
  const getLocalizedService = (service) => {
    const isBn = currentLang.startsWith('bn');
    
    const title = isBn 
      ? (service.title_bn || service.title_en || '') 
      : (service.title_en || service.title_bn || '');
      
    const shortDesc = isBn 
      ? (service.short_desc_bn || service.short_desc_en || '') 
      : (service.short_desc_en || service.short_desc_bn || '');

    let image = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80';
    if (service.image) {
      image = service.image.startsWith('http') ? service.image : `${MEDIA_BASE_URL}${service.image}`;
    }

    return {
      ...service,
      title,
      shortDesc,
      image,
      themeColor: service.theme_color || '#0046AD'
    };
  };

  const filteredServices = servicesData.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      (service.title_en && service.title_en.toLowerCase().includes(query)) ||
      (service.title_bn && service.title_bn.toLowerCase().includes(query)) ||
      (service.short_desc_en && service.short_desc_en.toLowerCase().includes(query)) ||
      (service.short_desc_bn && service.short_desc_bn.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const rawSteps = t('steps', { returnObjects: true });
  const stepsList = Array.isArray(rawSteps) ? rawSteps : [];

  const rawFaqs = t('faqs', { returnObjects: true });
  const faqsList = Array.isArray(rawFaqs) ? rawFaqs : [];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      
      {/* Keyframes animation */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spin-icon { animation: spin 1s linear infinite; }
      `}</style>

      {/* 1. Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #002B66 0%, #0046AD 60%, #0066FF 100%)',
        color: '#ffffff',
        padding: '5rem 1.5rem 7rem 1.5rem',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap-reverse' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 500px', textAlign: 'left' }}
          >
            <span style={{
              background: 'rgba(255, 255, 255, 0.12)',
              padding: '0.4rem 1.2rem',
              borderRadius: '30px',
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
              display: 'inline-block',
              marginBottom: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {t('heroBadge', 'Our Healthcare Services')}
            </span>

            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '1.2rem', lineHeight: '1.2' }}>
              {t('heroTitle', 'Comprehensive Medical Solutions')}
            </h1>

            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.7', fontWeight: '300', marginBottom: '2rem' }}>
              {t('heroDesc', 'Explore our wide range of professional healthcare services designed for your wellbeing.')}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem 1.4rem', borderRadius: '14px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>{t('stat1Title', '24/7')}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t('stat1Desc', 'Emergency Support')}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem 1.4rem', borderRadius: '14px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>{t('stat2Title', '50+')}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t('stat2Desc', 'Expert Doctors')}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem 1.4rem', borderRadius: '14px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>{t('stat3Title', '100%')}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t('stat3Desc', 'Quality Care')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ position: 'relative', width: '100%', maxWidth: '460px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                alt="Medical Services Header"
                style={{
                  width: '100%',
                  height: '380px',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
                  border: '4px solid rgba(255,255,255,0.2)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-10px',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                padding: '0.9rem 1.3rem',
                borderRadius: '16px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}>
                <div style={{ width: '42px', height: '42px', backgroundColor: '#0046AD', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FaUserMd size={20} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>{t('doctorTitle', 'Verified Specialists')}</h5>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{t('doctorSubtitle', 'Ready to assist you')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 2. Filter Section */}
      <section style={{ maxWidth: '1200px', margin: '-3rem auto 3.5rem auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            backgroundColor: '#ffffff',
            padding: '1.8rem',
            borderRadius: '20px',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            border: '1px solid rgba(226, 232, 240, 0.8)'
          }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <FaSearch style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }} />
            <input
              type="text"
              placeholder={t('searchPlaceholder', 'Search services...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.95rem 1rem 0.95rem 3.2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: activeCategory === cat ? '#0046AD' : '#f1f5f9',
                  color: activeCategory === cat ? '#ffffff' : '#475569',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: activeCategory === cat ? '0 8px 15px -3px rgba(0,70,173,0.3)' : 'none'
                }}
              >
                {t(`categories.${cat}`, cat)}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. Services Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 5rem auto', padding: '0 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#0046AD' }}>
            <FaSpinner className="spin-icon" style={{ fontSize: '2.5rem' }} />
            <p style={{ marginTop: '1rem', fontWeight: '600' }}>{t('loadingText', 'Loading services...')}</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fef2f2', borderRadius: '16px', color: '#991b1b', border: '1px solid #fecaca' }}>
            <h3>{t('fetchError', 'Error Loading Data')}</h3>
            <p>{error}</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredServices.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {filteredServices.map((rawService, index) => {
                  const isEven = index % 2 === 0;
                  const service = getLocalizedService(rawService);

                  return (
                    <motion.div
                      key={service.id || index}
                      initial={{
                        opacity: 0,
                        x: isEven ? -80 : 80,
                        rotate: isEven ? -3 : 3
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        rotate: 0
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: (index % 3) * 0.1
                      }}
                      whileHover={{ y: -10, boxShadow: '0 25px 35px -12px rgba(0,0,0,0.12)' }}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '24px',
                        padding: '2.2rem',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.15 }}
                            style={{
                              width: '68px',
                              height: '68px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              boxShadow: `0 12px 25px -6px ${service.themeColor}`,
                              border: `3px solid ${service.themeColor}`,
                              flexShrink: 0
                            }}
                          >
                            <img
                              src={service.image}
                              alt={service.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </motion.div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fef3c7', padding: '0.35rem 0.8rem', borderRadius: '20px', color: '#d97706', fontSize: '0.8rem', fontWeight: '800' }}>
                            <FaStar /> 5.0 <span style={{ color: '#92400e', fontWeight: '500' }}>(24)</span>
                          </div>
                        </div>

                        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.8rem', lineHeight: '1.3' }}>
                          {service.title}
                        </h3>

                        <p style={{ color: '#64748b', fontSize: '0.93rem', lineHeight: '1.6', marginBottom: '1.8rem' }}>
                          {service.shortDesc}
                        </p>
                      </div>

                      <div style={{ paddingTop: '1.2rem', borderTop: '1px solid #f1f5f9' }}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={() => setSelectedService(service)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            color: service.themeColor,
                            fontWeight: '800',
                            fontSize: '0.92rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          {t('bookBtn', 'Book Now')} <FaArrowRight size={13} />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 1.5rem', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#475569', marginBottom: '0.5rem' }}>{t('noServicesFound', 'No services found')}</h3>
              </div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* 4. Dynamic Modal System */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '28px',
                padding: '2.5rem',
                maxWidth: '520px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', backgroundColor: selectedService.themeColor }} />
              
              <button
                onClick={() => setSelectedService(null)}
                style={{
                  position: 'absolute',
                  right: '1.5rem',
                  top: '1.5rem',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                <FaTimes size={16} />
              </button>

              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <FaCheckCircle size={55} color="#22c55e" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>{t('successTitle', 'Request Sent!')}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                    {t('successDesc', 'We have received your request for')} <strong>{selectedService.title}</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${selectedService.themeColor}` }}
                    />
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: selectedService.themeColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t(`categories.${selectedService.category}`, selectedService.category)} {t('modalBadge', 'Service')}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        {selectedService.title}
                      </h3>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label htmlFor="nameInput" style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.4rem' }}>{t('inputNameLabel', 'Full Name')}</label>
                      <input
                        id="nameInput"
                        type="text"
                        required
                        placeholder={t('inputNamePlaceholder', 'Enter your full name')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneInput" style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.4rem' }}>{t('inputPhoneLabel', 'Phone Number')}</label>
                      <input
                        id="phoneInput"
                        type="tel"
                        required
                        placeholder={t('inputPhonePlaceholder', 'Enter your phone number')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="noteInput" style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.4rem' }}>{t('inputNoteLabel', 'Additional Note')}</label>
                      <textarea
                        id="noteInput"
                        rows="3"
                        placeholder={t('inputNotePlaceholder', 'Any specific requirements?')}
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          resize: 'none'
                        }}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: selectedService.themeColor,
                        color: '#ffffff',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: 'none',
                        fontWeight: '800',
                        fontSize: '1rem',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                        boxShadow: `0 10px 20px -5px ${selectedService.themeColor}66`,
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                    >
                      {isSubmitting ? <FaSpinner className="spin-icon" /> : <FaPaperPlane />}
                      {isSubmitting ? t('submittingBtnText', 'Submitting...') : t('submitBtnText', 'Confirm Booking')}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Process Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#0046AD', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
            {t('processSubtitle', 'How It Works')}
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '0.5rem', marginBottom: '3.5rem' }}>
            {t('processTitle', 'Simple Steps to Get Service')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {stepsList.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                style={{
                  backgroundColor: '#f8fafc',
                  padding: '2rem 1.5rem',
                  borderRadius: '20px',
                  textAlign: 'left',
                  border: '1px solid #e2e8f0',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0046AD', opacity: 0.25, marginBottom: '0.8rem' }}>
                  {step.num || `0${idx + 1}`}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.6rem' }}>{step.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section style={{ maxWidth: '900px', margin: '5rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#0046AD', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
            {t('faqSubtitle', 'FAQ')}
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '0.5rem' }}>
            {t('faqTitle', 'Frequently Asked Questions')}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqsList.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1.4rem',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}
                >
                  {faq.q}
                  <FaChevronDown
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#0046AD'
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 1.4rem 1.4rem 1.4rem', color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Services;