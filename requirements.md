## Quick Start

# 1. Clone repository

 Front End 
https://github.com/Canteen-Management-System/CRMS-front-end

 BackEnd
https://github.com/Canteen-Management-System/CRMS-back-end

# 2. Setup the backend CRMS-back-end

cd CRMS-back-end


Activate a virtual environment

virtualenv .env

.env\scripts\activate

# Download necessary packages

py -m pip install Django djangorestframework django-cors-headers

# Make database migrations

py manage.py makemigrations

py manage.py migrate 

# Create admin superuser

py manage.py createsuperuser

..<input a username, email, and password>


# 3. Confirm your backend is functioning

py manage.py runserver

# 4. Setup the frontend CRMS-front-end

Open up another terminal (tab or window) and keep your backend running.

# In the new terminal cd into the next-app directory

cd CRMS-front-end

# Install all dependencies

yarn install 

# or if using npm

npm install

# Create a .env.local file with backend api endpoint inside

echo > .env.local

# In your text editor put the following line in your .env.local file

DJANGO_API=http://localhost:8000/api

# Start your frontend app
yarn dev

# or
npm run dev


## Wireframes and Domain Modeling in Document
https://docs.google.com/document/d/1wR66aLJdZc9QV05KmPUmxO6FqkzJQxsI/edit#
