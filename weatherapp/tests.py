import os
# os.system('pip install pipreqs')  # install pipreqs
# os.system('pipreqs ./ --force') # generate requirements.txt for deployment
# os.system('pip install -r requirements.txt') # install requirements.txt
os.system('python -m pip install bootstrap4')  # missing for some reason
from django.test import TestCase
from splinter import Browser
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome(ChromeDriverManager().install())
# driver = webdriver.Chrome("/home/mj/django-project-template/weatherapp/driver")
# Tests for deployed app
browser_type = ['chrome', 'firefox']  # we can add more browsers
                                      # not checking IE, because we don't like I

with Browser(browser_type[0]) as browser:
    # Visit URL
    url = "https://cmps-453-fall-2021-team-a.herokuapp.com/"
    browser.visit(url)
    # browser.fill('q', 'splinter - python acceptance testing for web applications')
    # Find and click the 'search' button
    # button = browser.find_by_name('btnG')
    # Interact with elements
    # button.click()
    if browser.is_text_present('Weatherman'):
        print("Yes, the official website was found!")
    else:
        print("No, it wasn't found... We need to improve our SEO techniques")
    browser.quit()  # close browser