# """Forms for accounts app."""
# from django import forms
# # from bootstrap_datepicker_plus import DatePickerInput
# from .models import CustomUser
# from django.contrib.auth.forms import (UserCreationForm, UserChangeForm)


# class CustomUserCreationForm(UserCreationForm):
#     """Registration form."""

#     class Meta:
#         """Meta class."""

#         model = CustomUser
#         fields = ("first_name", "last_name", "email", "date_of_birth",
#                   "password1", "password2")
#         widgets = {
#             'first_name': forms.TextInput(attrs={"class": "form-control"}),
#             'last_name': forms.TextInput(attrs={"class": "form-control"}),
#             'email': forms.TextInput(attrs={"class": "form-control"}),
#             'date_of_birth': DatePickerInput(),
#             'password1': forms.TextInput(attrs={"class": "form-control"}),
#             'password2': forms.TextInput(attrs={"class": "form-control"}),
#         }


# class CustomUserChangeForm(UserChangeForm):
#     """User profile change view."""

#     class Meta:
#         """Meta class."""

#         model = CustomUser
#         fields = ('email',)
