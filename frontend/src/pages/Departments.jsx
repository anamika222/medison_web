import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa';
import { 
  FaSearch, 
  FaTimes, 
  FaSpinner, 
  FaExclamationTriangle, 
  FaUserMd, 
  FaClock, 
  FaArrowRight,
  FaStethoscope
} from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

// Dynamic Icon Component
const DynamicIcon = ({ name, color, size = 28 }) => {
  const IconComponent = FaIcons[name] || FaStethoscope;
  return <IconComponent style={{ color: color || '#0046AD', fontSize: `${size}px` }} />;
};

// Department Card with Entrance Animation
const DepartmentCard = ({ dept, index, onSelect }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Helper function for language dynamic field selection
  const getField = (obj, fieldName) => {
    if (!obj) return '';
    return obj[`${fieldName}_${currentLang}`] || obj[fieldName] || '';
  };

  const isEven = index % 2 === 0;
  const initialX = isEven ? -60 : 60;

  const name = getField(dept, 'name') || dept.name;
  const tagline = getField(dept, 'tagline') || dept.tagline;
  const description = getField(dept, 'description') || dept.description;
  const availability = getField(dept, 'availability') || dept.availability || t('24_7_service');

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 2) * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '1.8rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Accent Bar */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '5px', 
          backgroundColor: dept.color || '#0046AD' 
        }} 
      />

      <div>
        {/* Icon & Doctors Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            backgroundColor: `${dept.color || '#0046AD'}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <DynamicIcon name={dept.icon_name} color={dept.color} size={30} />
          </div>

          <div style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#475569',
            backgroundColor: '#f1f5f9',
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <FaUserMd color={dept.color || '#0046AD'} />
            {dept.doctors_count ? `${dept.doctors_count} ${t('specialist_doctors')}` : t('specialist_doctors')}
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', lineHeight: '1.3' }}>
          {name}
        </h3>

        <p style={{ fontSize: '0.85rem', fontWeight: '600', color: dept.color || '#0046AD', margin: '0 0 1rem 0' }}>
          {tagline}
        </p>

        {/* Description Snippet */}
        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', margin: '0 0 1.2rem 0' }}>
          {description?.length > 110 
            ? `${description.substring(0, 110)}...` 
            : description}
        </p>
      </div>

      <div>
        {/* Availability info */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          fontSize: '0.82rem', 
          color: '#334155', 
          fontWeight: '600',
          marginBottom: '1.2rem',
          paddingTop: '0.8rem',
          borderTop: '1px solid #f1f5f9'
        }}>
          <FaClock color="#10b981" />
          <span>{availability}</span>
        </div>

        {/* Details Button */}
        <button
          onClick={() => onSelect(dept)}
          style={{
            width: '100%',
            backgroundColor: '#f8fafc',
            color: '#0f172a',
            border: '1px solid #cbd5e1',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = dept.color || '#0046AD';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = dept.color || '#0046AD';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc';
            e.currentTarget.style.color = '#0f172a';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
        >
          {t('view_department_details')} <FaArrowRight size={12} />
        </button>
      </div>
    </motion.div>
  );
};

const Departments = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState(null);

  // Category choices dynamic translation
  const categoryChoices = useMemo(() => [
    { key: 'all', label: t('cat_all') },
    { key: 'pediatric_surgery', label: t('cat_pediatric_surgery') },
    { key: 'general_laparoscopic', label: t('cat_general_laparoscopic') },
    { key: 'gynecology_obs', label: t('cat_gynecology_obs') },
    { key: 'anesthesia_pain', label: t('cat_anesthesia_pain') },
    { key: 'ultrasonography', label: t('cat_ultrasonography') },
    { key: 'ophthalmology', label: t('cat_ophthalmology') },
    { key: 'general_medicine', label: t('cat_general_medicine') },
    { key: 'orthopedics', label: t('cat_orthopedics') },
    { key: 'dental', label: t('cat_dental') },
    { key: 'neurosurgery', label: t('cat_neurosurgery') },
    { key: 'oncology', label: t('cat_oncology') },
    { key: 'physical_medicine', label: t('cat_physical_medicine') },
    { key: 'ent', label: t('cat_ent') },
    { key: 'public_health', label: t('cat_public_health') },
    { key: 'ultrasound_gynae', label: t('cat_ultrasound_gynae') }
  ], [t]);

  // Dynamic helper function
  const getField = (obj, fieldName) => {
    if (!obj) return '';
    return obj[`${fieldName}_${currentLang}`] || obj[fieldName] || '';
  };

  // Fetch Departments Data
  useEffect(() => {
    const controller = new AbortController();
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = selectedCategory === 'all'
          ? `${API_BASE_URL}/departments/`
          : `${API_BASE_URL}/departments/?category=${selectedCategory}`;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`${t('error_loading')} Status: ${response.status}`);

        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.results || []);
        setDepartments(list);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || t('something_went_wrong'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
    return () => controller.abort();
  }, [selectedCategory, t]);

  // Search Filter
  const filteredDepartments = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return departments;

    return departments.filter(d => {
      const name = getField(d, 'name').toLowerCase();
      const tagline = getField(d, 'tagline').toLowerCase();
      const description = getField(d, 'description').toLowerCase();
      const deptId = (d.dept_id || '').toLowerCase();

      return name.includes(query) || tagline.includes(query) || description.includes(query) || deptId.includes(query);
    });
  }, [departments, searchQuery, currentLang]);

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

      {/* Hero Header */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0046AD 100%)', 
        color: '#ffffff', 
        padding: '5rem 1.5rem 6rem 1.5rem', 
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '0.4rem 1.2rem', 
              borderRadius: '30px', 
              fontSize: '0.85rem', 
              fontWeight: '600',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-block',
              marginBottom: '1rem'
            }}
          >
            {t('specialized_medical_care')}
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: '800', margin: '0 0 1rem 0' }}
          >
            {t('our_clinical_departments')}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}
          >
            {t('dept_hero_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Search & Category Filter Section */}
      <section style={{ maxWidth: '1140px', margin: '-2.5rem auto 3rem auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '1.25rem', 
          borderRadius: '20px', 
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)', 
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
              placeholder={t('search_dept_placeholder')} 
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

          {/* Category Chips */}
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '4px' }}>
            {categoryChoices.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  style={{
                    padding: '0.6rem 1.1rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: isActive ? '#0046AD' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#475569',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(0, 70, 173, 0.25)' : 'none'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid Display Section */}
      <section style={{ maxWidth: '1140px', margin: '0 auto 5rem auto', padding: '0 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#0046AD' }}>
            <FaSpinner style={{ fontSize: '2.5rem', animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem', fontWeight: '600', color: '#64748b' }}>{t('loading_departments')}</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#fef2f2', borderRadius: '16px', color: '#991b1b', border: '1px solid #fecaca' }}>
            <FaExclamationTriangle size={32} style={{ marginBottom: '0.5rem' }} />
            <h3>{t('error_loading')}</h3>
            <p>{error}</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredDepartments.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.8rem' }}>
                {filteredDepartments.map((dept, index) => (
                  <DepartmentCard 
                    key={dept.id || dept.dept_id || index} 
                    dept={dept} 
                    index={index} 
                    onSelect={setSelectedDept} 
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>{t('no_departments_found')}</p>
              </div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* Detailed Department Modal */}
      <AnimatePresence>
        {selectedDept && (
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
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '2rem',
                maxWidth: '550px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setSelectedDept(null)}
                style={{ 
                  position: 'absolute', 
                  right: '1.2rem', 
                  top: '1.2rem', 
                  border: 'none', 
                  backgroundColor: '#f1f5f9', 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  cursor: 'pointer', 
                  color: '#64748b', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <FaTimes size={14} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: `${selectedDept.color || '#0046AD'}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <DynamicIcon name={selectedDept.icon_name} color={selectedDept.color} size={32} />
                </div>

                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                    {getField(selectedDept, 'name')}
                  </h2>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600', color: selectedDept.color || '#0046AD', margin: '2px 0 0 0' }}>
                    {getField(selectedDept, 'tagline')}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaUserMd color={selectedDept.color} /> {selectedDept.doctors_count ? `${selectedDept.doctors_count} ${t('specialist_doctors')}` : t('specialist_doctors')}
                </span>
                <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaClock color="#10b981" /> {getField(selectedDept, 'availability') || t('24_7_service')}
                </span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>{t('overview_services')}:</h4>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  {getField(selectedDept, 'description')}
                </p>
              </div>

              <button
                onClick={() => setSelectedDept(null)}
                style={{
                  width: '100%',
                  backgroundColor: selectedDept.color || '#0046AD',
                  color: '#ffffff',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {t('close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Departments;