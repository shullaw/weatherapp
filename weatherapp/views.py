from django.shortcuts import render

# Create your views here.
##----weather app view/template----##
def weatherapp_view(request):
    return render(request, 'weatherapp.html')
##----weather app view/template----##
