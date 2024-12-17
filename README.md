Project Name
CarSense
Description
The Project Is Created Using Expressjs.

Project includes Login, Signup, Category and Car modules.

On Signup User enter needs to input his/her email address and user will receive an auto-generated password on his/her email. User can login using this password.

After login into system user can manager the Cars and Categories, Where user Can Add/ Edit/ Delete Categories and also Add/ Edit/ Delete Cars corresponing to categories.

Getting Started
Prerequisites
Node.js and npm (or yarn) installed on your system. You can download them from the official website.

This project uses mongoDB Database. make sure you you create database and add the connection string in env.

You need some Brevo credentails for Sending Emails.

Installation
Clone this repository to your local machine using Git

https://github.com/aliahmad56/backend-task
Navigate to the project directory

cd your-project-name
Install project dependencies

npm install or yarn install if you prefer yarn
Configuration
Create a file named .env in the root of your project directory. This file will store environment variables that your application needs to run.

Add the following environment variables to your .env file, Add the values for following DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME,  DATABASE_DIALECT, DATABASE_PORT, SERVER_PORT, USER_EMAIL, USER_PASSWORD, MAIL_SERVICE, USER_NAME, FRONTEND_SERVER, JWT_TOKEN_KEY

 DB_URL=mongodb://localhost:27017/carApp
JWT_TOKEN_SECRET=Secret_Key
FRONT_END=http://localhost:5173
#Brevo For mail Sending Details
BREVO_EMAIL=
BREVO_PASS=

Usage
Start the development server to run the project locally
npm run start:dev or yarn start:dev
This will typically start a development server at http://localhost:5000/ (or a different port depending on your configuration).
