import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // General & Header Top Bar
      welcome: "Welcome to Our Healthcare Portal",
      select_language: "English",
      search_placeholder: "Search doctors or departments...",
      hotline: "Hotline",
      ambulance: "Ambulance",
      address: "Hospital Road, Medison Tower",
      
      // Branding & Notice
      specializedHospital: "Specialized Hospital",
      traumaCentre: "& Trauma Centre",
      latestNotice: "LATEST NOTICE",
      noticeText: "24/7 Emergency and Diagnostic Services are Available.",
      emergency: "EMERGENCY",
      
      // Main Navigation
      home: "Home",
      aboutUs: "About Us",
      departments: "Departments",
      services: "Services",
      doctors: "Doctors",
      tests: "Medical Tests",
      takeAppointment: "Appointment",
      find_doctor: "Find a Doctor",
      book_appointment: "Book Appointment",

      // Hero Section & Folding Cards
      hero_welcome: "WELCOME TO MEDISON HOSPITAL",
      hero_title: "Your Health Our Mission",
      hero_subtitle: "Quality Care • Expert Consultation • Advanced Treatment",
      hero_bio: "Dedicated to providing trusted healthcare services with compassion.",
      mrd_services: "MRD SERVICES",

      // About Us Dropdown & Section
      whoWeAre: "Who We Are",
      executiveCommittee: "Executive Committee",
      messageChairman: "Message of Chairman",
      journey: "Our Journey",
      visionMission: "Vision & Mission",
      who_we_are_title: "Providing World-Class Healthcare & Compassionate Care",
      who_we_are_subtitle: "We are dedicated to delivering exceptional medical services with state-of-the-art technology and a team of renowned specialists.",
      learn_more: "Learn More",

      // Department Dropdown
      cardiology: "Cardiology",
      neurology: "Neurology",
      orthopedics: "Orthopedics",
      pediatrics: "Pediatrics",
      gynecology: "Gynecology",
      gastroenterology: "Gastroenterology",
      urology: "Urology",
      icu: "ICU & CCU",

      // Emergency Section
      need_emergency_title: "Need Emergency Medical Help?",
      need_emergency_desc: "Contact our emergency helpline immediately. Our ICU ambulances are ready 24/7.",
      call_emergency: "Call Emergency",

      // About Us Page Specific Additions
      loading_about: "Loading About Us Information...",
      video_tour: "Video Tour",
      our_guiding_principles: "OUR GUIDING PRINCIPLES",
      our_vision: "Our Vision",
      our_mission: "Our Mission",
      our_history: "OUR HISTORY",
      journey_title: "The Journey Of Medison",
      leadership: "LEADERSHIP",
      video_not_supported: "Your browser does not support the video tag.",

      // 🏥 Departments Page Specific Additions
      specialized_medical_care: "Specialized Medical Care",
      our_clinical_departments: "Our Clinical Departments",
      dept_hero_subtitle: "Explore our state-of-the-art medical units staffed by expert doctors and equipped with cutting-edge healthcare technology.",
      search_dept_placeholder: "Search department name, tagline, or features...",
      loading_departments: "Loading departments...",
      error_loading: "Error Loading Data",
      something_went_wrong: "Something went wrong!",
      no_departments_found: "No departments found matching your criteria.",
      specialist_doctors: "Specialist Doctors",
      "24_7_service": "24/7 Service",
      view_department_details: "View Department Details",
      overview_services: "Overview & Services",
      close: "Close",

      // Department Categories
      cat_all: "All Categories",
      cat_pediatric_surgery: "Pediatric & General Surgery",
      cat_general_laparoscopic: "General, Laparoscopic & Colorectal Surgery",
      cat_gynecology_obs: "Gynecology & Obstetrics",
      cat_anesthesia_pain: "Anesthesia & Pain Management",
      cat_ultrasonography: "Ultrasonography & Sonology",
      cat_ophthalmology: "Ophthalmology (Eye)",
      cat_general_medicine: "Medicine, Nephrology, Diabetes, Cardiology & Respiratory",
      cat_orthopedics: "Orthopedics, Spine & Rheumatology",
      cat_dental: "Dental Care",
      cat_neurosurgery: "Neurosurgery",
      cat_oncology: "Oncology (Cancer Care)",
      cat_physical_medicine: "Physical Medicine & Rehabilitation",
      cat_ent: "ENT (Ear, Nose & Throat)",
      cat_public_health: "Public Health & Experienced Medicine",
      cat_ultrasound_gynae: "Ultrasound & Gynecology",

      // 🩺 Services Page Specific Additions
      heroBadge: "24/7 Premium Healthcare Service",
      heroTitle: "Trusted & Modern Healthcare for Your Family",
      heroDesc: "Providing top-quality medical services with advanced technology and expert doctors.",
      stat1Title: "24/7",
      stat1Desc: "Emergency Care",
      stat2Title: "50+",
      stat2Desc: "Expert Doctors",
      stat3Title: "100%",
      stat3Desc: "Accurate Diagnostics",
      doctorTitle: "Expert Specialists",
      doctorSubtitle: "Dedicated to Your Care",
      searchPlaceholder: "Search for services...",
      bookBtn: "Book Now",
      loadingText: "Loading services...",
      fetchError: "Failed to load services",
      noServicesFound: "No services found",
      categories: {
        All: "All",
        Emergency: "Emergency",
        Inpatient: "Inpatient",
        Specialized: "Specialized",
        Digital: "Digital",
        "Home Care": "Home Care",
        Facility: "Facility"
      },
      inputNameLabel: "Your Name",
      inputNamePlaceholder: "Enter your full name",
      inputPhoneLabel: "Phone Number",
      inputPhonePlaceholder: "01XXXXXXXXX",
      inputNoteLabel: "Additional Note (Optional)",
      inputNotePlaceholder: "Enter any special instructions or requests",
      submitBtnText: "Send Request",
      submittingBtnText: "Sending...",
      successTitle: "Request Sent Successfully!",
      successDesc: "Thank you, we will contact you shortly regarding",
      modalBadge: "Service Booking",
      our_healthcare_services: "Our Healthcare Services",
      services_hero_title: "Comprehensive Care For You & Your Family",
      services_hero_subtitle: "We offer round-the-clock emergency, diagnostic, surgical, and specialized medical services with maximum accuracy and care.",
      search_services_placeholder: "Search services by name, description, or features...",
      loading_services: "Loading healthcare services...",
      no_services_found: "No services found matching your search.",
      service_features: "Key Features & Highlights",
      avail_service: "Avail Service",
      service_details: "Service Details",
      category: "Category",
      price_cost: "Estimated Cost",
      discount: "Discount Available",
      Explore_All_Services: "Explore All Services", // ✅ Added here

      // Service Categories
      service_cat_all: "All Services",
      service_cat_emergency: "Emergency & Critical Care",
      service_cat_diagnostic: "Diagnostic & Lab Tests",
      service_cat_surgical: "Surgical & Operation",
      service_cat_outpatient: "Outpatient (OPD)",
      service_cat_inpatient: "Inpatient (IPD) & Cabin",
      service_cat_pharmacy: "Pharmacy & Support",

      // Process & FAQs
      processSubtitle: "Simple Process",
      processTitle: "How to Receive Service",
      steps: [
        {
          num: "01",
          title: "Select Service / Department",
          desc: "Choose from our wide range of specialized medical services or diagnostic packages tailored to your needs."
        },
        {
          num: "02",
          title: "Consult Specialist / Book Test",
          desc: "Get matched with renowned healthcare experts or schedule a quick appointment for home sample collection."
        },
        {
          num: "03",
          title: "Receive Treatment & Follow-up",
          desc: "Experience world-class treatment, prompt test report delivery, and dedicated post-care support."
        }
      ],
      faqSubtitle: "Common Questions",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "How quickly can an ICU ambulance reach?",
          a: "Our ICU ambulances are equipped with GPS tracking and life-support systems, dispatched immediately upon your call to arrive in the fastest time possible."
        },
        {
          q: "Are emergency diagnostic test reports delivered on the same day?",
          a: "Yes, emergency lab tests and digital imaging reports are delivered on an urgent basis, often within 1 to 4 hours."
        },
        {
          q: "Can I book a specialist doctor appointment online?",
          a: "Absolutely! You can choose your preferred specialist and doctor shift directly from our appointment booking section."
        },
        {
          q: "Do you offer home sample collection for diagnostic tests?",
          a: "Yes, we provide safe and hygienic home sample collection for blood tests and pathology diagnostics."
        }
      ],

      // 🧪 Medical Tests / Diagnostic Page Specifics
      our_diagnostic_tests: "Diagnostic & Medical Tests",
      tests_hero_title: "Accurate Lab Tests & Diagnostics",
      tests_hero_subtitle: "Book your medical lab tests online with fast delivery of accurate reports.",
      search_tests_placeholder: "Search test by name, category, or code...",
      loading_tests: "Loading lab tests...",
      no_tests_found: "No medical tests found.",
      test_name: "Test Name",
      test_code: "Test Code",
      test_price: "Test Price",
      sample_required: "Sample Required",
      report_delivery: "Report Delivery Time",
      preparation_instructions: "Preparation Instructions",
      book_test_now: "Book Test",
      home_sample_collection: "Home Sample Collection Available",

      // Test Categories
      test_cat_all: "All Tests",
      test_cat_blood: "Blood Tests",
      test_cat_imaging: "X-Ray & Imaging",
      test_cat_pathology: "Pathology & Biochemistry",
      test_cat_biochemistry: "Biochemistry",
      test_cat_cardiac: "Cardiac & ECG",
      test_cat_ultrasound: "Ultrasound & MRI",

      // 👨‍⚕️ Doctors Page Specific Additions
      heroBadgeDoc: "24/7 Verified Specialist Doctors",
      heroTitle1: "Your Health Deserves",
      heroTitle2: "World-Class Care",
      heroSubtitleDoc: "Find specialist doctors by department and schedule your appointments easily.",
      searchPlaceholderDoc: "Search by doctor name, position, degrees, or hospital...",
      loadingDoctors: "Loading doctor profiles...",
      errorTitleDoc: "Data Error",
      noDoctors: "No doctors found matching your criteria.",
      bookAppointmentBtn: "Book Appointment",
      bookSerial: "Book Serial",
      patientName: "Patient Name",
      patientNamePlaceholder: "Enter full name",
      phone: "Phone Number",
      phonePlaceholder: "017XXXXXXXX",
      date: "Date",
      time: "Time",
      selectShift: "Select Shift",
      morning: "Morning",
      evening: "Evening",
      processing: "Processing...",
      confirmAppointment: "Confirm Appointment",
      bookingSuccessTitle: "Booking Successful!",
      bookingSuccessMsg: "We reserved a slot with {{name}}.",
      verified: "Verified Doctor",
      chamberSchedule: "Chamber Schedule",
      everydaySchedule: "Everyday / Contact Hotline",
      qualificationsNA: "Qualifications N/A",
      na: "N/A",

      // Doctor Department Filters
      dept_all: "All Departments",
      dept_pediatric_surgery: "Pediatric & General Surgery",
      dept_general_surgery: "General, Laparoscopic & Colorectal Surgery",
      dept_gynecology: "Gynecology & Obstetrics",
      dept_anesthesia: "Anesthesia & Pain Management",
      dept_ultrasonography: "Ultrasonography & Sonology",
      dept_ophthalmology: "Ophthalmology (Eye)",
      dept_medicine: "Medicine, Nephrology, Diabetes, Cardiology & Respiratory",
      dept_orthopedics: "Orthopedics, Spine & Rheumatology",
      dept_dental: "Dental Care",
      dept_neurosurgery: "Neurosurgery",
      dept_oncology: "Oncology (Cancer Care)",
      dept_physical_medicine: "Physical Medicine & Rehabilitation",
      dept_ent: "ENT (Ear, Nose & Throat)",
      dept_public_health: "Public Health & Experienced Medicine",
      dept_ultrasound_gynecology: "Ultrasound & Gynecology"
    }
  },
  bn: {
    translation: {
      // General & Header Top Bar
      welcome: "আমাদের হেলথকেয়ার পোর্টালে আপনাকে স্বাগতম",
      select_language: "বাংলা",
      search_placeholder: "ডাক্তার বা বিভাগ খুঁজুন...",
      hotline: "হটলাইন",
      ambulance: "অ্যাম্বুলেন্স",
      address: "হাসপাতাল রোড, মেডিসন টাওয়ার",
      
      // Branding & Notice
      specializedHospital: "স্পেশালাইজড হাসপাতাল",
      traumaCentre: "এবং ট্রমা সেন্টার",
      latestNotice: "সর্বশেষ নোটিশ",
      noticeText: "২৪/৭ জরুরী ও ডায়াগনস্টিক সেবা চালু রয়েছে।",
      emergency: "জরুরী সেবা",
      
      // Main Navigation
      home: "হোম",
      aboutUs: "আমাদের কথা",
      departments: "ডিপার্টমেন্টসমূহ",
      services: "সেবাসমূহ",
      doctors: "ডাক্তারবৃন্দ",
      tests: "মেডিকেল টেস্ট",
      takeAppointment: "অ্যাপয়েন্টমেন্ট নিন",
      find_doctor: "ডাক্তার খুঁজুন",
      book_appointment: "অ্যাপয়েন্টমেন্ট নিন",

      // Hero Section & Folding Cards
      hero_welcome: "মেডিসন হাসপাতালে স্বাগতম",
      hero_title: "আপনার স্বাস্থ্যই আমাদের মূল লক্ষ্য",
      hero_subtitle: "উন্নত সেবা • বিশেষজ্ঞ পরামর্শ • আধুনিক চিকিৎসা",
      hero_bio: "আন্তরিকতা ও বিশ্বস্ততার সাথে স্বাস্থ্যসেবা প্রদানে আমরা অঙ্গীকারবদ্ধ।",
      mrd_services: "এমআরডি সেবা",

      // About Us Dropdown & Section
      whoWeAre: "আমাদের পরিচিতি",
      executiveCommittee: "নির্বাহী কমিটি",
      messageChairman: "চেয়ারম্যানের বাণী",
      journey: "আমাদের যাত্রা",
      visionMission: "ভিশন ও মিশন",
      who_we_are_title: "বিশ্বমানের স্বাস্থ্যসেবা ও মানবিক পরিচর্যা প্রদানে প্রতিশ্রুতিবদ্ধ",
      who_we_are_subtitle: "আধুনিক প্রযুক্তি এবং প্রখ্যাত বিশেষজ্ঞ চিকিৎসকদের মাধ্যমে আমরা সেরা চিকিৎসাসেবা নিশ্চিত করতে নিবেদিত।",
      learn_more: "আরও জানুন",

      // Department Dropdown
      cardiology: "কার্ডিওলজি (হৃদরোগ)",
      neurology: "নিউরোলজি (স্নায়ুরোগ)",
      orthopedics: "অর্থোপেডিক্স (অস্থিরোগ)",
      pediatrics: "পেডিয়াট্রিক্স (শিশু রোগ)",
      gynecology: "গাইনিকোলজি (স্ত্রী রোগ)",
      gastroenterology: "গ্যাস্ট্রোএন্টারোলজি",
      urology: "ইউরোলজি",
      icu: "আইসিইউ ও সিসিইউ",

      // Emergency Section
      need_emergency_title: "জরুরী চিকিৎসা সেবা প্রয়োজন?",
      need_emergency_desc: "অবিলম্বে আমাদের জরুরী হেল্পলাইনে যোগাযোগ করুন। আমাদের আইসিইউ অ্যাম্বুলেন্স ২৪/৭ প্রস্তুত।",
      call_emergency: "জরুরী কল করুন",

      // About Us Page Specific Additions
      loading_about: "আমাদের তথ্য লোড হচ্ছে...",
      video_tour: "ভিডিও ট্যুর",
      our_guiding_principles: "আমাদের মূলনীতি",
      our_vision: "আমাদের ভিশন (দূরদৃষ্টি)",
      our_mission: "আমাদের মিশন (লক্ষ্য)",
      our_history: "আমাদের ইতিহাস",
      journey_title: "মেডিসন হাসপাতালের ইতিহাস ও অগ্রগতি",
      leadership: "নেতৃত্ব",
      video_not_supported: "আপনার ব্রাউজার ভিডিও ট্যাগ সাপোর্ট করে না।",

      // 🏥 Departments Page Specific Additions
      specialized_medical_care: "বিশেষায়িত চিকিৎসা সেবা",
      our_clinical_departments: "আমাদের ক্লিনিক্যাল বিভাগসমূহ",
      dept_hero_subtitle: "অভিজ্ঞ চিকিৎসক ও আধুনিক চিকিৎসাপ্রযুক্তিতে সজ্জিত আমাদের উন্নত বিভাগসমূহ ঘুরে দেখুন।",
      search_dept_placeholder: "বিভাগের নাম, শিরোনাম বা বৈশিষ্ট্য দিয়ে খুঁজুন...",
      loading_departments: "ডিপার্টমেন্ট লোড হচ্ছে...",
      error_loading: "তথ্য লোড করতে সমস্যা হয়েছে",
      something_went_wrong: "কিছু একটা সমস্যা হয়েছে!",
      no_departments_found: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো বিভাগ পাওয়া যায়নি।",
      specialist_doctors: "বিশেষজ্ঞ চিকিৎসক",
      "24_7_service": "২৪/৭ জরুরি সেবা",
      view_department_details: "বিস্তারিত বিবরণ দেখুন",
      overview_services: "বিবরণ ও সেবাসমূহ",
      close: "বন্ধ করুন",

      // Department Categories
      cat_all: "সকল ক্যাটাগরি",
      cat_pediatric_surgery: "শিশু ও সাধারণ সার্জারি",
      cat_general_laparoscopic: "সাধারণ, ল্যাপারোস্কোপিক ও কোলোরেক্টাল সার্জারি",
      cat_gynecology_obs: "গাইনিকোলজি ও প্রসূতিবিদ্যা",
      cat_anesthesia_pain: "অ্যানেস্থেসিয়া ও পেইন ম্যানেজমেন্ট",
      cat_ultrasonography: "আল্ট্রাসনোগ্রাফি ও সোনোলজি",
      cat_ophthalmology: "অফথালমোলজি (চক্ষু রোগ)",
      cat_general_medicine: "মেডিসিন, নেফ্রোলজি, ডায়াবেটিস, কার্ডিওলজি ও শ্বাসরোগ",
      cat_orthopedics: "অর্থোপেডিক্স, স্পাইন ও বাতব্যথা",
      cat_dental: "ডেন্টাল কেয়ার (দাঁতের সেবা)",
      cat_neurosurgery: "নিউরোসার্জারি",
      cat_oncology: "অনকোলজি (ক্যান্সার সেবা)",
      cat_physical_medicine: "ফিজিক্যাল মেডিসিন ও রিহ্যাবিলিটেশন",
      cat_ent: "ইএনটি (নাক, কান ও গলা)",
      cat_public_health: "পাবলিক হেলথ ও অভিজ্ঞ মেডিসিন",
      cat_ultrasound_gynae: "আল্ট্রাসাউন্ড ও গাইনিকোলজি",

      // 🩺 Services Page Specific Additions
      heroBadge: "২৪/৭ প্রিমিয়াম হেলথকেয়ার সেবা",
      heroTitle: "আপনার স্বাস্থ্যের জন্য বিশ্বস্ত ও আধুনিক চিকিৎসাসেবা",
      heroDesc: "আধুনিক প্রযুক্তি এবং অভিজ্ঞ চিকিৎসকদের সমন্বয়ে আমরা দিচ্ছি সর্বোচ্চ মানের স্বাস্থ্যসেবা। আপনার এবং আপনার পরিবারের সুস্থতাই আমাদের অগ্রাধিকার।",
      stat1Title: "২৪/৭",
      stat1Desc: "জরুরি সেবা",
      stat2Title: "৫০+",
      stat2Desc: "বিশেষজ্ঞ ডাক্তার",
      stat3Title: "১০০%",
      stat3Desc: "সঠিক ডায়াগনস্টিক",
      doctorTitle: "অভিজ্ঞ বিশেষজ্ঞবৃন্দ",
      doctorSubtitle: "আপনার সেবায় নিয়োজিত",
      searchPlaceholder: "আপনার প্রয়োজনীয় সেবা খুঁজুন...",
      bookBtn: "অ্যাপয়েন্টমেন্ট নিন",
      loadingText: "সেবাসমূহ লোড হচ্ছে...",
      fetchError: "ডাটা লোড করতে সমস্যা হয়েছে",
      noServicesFound: "কোনো সেবা পাওয়া যায়নি",
      categories: {
        All: "সবগুলো",
        Emergency: "ইমার্জেন্সি",
        Inpatient: "ইনপেশেন্ট",
        Specialized: "স্পেশালাইজড",
        Digital: "ডিজিটাল সেবা",
        "Home Care": "হোম কেয়ার",
        Facility: "ফেসিলিটি"
      },
      inputNameLabel: "আপনার নাম",
      inputNamePlaceholder: "আপনার পুরো নাম লিখুন",
      inputPhoneLabel: "ফোন নম্বর",
      inputPhonePlaceholder: "০১XXXXXXXXX",
      inputNoteLabel: "অতিরিক্ত মন্তব্য (ঐচ্ছিক)",
      inputNotePlaceholder: "আপনার কোনো বিশেষ চাহিদা থাকলে লিখুন",
      submitBtnText: "রিকোয়েস্ট পাঠান",
      submittingBtnText: "পাঠানো হচ্ছে...",
      successTitle: "সফলভাবে রিকোয়েস্ট পাঠানো হয়েছে!",
      successDesc: "ধন্যবাদ, আমরা দ্রুত আপনার সাথে যোগাযোগ করব।",
      modalBadge: "সেবা বুকিং",
      our_healthcare_services: "আমাদের চিকিৎসাসেবাসমূহ",
      services_hero_title: "আপনার ও আপনার পরিবারের জন্য সর্বাত্মক স্বাস্থ্যসেবা",
      services_hero_subtitle: "আমরা ২৪ ঘণ্টা জরুরী সেবা, নির্ভুল ডায়াগনস্টিক, উন্নত সার্জারি এবং বিশেষায়িত চিকিৎসাসেবা নিশ্চিত করি।",
      search_services_placeholder: "সেবার নাম, বিবরণ বা বৈশিষ্ট্য দিয়ে খুঁজুন...",
      loading_services: "সেবাসমূহ লোড হচ্ছে...",
      no_services_found: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো সেবা পাওয়া যায়নি।",
      service_features: "মূল বৈশিষ্ট্য ও সুবিধাসমূহ",
      avail_service: "সেবা গ্রহণ করুন",
      service_details: "সেবার বিস্তারিত",
      category: "ক্যাটাগরি",
      price_cost: "আনুমানিক খরচ",
      discount: "ডিসকাউন্ট সুবিধা রয়েছে",
      Explore_All_Services: "সকল সেবা দেখুন",

      // Service Categories
      service_cat_all: "সকল সেবাসমূহ",
      service_cat_emergency: "জরুরী ও ক্রিটিক্যাল কেয়ার",
      service_cat_diagnostic: "ডায়াগনস্টিক ও ল্যাব টেস্ট",
      service_cat_surgical: "সার্জারি ও অপারেশন",
      service_cat_outpatient: "বহির্বিভাগ সেবা (OPD)",
      service_cat_inpatient: "অন্তর্বিভাগ ও কেবিন (IPD)",
      service_cat_pharmacy: "ফার্মেসি ও অন্যান্য সহায়ক সেবা",

      // Process & FAQs
      processSubtitle: "সহজ প্রক্রিয়া",
      processTitle: "কীভাবে সেবা গ্রহণ করবেন",
      steps: [
        {
          num: "০১",
          title: "সেবা অথবা বিভাগ নির্বাচন করুন",
          desc: "আপনার প্রয়োজন অনুযায়ী আমাদের বিশেষায়িত সেবা অথবা ডায়াগনস্টিক প্যাকেজ থেকে নির্বাচন করুন।"
        },
        {
          num: "০২",
          title: "বিশেষজ্ঞের পরামর্শ ও টেস্ট বুক করুন",
          desc: "অভিজ্ঞ চিকিৎসকের পরামর্শ নিন অথবা সহজেই হোম স্যাম্পল কালেকশনের জন্য অ্যাপয়েন্টমেন্ট বুক করুন।"
        },
        {
          num: "০৩",
          title: "চিকিৎসা গ্রহণ ও রিপোর্ট সংগ্রহ করুন",
          desc: "বিশ্বমানের চিকিৎসাসেবা লাভ করুন, দ্রুততম সময়ে ডিজিটাল রিপোর্ট পান এবং আফটার-কেয়ার সুবিধা উপভোগ করুন।"
        }
      ],
      faqSubtitle: "সাধারণ প্রশ্নাবলী",
      faqTitle: "সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ",
      faqs: [
        {
          q: "কীভাবে অনলাইনে ডাক্তার অ্যাপয়েন্টমেন্ট নেব?",
          a: "আমাদের ওয়েবসাইটের 'অ্যাপয়েন্টমেন্ট নিন' বাটনে ক্লিক করে পছন্দমতো ডাক্তার ও সময় বেছে নিয়ে সহজেই অ্যাপয়েন্টমেন্ট নিশ্চিত করতে পারবেন।"
        },
        {
          q: "হোম স্যাম্পল কালেকশন কি উপলব্ধ?",
          a: "হ্যাঁ, আমাদের দক্ষ মেডিকেল টিম আপনার বাসায় গিয়ে ল্যাব টেস্টের স্যাম্পল সংগ্রহ করে থাকে।"
        },
        {
          q: "জরুরি প্রয়োজনে কীভাবে যোগাযোগ করব?",
          a: "আমাদের ২৪/৭ হটলাইন নম্বরে সরাসরি কল করে যেকোনো জরুরি অ্যাম্বুলেন্স বা ইনপেশেন্ট সেবা পেতে পারেন।"
        }
      ],

      // 🧪 Medical Tests / Diagnostic Page Specifics
      our_diagnostic_tests: "ডায়াগনস্টিক ও মেডিকেল টেস্টসমূহ",
      tests_hero_title: "নির্ভুল ও আধুনিক ল্যাব টেস্ট সেবা",
      tests_hero_subtitle: "সহজেই অনলাইনে মেডিকেল টেস্ট বুক করুন এবং দ্রুততম সময়ে নির্ভুল রিপোর্ট সংগ্রহ করুন।",
      search_tests_placeholder: "টেস্টের নাম, কোড বা ক্যাটাগরি দিয়ে খুঁজুন...",
      loading_tests: "মেডিকেল টেস্ট লোড হচ্ছে...",
      no_tests_found: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো টেস্ট পাওয়া যায়নি।",
      test_name: "টেস্টের নাম",
      test_code: "টেস্ট কোড",
      test_price: "টেস্টের ফি",
      sample_required: "প্রয়োজনীয় নমুনা (Sample)",
      report_delivery: "রিপোর্ট সরবরাহের সময়",
      preparation_instructions: "টেস্টের পূর্ব প্রস্তুতি",
      book_test_now: "টেস্ট বুক করুন",
      home_sample_collection: "হোম স্যাম্পল কালেকশন সুবিধা রয়েছে",

      // Test Categories
      test_cat_all: "সকল টেস্ট",
      test_cat_blood: "রক্তের পরীক্ষা (Blood Tests)",
      test_cat_imaging: "এক্স-রে ও ইমেজিং",
      test_cat_pathology: "প্যাথলজি ও বায়োকেমিস্ট্রি",
      test_cat_biochemistry: "বায়োকেমিস্ট্রি",
      test_cat_cardiac: "কার্ডিয়াক ও ইসিজি (ECG)",
      test_cat_ultrasound: "আল্ট্রাসনোগ্রাম ও এমআরআই",

      // 👨‍⚕️ Doctors Page Specific Additions
      heroBadgeDoc: "২৪/৭ ভেরিফাইড বিশেষজ্ঞ ডাক্তারগণ",
      heroTitle1: "আপনার স্বাস্থ্য পাক",
      heroTitle2: "বিশ্বমানের চিকিৎসা সেবা",
      heroSubtitleDoc: "বিভাগ অনুযায়ী বিশেষজ্ঞ ডাক্তার খুঁজুন এবং সহজেই আপনার অ্যাপয়েন্টমেন্ট বুক করুন।",
      searchPlaceholderDoc: "ডাক্তারের নাম, পদবি, ডিগ্রী অথবা হাসপাতাল দিয়ে খুঁজুন...",
      loadingDoctors: "ডাক্তারদের প্রোফাইল লোড হচ্ছে...",
      errorTitleDoc: "ডাটা লোড সমস্যা",
      noDoctors: "আপনার তথ্যের সাথে মিলে এমন কোনো ডাক্তার পাওয়া যায়নি।",
      bookAppointmentBtn: "অ্যাপয়েন্টমেন্ট নিন",
      bookSerial: "সিরিয়াল বুক করুন",
      patientName: "রোগীর নাম",
      patientNamePlaceholder: "সম্পূর্ণ নাম লিখুন",
      phone: "মোবাইল নম্বর",
      phonePlaceholder: "০১৭XXXXXXXX",
      date: "তারিখ",
      time: "সময়",
      selectShift: "শিফট নির্বাচন করুন",
      morning: "সকাল",
      evening: "বিকাল / সন্ধ্যা",
      processing: "প্রসেসিং হচ্ছে...",
      confirmAppointment: "কনফার্ম করুন",
      bookingSuccessTitle: "বুকিং সফল হয়েছে!",
      bookingSuccessMsg: "আমরা {{name}}-এর সাথে আপনার অ্যাপয়েন্টমেন্ট বুক করেছি।",
      verified: "ভেরিফাইড ডাক্তার",
      chamberSchedule: "চেম্বারের সময়সূচী",
      everydaySchedule: "প্রতিদিন / হটলাইনে যোগাযোগ করুন",
      qualificationsNA: "যোগ্যতার তথ্য নেই",
      na: "প্রযোজ্য নয়",

      // Doctor Department Filters
      dept_all: "সকল বিভাগ",
      dept_pediatric_surgery: "শিশু ও জেনারেল সার্জারি",
      dept_general_surgery: "জেনারেল, ল্যাপারোস্কোপিক ও কলোরেক্টাল সার্জারি",
      dept_gynecology: "স্ত্রী রোগ ও প্রসূতি বিদ্যা",
      dept_anesthesia: "অ্যানেস্থেসিয়া ও পেইন ম্যানেজমেন্ট",
      dept_ultrasonography: "আল্ট্রাসনোগ্রাফি ও সোনোলজি",
      dept_ophthalmology: "চক্ষু রোগ (চোখ)",
      dept_medicine: "মেডিসিন, কিডনি, ডায়াবেটিস, হৃদরোগ ও বক্ষব্যাধি",
      dept_orthopedics: "অস্থিরোগ, স্পাইন ও বাতব্যথা",
      dept_dental: "ডেন্টাল কেয়ার (দাঁত)",
      dept_neurosurgery: "নিউরোসার্জারি",
      dept_oncology: "অনকোলজি (ক্যান্সার সেবা)",
      dept_physical_medicine: "ফিজিক্যাল মেডিসিন ও রিহ্যাবিলিটেশন",
      dept_ent: "ইএনটি (নাক, কান, গলা)",
      dept_public_health: "জনস্বাস্থ্য ও অভিজ্ঞ মেডিসিন",
      dept_ultrasound_gynecology: "আল্ট্রাসাউন্ড ও গাইনি"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'bn',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;