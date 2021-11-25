from django.shortcuts import render
from django.template import Template

# Create your views here.
##----weather app view/template----##
def weatherapp(request):
    return render(request, 'weatherapp.html')
##----weather app view/template----##

