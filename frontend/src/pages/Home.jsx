import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import DoctorScheduleWidget from './DoctorScheduleWidget';
import * as FaIcons from 'react-icons/fa';
import {
  FaHospital,
  FaCheckCircle,
  FaArrowRight,
  FaStethoscope,
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaFlask,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

// Dynamic Icon Reader Component
const DynamicIcon = ({ name, color = "#0046AD", size = 32 }) => {
  const IconComponent = FaIcons[name] || FaStethoscope;
  return <IconComponent style={{ color: color, fontSize: `${size}px` }} />;
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  // Environment Variables
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
  const MEDIA_URL = process.env.REACT_APP_MEDIA_URL || 'http://127.0.0.1:8000';

  // 1. Django API Data States
  const [aboutData, setAboutData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [tests, setTests] = useState([]);
 
  // Loading State
  const [loading, setLoading] = useState(true);
  // Test Preparation Toggle State
  const [openPrepId, setOpenPrepId] = useState(null);

  // Dynamic Language Helper Function
  const getField = (obj, fieldName) => {
    if (!obj) return '';
    const lang = currentLang && currentLang.startsWith('bn') ? 'bn' : 'en';
    return obj[`${fieldName}_${lang}`] || obj[`${fieldName}_en`] || obj[fieldName] || '';
  };

  const getCategoryName = (test) => {
    if (!test || !test.category) return '';
    if (typeof test.category === 'object') {
      const lang = currentLang && currentLang.startsWith('bn') ? 'bn' : 'en';
      return test.category[`name_${lang}`] || test.category.name_en || test.category.name || '';
    }
    return test.category;
  };

  

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch About Us Data
        fetch(`${API_URL}/about-us-data/`, { signal: controller.signal })
          .then((res) => res.json())
          .then((data) => {
            const resolvedData = Array.isArray(data) ? data[0] || {} : data;
            setAboutData(resolvedData);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') console.error("Error fetching about data:", err);
          });

        // Fetch Departments API
        fetch(`${API_URL}/departments/`, { signal: controller.signal })
          .then((res) => res.json())
          .then((data) => {
            const list = Array.isArray(data) ? data : (data.results || []);
            if (list.length > 0) {
              setDepartments(list);
            } else {
              setDepartments([
                { id: 1, name_bn: "কার্ডিওলজি (হৃদরোগ)", name_en: "Cardiology", description_bn: "উন্নত হৃদরোগ চিকিৎসা ও সার্জারি।", description_en: "Advanced cardiac care and surgery.", icon_name: "FaHeartbeat" },
                { id: 2, name_bn: "নিউরোলজি (স্নায়ুরোগ)", name_en: "Neurology", description_bn: "বিশেষজ্ঞ স্নায়ুরোগ চিকিৎসা ও পরামর্শ।", description_en: "Expert neurological treatments.", icon_name: "FaBrain" },
                { id: 3, name_bn: "অর্থোপেডিক্স (অস্থিরোগ)", name_en: "Orthopedics", description_bn: "হাড় ও জোড়ার সম্পূর্ণ চিকিৎসা সেবা।", description_en: "Comprehensive bone & joint care.", icon_name: "FaBone" },
                { id: 4, name_bn: "পেডিয়াট্রিক্স (শিশু রোগ)", name_en: "Pediatrics", description_bn: "শিশুদের জন্য বিশেষায়িত স্বাস্থসেবা।", description_en: "Specialized healthcare for children.", icon_name: "FaBaby" },
                { id: 5, name_bn: "আইসিইউ ও সিসিইউ", name_en: "ICU & CCU", description_bn: "২৪/৭ নিবিড় পর্যবেক্ষণ ও জরুরি সেবা।", description_en: "24/7 Critical intensive care unit.", icon_name: "FaHeartbeat" }
              ]);
            }
          })
          .catch((err) => {
            if (err.name !== 'AbortError') console.error("Error fetching departments:", err);
          });

        // Fetch Doctors API
        fetch(`${API_URL}/doctors/`, { signal: controller.signal })
          .then((res) => res.json())
          .then((data) => {
            const list = Array.isArray(data) ? data : (data.results || []);
            setDoctors(list.length > 0 ? list : [
              { id: 1, name_bn: "ডাঃ রফিকুল ইসলাম", name_en: "Dr. Rafiqul Islam", specialty_bn: "হৃদরোগ বিশেষজ্ঞ", specialty_en: "Cardiologist", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop" },
              { id: 2, name_bn: "ডাঃ ফাতেমা বেগম", name_en: "Dr. Fatema Begum", specialty_bn: "স্ত্রী ও প্রসূতি রোগ বিশেষজ্ঞ", specialty_en: "Gynecologist", image: "https://images.unsplash.com/photo-1594824813566-88855ce78961?w=400&auto=format&fit=crop" },
              { id: 3, name_bn: "ডাঃ তানভীর আহমেদ", name_en: "Dr. Tanvir Ahmed", specialty_bn: "স্নায়ুরোগ বিশেষজ্ঞ", specialty_en: "Neurologist", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop" },
              { id: 4, name_bn: "ডাঃ শায়লা রহমান", name_en: "Dr. Shayla Rahman", specialty_bn: "শিশু রোগ বিশেষজ্ঞ", specialty_en: "Pediatrician", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop" },
              { id: 5, name_bn: "ডাঃ আরিফ হোসেন", name_en: "Dr. Arif Hossain", specialty_bn: "অর্থোপেডিক সার্জন", specialty_en: "Orthopedic Surgeon", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop" }
            ]);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') console.error("Error fetching doctors:", err);
          });

        // Fetch Services API
        fetch(`${API_URL}/services/`, { signal: controller.signal })
          .then((res) => res.json())
          .then((data) => {
            const list = Array.isArray(data) ? data : (data.results || []);
            setServices(list.length > 0 ? list : [
              { id: 1, title_bn: "২৪/৭ অ্যাম্বুলেন্স সেবা", title_en: "24/7 Ambulance Service", desc_bn: "জরুরি মুহূর্তে দ্রুত ও বিশ্বস্ত অ্যাম্বুলেন্স সার্ভিস।", desc_en: "Fast and reliable ambulance service for emergencies.", icon_name: "FaAmbulance" },
              { id: 2, title_bn: "আধুনিক ডায়াগনস্টিক", title_en: "Modern Diagnostics", desc_bn: "সঠিক ও নির্ভরযোগ্য ল্যাব টেস্ট ও প্যাথলজি সেবা।", desc_en: "Accurate and reliable lab testing and diagnostics.", icon_name: "FaMicroscope" },
              { id: 3, title_bn: "জরুরি আইসিইউ সেবা", title_en: "Emergency ICU Care", desc_bn: "২৪ ঘণ্টা নিবিড় পরিচর্যা ও বিশেষজ্ঞ ডাক্তার সুবিধা।", desc_en: "24/7 intensive care with expert medical guidance.", icon_name: "FaProcedures" },
              { id: 4, title_bn: "বিশেষজ্ঞ নার্সিং কেয়ার", title_en: "Specialized Nursing", desc_bn: "অভিজ্ঞ নার্সদের দ্বারা সার্বক্ষণিক যত্ন ও সেবা।", desc_en: "Continuous care provided by experienced nurses.", icon_name: "FaUserNurse" },
              { id: 5, title_bn: "অনলাইন রিপোর্ট ডায়াগনোসিস", title_en: "Online Report Access", desc_bn: "ঘরে বসেই দ্রুত ও নিরাপদে পরীক্ষার রিপোর্ট ডাউনলোড।", desc_en: "Download test reports quickly and securely online.", icon_name: "FaNotesMedical" },
              { id: 6, title_bn: "জরুরি ট্রমা ও ইমার্জেন্সি", title_en: "Emergency Trauma Unit", desc_bn: "যেকোনো জরুরি পরিস্থিতিতে দ্রুত চিকিৎসা নিশ্চিতকরণ।", desc_en: "Prompt medical response in any critical situation.", icon_name: "FaHospital" }
            ]);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') console.error("Error fetching services:", err);
          });

        // Fetch Medical Tests API
        fetch(`${API_URL}/tests/`, { signal: controller.signal })
          .then((res) => res.json())
          .then((data) => {
            const list = Array.isArray(data) ? data : (data.results || []);
            setTests(list);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') console.error("Error fetching tests:", err);
          });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [API_URL]);

  const togglePreparation = (id) => {
    setOpenPrepId((prevId) => (prevId === id ? null : id));
  };

  // About Us Data Resolution
  const overview = aboutData?.overview;
 
  // Local mp4 ফাইল বাদ দিয়ে YouTube বা Online URL ব্যবহার করুন

 
  const overviewTitle = getField(overview, 'title') || getField(aboutData, 'title') || t('who_we_are_title', 'আমাদের হাসপাতালে স্বাগতম');
  const overviewSubtitle = getField(overview, 'subtitle') || getField(aboutData, 'subtitle') || t('who_we_are_subtitle', 'আমরা আধুনিক প্রযুক্তি ও অভিজ্ঞ চিকিৎসা দলের সাহায্যে আপনাকে সর্বোত্তম সেবা প্রদানে প্রতিশ্রুতিবদ্ধ।');
  const featuresList = overview?.features || aboutData?.features;
  const whoWeAreImage = overview?.who_we_are_image || aboutData?.who_we_are_image;

  // Infinite Seamless Loop Duplication
  const doubleDepartments = [...departments, ...departments];
  const doubleDoctors = [...doctors, ...doctors];
  const doubleServices = [...services, ...services];
  const doubleTests = [...tests, ...tests];

  return (
    <div className="home-page" style={{ backgroundColor: '#F8FAFC', color: '#1E293B', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
     
      {/* CSS Rules */}
      <style>{`
        .who-we-are-container { display: flex; align-items: center; gap: 3rem; }
        .who-we-are-text { flex: 0 0 40%; max-width: 40%; }
        .who-we-are-video { flex: 0 0 60%; max-width: 60%; }
        
        .video-container {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          background: #000;
        }

        .infinite-slider-wrapper { position: relative; overflow: hidden; width: 100%; padding: 1rem 0; }
        .infinite-slider-track { display: flex; gap: 1.5rem; width: max-content; }
        .scroll-fast-dept { animation: scrollInfinite 15s linear infinite; }
        .scroll-fast-doc { animation: scrollInfinite 16s linear infinite; }
        .scroll-fast-service { animation: scrollInfinite 15s linear infinite; }
        .scroll-fast-test { animation: scrollInfinite 18s linear infinite; }
        .infinite-slider-wrapper:hover .infinite-slider-track { animation-play-state: paused; }
        @keyframes scrollInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .dept-card { width: 340px; flex-shrink: 0; background: #ffffff; border-radius: 16px; padding: 1.8rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #E2E8F0; transition: transform 0.3s ease, box-shadow 0.3s ease; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; }
        .dept-card:hover { transform: translateY(-6px); box-shadow: 0 12px 25px rgba(0,70,173,0.12); border-color: #0046AD; }
       
        .doc-minimal-card { width: 280px; flex-shrink: 0; background: #ffffff; border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid #E2E8F0; transition: all 0.3s ease; box-sizing: border-box; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .doc-minimal-card:hover { transform: translateY(-6px); box-shadow: 0 12px 25px rgba(0,70,173,0.15); border-color: #0046AD; }
       
        .service-card { width: 330px; flex-shrink: 0; background: #ffffff; border-radius: 16px; padding: 1.8rem; border: 1px solid #E2E8F0; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03); transition: all 0.3s ease; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; }
        .service-card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(0, 70, 173, 0.12); border-color: #0046AD; }
        .service-img { width: 100%; height: 160px; object-fit: cover; border-radius: 12px; margin-bottom: 1.2rem; }
        .test-card { width: 330px; flex-shrink: 0; background: #ffffff; border-radius: 20px; border: 1px solid #E2E8F0; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03); box-sizing: border-box; transition: all 0.3s ease; }
        .test-card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(2, 132, 199, 0.12); border-color: #0284C7; }
        
        @media (max-width: 991px) {
          .who-we-are-container { flex-direction: column; }
          .who-we-are-text, .who-we-are-video { flex: 0 0 100%; max-width: 100%; }
        }
      `}</style>

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Doctor Schedule Widget */}
      <DoctorScheduleWidget doctors={doctors} />

      {/* 3. Who We Are Section (Updated as per AboutUs design) */}
      <section id="who-we-are" style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="who-we-are-container">
           
            {/* Text Content */}
            <div className="who-we-are-text">
              <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <FaHospital /> {t('whoWeAre', 'আমাদের সম্পর্কে')}
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', margin: '0.6rem 0 1rem 0', lineHeight: 1.3 }}>
                {overviewTitle}
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem' }}>
                {overviewSubtitle}
              </p>

              {featuresList && Array.isArray(featuresList) && featuresList.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                  {featuresList.map((item) => (
                    <div key={item.id || item.title} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: '#1E293B', fontSize: '0.95rem' }}>
                      <FaCheckCircle color="#0046AD" size={18} /> {getField(item, 'title')}
                    </div>
                  ))}
                </div>
              )}

              <Link
                to="/about"
                style={{
                  backgroundColor: '#0046AD',
                  color: '#ffffff',
                  padding: '0.8rem 2rem',
                  borderRadius: '30px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(0,70,173,0.2)'
                }}
              >
                {t('learn_more', 'আরও জানুন')} <FaArrowRight size={13} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Clinical Departments Continuous Carousel */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                {t('specialized_medical_care', 'বিশেষায়িত চিকিৎসা সেবা')}
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', margin: '0.3rem 0 0 0' }}>
                {t('our_clinical_departments', 'আমাদের ক্লিনিকাল বিভাগসমূহ')}
              </h2>
            </div>
            <Link to="/departments" style={{ color: '#0046AD', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {t('learn_more', 'আরও জানুন')} <FaArrowRight size={12} />
            </Link>
          </div>
          <div className="infinite-slider-wrapper">
            <div className="infinite-slider-track scroll-fast-dept">
              {doubleDepartments.map((dept, idx) => {
                const deptTitle = getField(dept, 'name') || getField(dept, 'title');
                const deptDesc = getField(dept, 'tagline') || getField(dept, 'description') || getField(dept, 'desc');
                return (
                  <div key={`${dept.id || dept.dept_id}-${idx}`} className="dept-card">
                    <div>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        background: `${dept.color || '#0046AD'}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.2rem'
                      }}>
                        <DynamicIcon name={dept.icon_name || dept.icon} color={dept.color || '#0046AD'} size={30} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.6rem' }}>
                        {deptTitle}
                      </h3>
                      <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {deptDesc && deptDesc.length > 90 ? `${deptDesc.substring(0, 90)}...` : deptDesc}
                      </p>
                    </div>
                    <div>
                      <Link to="/departments" style={{ color: dept.color || '#0046AD', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {t('learn_more', 'আরও জানুন')} <FaArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Doctors Continuous Carousel */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FaUserMd /> {t('our_specialists', 'আমাদের বিশেষজ্ঞগণ')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', margin: '0.4rem 0 0 0' }}>
              {t('featured_doctors_title', 'আমাদের সেরা চিকিৎসকগণ')}
            </h2>
          </div>
          <div className="infinite-slider-wrapper">
            <div className="infinite-slider-track scroll-fast-doc">
              {doubleDoctors.map((doc, idx) => {
                const docName = getField(doc, 'name');
                const docSpecialty = getField(doc, 'specialty') || getField(doc, 'department_name');
                const docImg = doc.image ? (doc.image.startsWith('http') ? doc.image : `${MEDIA_URL}${doc.image}`) : "https://via.placeholder.com/120";
                return (
                  <div key={`${doc.id}-${idx}`} className="doc-minimal-card">
                    <div style={{ position: 'relative', marginBottom: '1.2rem' }}>
                      <img
                        src={docImg}
                        alt={docName}
                        style={{
                          width: '110px',
                          height: '110px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '4px solid #F1F5F9'
                        }}
                      />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>
                      {docName}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#0046AD', fontWeight: '600', margin: '0 0 1.5rem 0' }}>
                      {docSpecialty}
                    </p>
                    <button
                      onClick={() => navigate('/doctors')}
                      style={{
                        backgroundColor: '#0046AD',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem 1.4rem',
                        borderRadius: '25px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0,70,173,0.15)',
                        transition: 'background 0.3s ease'
                      }}
                    >
                      <FaCalendarCheck size={13} /> {t('get_appointment', 'সিরিয়াল নিন')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/doctors"
              style={{
                backgroundColor: '#ffffff',
                color: '#0046AD',
                border: '2px solid #0046AD',
                padding: '0.8rem 2.2rem',
                borderRadius: '30px',
                fontWeight: '800',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0046AD';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#0046AD';
              }}
            >
              {t('see_all_doctors', 'সকল ডাক্তার দেখুন')} <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Dynamic Services Continuous Carousel */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#E31B23', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              {t('our_medical_services', 'আমাদের সেবা সমূহ')}
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', margin: '0.4rem 0 0 0' }}>
              {t('comprehensive_care', 'বিশ্বস্ত ও আধুনিক স্বাস্থ্যসেবা')}
            </h2>
          </div>
          <div className="infinite-slider-wrapper">
            <div className="infinite-slider-track scroll-fast-service">
              {doubleServices.map((service, idx) => {
                const serviceTitle = getField(service, 'title');
                const serviceDesc = getField(service, 'desc') || getField(service, 'description');
                const serviceImg = service.image ? (service.image.startsWith('http') ? service.image : `${MEDIA_URL}${service.image}`) : null;
                return (
                  <div key={`${service.id}-${idx}`} className="service-card">
                    <div>
                      {serviceImg ? (
                        <img src={serviceImg} alt={serviceTitle} className="service-img" />
                      ) : (
                        <div style={{ marginBottom: '1.2rem' }}>
                          <DynamicIcon name={service.icon_name || service.icon} color="#0046AD" size={36} />
                        </div>
                      )}
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.6rem' }}>
                        {serviceTitle}
                      </h3>
                      <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                        {serviceDesc && serviceDesc.length > 100 ? `${serviceDesc.substring(0, 100)}...` : serviceDesc}
                      </p>
                    </div>
                    <div>
                      <Link to="/services" style={{ color: '#0046AD', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {t('learn_more', 'বিস্তারিত দেখুন')} <FaArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/services"
              style={{
                backgroundColor: '#0046AD',
                color: '#ffffff',
                padding: '0.8rem 2.2rem',
                borderRadius: '30px',
                fontWeight: '800',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(0,70,173,0.2)'
              }}
            >
              {t('Explore_All_Services', 'সকল সেবা দেখুন')} <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Diagnostic Tests Continuous Carousel */}
      {tests.length > 0 && (
        <section style={{ padding: '5rem 1.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: '#0284C7', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <FaFlask /> {t('diagnostic_services', 'ডায়াগনস্টিক সেবাসমূহ')}
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', margin: '0.4rem 0 0 0' }}>
                  {t('our_diagnostic_tests', 'আমাদের গুরুত্বপূর্ণ পরীক্ষা-সমূহ')}
                </h2>
              </div>
              <Link to="/tests" style={{ color: '#0284C7', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {t('see_all_tests', 'সকল টেস্ট দেখুন')} <FaArrowRight size={12} />
              </Link>
            </div>
            <div className="infinite-slider-wrapper">
              <div className="infinite-slider-track scroll-fast-test">
                {doubleTests.map((test, idx) => {
                  const testId = test.id || test._id;
                  const testName = getField(test, 'name');
                  const testCategory = getCategoryName(test);
                  const testPreparation = getField(test, 'preparation');
                  const testPrice = test.price ? `৳ ${test.price}` : 'N/A';
                  const testReportTime = getField(test, 'report_time') || test.reportTime || '২৪ ঘণ্টা';
                  const isPrepOpen = openPrepId === testId;
                  const testImg = test.image ? (test.image.startsWith('http') ? test.image : `${MEDIA_URL}${test.image}`) : 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&auto=format&fit=crop';
                  return (
                    <div key={`${testId}-${idx}`} className="test-card">
                      <div>
                        {/* Image Banner */}
                        <div style={{ height: '140px', width: '100%', position: 'relative', backgroundColor: '#F1F5F9' }}>
                          <img
                            src={testImg}
                            alt={testName}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {testCategory && (
                            <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(2, 132, 199, 0.9)', color: '#fff', fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>
                              {testCategory}
                            </span>
                          )}
                        </div>
                        {/* Card Details */}
                        <div style={{ padding: '1.2rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                            {testName}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                            <FaClock size={13} color="#0284C7" />
                            <span>রিপোর্ট সময়: {testReportTime}</span>
                          </div>
                          {/* Preparation Collapsible Button */}
                          {testPreparation && (
                            <div style={{ marginBottom: '1rem' }}>
                              <button
                                onClick={() => togglePreparation(testId)}
                                style={{
                                  background: '#F1F5F9',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '6px 10px',
                                  width: '100%',
                                  display: 'flex',
                                  justify: 'space-between',
                                  alignItems: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: '600',
                                  color: '#334155',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>প্রস্তুতি বার্তা</span>
                                {isPrepOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                              </button>
                              {isPrepOpen && (
                                <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '6px', padding: '0 4px', lineHeight: '1.4' }}>
                                  {testPreparation}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Bottom Price & Action */}
                      <div style={{ padding: '0 1.2rem 1.2rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', pt: '0.8rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>পরীক্ষার ফি</span>
                          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0284C7' }}>{testPrice}</span>
                        </div>
                        <Link
                          to="/tests"
                          style={{
                            backgroundColor: '#0284C7',
                            color: '#ffffff',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontWeight: '700',
                            fontSize: '0.8rem',
                            textDecoration: 'none'
                          }}
                        >
                          বুক করুন
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;