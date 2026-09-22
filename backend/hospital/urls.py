from django.urls import path
from .views import (
    AboutPageDataAPIView,
    BannerSlideListAPIView,
    DepartmentListAPIView,
    SpecialtyListAPIView,
    DoctorListAPIView,
    DoctorDetailAPIView,
    AppointmentCreateAPIView,
    ServiceListView,
    ServiceRequestCreateView,
    CategoryListView,
    MedicalTestListView,
    MedicalTestDetailView,
    HospitalStatListAPIView,
    get_doctors_by_day,
)

urlpatterns = [
    # About Us, Stats & Banner APIs
    path('about-us-data/', AboutPageDataAPIView.as_view(), name='about-us-data'),
    path('banner-slides/', BannerSlideListAPIView.as_view(), name='banner-slide-list'),
    path('stats/', HospitalStatListAPIView.as_view(), name='stat-list'),

    # Department & Specialty APIs
    path('departments/', DepartmentListAPIView.as_view(), name='department-list'),
    path('specialties/', SpecialtyListAPIView.as_view(), name='specialty-list'),

    # Doctors & Appointments APIs
    path('doctors/', DoctorListAPIView.as_view(), name='doctor-list'),
    path('doctors/<int:pk>/', DoctorDetailAPIView.as_view(), name='doctor-detail'),
    path('doctors/schedule/', get_doctors_by_day, name='doctors-by-day'), # Extra 'api/' সরানো হয়েছে
    path('appointments/', AppointmentCreateAPIView.as_view(), name='appointment-create'),

    # Services & Service Requests APIs
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('service-requests/', ServiceRequestCreateView.as_view(), name='service-request-create'), # Un-comment করা হয়েছে

    # Medical Tests & Categories APIs
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('tests/', MedicalTestListView.as_view(), name='test-list'),
    path('tests/<int:pk>/', MedicalTestDetailView.as_view(), name='test-detail'),
]