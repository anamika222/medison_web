from rest_framework import serializers
from .models import (
    AboutUsOverview,
    BannerSlide,
    FeatureItem,
    Department,
    DepartmentFeature,
    Specialty,
    Doctor,
    Appointment,
    Service,
    ServiceFeature,
    ServiceRequest,
    Category,
    MedicalTest,
    HospitalStat,
)

# Feature & Overview Serializers
class FeatureItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureItem
        fields = ['id', 'title_en', 'title_bn', 'order']


class AboutUsOverviewSerializer(serializers.ModelSerializer):
    hero_bg_image = serializers.SerializerMethodField()
    hospital_video = serializers.SerializerMethodField()
    chairman_image = serializers.SerializerMethodField()

    class Meta:
        model = AboutUsOverview
        fields = '__all__'

    # Absolute URL জেনারেট করার জন্য হেলপার মেথডসমূহ
    def get_hero_bg_image(self, obj):
        request = self.context.get('request')
        if obj.hero_bg_image and request:
            return request.build_absolute_uri(obj.hero_bg_image.url)
        return None

    def get_hospital_video(self, obj):
        request = self.context.get('request')
        if obj.hospital_video and request:
            return request.build_absolute_uri(obj.hospital_video.url)
        return None

    def get_chairman_image(self, obj):
        request = self.context.get('request')
        if obj.chairman_image and request:
            return request.build_absolute_uri(obj.chairman_image.url)
        return None


class HospitalStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalStat
        fields = '__all__'


# Department Serializers
class DepartmentFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentFeature
        fields = ['id', 'title_en', 'title_bn', 'order']


class DepartmentSerializer(serializers.ModelSerializer):
    features = DepartmentFeatureSerializer(many=True, read_only=True)
    
    # Model-এর dynamic properties এগুলো API Output-এ পাঠানোর জন্য ReadOnlyField হিসেবে যুক্ত করা হলো
    doctors_count_en = serializers.ReadOnlyField()
    doctors_count_bn = serializers.ReadOnlyField()
    get_doctors_count = serializers.ReadOnlyField()

    class Meta:
        model = Department
        fields = '__all__'


# Specialty & Doctor Serializers
class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = '__all__'


# ==============================================================================
# UPDATED DOCTOR SERIALIZER
# ==============================================================================
class DoctorSerializer(serializers.ModelSerializer):
    # React-এ সহজে ব্যবহারের জন্য Specialty এর ইংরেজি ও বাংলা নাম আলাদাভাবে রিড-অনলি দেওয়া হলো
    specialty_name_en = serializers.CharField(source='specialty.name_en', read_only=True)
    specialty_name_bn = serializers.CharField(source='specialty.name_bn', read_only=True)
    departments_detail = DepartmentSerializer(source='departments', many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = '__all__'


# Appointment Serializer
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__' # অথবা ['id', 'doctor', 'patient_name', 'patient_phone', 'patient_email', 'patient_age', 'patient_gender', 'date', 'slot', 'problem_description']

    def validate(self, data):
        """
        রোগী যে দিন নির্বাচন করেছে, ডাক্তার সেদিন চেম্বারে বসেন কিনা তা ব্যাকএন্ডে রি-চেক করা
        """
        doctor = data.get('doctor')
        appointment_date = data.get('date')

        if doctor and appointment_date:
            # তারিখ থেকে বারের নাম বের করা (e.g., 'mon', 'tue')
            days_map = {0: 'mon', 1: 'tue', 2: 'wed', 3: 'thu', 4: 'fri', 5: 'sat', 6: 'sun'}
            selected_day = days_map[appointment_date.weekday()]

            available_days = doctor.available_days.lower() if doctor.available_days else ''

            if selected_day not in available_days and 'all' not in available_days:
                raise serializers.ValidationError({
                    "date": f"ডাঃ {doctor.name} এই বারে চেম্বারে বসবেন না। তাঁর প্রাপ্যতা: {doctor.available_days}"
                })

        return data


# Service Serializers
class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ['id', 'title_en', 'title_bn']


class ServiceSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'


class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = '__all__'


# Medical Test & Category Serializers
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class MedicalTestSerializer(serializers.ModelSerializer):
    category_name_en = serializers.CharField(source='category.name_en', read_only=True)
    category_name_bn = serializers.CharField(source='category.name_bn', read_only=True)

    class Meta:
        model = MedicalTest
        fields = '__all__'


class BannerSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = BannerSlide
        fields = '__all__'