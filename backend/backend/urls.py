"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# Media file (Image) URL-এ সরাসরি দেখানোর জন্য
from django.conf import settings
from django.conf.urls.static import static

# আপনার তৈরি করা ভিউ টি সরাসরি ইম্পোর্ট করতে চাইলে (বিকল্প-১):
from hospital.views import AboutPageDataAPIView  # 'your_app_name' এর জায়গায় আপনার অ্যাপের নাম লিখুন

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # About Us API Endpoint
    path('api/', include('hospital.urls')),

    # অথবা যদি আপনার অ্যাপে আলাদা urls.py থাকে তবে নিচের মত include করতে পারেন (বিকল্প-২):
    # path('api/', include('your_app_name.urls')),
]

# মিডিয়া ফাইল (যেমন: images) ব্রাউজারে সঠিকভাবে অ্যাক্সেস করার জন্য:
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)