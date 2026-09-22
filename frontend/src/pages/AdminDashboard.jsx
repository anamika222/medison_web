import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('doctors');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    // Common Dropdown States
    const [specialties, setSpecialties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);

    // Fetch Initial Required Data
    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            const [specRes, deptRes, catRes, servRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/specialties/`),
                axios.get(`${API_BASE_URL}/departments/`),
                axios.get(`${API_BASE_URL}/categories/`),
                axios.get(`${API_BASE_URL}/services/`),
            ]);
            setSpecialties(specRes.data);
            setDepartments(deptRes.data);
            setCategories(catRes.data);
            setServices(servRes.data);
        } catch (err) {
            console.error("Dropdown data fetch error:", err);
        }
    };

    const showMsg = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    🏥 Medison Hospital Admin Panel (Bilingual Content Management)
                </h1>

                {/* Message Banner */}
                {message.text && (
                    <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 border-b pb-3 mb-6">
                    {[
                        { id: 'doctors', label: '👨‍⚕️ Doctors' },
                        { id: 'departments', label: '🏢 Departments' },
                        { id: 'services', label: '🏥 Services' },
                        { id: 'tests', label: '🧪 Medical Tests' },
                        { id: 'specialties', label: '🏷️ Specialties' },
                        { id: 'categories', label: '📂 Test Categories' },
                        { id: 'about', label: 'ℹ️ About Us' },
                        { id: 'stats', label: '📊 Hospital Stats' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition ${
                                activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content Rendering */}
                {activeTab === 'doctors' && <DoctorForm specialties={specialties} departments={departments} showMsg={showMsg} />}
                {activeTab === 'departments' && <DepartmentForm showMsg={showMsg} onRefresh={fetchDropdownData} />}
                {activeTab === 'services' && <ServiceForm showMsg={showMsg} onRefresh={fetchDropdownData} />}
                {activeTab === 'tests' && <MedicalTestForm categories={categories} showMsg={showMsg} />}
                {activeTab === 'specialties' && <SpecialtyForm showMsg={showMsg} onRefresh={fetchDropdownData} />}
                {activeTab === 'categories' && <CategoryForm showMsg={showMsg} onRefresh={fetchDropdownData} />}
                {activeTab === 'about' && <AboutUsForm showMsg={showMsg} />}
                {activeTab === 'stats' && <HospitalStatForm showMsg={showMsg} />}
            </div>
        </div>
    );
};

export default AdminDashboard;


/* ==============================================================================
   1. DOCTOR FORM COMPONENT
   ============================================================================== */
const DoctorForm = ({ specialties, departments, showMsg }) => {
    const [formData, setFormData] = useState({
        name_en: '', name_bn: '',
        degrees_en: '', degrees_bn: '',
        position_en: '', position_bn: '',
        hospital_en: '', hospital_bn: '',
        chamber_day_time_en: '', chamber_day_time_bn: '',
        specialty: '', departments: [], is_confirmed: true,
    });
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'departments') {
                formData.departments.forEach((id) => data.append('departments', id));
            } else {
                data.append(key, formData[key]);
            }
        });
        if (image) data.append('image', image);

        try {
            await axios.post(`${API_BASE_URL}/doctors/`, data);
            showMsg('✅ Doctor added successfully!');
        } catch (err) {
            showMsg('❌ Error adding doctor', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Add New Doctor</h3>
            <div className="grid grid-cols-2 gap-4">
                <select className="border p-2 rounded" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} required>
                    <option value="">Select Specialty</option>
                    {specialties.map(s => <option key={s.id} value={s.id}>{s.name_en} / {s.name_bn}</option>)}
                </select>
                <select multiple className="border p-2 rounded h-20" value={formData.departments} onChange={(e) => setFormData({...formData, departments: Array.from(e.target.selectedOptions, o => o.value)})}>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name_en} ({d.name_bn})</option>)}
                </select>
                <input type="text" placeholder="Name (English)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, name_en: e.target.value})} required />
                <input type="text" placeholder="নাম (বাংলা)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, name_bn: e.target.value})} required />
                <input type="text" placeholder="Degrees (English)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, degrees_en: e.target.value})} />
                <input type="text" placeholder="ডিগ্রি (বাংলা)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, degrees_bn: e.target.value})} />
                <input type="text" placeholder="Position (English)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, position_en: e.target.value})} />
                <input type="text" placeholder="পদবি (বাংলা)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, position_bn: e.target.value})} />
                <input type="text" placeholder="Hospital (English)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, hospital_en: e.target.value})} />
                <input type="text" placeholder="হাসপাতাল (বাংলা)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, hospital_bn: e.target.value})} />
                <input type="text" placeholder="Chamber Time (EN)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, chamber_day_time_en: e.target.value})} />
                <input type="text" placeholder="চেম্বারের সময় (বাংলা)" className="border p-2 rounded" onChange={(e) => setFormData({...formData, chamber_day_time_bn: e.target.value})} />
            </div>
            <div>
                <label className="block text-sm font-medium">Doctor Profile Picture</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-1" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Doctor</button>
        </form>
    );
};


/* ==============================================================================
   2. DEPARTMENT FORM COMPONENT
   ============================================================================== */
const DepartmentForm = ({ showMsg, onRefresh }) => {
    const [dept, setDept] = useState({
        dept_id: '', category: 'general_medicine',
        name_en: '', name_bn: '',
        tagline_en: '', tagline_bn: '',
        doctors_count_en: '10 Specialist Doctors', doctors_count_bn: '১০ জন বিশেষজ্ঞ ডাক্তার',
        availability_en: '24/7 Emergency Care', availability_bn: '২৪/৭ জরুরি সেবা',
        description_en: '', description_bn: '',
        icon_name: 'FaStethoscope', color: '#0046AD'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/departments/`, dept);
            showMsg('✅ Department created!');
            onRefresh();
        } catch (err) {
            showMsg('❌ Failed to add department', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Add New Department</h3>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Dept ID (e.g. cardiology)" className="border p-2 rounded" onChange={(e) => setDept({...dept, dept_id: e.target.value})} required />
                <input type="text" placeholder="Color Hex Code (#0046AD)" className="border p-2 rounded" value={dept.color} onChange={(e) => setDept({...dept, color: e.target.value})} />
                <input type="text" placeholder="Dept Name (English)" className="border p-2 rounded" onChange={(e) => setDept({...dept, name_en: e.target.value})} required />
                <input type="text" placeholder="ডিপার্টমেন্টের নাম (বাংলা)" className="border p-2 rounded" onChange={(e) => setDept({...dept, name_bn: e.target.value})} required />
                <input type="text" placeholder="Tagline (EN)" className="border p-2 rounded" onChange={(e) => setDept({...dept, tagline_en: e.target.value})} />
                <input type="text" placeholder="ট্যাগলাইন (বাংলা)" className="border p-2 rounded" onChange={(e) => setDept({...dept, tagline_bn: e.target.value})} />
                <textarea placeholder="Description (EN)" className="border p-2 rounded" onChange={(e) => setDept({...dept, description_en: e.target.value})} />
                <textarea placeholder="বিবরণ (বাংলা)" className="border p-2 rounded" onChange={(e) => setDept({...dept, description_bn: e.target.value})} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Department</button>
        </form>
    );
};


/* ==============================================================================
   3. SERVICE FORM COMPONENT
   ============================================================================== */
const ServiceForm = ({ showMsg, onRefresh }) => {
    const [service, setService] = useState({
        title_en: '', title_bn: '',
        short_desc_en: '', short_desc_bn: '',
        category: 'Emergency', image: '', theme_color: '#0046AD'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/services/`, service);
            showMsg('✅ Service added successfully!');
            onRefresh();
        } catch (err) {
            showMsg('❌ Error adding service', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Add Hospital Service</h3>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Service Title (EN)" className="border p-2 rounded" onChange={(e) => setService({...service, title_en: e.target.value})} required />
                <input type="text" placeholder="সার্ভিস শিরোনাম (বাংলা)" className="border p-2 rounded" onChange={(e) => setService({...service, title_bn: e.target.value})} required />
                <textarea placeholder="Short Desc (EN)" className="border p-2 rounded" onChange={(e) => setService({...service, short_desc_en: e.target.value})} />
                <textarea placeholder="সংক্ষিপ্ত বিবরণ (বাংলা)" className="border p-2 rounded" onChange={(e) => setService({...service, short_desc_bn: e.target.value})} />
                <input type="url" placeholder="Image URL" className="border p-2 rounded col-span-2" onChange={(e) => setService({...service, image: e.target.value})} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Service</button>
        </form>
    );
};


/* ==============================================================================
   4. MEDICAL TEST FORM COMPONENT
   ============================================================================== */
const MedicalTestForm = ({ categories, showMsg }) => {
    const [test, setTest] = useState({
        name_en: '', name_bn: '',
        category: '', price: '',
        report_time_en: '24 Hours', report_time_bn: '২৪ ঘণ্টা',
        preparation_en: '', preparation_bn: '',
        description_en: '', description_bn: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/medical-tests/`, test);
            showMsg('✅ Medical Test added successfully!');
        } catch (err) {
            showMsg('❌ Error adding test', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Add Medical Test</h3>
            <div className="grid grid-cols-2 gap-4">
                <select className="border p-2 rounded" onChange={(e) => setTest({...test, category: e.target.value})} required>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name_en} / {c.name_bn}</option>)}
                </select>
                <input type="number" placeholder="Price (BDT)" className="border p-2 rounded" onChange={(e) => setTest({...test, price: e.target.value})} required />
                <input type="text" placeholder="Test Name (EN)" className="border p-2 rounded" onChange={(e) => setTest({...test, name_en: e.target.value})} required />
                <input type="text" placeholder="টেস্টের নাম (বাংলা)" className="border p-2 rounded" onChange={(e) => setTest({...test, name_bn: e.target.value})} required />
                <input type="text" placeholder="Report Time (EN)" className="border p-2 rounded" value={test.report_time_en} onChange={(e) => setTest({...test, report_time_en: e.target.value})} />
                <input type="text" placeholder="রিপোর্ট দেওয়ার সময় (বাংলা)" className="border p-2 rounded" value={test.report_time_bn} onChange={(e) => setTest({...test, report_time_bn: e.target.value})} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Medical Test</button>
        </form>
    );
};


/* ==============================================================================
   5. SPECIALTY & CATEGORY SMALL FORMS
   ============================================================================== */
const SpecialtyForm = ({ showMsg, onRefresh }) => {
    const [data, setData] = useState({ name_en: '', name_bn: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/specialties/`, data);
            showMsg('✅ Specialty added!');
            onRefresh();
        } catch (err) { showMsg('❌ Error adding specialty', 'error'); }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <h3 className="text-xl font-semibold">Add Doctor Specialty</h3>
            <input type="text" placeholder="Specialty (English)" className="border p-2 rounded w-full" onChange={(e) => setData({...data, name_en: e.target.value})} required />
            <input type="text" placeholder="বিশেষজ্ঞতা (বাংলা)" className="border p-2 rounded w-full" onChange={(e) => setData({...data, name_bn: e.target.value})} required />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Specialty</button>
        </form>
    );
};

const CategoryForm = ({ showMsg, onRefresh }) => {
    const [data, setData] = useState({ name_en: '', name_bn: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/categories/`, data);
            showMsg('✅ Test Category added!');
            onRefresh();
        } catch (err) { showMsg('❌ Error adding category', 'error'); }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <h3 className="text-xl font-semibold">Add Test Category</h3>
            <input type="text" placeholder="Category Name (English)" className="border p-2 rounded w-full" onChange={(e) => setData({...data, name_en: e.target.value})} required />
            <input type="text" placeholder="ক্যাটাগরি নাম (বাংলা)" className="border p-2 rounded w-full" onChange={(e) => setData({...data, name_bn: e.target.value})} required />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Category</button>
        </form>
    );
};


/* ==============================================================================
   6. ABOUT US & STATS FORMS
   ============================================================================== */
const AboutUsForm = ({ showMsg }) => {
    const [about, setAbout] = useState({
        title_en: '', title_bn: '',
        subtitle_en: '', subtitle_bn: '',
        vision_text_en: '', vision_text_bn: '',
        mission_text_en: '', mission_text_bn: '',
        chairman_name_en: '', chairman_name_bn: '',
        chairman_role_en: '', chairman_role_bn: '',
        chairman_message_en: '', chairman_message_bn: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/about/`, about);
            showMsg('✅ About Us content saved!');
        } catch (err) { showMsg('❌ Failed to update About Us', 'error'); }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Manage About Us Content</h3>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Title (EN)" className="border p-2 rounded" onChange={(e) => setAbout({...about, title_en: e.target.value})} />
                <input type="text" placeholder="শিরোনাম (বাংলা)" className="border p-2 rounded" onChange={(e) => setAbout({...about, title_bn: e.target.value})} />
                <textarea placeholder="Vision (EN)" className="border p-2 rounded" onChange={(e) => setAbout({...about, vision_text_en: e.target.value})} />
                <textarea placeholder="ভিশন (বাংলা)" className="border p-2 rounded" onChange={(e) => setAbout({...about, vision_text_bn: e.target.value})} />
                <textarea placeholder="Mission (EN)" className="border p-2 rounded" onChange={(e) => setAbout({...about, mission_text_en: e.target.value})} />
                <textarea placeholder="মিশন (বাংলা)" className="border p-2 rounded" onChange={(e) => setAbout({...about, mission_text_bn: e.target.value})} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save About Info</button>
        </form>
    );
};

const HospitalStatForm = ({ showMsg }) => {
    const [stat, setStat] = useState({ title_en: '', title_bn: '', count: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/stats/`, stat);
            showMsg('✅ Stat added successfully!');
        } catch (err) { showMsg('❌ Failed to add stat', 'error'); }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <h3 className="text-xl font-semibold">Add Hospital Counter/Stat</h3>
            <input type="text" placeholder="Title (e.g. Expert Doctors)" className="border p-2 rounded w-full" onChange={(e) => setStat({...stat, title_en: e.target.value})} required />
            <input type="text" placeholder="শিরোনাম (যেমন: বিশেষজ্ঞ ডাক্তার)" className="border p-2 rounded w-full" onChange={(e) => setStat({...stat, title_bn: e.target.value})} required />
            <input type="text" placeholder="Count (e.g. 50+ or ৫০+)" className="border p-2 rounded w-full" onChange={(e) => setStat({...stat, count: e.target.value})} required />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Stat</button>
        </form>
    );
};