from datetime import datetime
from random import random
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.db.models import Q  # Q Object Import

from .models import (
    AboutUsOverview,
    BannerSlide,
    Department,
    Specialty,
    Doctor,
    Appointment,
    Service,
    ServiceRequest,
    Category,
    MedicalTest,
    HospitalStat,
)
from .serializers import (
    AboutUsOverviewSerializer,
    BannerSlideSerializer,
    DepartmentSerializer,
    SpecialtySerializer,
    DoctorSerializer,
    AppointmentSerializer,
    ServiceSerializer,
    ServiceRequestSerializer,
    CategorySerializer,
    MedicalTestSerializer,
    HospitalStatSerializer,
)


class AboutPageDataAPIView(APIView):
    def get(self, request):
        overview = AboutUsOverview.objects.first()
        stats = HospitalStat.objects.all()

        overview_serializer = AboutUsOverviewSerializer(overview, context={'request': request}) if overview else None
        stats_serializer = HospitalStatSerializer(stats, many=True)

        return Response({
            'overview': overview_serializer.data if overview_serializer else None,
            'stats': stats_serializer.data,
        })

    def post(self, request):
        overview = AboutUsOverview.objects.first()
        if overview:
            serializer = AboutUsOverviewSerializer(overview, data=request.data, partial=True, context={'request': request})
        else:
            serializer = AboutUsOverviewSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK if overview else status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentListAPIView(APIView):
    def get(self, request):
        category = request.query_params.get('category', None)
        
        # Base QuerySet optimization (prefetch_related used for related models like doctors and features)
        queryset = Department.objects.prefetch_related('doctors', 'features').all()
        
        if category and category != 'all':
            departments = queryset.filter(category=category)
        else:
            departments = queryset
            
        serializer = DepartmentSerializer(departments, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DepartmentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Specialty List & Create View
class SpecialtyListAPIView(APIView):
    def get(self, request):
        specialties = Specialty.objects.all()
        serializer = SpecialtySerializer(specialties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SpecialtySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ==============================================================================
# UPDATED BILINGUAL DOCTOR LIST VIEW (Search, Filter, Get & Post)
# ==============================================================================
class DoctorListAPIView(APIView):
    def get(self, request):
        queryset = Doctor.objects.all()

        search_query = request.query_params.get('search', None)
        department = request.query_params.get('department', None)
        specialty = request.query_params.get('specialty', None)
        is_confirmed = request.query_params.get('is_confirmed', None)

        if search_query:
            queryset = queryset.filter(
                Q(name_en__icontains=search_query) |
                Q(name_bn__icontains=search_query) |
                Q(degrees_en__icontains=search_query) |
                Q(degrees_bn__icontains=search_query) |
                Q(position_en__icontains=search_query) |
                Q(position_bn__icontains=search_query) |
                Q(specialty__name_en__icontains=search_query) |
                Q(specialty__name_bn__icontains=search_query) |
                Q(departments__name_en__icontains=search_query) |
                Q(departments__name_bn__icontains=search_query)
            )

        if department:
            if department.isdigit():
                queryset = queryset.filter(departments__id=department)
            else:
                queryset = queryset.filter(
                    Q(departments__dept_id__iexact=department) | 
                    Q(departments__name_en__icontains=department) |
                    Q(departments__name_bn__icontains=department)
                )

        if specialty:
            if specialty.isdigit():
                queryset = queryset.filter(specialty__id=specialty)
            else:
                queryset = queryset.filter(
                    Q(specialty__name_en__icontains=specialty) |
                    Q(specialty__name_bn__icontains=specialty)
                )

        if is_confirmed is not None:
            is_confirmed_bool = is_confirmed.lower() == 'true'
            queryset = queryset.filter(is_confirmed=is_confirmed_bool)

        queryset = queryset.distinct()

        serializer = DoctorSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DoctorSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Doctor Detail View
class DoctorDetailAPIView(APIView):
    def get(self, request, pk):
        doctor = get_object_or_404(Doctor, pk=pk)
        serializer = DoctorSerializer(doctor, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        doctor = get_object_or_404(Doctor, pk=pk)
        serializer = DoctorSerializer(doctor, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        doctor = get_object_or_404(Doctor, pk=pk)
        doctor.delete()
        return Response(status=status.HTTP_24_NO_CONTENT)


# Appointment Create View
class AppointmentCreateAPIView(APIView):
    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Service Views
class ServiceListView(APIView):
    def get(self, request):
        services = Service.objects.all()
        
        # Home page ba onno jayga theke limit pathale seta filter korbe
        limit = request.query_params.get('limit')
        if limit:
            try:
                services = services[:int(limit)]
            except ValueError:
                pass  # limit integer na hole shob service e dekhabe

        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceRequestCreateView(APIView):
    def post(self, request):
        serializer = ServiceRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Medical Test & Category Views
class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MedicalTestListView(APIView):
    def get(self, request):
        tests = MedicalTest.objects.all()
        serializer = MedicalTestSerializer(tests, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicalTestSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MedicalTestDetailView(APIView):
    def get(self, request, pk):
        try:
            test = MedicalTest.objects.get(pk=pk)
            serializer = MedicalTestSerializer(test, context={'request': request})
            return Response(serializer.data)
        except MedicalTest.DoesNotExist:
            return Response({'error': 'Medical Test not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        test = get_object_or_404(MedicalTest, pk=pk)
        serializer = MedicalTestSerializer(test, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        test = get_object_or_404(MedicalTest, pk=pk)
        test.delete()
        return Response(status=status.HTTP_24_NO_CONTENT)


class BannerSlideListAPIView(APIView):
    def get(self, request):
        slides = BannerSlide.objects.all()
        serializer = BannerSlideSerializer(slides, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = BannerSlideSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HospitalStatListAPIView(APIView):
    def get(self, request):
        stats = HospitalStat.objects.all()
        serializer = HospitalStatSerializer(stats, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HospitalStatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# views.py ফাইলের ভেতরে ক্লাসের বাইরে সরাসরি লিখুন

@api_view(['GET'])
def get_doctors_by_day(request):
    selected_day = request.GET.get('day', 'today').lower()
    
    days_map = {0: 'mon', 1: 'tue', 2: 'wed', 3: 'thu', 4: 'fri', 5: 'sat', 6: 'sun'}
    if selected_day == 'today':
        today_num = datetime.datetime.now().weekday()
        selected_day = days_map[today_num]

    doctors = Doctor.objects.filter(
        Q(available_days__icontains=selected_day) | Q(available_days__icontains='all')
    )
    
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

class AppointmentCreateAPIView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # অ্যাপয়েন্টমেন্ট সেভ করা
        appointment = serializer.save()

        # একটি ইউনিক ট্র্যাকিং/বুকিং আইডি তৈরি (e.g. #MED-849302)
        booking_id = f"#MED-{random.randint(100000, 999999)}"
        
        # অতিরিক্ত ডাটা যোগ করে রেসপন্স দেওয়া
        return Response({
            "message": "Appointment created successfully!",
            "booking_id": booking_id,
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)