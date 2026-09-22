import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    // ভাষা পরিবর্তন করার ফাংশন (স্মল লেটার 'bn' এবং 'en' ব্যবহার করা হয়েছে)
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // বর্তমান ল্যাঙ্গুয়েজ কোডটি পাওয়ার জন্য (নিরাপত্তার জন্য toLowerCase করা হয়েছে)
    const currentLang = i18n.language ? i18n.language.toLowerCase() : 'en';

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '3px 6px', borderRadius: '6px' }}>
            <button
                type="button"
                onClick={() => changeLanguage('bn')}
                style={{
                    border: 'none',
                    backgroundColor: currentLang.startsWith('bn') ? '#0046AD' : '#e2e8f0',
                    color: currentLang.startsWith('bn') ? '#ffffff' : '#1e293b',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: '0.2s'
                }}
            >
                বাংলা
            </button>
            <button
                type="button"
                onClick={() => changeLanguage('en')}
                style={{
                    border: 'none',
                    backgroundColor: currentLang.startsWith('en') ? '#0046AD' : '#e2e8f0',
                    color: currentLang.startsWith('en') ? '#ffffff' : '#1e293b',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: '0.2s'
                }}
            >
                English
            </button>
        </div>
    );
};

export default LanguageSwitcher;