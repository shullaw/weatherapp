from django.urls import path
from . import views
urlpatterns = [
path('', views.weatherapp, name='weatherapp'),
]