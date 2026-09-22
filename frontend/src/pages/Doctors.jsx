import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaPhoneAlt, 
  FaClock, 
  FaTimes, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaGraduationCap, 
  FaHospital,
  FaSpinner,
  FaExclamationTriangle,
  FaHeartbeat,
  FaBrain,
  FaBaby,
  FaBone,
  FaUserMd,
  FaEye,
  FaTeeth,
  FaProcedures,
  FaStethoscope,
  FaAward,
  FaBuilding,
  FaGlobe
} from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

const INITIAL_FORM_STATE = { name: '', phone: '', date: '', time: '' };

// 3D Tilt Doctor Card Component + Scroll Entrance Animation
const DoctorCard3D = ({ doc, index, setSelectedDoctor }) => {
  const { t } = useTranslation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const specialtyName = typeof doc.specialty === 'object' ? doc.specialty?.name : doc.specialty;
  
  const departmentNames = Array.isArray(doc.departments) 
    ? doc.departments.map(d => typeof d === 'object' ? d.name : d).filter(Boolean)
    : (doc.departments ? [typeof doc.departments === 'object' ? doc.departments.name : doc.departments] : []);

  const isEven = index % 2 === 0;
  const initialX = isEven ? -60 : 60;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: (index % 2) * 0.15 }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '1.6rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div>
          {/* Doctor Info Header */}
          <div style={{ 
            display: 'flex', 
            gap: '1.2rem', 
            alignItems: 'center', 
            marginBottom: '1.2rem', 
            transform: 'translateZ(30px)', 
            transformStyle: 'preserve-3d' 
          }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img 
                src={doc.image || 'https://via.placeholder.com/130'} 
                alt={doc.name} 
                style={{ 
                  width: '110px', 
                  height: '110px', 
                  borderRadius: '20px', 
                  objectFit: 'cover',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
                  border: '2px solid #f1f5f9'
                }} 
              />
              {doc.is_confirmed && (
                <span style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  border: '3px solid #fff'
                }} title={t('verified')} />
              )}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', lineHeight: '1.3' }}>
                {doc.name}
              </h3>

              {doc.position && (
                <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '600', marginBottom: '6px' }}>
                  {doc.position}
                </div>
              )}

              {specialtyName && (
                <div style={{ 
                  fontSize: '0.78rem', 
                  color: '#0d9488', 
                  fontWeight: '700', 
                  backgroundColor: '#ccfbf1', 
                  padding: '0.3rem 0.65rem', 
                  borderRadius: '8px', 
                  display: 'inline-block',
                  lineHeight: '1.4'
                }}>
                  <FaAward style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {specialtyName}
                </div>
              )}
            </div>
          </div>

          {/* Credentials & Specific Departments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#64748b', marginBottom: '1.2rem', transform: 'translateZ(20px)' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <FaGraduationCap color="#0d9488" size={16} style={{ marginTop: '3px', flexShrink: 0 }} />
              <span>{doc.degrees || t('qualificationsNA')}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaHospital color="#0d9488" size={16} style={{ flexShrink: 0 }} />
              <span>{doc.hospital || t('na')}</span>
            </div>

            {departmentNames.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', marginTop: '2px' }}>
                <FaBuilding color="#0d9488" size={15} style={{ marginTop: '4px', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {departmentNames.map((deptName, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        backgroundColor: '#f1f5f9', 
                        color: '#334155', 
                        padding: '2px 8px', 
                        borderRadius: '6px', 
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      {deptName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chamber Schedule */}
          <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '14px', fontSize: '0.82rem', color: '#475569', marginBottom: '1.2rem', border: '1px solid #f1f5f9', transform: 'translateZ(15px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
              <FaClock color="#0d9488" /> {t('chamberSchedule')}:
            </div>
            <div style={{ color: '#334155', fontWeight: '500' }}>
              {doc.chamber_day_time || t('everydaySchedule')}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9', transform: 'translateZ(25px)' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedDoctor(doc)}
            style={{
              width: '100%',
              backgroundColor: '#0d9488',
              color: '#ffffff',
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)'
            }}
          >
            <FaCalendarAlt /> {t('bookAppointment')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Doctors = () => {
  const { t, i18n } = useTranslation();

  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ১৫টি ডিপার্টমেন্টের তালিকা
  const DEPARTMENTS_LIST = useMemo(() => [
    { name: 'All', labelKey: 'dept_all', rawLabel: 'All Departments', icon: <FaUserMd /> },
    { name: 'Pediatric Surgery', labelKey: 'dept_pediatric_surgery', rawLabel: 'Pediatric & General Surgery', icon: <FaBaby /> },
    { name: 'General Surgery', labelKey: 'dept_general_surgery', rawLabel: 'General, Laparoscopic & Colorectal Surgery', icon: <FaProcedures /> },
    { name: 'Gynecology', labelKey: 'dept_gynecology', rawLabel: 'Gynecology & Obstetrics', icon: <FaUserMd /> },
    { name: 'Anesthesia', labelKey: 'dept_anesthesia', rawLabel: 'Anesthesia & Pain Management', icon: <FaStethoscope /> },
    { name: 'Ultrasonography', labelKey: 'dept_ultrasonography', rawLabel: 'Ultrasonography & Sonology', icon: <FaStethoscope /> },
    { name: 'Ophthalmology', labelKey: 'dept_ophthalmology', rawLabel: 'Ophthalmology (Eye)', icon: <FaEye /> },
    { name: 'Medicine', labelKey: 'dept_medicine', rawLabel: 'Medicine, Nephrology, Diabetes, Cardiology & Respiratory', icon: <FaHeartbeat /> },
    { name: 'Orthopedics', labelKey: 'dept_orthopedics', rawLabel: 'Orthopedics, Spine & Rheumatology', icon: <FaBone /> },
    { name: 'Dental', labelKey: 'dept_dental', rawLabel: 'Dental Care', icon: <FaTeeth /> },
    { name: 'Neurosurgery', labelKey: 'dept_neurosurgery', rawLabel: 'Neurosurgery', icon: <FaBrain /> },
    { name: 'Oncology', labelKey: 'dept_oncology', rawLabel: 'Oncology (Cancer Care)', icon: <FaUserMd /> },
    { name: 'Physical Medicine', labelKey: 'dept_physical_medicine', rawLabel: 'Physical Medicine & Rehabilitation', icon: <FaProcedures /> },
    { name: 'ENT', labelKey: 'dept_ent', rawLabel: 'ENT (Ear, Nose & Throat)', icon: <FaUserMd /> },
    { name: 'Public Health', labelKey: 'dept_public_health', rawLabel: 'Public Health & Experienced Medicine', icon: <FaStethoscope /> },
    { name: 'Ultrasound Gynecology', labelKey: 'dept_ultrasound_gynecology', rawLabel: 'Ultrasound & Gynecology', icon: <FaUserMd /> }
  ], []);

  // Language Switcher Function
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'bn' ? 'en' : 'bn';
    i18n.changeLanguage(nextLang);
  };

  // Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Doctors Data
  useEffect(() => {
    const controller = new AbortController();
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const selectedObj = DEPARTMENTS_LIST.find(s => s.name === activeDepartment);
        const deptParam = activeDepartment === 'All' ? '' : encodeURIComponent(selectedObj?.rawLabel || '');
        
        const url = activeDepartment === 'All' 
          ? `${API_BASE_URL}/doctors/`
          : `${API_BASE_URL}/doctors/?departments__name=${deptParam}`;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Failed to fetch data! Status: ${response.status}`);
        
        const data = await response.json();
        const doctorList = Array.isArray(data) ? data : (data.results || []);
        setDoctorsData(doctorList);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || "Failed to load doctors list.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    return () => controller.abort();
  }, [activeDepartment, DEPARTMENTS_LIST]);

  // Client-side Filtering
  const filteredDoctors = useMemo(() => {
    const query = debouncedQuery.toLowerCase().trim();
    if (!query) return doctorsData;

    return doctorsData.filter(doc => {
      const specialtyName = typeof doc.specialty === 'object' ? doc.specialty?.name : String(doc.specialty || '');
      
      const deptNames = Array.isArray(doc.departments)
        ? doc.departments.map(d => typeof d === 'object' ? d.name : d).join(' ')
        : String(doc.departments || '');

      return (
        doc.name?.toLowerCase().includes(query) || 
        doc.position?.toLowerCase().includes(query) ||
        doc.degrees?.toLowerCase().includes(query) ||
        doc.hospital?.toLowerCase().includes(query) ||
        specialtyName.toLowerCase().includes(query) ||
        deptNames.toLowerCase().includes(query)
      );
    });
  }, [doctorsData, debouncedQuery]);

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData(INITIAL_FORM_STATE);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let timer;
    if (isSubmitted) {
      timer = setTimeout(() => handleCloseModal(), 2200);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/appointments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor: selectedDoctor?.id,
          patient_name: formData.name,
          patient_phone: formData.phone,
          appointment_date: formData.date,
          appointment_time: formData.time
        })
      });

      if (!response.ok) throw new Error('Booking failed! Please try again.');
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Network error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Hero Banner Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #064e3b 100%)', 
        color: '#ffffff', 
        padding: '5rem 1.5rem 7rem 1.5rem', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-10%', right: '10%', width: '350px', height: '350px', background: 'rgba(13, 148, 136, 0.25)', filter: 'blur(120px)', borderRadius: '50%' }} />

        {/* Top Floating Language Switcher Button */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 20 }}>
          <button
            onClick={toggleLanguage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.85rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease'
            }}
          >
            <FaGlobe />
            <span>{i18n.language === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap-reverse', position: 'relative', zIndex: 2 }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 500px' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '0.4rem 1rem',
              borderRadius: '30px',
              fontSize: '0.85rem',
              fontWeight: '600',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              marginBottom: '1.2rem',
              backdropFilter: 'blur(8px)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              {t('heroBadge')}
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: '800', marginBottom: '1.2rem', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
              {t('heroTitle1')} <br/>
              <span style={{ background: 'linear-gradient(90deg, #2dd4bf, #5eead4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('heroTitle2')}
              </span>
            </h1>
            
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '520px' }}>
              {t('heroSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" 
                alt="Medical Doctors" 
                style={{ 
                  width: '100%', 
                  height: '360px', 
                  objectFit: 'cover', 
                  borderRadius: '24px', 
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }} 
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Search & Department Filter Bar */}
      <section style={{ maxWidth: '1140px', margin: '-3rem auto 3.5rem auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '1.25rem', 
          borderRadius: '20px', 
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.06)', 
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 3.2rem',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                fontSize: '0.95rem',
                outline: 'none',
                backgroundColor: '#f8fafc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Department Chips */}
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '4px' }}>
            {DEPARTMENTS_LIST.map((dept) => {
              const isActive = activeDepartment === dept.name;
              return (
                <button
                  key={dept.name}
                  onClick={() => setActiveDepartment(dept.name)}
                  title={t(dept.labelKey)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: isActive ? '#0d9488' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#475569',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(13, 148, 136, 0.25)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '0.9rem' }}>{dept.icon}</span>
                  {t(dept.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctor Cards Grid */}
      <section style={{ maxWidth: '1140px', margin: '0 auto 5rem auto', padding: '0 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#0d9488' }}>
            <FaSpinner style={{ fontSize: '2.5rem', animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem', fontWeight: '600', color: '#64748b' }}>{t('loading')}</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#fef2f2', borderRadius: '16px', color: '#991b1b', border: '1px solid #fecaca' }}>
            <FaExclamationTriangle size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{t('errorTitle')}</h3>
            <p>{error}</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredDoctors.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.8rem' }}>
                {filteredDoctors.map((doc, index) => (
                  <DoctorCard3D 
                    key={doc.id || index} 
                    doc={doc} 
                    index={index}
                    setSelectedDoctor={setSelectedDoctor} 
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>{t('noDoctors')}</p>
              </div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '2rem',
                maxWidth: '460px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative'
              }}
            >
              <button 
                onClick={handleCloseModal}
                style={{ position: 'absolute', right: '1.2rem', top: '1.2rem', border: 'none', backgroundColor: '#f1f5f9', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FaTimes size={14} />
              </button>

              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                    <FaCheckCircle size={32} color="#059669" />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>{t('bookingSuccessTitle')}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    {t('bookingSuccessMsg', { name: selectedDoctor.name })}
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    <img 
                      src={selectedDoctor.image || 'https://via.placeholder.com/90'} 
                      alt="" 
                      style={{ width: '80px', height: '80px', borderRadius: '18px', objectFit: 'cover' }} 
                    />
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0d9488', textTransform: 'uppercase' }}>{t('bookSerial')}</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>{selectedDoctor.name}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>{selectedDoctor.position || selectedDoctor.hospital}</p>
                    </div>
                  </div>

                  {submitError && (
                    <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '1rem' }}>
                      {submitError}
                    </div>
                  )}

                  <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.3rem' }}>{t('patientName')}</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder={t('patientNamePlaceholder')} 
                        value={formData.name} 
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.3rem' }}>{t('phone')}</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        placeholder={t('phonePlaceholder')} 
                        value={formData.phone} 
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.3rem' }}>{t('date')}</label>
                        <input 
                          type="date" 
                          name="date" 
                          required 
                          min={new Date().toISOString().split('T')[0]} 
                          value={formData.date} 
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.3rem' }}>{t('time')}</label>
                        <select 
                          name="time" 
                          required 
                          value={formData.time} 
                          onChange={handleInputChange}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', backgroundColor: '#fff', boxSizing: 'border-box' }}
                        >
                          <option value="">{t('selectShift')}</option>
                          <option value="Morning">{t('morning')}</option>
                          <option value="Evening">{t('evening')}</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: '#0d9488',
                        color: '#ffffff',
                        padding: '0.85rem',
                        borderRadius: '12px',
                        border: 'none',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '0.5rem',
                        boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
                      }}
                    >
                      {isSubmitting ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : <FaPaperPlane />} 
                      {isSubmitting ? t('processing') : t('confirmAppointment')}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hotline Button */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 90 }}>
        <a 
          href="tel:+880123456789" 
          style={{ 
            backgroundColor: '#0f172a', 
            color: '#ffffff', 
            padding: '0.8rem 1.4rem', 
            borderRadius: '30px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            textDecoration: 'none', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontSize: '0.85rem',
            fontWeight: '700'
          }}
        >
          <FaPhoneAlt color="#2dd4bf" /> {t('hotline')}
        </a>
      </div>

    </div>
  );
};

export default Doctors;