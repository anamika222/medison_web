from django.db import models
from django.db.models import CASCADE


class AboutUsOverview(models.Model):
    # Overview (Bilingual)
    title_en = models.CharField(max_length=255, default="A Legacy of Healthcare Leadership & Patient Care", verbose_name="Title (EN)")
    title_bn = models.CharField(max_length=255, default="স্বাস্থ্যসেবায় নেতৃত্ব এবং রোগীর যত্নের একটি বিশ্বস্ত ঐতিহ্য", verbose_name="Title (BN)")
    
    subtitle_en = models.TextField(default="Medison Hospital stands as a beacon of modern medical care...", verbose_name="Subtitle (EN)")
    subtitle_bn = models.TextField(default="মেডিসন হাসপাতাল আধুনিক চিকিৎসা সেবার এক অনন্য প্রতীক...", verbose_name="Subtitle (BN)")

    # Media Fields
    hero_bg_image = models.ImageField(upload_to='about/hero/', blank=True, null=True, help_text="About Us পেজের Hero Banner-এর ব্যাকগ্রাউন্ড ছবি")
    hospital_video = models.FileField(upload_to='about/videos/', blank=True, null=True, help_text="হাসপাতালের ভিডিও ট্যুর (MP4/WebM)")
    
    # Vision & Mission (Bilingual with default)
    vision_text_en = models.TextField(default="", blank=True, verbose_name="Vision Text (EN)")
    vision_text_bn = models.TextField(default="", blank=True, verbose_name="Vision Text (BN)")
    mission_text_en = models.TextField(default="", blank=True, verbose_name="Mission Text (EN)")
    mission_text_bn = models.TextField(default="", blank=True, verbose_name="Mission Text (BN)")

    # Chairman Message (Bilingual with default)
    chairman_name_en = models.CharField(max_length=150, default="Dr. Ahmed Rahman", verbose_name="Chairman Name (EN)")
    chairman_name_bn = models.CharField(max_length=150, default="ডাঃ আহমেদ রহমান", verbose_name="Chairman Name (BN)")
    
    chairman_role_en = models.CharField(max_length=150, default="Chairman, Medison Hospital", verbose_name="Chairman Role (EN)")
    chairman_role_bn = models.CharField(max_length=150, default="চেয়ারম্যান, মেডিসন হাসপাতাল", verbose_name="Chairman Role (BN)")
    
    chairman_image = models.ImageField(upload_to='about/chairman/', blank=True, null=True)
    
    chairman_message_en = models.TextField(default="", blank=True, verbose_name="Chairman Message (EN)")
    chairman_message_bn = models.TextField(default="", blank=True, verbose_name="Chairman Message (BN)")

    class Meta:
        verbose_name = "About Us Overview"
        verbose_name_plural = "About Us Overview"

    def __str__(self):
        return f"{self.title_en} / {self.title_bn}"


# Dynamic Features
class FeatureItem(models.Model):
    overview = models.ForeignKey(AboutUsOverview, related_name='features', on_delete=CASCADE)
    title_en = models.CharField(max_length=150, default="", verbose_name="Title (EN)")
    title_bn = models.CharField(max_length=150, default="", verbose_name="Title (BN)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title_en} / {self.title_bn}"


class Department(models.Model):
    # Image-er "বিশেষজ্ঞ চিকিৎসা বিভাগসমূহ" অনুযায়ী CATEGORY_CHOICES
    CATEGORY_CHOICES = [
        ('medicine', 'Medicine Department / মেডিসিন বিভাগ'),
        ('chest', 'Chest & Respiratory Department / বক্ষব্যাধি বিভাগ'),
        ('gynecology', 'Gynecology Department / গাইনী বিভাগ'),
        ('pediatrics', 'Pediatrics Department / শিশু বিভাগ'),
        ('orthopedics', 'Orthopedics Department / অর্থোপেডিক বিভাগ'),
        ('cardiology', 'Cardiology Department / কার্ডিওলজি বিভাগ'),
        ('ent', 'ENT Department / নাক-কান-গলা বিভাগ'),
        ('diabetes', 'Diabetes Department / ডায়াবেটিস বিভাগ'),
        ('physical_medicine', 'Physical Medicine & Rehabilitation / ফিজিক্যাল মেডিসিন এন্ড রিহ্যাবিলিটেশন'),
        ('neuromedicine', 'Neuromedicine Department / নিউরো মেডিসিন বিভাগ'),
        ('urology', 'Urology Department / ইউরোলজি বিভাগ'),
        ('ophthalmology', 'Ophthalmology (Eye) Department / চক্ষু বিভাগ'),
        ('nephrology', 'Nephrology Department / নেফ্রোলজী বিভাগ'),
        ('dermatology', 'Dermatology & Venereology / চর্ম ও যৌন বিভাগ'),
        ('general_surgery', 'General Surgery Department / জেনারেল সার্জারী বিভাগ'),
        ('dental', 'Dental Department / ডেন্টাল বিভাগ'),
        ('hematology', 'Hematology Department / রক্তরোগ বিভাগ'),
    ]

    dept_id = models.CharField(max_length=50, unique=True, help_text="e.g., medicine, cardiology")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='medicine')
    
    # Bilingual Name
    name_en = models.CharField(max_length=255, verbose_name="Department Name (EN)")
    name_bn = models.CharField(max_length=255, verbose_name="Department Name (BN)")
    
    # Optional Fields
    description_en = models.TextField(default="", blank=True, verbose_name="Description (EN)")
    description_bn = models.TextField(default="", blank=True, verbose_name="Description (BN)")
    
    icon_name = models.CharField(max_length=50, default="FaStethoscope")
    color = models.CharField(max_length=10, default="#0046AD")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Department"
        verbose_name_plural = "Departments"

    def __str__(self):
        return f"{self.name_en} / {self.name_bn}"

    # Automatic Doctor Count (Calculated directly from related Doctor model)
    @property
    def get_doctors_count(self):
        # 'doctors' dynamic key ashbe Doctor model-er ForeignKey relationship local field theke
        if hasattr(self, 'doctors'):
            return self.doctors.count()
        return 0

    @property
    def doctors_count_en(self):
        count = self.get_doctors_count
        return f"{count} Specialist Doctors"

    @property
    def doctors_count_bn(self):
        count = self.get_doctors_count
        # English digit to Bangla digit conversion
        en_to_bn_map = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")
        bn_count = str(count).translate(en_to_bn_map)
        return f"{bn_count} জন বিশেষজ্ঞ ডাক্তার"


class DepartmentFeature(models.Model):
    department = models.ForeignKey(Department, related_name='features', on_delete=models.CASCADE)
    title_en = models.CharField(max_length=255, default="", verbose_name="Title (EN)")
    title_bn = models.CharField(max_length=255, default="", verbose_name="Title (BN)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.department.name_en} - {self.title_en}"


class Specialty(models.Model):
    name_en = models.CharField(max_length=100, default="", verbose_name="Specialty (EN)")
    name_bn = models.CharField(max_length=100, default="", verbose_name="Specialty (BN)")

    class Meta:
        verbose_name_plural = "Specialties"

    def __str__(self):
        return f"{self.name_en} / {self.name_bn}"

class Doctor(models.Model):
    name_en = models.CharField(max_length=150, default="", verbose_name="Doctor Name (EN)")
    name_bn = models.CharField(max_length=150, default="", verbose_name="Doctor Name (BN)")
    
    degrees_en = models.TextField(default="", blank=True, verbose_name="Degrees (EN)")
    degrees_bn = models.TextField(default="", blank=True, verbose_name="Degrees (BN)")
    
    position_en = models.CharField(max_length=150, blank=True, null=True, verbose_name="Position (EN)")
    position_bn = models.CharField(max_length=150, blank=True, null=True, verbose_name="Position (BN)")
    
    hospital_en = models.CharField(max_length=255, default="", blank=True, verbose_name="Hospital (EN)")
    hospital_bn = models.CharField(max_length=255, default="", blank=True, verbose_name="Hospital (BN)")
    
    chamber_day_time_en = models.TextField(blank=True, null=True, verbose_name="Chamber Time (EN)")
    chamber_day_time_bn = models.TextField(blank=True, null=True, verbose_name="Chamber Time (BN)")
    
    specialty = models.ForeignKey(Specialty, on_delete=models.SET_NULL, null=True, blank=True, related_name='doctors')
    departments = models.ManyToManyField(Department, related_name='doctors')
    image = models.ImageField(upload_to='doctors/', blank=True, null=True)
    is_confirmed = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return f"{self.name_en} / {self.name_bn}"


class Appointment(models.Model):
    TIME_SLOTS = (
        ('Morning', 'Morning'),
        ('Evening', 'Evening'),
    )

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    patient_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    date = models.DateField()
    time_slot = models.CharField(max_length=20, choices=TIME_SLOTS)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient_name} - {self.doctor.name_en} ({self.date})"


class Service(models.Model):
    CATEGORY_CHOICES = [
        ('Emergency', 'Emergency'),
        ('Inpatient', 'Inpatient'),
        ('Specialized', 'Specialized'),
        ('Digital', 'Digital'),
        ('Home Care', 'Home Care'),
        ('Facility', 'Facility'),
    ]

    title_en = models.CharField(max_length=255, default="", verbose_name="Title (EN)")
    title_bn = models.CharField(max_length=255, default="", verbose_name="Title (BN)")
    
    short_desc_en = models.TextField(default="", blank=True, verbose_name="Short Description (EN)")
    short_desc_bn = models.TextField(default="", blank=True, verbose_name="Short Description (BN)")
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    theme_color = models.CharField(max_length=20, default="#0046AD")
   
    def __str__(self):
        return f"{self.title_en} / {self.title_bn}"


class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, related_name='features', on_delete=models.CASCADE)
    title_en = models.CharField(max_length=255, default="", verbose_name="Feature (EN)")
    title_bn = models.CharField(max_length=255, default="", verbose_name="Feature (BN)")

    def __str__(self):
        return f"{self.service.title_en} - {self.title_en}"


class ServiceRequest(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='requests')
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service.title_en}"


class Category(models.Model):
    name_en = models.CharField(max_length=100, default="", verbose_name="Category Name (EN)")
    name_bn = models.CharField(max_length=100, default="", verbose_name="Category Name (BN)")

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.name_en} / {self.name_bn}"


class MedicalTest(models.Model):
    name_en = models.CharField(max_length=255, default="", verbose_name="Test Name (EN)")
    name_bn = models.CharField(max_length=255, default="", verbose_name="Test Name (BN)")
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tests')
    image = models.ImageField(upload_to='tests/', null=True, blank=True)
    
    report_time_en = models.CharField(max_length=100, default="", blank=True, verbose_name="Report Time (EN)")
    report_time_bn = models.CharField(max_length=100, default="", blank=True, verbose_name="Report Time (BN)")
    
    preparation_en = models.TextField(default="", blank=True, verbose_name="Preparation (EN)")
    preparation_bn = models.TextField(default="", blank=True, verbose_name="Preparation (BN)")
    
    description_en = models.TextField(default="", blank=True, verbose_name="Description (EN)")
    description_bn = models.TextField(default="", blank=True, verbose_name="Description (BN)")
    
    parameters = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name_en} / {self.name_bn}"


class HospitalStat(models.Model):
    title_en = models.CharField(max_length=100, default="", verbose_name="Stat Title (EN)")
    title_bn = models.CharField(max_length=100, default="", verbose_name="Stat Title (BN)")
    count = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.title_en} / {self.title_bn}"


class BannerSlide(models.Model):
    image = models.ImageField(upload_to='banner_slides/')

    def __str__(self):
        return f"Slide {self.id}"