import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaUserMd, 
  FaClock, 
  FaStethoscope, 
  FaChevronRight, 
  FaBullhorn 
} from 'react-icons/fa';

const DoctorScheduleWidget = ({ doctors = [] }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const MEDIA_URL = process.env.REACT_APP_MEDIA_URL || 'http://127.0.0.1:8000';

    const days = [
        { id: 'today', label: 'আজ (Today)', keywords: ['today', 'আজ'] },
        { id: 'sat', label: 'শনিবার', keywords: ['sat', 'saturday', 'শনি'] },
        { id: 'sun', label: 'রবিবার', keywords: ['sun', 'sunday', 'রবি'] },
        { id: 'mon', label: 'সোমবার', keywords: ['mon', 'monday', 'সোম'] },
        { id: 'tue', label: 'মঙ্গলবার', keywords: ['tue', 'tuesday', 'মঙ্গল'] },
        { id: 'wed', label: 'বুধবার', keywords: ['wed', 'wednesday', 'বুধ'] },
        { id: 'thu', label: 'বৃহস্পতিবার', keywords: ['thu', 'thursday', 'বৃহস্পতি'] },
        { id: 'fri', label: 'শুক্রবার', keywords: ['fri', 'friday', 'শুক্র'] },
    ];

    const [activeTab, setActiveTab] = useState('today');

    // Field reader function based on language
    const getField = (obj, fieldName) => {
        if (!obj) return '';
        const lang = currentLang && currentLang.startsWith('bn') ? 'bn' : 'en';
        return obj[`${fieldName}_${lang}`] || obj[`${fieldName}_en`] || obj[fieldName] || '';
    };

    // Real-time day finder
    const getCurrentDayKeyword = () => {
        const dayIndex = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        return dayMap[dayIndex];
    };

    // Filter doctors based on chamber_day_time string or show all active
    const currentDoctors = doctors.filter(doc => {
        const chamberTime = (doc.chamber_day_time_en || '' ) + " " + (doc.chamber_day_time_bn || '');
        const lowerChamberTime = chamberTime.toLowerCase();

        if (!chamberTime.trim()) return true; // Chamber time faka thakle sob tab-e dekhabe

        const selectedDayObj = days.find(d => d.id === activeTab);
        const searchKeywords = activeTab === 'today' 
            ? [getCurrentDayKeyword(), 'everyday', 'daily', 'প্রতিদিন', 'আজ'] 
            : [...(selectedDayObj?.keywords || []), 'everyday', 'daily', 'প্রতিদিন'];

        return searchKeywords.some(key => lowerChamberTime.includes(key));
    });

    // Carousel continuity duplication
    const scrollingDoctors = currentDoctors.length > 0 ? [...currentDoctors, ...currentDoctors] : [];

    return (
        <section className="doctor-schedule-section">
            <div className="schedule-container">
                
                {/* Header Notice Banner */}
                <div className="schedule-notice-header">
                    <div className="notice-badge">
                        <FaBullhorn className="bulletin-icon" />
                        <h2>ডাক্তারদের সময়সূচী নোটিশ বোর্ড</h2>
                    </div>

                    {/* Day Filter Chips */}
                    <div className="days-tab-bar">
                        {days.map((day) => (
                            <button
                                key={day.id}
                                onClick={() => setActiveTab(day.id)}
                                className={`day-tab-btn ${activeTab === day.id ? 'active' : ''}`}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right to Left Auto-Ticker */}
                <div className="horizontal-ticker-wrapper">
                    {currentDoctors.length > 0 ? (
                        <div key={activeTab} className="horizontal-ticker-track">
                            {scrollingDoctors.map((doc, idx) => {
                                const docName = getField(doc, 'name') || 'ডাঃ বিশেষজ্ঞ';
                                const docDegree = getField(doc, 'degrees') || doc.position_bn || '';
                                
                                // Department Handling
                                let docDept = 'General';
                                if (doc.specialty) {
                                    docDept = getField(doc.specialty, 'name');
                                } else if (doc.departments && doc.departments.length > 0) {
                                    docDept = getField(doc.departments[0], 'name');
                                }

                                const docChamber = getField(doc, 'chamber_day_time') || 'প্রতিদিন মেম্বার সেবা';
                                const docImg = doc.image 
                                    ? (doc.image.startsWith('http') ? doc.image : `${MEDIA_URL}${doc.image}`) 
                                    : "https://via.placeholder.com/80";

                                return (
                                    <div key={`${doc.id}-${idx}`} className="notice-card-horizontal">
                                        <div className="card-top">
                                            <img src={docImg} alt={docName} className="doc-avatar" />
                                            <div className="doc-main-info">
                                                <h3 className="doc-name">{docName}</h3>
                                                <p className="doc-degree">{docDegree}</p>
                                                <span className="doc-dept-badge">
                                                    <FaStethoscope size={10} /> {docDept}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="card-bottom">
                                            <div className="doc-schedule-meta">
                                                <span><FaClock className="text-red" /> {docChamber}</span>
                                            </div>

                                            <Link 
                                                to={`/doctors`}
                                                className="notice-book-btn"
                                            >
                                                সিরিয়াল নিন <FaChevronRight size={10} />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-notice">
                            <FaUserMd size={32} />
                            <p>এই দিনে নির্ধারিত কোনো ডাক্তারের সময়সূচী পাওয়া যায়নি</p>
                        </div>
                    )}
                </div>

            </div>

            <style>{`
                .doctor-schedule-section {
                    background-color: #f8fafc;
                    padding: 2rem 1rem;
                }

                .schedule-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 1.2rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }

                .schedule-notice-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    border-bottom: 2px dashed #e2e8f0;
                    padding-bottom: 1rem;
                    margin-bottom: 1rem;
                }

                .notice-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .notice-badge h2 {
                    margin: 0;
                    font-size: 1.15rem;
                    color: #0f172a;
                    font-weight: 700;
                }

                .bulletin-icon {
                    color: #e31b23;
                    font-size: 1.2rem;
                    animation: blink 1.2s infinite alternate;
                }

                @keyframes blink {
                    from { opacity: 1; }
                    to { opacity: 0.3; }
                }

                .days-tab-bar {
                    display: flex;
                    gap: 6px;
                    overflow-x: auto;
                    max-width: 100%;
                }

                .day-tab-btn {
                    padding: 0.4rem 0.9rem;
                    border-radius: 20px;
                    border: 1px solid #cbd5e1;
                    background-color: #ffffff;
                    color: #475569;
                    font-size: 0.8rem;
                    font-weight: 600;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                }

                .day-tab-btn.active {
                    background-color: #0046ad;
                    color: #ffffff;
                    border-color: #0046ad;
                }

                .horizontal-ticker-wrapper {
                    overflow: hidden;
                    width: 100%;
                    background: #fafafa;
                    border-radius: 8px;
                    border: 1px solid #f1f5f9;
                    padding: 0.8rem 0;
                    position: relative;
                }

                .horizontal-ticker-track {
                    display: flex;
                    gap: 1rem;
                    width: max-content;
                    animation: horizontalScroll 25s linear infinite;
                }

                .horizontal-ticker-wrapper:hover .horizontal-ticker-track {
                    animation-play-state: paused;
                }

                @keyframes horizontalScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .notice-card-horizontal {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-top: 4px solid #0046ad;
                    border-radius: 10px;
                    padding: 1rem;
                    width: 320px;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: transform 0.2s ease;
                }

                .notice-card-horizontal:hover {
                    transform: translateY(-3px);
                    border-top-color: #e31b23;
                }

                .card-top {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 0.8rem;
                }

                .doc-avatar {
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #0046ad;
                    flex-shrink: 0;
                }

                .doc-main-info { flex-grow: 1; }

                .doc-name {
                    margin: 0 0 2px 0;
                    font-size: 0.95rem;
                    color: #0f172a;
                    font-weight: 700;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 210px;
                }

                .doc-degree {
                    margin: 0 0 6px 0;
                    font-size: 0.75rem;
                    color: #64748b;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 210px;
                }

                .doc-dept-badge {
                    background: rgba(0, 70, 173, 0.08);
                    color: #0046ad;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 2px 8px;
                    border-radius: 4px;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }

                .card-bottom {
                    border-top: 1px solid #f1f5f9;
                    padding-top: 0.6rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .doc-schedule-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    font-size: 0.75rem;
                    color: #334155;
                    font-weight: 600;
                    max-width: 200px;
                }

                .doc-schedule-meta span {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .text-red { color: #e31b23; }

                .notice-book-btn {
                    background-color: #0046ad;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 0.45rem 0.8rem;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    transition: background 0.2s ease;
                }

                .notice-book-btn:hover { background-color: #003380; }

                .empty-notice {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 2rem;
                    color: #94a3b8;
                    width: 100%;
                }

                @media (max-width: 600px) {
                    .notice-card-horizontal { width: 280px; }
                }
            `}</style>
        </section>
    );
};

export default DoctorScheduleWidget;