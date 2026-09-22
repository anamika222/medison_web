import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaClock, 
  FaInfoCircle, 
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaNotesMedical
} from 'react-icons/fa';

const Tests = () => {
  const { t, i18n } = useTranslation();

  const [testList, setTestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalTest, setActiveModalTest] = useState(null);
  
  // Track expanded preparation inside card
  const [openPrepId, setOpenPrepId] = useState(null);

  const categories = [
    { key: 'All', label: t('test_cat_all') || 'All Tests' },
    { key: 'Pathology', label: t('test_cat_pathology') || 'Pathology' },
    { key: 'Radiology & Imaging', label: t('test_cat_imaging') || 'Radiology' },
    { key: 'Cardiology', label: t('test_cat_cardiac') || 'Cardiology' },
    { key: 'Biochemistry', label: t('test_cat_biochemistry') || 'Biochemistry' }
  ];

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/tests/'); 
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const listData = Array.isArray(data) ? data : (data.results || []);
        setTestList(listData);
      } catch (error) {
        console.error('Error fetching tests data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const getLocalizedField = (item, fieldName) => {
    if (!item) return '';
    const lang = i18n.language === 'bn' ? 'bn' : 'en';
    if (item[`${fieldName}_${lang}`]) return item[`${fieldName}_${lang}`];
    if (item[`${fieldName}_en`]) return item[`${fieldName}_en`];
    if (typeof item[fieldName] === 'object' && item[fieldName] !== null) {
      return item[fieldName][lang] || item[fieldName]['en'] || '';
    }
    return item[fieldName] || '';
  };

  const getCategoryName = (test) => {
    if (!test.category) return '';
    if (typeof test.category === 'object') {
      const lang = i18n.language === 'bn' ? 'bn' : 'en';
      return test.category[`name_${lang}`] || test.category.name_en || test.category.name || '';
    }
    return test.category;
  };

  const togglePreparation = (id) => {
    setOpenPrepId(prevId => prevId === id ? null : id);
  };

  const filteredTests = testList.filter((test) => {
    const categoryName = getCategoryName(test);
    const matchesCategory = selectedCategory === 'All' || categoryName.toLowerCase() === selectedCategory.toLowerCase();
    const testName = getLocalizedField(test, 'name');
    const matchesSearch = testName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Dynamic Hero Section */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0284C7 100%)', 
          color: '#ffffff', 
          padding: '4.5rem 1.5rem 5rem 1.5rem', 
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '1px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {t('diagnostic_services') || 'DIAGNOSTIC SERVICES'}
          </span>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '1.2rem 0 0.8rem 0' }}>
            {t('our_diagnostic_tests') || 'Explore Medical Tests'}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#94A3B8', maxWidth: '580px', margin: '0 auto 2.2rem auto' }}>
            {t('tests_hero_subtitle') || 'Accurate lab test reporting with advanced technology and fast delivery.'}
          </p>
        </motion.div>

        {/* Search Field */}
        <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', color: '#0284C7', fontSize: '1.2rem' }} />
          <input
            type="text"
            placeholder={t('search_tests_placeholder') || 'Search for tests or categories...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1.1rem 1.2rem 1.1rem 3.4rem',
              borderRadius: '50px',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.25)',
              color: '#0F172A',
              backgroundColor: '#FFFFFF'
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.5rem 0 1.5rem' }}>
        
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.8rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  backgroundColor: isSelected ? '#0284C7' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  border: isSelected ? 'none' : '1px solid #E2E8F0',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 10px 20px rgba(2, 132, 199, 0.3)' : '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Card Display */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: '#64748B' }}>
            <h3>{t('loading_tests') || 'Loading Available Tests...'}</h3>
          </div>
        ) : filteredTests.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {filteredTests.map((test, index) => {
              const testId = test.id || test._id;
              const testName = getLocalizedField(test, 'name');
              const testCategory = getCategoryName(test);
              const testPreparation = getLocalizedField(test, 'preparation');
              const testPrice = test.price || 'N/A';
              const testReportTime = getLocalizedField(test, 'report_time') || test.reportTime || '24 Hours';
              const isPrepOpen = openPrepId === testId;

              return (
                <motion.div 
                  key={testId}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div>
                    {/* Image Header */}
                    <div style={{ height: '145px', width: '100%', position: 'relative', backgroundColor: '#F1F5F9' }}>
                      <img 
                        src={test.image || 'https://via.placeholder.com/300x145?text=Lab+Test'} 
                        alt={testName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7), transparent)' }} />
                      {testCategory && (
                        <span style={{ 
                          position: 'absolute', 
                          top: '12px', 
                          left: '12px', 
                          fontSize: '0.7rem', 
                          fontWeight: 700, 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          color: '#0284C7', 
                          padding: '4px 10px', 
                          borderRadius: '20px' 
                        }}>
                          {testCategory}
                        </span>
                      )}
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '1.2rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.6rem 0', lineHeight: 1.3 }}>
                        {testName}
                      </h3>

                      <div style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaClock style={{ color: '#0284C7' }} />
                        <span>{t('delivery') || 'Delivery'}: <strong style={{ color: '#334155' }}>{testReportTime}</strong></span>
                      </div>

                      {/* Clear & Prominent Preparation Button */}
                      {testPreparation && (
                        <div style={{ marginTop: '0.9rem' }}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => togglePreparation(testId)}
                            style={{
                              background: isPrepOpen ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                              color: isPrepOpen ? '#92400E' : '#1E40AF',
                              border: isPrepOpen ? '1px solid #F59E0B' : '1px solid #BFDBFE',
                              padding: '0.55rem 0.9rem',
                              borderRadius: '10px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                              <FaNotesMedical style={{ color: isPrepOpen ? '#D97706' : '#2563EB', fontSize: '0.9rem' }} /> 
                              {t('preparation_instructions') || 'Preparation Instructions'}
                            </span>
                            {isPrepOpen ? <FaChevronUp /> : <FaChevronDown />}
                          </motion.button>

                          {/* Animated Dropdown */}
                          <AnimatePresence>
                            {isPrepOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div style={{ 
                                  backgroundColor: '#FFFBEB', 
                                  color: '#78350F', 
                                  padding: '0.85rem', 
                                  borderRadius: '10px', 
                                  fontSize: '0.82rem', 
                                  marginTop: '0.6rem',
                                  lineHeight: 1.5,
                                  borderLeft: '4px solid #F59E0B',
                                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
                                }}>
                                  {testPreparation}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div style={{ padding: '0 1.2rem 1.2rem 1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>{t('test_fee') || 'Test Fee'}</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284C7' }}>
                        {testPrice !== 'N/A' ? `৳ ${testPrice}` : testPrice}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.6rem' }}>
                      <button
                        onClick={() => setActiveModalTest(test)}
                        style={{
                          backgroundColor: '#F8FAFC',
                          color: '#475569',
                          border: '1px solid #E2E8F0',
                          padding: '0.65rem',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px'
                        }}
                      >
                        <FaInfoCircle /> {t('details_btn') || 'Details'}
                      </button>

                      <Link
                        to="/take-appointment"
                        style={{
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          padding: '0.65rem',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px'
                        }}
                      >
                        {t('book_btn') || 'Book'} <FaArrowRight style={{ fontSize: '0.7rem' }} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: '#64748B' }}>
            <h3>{t('no_tests_found') || 'No tests match your filter'}</h3>
          </div>
        )}
      </div>

      {/* Expanded Large & Premium Modal */}
      <AnimatePresence>
        {activeModalTest && (() => {
          const modalName = getLocalizedField(activeModalTest, 'name');
          const modalCategory = getCategoryName(activeModalTest);
          const modalDescription = getLocalizedField(activeModalTest, 'description');
          const modalPreparation = getLocalizedField(activeModalTest, 'preparation');
          const modalPrice = activeModalTest.price || 'N/A';
          const modalReportTime = getLocalizedField(activeModalTest, 'report_time') || activeModalTest.reportTime || '24 Hours';

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  maxWidth: '680px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  position: 'relative',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                {/* Modal Header Banner */}
                <div style={{ height: '220px', width: '100%', position: 'relative', backgroundColor: '#F1F5F9' }}>
                  <img 
                    src={activeModalTest.image || 'https://via.placeholder.com/680x220?text=Test+Details'} 
                    alt={modalName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)' }} />
                  
                  <button 
                    onClick={() => setActiveModalTest(null)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      border: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: '#0F172A',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    <FaTimes style={{ fontSize: '1.1rem' }} />
                  </button>

                  <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                    {modalCategory && (
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#0284C7', color: '#FFFFFF', padding: '4px 12px', borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {modalCategory}
                      </span>
                    )}
                    <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '1.6rem', color: '#FFFFFF', fontWeight: 800 }}>
                      {modalName}
                    </h2>
                  </div>
                </div>

                {/* Modal Content Body */}
                <div style={{ padding: '2rem' }}>
                  
                  {/* Delivery Time Badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#F1F5F9', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                    <FaClock style={{ color: '#0284C7' }} />
                    <span>{t('report_delivery_time') || 'Report Delivery Time'}: <strong style={{ color: '#0F172A' }}>{modalReportTime}</strong></span>
                  </div>

                  {/* Test Description */}
                  {modalDescription && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '1rem', color: '#0F172A', margin: '0 0 0.5rem 0', fontWeight: 700 }}>
                        {t('test_overview') || 'Test Overview'}
                      </h4>
                      <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                        {modalDescription}
                      </p>
                    </div>
                  )}

                  {/* Highlighted Preparation Box inside Modal */}
                  {modalPreparation && (
                    <div style={{ 
                      backgroundColor: '#FEF3C7', 
                      border: '1px solid #FCD34D',
                      borderLeft: '5px solid #F59E0B', 
                      padding: '1.2rem', 
                      borderRadius: '12px', 
                      margin: '1.5rem 0',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)'
                    }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#92400E', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                        <FaExclamationTriangle style={{ fontSize: '1.1rem' }} /> 
                        {t('preparation_instructions') || 'Preparation Instructions'}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#78350F', lineHeight: 1.6 }}>
                        {modalPreparation}
                      </p>
                    </div>
                  )}

                  {/* Test Parameters */}
                  {activeModalTest.parameters && Array.isArray(activeModalTest.parameters) && activeModalTest.parameters.length > 0 && (
                    <div style={{ margin: '1.5rem 0' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#0F172A', marginBottom: '0.8rem', fontWeight: 700 }}>
                        {t('tested_parameters') || 'Tested Parameters'}:
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                        {activeModalTest.parameters.map((param, index) => {
                          const paramText = typeof param === 'object' ? (param[i18n.language] || param.en || param.name) : param;
                          return (
                            <div key={index} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <FaCheckCircle style={{ color: '#10B981', fontSize: '0.85rem' }} /> {paramText}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Modal Footer with Price and Booking Link */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>
                        {t('total_test_fee') || 'Total Test Fee'}
                      </span>
                      <span style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0284C7' }}>
                        {modalPrice !== 'N/A' ? `৳ ${modalPrice}` : modalPrice}
                      </span>
                    </div>

                    <Link
                      to="/take-appointment"
                      onClick={() => setActiveModalTest(null)}
                      style={{
                        backgroundColor: '#0284C7',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        padding: '0.9rem 2rem',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        boxShadow: '0 10px 20px rgba(2, 132, 199, 0.3)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {t('proceed_to_book') || 'Book Appointment'} <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
};

export default Tests;