
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

// Layout Components & Pages
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Departments from './pages/Departments';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Tests from './pages/Tests';
import AdminDashboard from './pages/AdminDashboard';
import TakeAppointment from './components/TakeAppointment'; // Import the TakeAppointment component

// Dummy Pages
const Emergency = () => <div style={{ padding: '3rem', textAlign: 'center' }}><h2>Emergency Services</h2></div>;
const NotFound = () => <div style={{ padding: '3rem', textAlign: 'center' }}><h2>404 - Page Not Found</h2></div>;

function App() {

 useEffect(() => {
  // ১. Translate Element Init Function তৈরি
  window.googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,bn',
          autoDisplay: false
        },
        'google_translate_element'
      );
    }
  };

  // ২. 'google_translate_element' Div ট্যাগ তৈরি
  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);
  }

  // ৩. Script ট্যাগ চেক এবং ক্রস-অরিজিন সেট করে লোড করা
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.setAttribute('crossOrigin', 'anonymous');
    document.body.appendChild(script);
  }
}, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about/who-we-are" element={<AboutUs />} />
        <Route path="/about/executive-committee" element={<AboutUs />} />
        <Route path="/about/message-of-chairman" element={<AboutUs />} />
        <Route path="/about/journey" element={<AboutUs />} />
        <Route path="/about/vision-and-mission" element={<AboutUs />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/cardiology" element={<Departments />} />
        <Route path="/departments/neurology" element={<Departments />} />
        <Route path="/departments/orthopedics" element={<Departments />} />
        <Route path="/departments/pediatrics" element={<Departments />} />
        <Route path="/departments/gynecology" element={<Departments />} />
        <Route path="/departments/gastroenterology" element={<Departments />} />
        <Route path="/departments/icu" element={<Departments />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/take-appointment" element={<TakeAppointment />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path ="take-appointment" element={<TakeAppointment />} />
      </Routes>
    </>
  );
}

export default App;