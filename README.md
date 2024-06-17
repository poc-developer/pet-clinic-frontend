# Pet Clinic Angular Application

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Building the Application](#building-the-application)
- [Configuring Apache HTTP Server](#configuring-apache-http-server)
- [Directory Structure](#directory-structure)


## Project Description
This is a frontend application for a Pet Clinic built using Angular. The application allows users to perform various operations related to managing pet owners and their pets. It includes features such as adding new owners, searching for owners, and displaying owner details.

## Features
- **Add Owner:** Allows the user to add new pet owners.
- **Find Owner:** Allows the user to search for pet owners by their last name.
- **Display Owner Details:** Shows detailed information about the pet owners, including their pets.
- **Error Handling:** Graceful handling of errors with user-friendly messages.
- **Unit Testing:** Comprehensive unit tests to ensure the reliability of the application.

## Technologies Used
- **Angular:** Framework for building the frontend application.
- **TypeScript:** Programming language used for Angular development.
- **RxJS:** Library for reactive programming using Observables.
- **Jasmine/Karma:** Testing frameworks used for unit testing.
- **Bootstrap:** CSS framework for responsive design.

## Setup Instructions
### Prerequisites
- **Preferred IDE:** [VS Code](https://code.visualstudio.com/).
- **Node.js:** Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Angular CLI:** Install Angular CLI globally using npm:
  ```bash
  npm install -g @angular/cli
### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/poc-developer/pet-clinic-frontend.git
   ```
2. **Change directory to the cloned repository:**
   ```bash
   cd pet-clinic-frontend
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
## Running the Application
1. **Start the development server:**
   ```bash
   ng serve
   ```
2. **Open your browser and navigate to:**
   ```bash
   http://localhost:4200
   ```
## Running Tests
1. **Run the unit tests:**
This will run the unit tests using Karma and Jasmine.
   ```bash
   ng test
   ```
## Building the Application

To build the application for production, use the following command:
```bash
ng build
```
The build code, which is ready for deployment, will be saved in the Angular application folder:
```javascript
C:/path/to/application/pet-clinic-frontend/dist
```
## Configuring Apache HTTP Server

### Installation
1. Download and install the Apache HTTP Server from [here](https://httpd.apache.org/download.cgi)
2. Place it in the location **c:/Apache24.**

### Configuration
1.Navigate to the Apache server folder:
```javascript
C:/Apache24/conf/httpd.conf
```
2. Update the following attribute
```plaintext
Define SRVROOT "c:/Apache24"
Listen 8085  
```
## Connecting the Angular Application with Apache HTTP Server
1. Navigate to the Apache server folder:
```javascript
C:/Apache24/conf/httpd.conf
```
2. Update these attributes to point to the index.html file of your Angular application:
```plaintext
DocumentRoot "C:/path/to/application/pet-clinic-frontend/dist/browser"
<Directory "C:/path/to/application/pet-clinic-frontend/dist/browser">
```
3. Open the command prompt, navigate to the Apache server path, and execute the following
   commands:

   - To start the server:
     ```bash
     C:\Apache24\bin> httpd.exe -k start
     ```
   - To stop the server:
     ```bash
     C:\Apache24\bin> httpd.exe -k stop
     ```
   - To restart the server:
     ```bash
     C:\Apache24\bin> httpd -k restart
     ```
4. After starting the server the application build will be running on the 
``` plaintext
http://localhost:8085/
```
### Directory Structure
```
└── 📁src
    └── 📁app
        └── 📁add-owner
            └── add-owner.component.css
            └── add-owner.component.html
            └── add-owner.component.spec.ts
            └── add-owner.component.ts
        └── app.component.css
        └── app.component.html
        └── app.component.spec.ts
        └── app.component.ts
        └── app.config.ts
        └── app.routes.ts
        └── fetch-data.service.spec.ts
        └── fetch-data.service.ts
        └── 📁find-owner
            └── find-owner.component.css
            └── find-owner.component.html
            └── find-owner.component.spec.ts
            └── find-owner.component.ts
        └── 📁home
            └── home.component.css
            └── home.component.html
            └── home.component.spec.ts
            └── home.component.ts
        └── new-owner.ts
        └── 📁owner-details
            └── owner-details.component.css
            └── owner-details.component.html
            └── owner-details.component.spec.ts
            └── owner-details.component.ts
        └── owner.ts
        └── post-owner-data.service.spec.ts
        └── post-owner-data.service.ts
        └── 📁response
            └── response.component.css
            └── response.component.html
            └── response.component.spec.ts
            └── response.component.ts
        └── response.service.spec.ts
        └── response.service.ts
    └── 📁assets
        └── 📁Data
            └── owners.json
        └── favicon.png
        └── pets.png
        └── Spring-data-logo.png
        └── spring-logo-black.png
        └── spring-logo-dataflow.png
        └── spring-logo-green.png
        └── spring-pivotal-logo.png
    └── index.html
    └── main.ts
    └── styles.css
```