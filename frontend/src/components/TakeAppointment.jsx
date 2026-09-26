import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaUserMd, 
  FaCalendarAlt, 
  FaClock, 
  FaCheckCircle, 
  FaUser, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaNotesMedical,
  FaShieldAlt,
  FaArrowRight,
  FaArrowLeft,
  FaStethoscope
} from 'react-icons/fa';

// বহুভাষিক ডাক্তারদের ডাটাবেস
const DOCTORS_DATA = [
  {
    id: 1,
    name: { bn: 'ডাঃ মো: আব্দুর রহমান', en: 'Dr. Md. Abdur Rahman' },
    degree: { bn: 'MBBS, FCPS (Cardiology)', en: 'MBBS, FCPS (Cardiology)' },
    specialty: { bn: 'Cardiology (হৃদরোগ বিশেষজ্ঞ)', en: 'Cardiology (Cardiologist)' },
    experience: { bn: '১২+ বছর অভিজ্ঞতা', en: '12+ Years Experience' },
    fee: { bn: '৮০০ টাকা', en: '800 BDT' },
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop',
    slots: {
      bn: ['০৪:০০ PM', '০৪:৩০ PM', '০৫:০০ PM', '০৫:৩০ PM', '০৬:০০ PM'],
      en: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM']
    }
  },
  {
    id: 2,
    name: { bn: 'ডাঃ নাজমুন নাহার', en: 'Dr. Najmun Nahar' },
    degree: { bn: 'MBBS, MD (Neurology)', en: 'MBBS, MD (Neurology)' },
    specialty: { bn: 'Neurology (স্নায়ুরোগ বিশেষজ্ঞ)', en: 'Neurology (Neurologist)' },
    experience: { bn: '১০+ বছর অভিজ্ঞতা', en: '10+ Years Experience' },
    fee: { bn: '১০০০ টাকা', en: '1000 BDT' },
    image: 'https://images.unsplash.com/photo-1594824813566-78a0d0a28399?q=80&w=400&auto=format&fit=crop',
    slots: {
      bn: ['০৫:০০ PM', '০৫:৩০ PM', '০৬:০০ PM', '০৭:০০ PM'],
      en: ['05:00 PM', '05:30 PM', '06:00 PM', '07:00 PM']
    }
  },
  {
    id: 3,
    name: { bn: 'ডাঃ সারওয়ার হোসেন', en: 'Dr. Sarwar Hossain' },
    degree: { bn: 'MBBS, MS (Orthopedics)', en: 'MBBS, MS (Orthopedics)' },
    specialty: { bn: 'Orthopedics (অস্থিরোগ বিশেষজ্ঞ)', en: 'Orthopedics (Orthopedist)' },
    experience: { bn: '১৫+ বছর অভিজ্ঞতা', en: '15+ Years Experience' },
    fee: { bn: '৭০০ টাকা', en: '700 BDT' },
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop',
    slots: {
      bn: ['০৬:০০ PM', '০৬:৩০ PM', '০৭:০০ PM', '০৮:০০ PM'],
      en: ['06:00 PM', '06:30 PM', '07:00 PM', '08:00 PM']
    }
  },
  {
    id: 4,
    name: { bn: 'ডাঃ ফারহানা ইসলাম', en: 'Dr. Farhana Islam' },
    degree: { bn: 'MBBS, FCPS (Gynecology)', en: 'MBBS, FCPS (Gynecology)' },
    specialty: { bn: 'Gynecology (স্ত্রী ও প্রসূতি রোগ)', en: 'Gynecology (Gynecologist)' },
    experience: { bn: '৮+ বছর অভিজ্ঞতা', en: '8+ Years Experience' },
    fee: { bn: '৭০০ টাকা', en: '700 BDT' },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
    slots: {
      bn: ['০৩:০০ PM', '০৩:৩০ PM', '০৪:০০ PM', '০৫:০০ PM'],
      en: ['03:00 PM', '03:30 PM', '04:00 PM', '05:00 PM']
    }
  }
];

const TakeAppointment = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'bn'; // বর্তমান ভাষা চেক

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialDoctorId = searchParams.get('doctorId');

  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    problem: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialDoctorId) {
      const doc = DOCTORS_DATA.find(d => d.id === parseInt(initialDoctorId));
      if (doc) setSelectedDoctor(doc);
    } else {
      setSelectedDoctor(DOCTORS_DATA[0]);
    }
  }, [initialDoctorId]);

  const handleInputChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedDoctor) return alert(t('appointment.alerts.selectDoctor'));
    if (step === 2 && (!selectedDate || !selectedSlot)) return alert(t('appointment.alerts.selectDateTime'));
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];

  return (
    <div className="appointment-page-root">
      
      {/* Header Banner */}
      <div className="appointment-header">
        <div className="header-content">
          <span className="sub-tag"><FaShieldAlt /> {t('appointment.subTag')}</span>
          <h1>{t('appointment.title')}</h1>
          <p>{t('appointment.subtitle')}</p>
        </div>
      </div>

      <div className="appointment-container">
        
        {/* Step Indicator */}
        {!isSubmitted && (
          <div className="step-wizard">
            <div className={`wizard-step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-icon"><FaUserMd /></div>
              <span>{t('appointment.steps.step1')}</span>
            </div>
            <div className="wizard-line"></div>
            <div className={`wizard-step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-icon"><FaCalendarAlt /></div>
              <span>{t('appointment.steps.step2')}</span>
            </div>
            <div className="wizard-line"></div>
            <div className={`wizard-step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-icon"><FaUser /></div>
              <span>{t('appointment.steps.step3')}</span>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        {!isSubmitted ? (
          <div className="appointment-grid">
            
            {/* Left Form Panel */}
            <div className="form-panel">
              
              {/* STEP 1: Select Doctor */}
              {step === 1 && (
                <div className="step-content fade-in">
                  <h3 className="section-title"><FaStethoscope className="icon" /> {t('appointment.step1Title')}</h3>
                  <div className="doctors-card-grid">
                    {DOCTORS_DATA.map((doc) => (
                      <div 
                        key={doc.id}
                        onClick={() => setSelectedDoctor(doc)}
                        className={`doctor-select-card ${selectedDoctor?.id === doc.id ? 'selected' : ''}`}
                      >
                        <img src={doc.image} alt={doc.name[lang]} className="doc-avatar" />
                        <div className="doc-details">
                          <h4>{doc.name[lang]}</h4>
                          <p className="degree">{doc.degree[lang]}</p>
                          <span className="dept-tag">{doc.specialty[lang]}</span>
                          <div className="doc-footer-meta">
                            <span className="exp">{doc.experience[lang]}</span>
                            <span className="fee">{t('appointment.labels.feePrefix')} {doc.fee[lang]}</span>
                          </div>
                        </div>
                        <div className="radio-check">
                          <div className="inner-circle"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Select Date & Time Slot */}
              {step === 2 && (
                <div className="step-content fade-in">
                  <h3 className="section-title"><FaCalendarAlt className="icon" /> {t('appointment.step2Title')}</h3>
                  
                  <div className="date-picker-box">
                    <label><FaCalendarAlt /> {t('appointment.labels.appointmentDate')}</label>
                    <input 
                      type="date" 
                      min={getMinDate()}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlot('');
                      }}
                      className="custom-date-input"
                    />
                  </div>

                  {selectedDate && (
                    <div className="time-slots-wrapper">
                      <label><FaClock /> {t('appointment.labels.availableSlots')}</label>
                      <div className="slots-grid">
                        {selectedDoctor?.slots[lang].map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Patient Information */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="step-content fade-in">
                  <h3 className="section-title"><FaNotesMedical className="icon" /> {t('appointment.step3Title')}</h3>
                  
                  <div className="input-group-grid">
                    <div className="input-field">
                      <label><FaUser /> {t('appointment.labels.patientName')}</label>
                      <input 
                        type="text" 
                        name="name"
                        required 
                        placeholder={t('appointment.placeholders.patientName')}
                        value={patientInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="input-field">
                      <label><FaPhoneAlt /> {t('appointment.labels.mobileNumber')}</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required 
                        placeholder={t('appointment.placeholders.mobileNumber')}
                        value={patientInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="input-field">
                      <label><FaEnvelope /> {t('appointment.labels.email')}</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder={t('appointment.placeholders.email')}
                        value={patientInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="input-field-row">
                      <div className="input-field">
                        <label>{t('appointment.labels.age')}</label>
                        <input 
                          type="number" 
                          name="age"
                          required 
                          placeholder={t('appointment.placeholders.age')}
                          value={patientInfo.age}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="input-field">
                        <label>{t('appointment.labels.gender')}</label>
                        <select name="gender" value={patientInfo.gender} onChange={handleInputChange}>
                          <option value="Male">{t('appointment.genderOptions.male')}</option>
                          <option value="Female">{t('appointment.genderOptions.female')}</option>
                          <option value="Other">{t('appointment.genderOptions.other')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-field full-width">
                      <label><FaNotesMedical /> {t('appointment.labels.problemSummary')}</label>
                      <textarea 
                        name="problem"
                        rows="3"
                        placeholder={t('appointment.placeholders.problemSummary')}
                        value={patientInfo.problem}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handlePrevStep} className="btn-secondary">
                      <FaArrowLeft /> {t('appointment.buttons.prevStep')}
                    </button>
                    <button type="submit" className="btn-submit">
                      {t('appointment.buttons.confirmBooking')} <FaCheckCircle />
                    </button>
                  </div>
                </form>
              )}

              {/* Step Navigation Controls (For Step 1 and Step 2) */}
              {step < 3 && (
                <div className="form-actions">
                  {step > 1 && (
                    <button type="button" onClick={handlePrevStep} className="btn-secondary">
                      <FaArrowLeft /> {t('appointment.buttons.prevStep')}
                    </button>
                  )}
                  <button type="button" onClick={handleNextStep} className="btn-primary">
                    {t('appointment.buttons.nextStep')} <FaArrowRight />
                  </button>
                </div>
              )}

            </div>

            {/* Right Summary Sidebar */}
            <div className="summary-panel">
              <div className="summary-card">
                <h3>{t('appointment.summary.title')}</h3>
                <hr className="divider" />

                {selectedDoctor && (
                  <div className="summary-doc">
                    <img src={selectedDoctor.image} alt={selectedDoctor.name[lang]} />
                    <div>
                      <h5>{selectedDoctor.name[lang]}</h5>
                      <p>{selectedDoctor.specialty[lang]}</p>
                    </div>
                  </div>
                )}

                <div className="summary-details">
                  <div className="summary-row">
                    <span>{t('appointment.labels.date')}</span>
                    <strong>{selectedDate || t('appointment.summary.notSelected')}</strong>
                  </div>
                  <div className="summary-row">
                    <span>{t('appointment.labels.slot')}</span>
                    <strong>{selectedSlot || t('appointment.summary.notSelected')}</strong>
                  </div>
                  <div className="summary-row">
                    <span>{t('appointment.labels.fee')}</span>
                    <strong className="fee-text">{selectedDoctor?.fee[lang]}</strong>
                  </div>
                </div>

                <div className="summary-footer-note">
                  <p>{t('appointment.summary.privacyNote')}</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Confirmation / Success Screen */
          <div className="success-card fade-in">
            <FaCheckCircle className="success-icon" />
            <h2>{t('appointment.success.title')}</h2>
            <p className="success-msg">
              {t('appointment.success.refId')} <strong>#MED-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </p>

            <div className="success-details-box">
              <p><strong>{t('appointment.success.patientName')}</strong> {patientInfo.name}</p>
              <p><strong>{t('appointment.success.doctor')}</strong> {selectedDoctor?.name[lang]}</p>
              <p><strong>{t('appointment.success.dateTime')}</strong> {selectedDate} | {selectedSlot}</p>
              <p><strong>{t('appointment.success.mobile')}</strong> {patientInfo.phone}</p>
            </div>

            <p className="sms-notice">{t('appointment.success.smsNotice')}</p>

            <div className="success-actions">
              <button onClick={() => navigate('/')} className="btn-primary">
                {t('appointment.buttons.backToHome')}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* CSS Stylesheet */}
      <style>{`
        .appointment-page-root {
          background-color: #f4f7fc;
          min-height: 100vh;
          padding-bottom: 4rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .appointment-header {
          background: linear-gradient(135deg, #003b93 0%, #0052cc 100%);
          color: #ffffff;
          padding: 3rem 1.5rem 5rem 1.5rem;
          text-align: center;
        }

        .header-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .sub-tag {
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0.8rem;
        }

        .appointment-header h1 {
          font-size: 2.2rem;
          margin: 0 0 0.5rem 0;
          font-weight: 800;
        }

        .appointment-header p {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
        }

        .appointment-container {
          max-width: 1100px;
          margin: -3rem auto 0 auto;
          padding: 0 1rem;
        }

        /* Step Wizard */
        .step-wizard {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          margin-bottom: 2rem;
        }

        .wizard-step {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .wizard-step.active {
          opacity: 1;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .wizard-step.active .step-icon {
          background: #0052cc;
          color: #ffffff;
        }

        .wizard-step span {
          font-weight: 700;
          font-size: 0.95rem;
          color: #1e293b;
        }

        .wizard-line {
          flex-grow: 1;
          height: 2px;
          background: #e2e8f0;
          margin: 0 1rem;
        }

        /* Grid Layout */
        .appointment-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
        }

        .form-panel {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }

        .section-title {
          font-size: 1.2rem;
          color: #0f172a;
          margin-top: 0;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 0.8rem;
        }

        .section-title .icon {
          color: #0052cc;
        }

        /* Doctors Grid Select */
        .doctors-card-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .doctor-select-card {
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .doctor-select-card:hover {
          border-color: #93c5fd;
        }

        .doctor-select-card.selected {
          border-color: #0052cc;
          background: #f0f7ff;
        }

        .doc-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #0052cc;
        }

        .doc-details {
          flex-grow: 1;
        }

        .doc-details h4 {
          margin: 0 0 2px 0;
          font-size: 1.05rem;
          color: #0f172a;
        }

        .doc-details .degree {
          margin: 0 0 6px 0;
          font-size: 0.8rem;
          color: #64748b;
        }

        .dept-tag {
          background: #dbeafe;
          color: #1e40af;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        .doc-footer-meta {
          display: flex;
          gap: 1rem;
          margin-top: 8px;
          font-size: 0.8rem;
        }

        .doc-footer-meta .exp { color: #475569; }
        .doc-footer-meta .fee { color: #059669; font-weight: 700; }

        .radio-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doctor-select-card.selected .radio-check {
          border-color: #0052cc;
        }

        .doctor-select-card.selected .inner-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0052cc;
        }

        /* Step 2 Pickers */
        .date-picker-box {
          margin-bottom: 2rem;
        }

        .date-picker-box label, .time-slots-wrapper label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.6rem;
        }

        .custom-date-input {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
        }

        .custom-date-input:focus {
          border-color: #0052cc;
        }

        .slots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 10px;
        }

        .slot-btn {
          padding: 0.7rem;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          border-radius: 6px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slot-btn:hover {
          background: #f1f5f9;
        }

        .slot-btn.selected {
          background: #0052cc;
          color: #ffffff;
          border-color: #0052cc;
        }

        /* Inputs Step 3 */
        .input-group-grid {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .input-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .input-field label {
          display: block;
          font-weight: 600;
          font-size: 0.88rem;
          color: #334155;
          margin-bottom: 6px;
        }

        .input-field input, .input-field select, .input-field textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          box-sizing: border-box;
        }

        .input-field input:focus, .input-field select:focus, .input-field textarea:focus {
          border-color: #0052cc;
        }

        /* Buttons */
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }

        .btn-primary, .btn-submit, .btn-secondary {
          padding: 0.8rem 1.6rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #0052cc;
          color: #ffffff;
          margin-left: auto;
        }

        .btn-primary:hover { background: #003b93; }

        .btn-submit {
          background: #10b981;
          color: #ffffff;
        }

        .btn-submit:hover { background: #059669; }

        .btn-secondary {
          background: #e2e8f0;
          color: #475569;
        }

        .btn-secondary:hover { background: #cbd5e1; }

        /* Summary Panel */
        .summary-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
          position: sticky;
          top: 20px;
        }

        .summary-card h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #0f172a;
        }

        .divider {
          border: 0;
          height: 1px;
          background: #e2e8f0;
          margin: 1rem 0;
        }

        .summary-doc {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 1.2rem;
        }

        .summary-doc img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
        }

        .summary-doc h5 { margin: 0; font-size: 0.9rem; color: #0f172a; }
        .summary-doc p { margin: 0; font-size: 0.75rem; color: #64748b; }

        .summary-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.88rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          color: #475569;
        }

        .fee-text { color: #059669; font-size: 1rem; }

        .summary-footer-note {
          margin-top: 1.5rem;
          background: #fffbebf5;
          border: 1px solid #fef3c7;
          border-radius: 8px;
          padding: 0.8rem;
          font-size: 0.75rem;
          color: #92400e;
        }

        .summary-footer-note p { margin: 0; }

        /* Success Screen */
        .success-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .success-icon {
          font-size: 4rem;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .success-card h2 { color: #0f172a; margin-bottom: 0.5rem; }
        .success-msg { color: #64748b; margin-bottom: 1.5rem; }

        .success-details-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.2rem;
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .success-details-box p {
          margin: 6px 0;
          color: #334155;
          font-size: 0.95rem;
        }

        .sms-notice {
          font-size: 0.85rem;
          color: #059669;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 850px) {
          .appointment-grid { grid-template-columns: 1fr; }
          .step-wizard span { display: none; }
          .summary-card { position: static; }
        }
      `}</style>

    </div>
  );
};

export default TakeAppointment;