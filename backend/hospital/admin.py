from django.contrib import admin
from django.utils.html import format_html
from .models import (
    AboutUsOverview, 
    Appointment, 
    BannerSlide, 
    Category, 
    Doctor, 
    FeatureItem, 
    Department, 
    DepartmentFeature, 
    MedicalTest, 
    Service, 
    ServiceFeature, 
    ServiceRequest, 
    Specialty,
    HospitalStat
)


class FeatureItemInline(admin.TabularInline):
    model = FeatureItem
    extra = 1


@admin.register(AboutUsOverview)
class AboutUsOverviewAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'chairman_name_en')
    inlines = [FeatureItemInline]

    fieldsets = (
        ("Overview & Media", {
            'fields': ('hero_bg_image', 'hospital_video')
        }),
        ("English Content 🇬🇧", {
            'fields': ('title_en', 'subtitle_en', 'vision_text_en', 'mission_text_en')
        }),
        ("বাংলা কন্টেন্ট 🇧🇩", {
            'fields': ('title_bn', 'subtitle_bn', 'vision_text_bn', 'mission_text_bn')
        }),
        ("Chairman Message (English)", {
            'fields': ('chairman_name_en', 'chairman_role_en', 'chairman_image', 'chairman_message_en')
        }),
        ("চেয়ারম্যানের বাণী (বাংলা)", {
            'fields': ('chairman_name_bn', 'chairman_role_bn', 'chairman_message_bn')
        }),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


class DepartmentFeatureInline(admin.TabularInline):
    model = DepartmentFeature
    extra = 1


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    # Dynamic properties doctors_count_en use kora hocche ebong missing availability_en baad dewa hoyeche
    list_display = ('name_en', 'name_bn', 'category', 'doctors_count_en', 'order')
    list_filter = ('category',)
    search_fields = ('name_en', 'name_bn', 'description_en', 'description_bn')
    inlines = [DepartmentFeatureInline]


@admin.register(Specialty)
class SpecialtyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_en', 'name_bn')
    search_fields = ('name_en', 'name_bn')


# ==============================================================================
# UPDATED BILINGUAL DOCTOR ADMIN
# ==============================================================================
@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = (
        'display_image', 
        'name_en', 
        'name_bn', 
        'position_en', 
        'get_departments', 
        'specialty', 
        'hospital_en', 
        'chamber_day_time_en', 
        'is_confirmed'
    )
    
    search_fields = (
        'name_en', 'name_bn', 
        'degrees_en', 'degrees_bn', 
        'specialty__name_en', 'specialty__name_bn',
        'hospital_en', 'hospital_bn', 
        'position_en', 'position_bn', 
        'departments__name_en', 'departments__name_bn'
    )
    
    list_filter = ('is_confirmed', 'departments', 'specialty')
    list_editable = ('is_confirmed',)
    filter_horizontal = ('departments',)
    list_per_page = 20

    fieldsets = (
        ("General Information", {
            'fields': ('image', 'departments', 'specialty', 'is_confirmed')
        }),
        ("English Details 🇬🇧", {
            'fields': ('name_en', 'degrees_en', 'position_en', 'hospital_en', 'chamber_day_time_en')
        }),
        ("বাংলা বিবরণ 🇧🇩", {
            'fields': ('name_bn', 'degrees_bn', 'position_bn', 'hospital_bn', 'chamber_day_time_bn')
        }),
    )

    def display_image(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 1px solid #ddd;" />', 
                obj.image.url
            )
        return "No Image"
    
    display_image.short_description = 'Picture'

    def get_departments(self, obj):
        return ", ".join([dept.name_en for dept in obj.departments.all()])
    
    get_departments.short_description = 'Departments'


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'phone', 'doctor', 'date', 'time_slot', 'created_at')
    list_filter = ('date', 'time_slot', 'doctor')
    search_fields = ('patient_name', 'phone', 'doctor__name_en', 'doctor__name_bn')
    readonly_fields = ('created_at',)


class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_bn', 'category', 'theme_color')
    list_filter = ('category',)
    search_fields = ('title_en', 'title_bn', 'short_desc_en', 'short_desc_bn')
    inlines = [ServiceFeatureInline]


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'service', 'created_at')
    search_fields = ('name', 'phone')
    readonly_fields = ('created_at',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_en', 'name_bn')
    search_fields = ('name_en', 'name_bn')


@admin.register(MedicalTest)
class MedicalTestAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_bn', 'category', 'report_time_en', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name_en', 'name_bn', 'description_en', 'description_bn')


@admin.register(BannerSlide)
class BannerSlideAdmin(admin.ModelAdmin):
    list_display = ('id', 'display_image')

    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 100px; height: 50px; object-fit: cover; border-radius: 4px;" />', obj.image.url)
        return "No Image"
    
    display_image.short_description = 'Slide Image'


@admin.register(HospitalStat)
class HospitalStatAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_bn', 'count')