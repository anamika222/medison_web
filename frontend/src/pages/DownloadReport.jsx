import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    FaFileDownload, 
    FaSearch, 
    FaUserCheck, 
    FaCalendarAlt, 
    FaFlask, 
    FaSpinner, 
    FaCheckCircle, 
    FaExclamationCircle 
} from 'react-icons/fa';

const DownloadReport = () => {
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'bn';

    const [patientId, setPatientId] = useState('');
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState('');

    // Dynamic API Base URL Configuration (Ensure no trailing slash)
    const rawBaseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
    const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

    // Live backend API call handleSearch
    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!patientId.trim()) {
            setError(isBn ? 'দয়া করে আপনার পেশেন্ট আইডি বা মোবাইল নম্বর দিন' : 'Please enter your Patient ID or Mobile Number');
            return;
        }

        setError('');
        setLoading(true);
        setReportData(null);

        try {
            // Django URL Endpoint matching: /api/search-report/
            const requestUrl = `${API_BASE_URL}/search-report/?query=${encodeURIComponent(patientId.trim())}`;
            
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': i18n.language || 'en'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Return multi-result or first report match
                const result = Array.isArray(data) ? data[0] : data;
                setReportData(result);
            } else {
                const errorMsg = isBn 
                    ? (data.error_bn || 'কোনো রিপোর্ট পাওয়া যায়নি! সঠিক আইডি দিন।') 
                    : (data.error_en || 'No report found! Please enter a valid ID.');
                setError(errorMsg);
            }
        } catch (err) {
            console.error('API Error:', err);
            setError(isBn 
                ? 'সার্ভার সংযোগে সমস্যা হয়েছে! সার্ভার সচল আছে কিনা তা চেক করুন।' 
                : 'Failed to connect to the server! Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Safe PDF URL Resolver
    const getPdfUrl = (filePath) => {
        if (!filePath) return '#';
        if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
            return filePath;
        }
        const formattedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
        return `${API_BASE_URL}${formattedPath}`;
    };

    return (
        <div style={{
            minHeight: '85vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            fontFamily: "'Segoe UI', Roboto, sans-serif"
        }}>
            {/* Inline dynamic animation CSS */}
            <style>{`
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .report-card {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                .search-btn {
                    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                    color: white;
                    border: none;
                    padding: 0.85rem 1.8rem;
                    border-radius: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }
                .search-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
                }
                .search-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .download-action-btn {
                    background: linear-gradient(135deg, #0046AD 0%, #1D4ED8 100%);
                    color: white;
                    text-decoration: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    animation: pulseGlow 2s infinite;
                }
                .download-action-btn:hover {
                    transform: scale(1.03);
                    box-shadow: 0 10px 20px rgba(0, 70, 173, 0.3);
                }
            `}</style>

            <div style={{
                maxWidth: '650px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
            }}>

                {/* Header Icon & Title */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: '#E6F4EA',
                        color: '#10B981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        margin: '0 auto 1rem auto'
                    }}>
                        <FaFileDownload />
                    </div>
                    <h2 style={{ color: '#0f172a', margin: '0 0 0.5rem 0', fontSize: '1.8rem', fontWeight: 700 }}>
                        {isBn ? 'মেডিকেল রিপোর্ট ডাউনলোড' : 'Download Medical Report'}
                    </h2>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
                        {isBn 
                            ? 'আপনার আইডি বা মোবাইল নম্বর দিয়ে সহজেই টেস্ট রিপোর্ট সংগ্রহ করুন' 
                            : 'Enter your Patient ID or Mobile Number to access your lab report'}
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                placeholder={isBn ? 'পেশেন্ট আইডি / মোবাইল নম্বর (যেমন: 1234)' : 'Patient ID / Mobile No (e.g. 1234)'}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    borderRadius: '12px',
                                    border: error ? '2px solid #EF4444' : '2px solid #E2E8F0',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.3s ease',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <FaSearch style={{
                                position: 'absolute',
                                left: '1.2rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94A3B8',
                                fontSize: '1.1rem'
                            }} />
                        </div>

                        <button type="submit" className="search-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                                    {isBn ? 'খোঁজা হচ্ছে...' : 'Searching...'}
                                </>
                            ) : (
                                <>
                                    <FaSearch />
                                    {isBn ? 'রিপোর্ট খুঁজুন' : 'Search Report'}
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Error Message */}
                {error && (
                    <div style={{
                        backgroundColor: '#FEF2F2',
                        color: '#EF4444',
                        padding: '0.9rem 1rem',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid #FCA5A5'
                    }}>
                        <FaExclamationCircle fontSize="1.2rem" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Report Details Card */}
                {reportData && (
                    <div className="report-card" style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #E2E8F0',
                            paddingBottom: '0.8rem',
                            marginBottom: '1rem'
                        }}>
                            <span style={{
                                color: '#10B981',
                                backgroundColor: '#D1FAE5',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <FaCheckCircle /> {reportData.status_text || reportData.status || (isBn ? 'প্রস্তুত' : 'Ready')}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <FaCalendarAlt /> {reportData.report_date || reportData.date || 'N/A'}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}>
                                <FaUserCheck style={{ color: '#0046AD' }} />
                                <div>
                                    <small style={{ color: '#64748b', display: 'block' }}>{isBn ? 'রোগীর নাম' : 'Patient Name'}</small>
                                    <strong>{reportData.patient_name || reportData.patientName || 'N/A'}</strong>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}>
                                <FaFlask style={{ color: '#0046AD' }} />
                                <div>
                                    <small style={{ color: '#64748b', display: 'block' }}>{isBn ? 'পরীক্ষার নাম' : 'Test Name'}</small>
                                    <strong>{reportData.test_name || reportData.testName || 'N/A'}</strong>
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <a 
                                href={getPdfUrl(reportData.pdf_file || reportData.file)} 
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="download-action-btn"
                            >
                                <FaFileDownload />
                                {isBn ? 'পিডিএফ রিপোর্ট ডাউনলোড করুন' : 'Download PDF Report'}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DownloadReport;