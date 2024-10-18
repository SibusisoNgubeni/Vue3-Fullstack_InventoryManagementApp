# Vue 3 + Vite full stack Food inventory app
==============================================
  ## Deployment link:
   
  Vercel: vue3-fullstack-inventory-management-app.vercel.app
===============================================

## Overview
This project is a Vue.js application that allows users to manage their food inventory. Users can add, edit, and delete food items while viewing the current inventory. The application consists of a Vue.js frontend and an Express.js backend with Hono.js and Drizzle ORM.
===============================================

## Features
1. Inventory item listing
2. Add new inventory item
3. Edit existing inventory item
4. Delete existing inventory item
===============================================

## Usage
### Deployed Application
To use the deployed version of this app, follow the steps below:

1. Visit the deployed application URL (provide the link here).
2. Log in using the following credentials:
 ### Username: Lortech
 ### Password: Lortech@2024
Once logged in, you can view, add, delete, and fetch food items using the application’s user interface.

### Running the Application Locally
To run this project on your local machine, follow these steps:

### Frontend Setup
1. Clone the Repository:
2. Navigate into the project directory:
  - cd my-vue-app
3. Install Dependencies:
  - npm install
4. Start the Development Server:
  -npm run dev

  :you should now have the front end of the app running!

### Backend setup
1. Set Up PostgreSQL Database: Since the app connects to a PostgreSQL database, you'll need to set one up yourself. Here's how:

 - Install PostgreSQL on your machine(if you don't already have it).
 - Create a new database using the following command: `psql -U postgres -c "CREATE DATABASE food_items_db;"`
 - Create a new user and grant them access to the database using the following commands: `psql

 - Create a .env file in the

## Frontend  
### Vue.js:
 JavaScript framework for building the user interface.
### Vue Router: 
 Routing library for navigating between different views.
### Tailwind CSS:
Utility-first CSS framework for styling the application.
### Pinia:
State management library for managing application state.

## Backend
### Node.js:
Runtime environment for the server-side application.
### Express.js:
Web framework for building the server-side application. 
### Hono.js:
Web framework for building the server-side application.
### Drizzle ORM:
Object-relational mapping library for interacting with the database.
### PostgreSQL:
Database management system for storing data.
### Typescript:
Superset of JavaScript that adds optional static typing and other features.


## Routing and Navigation
The project utilizes Vue Router for managing navigation between different views. 


## Challenges and Learning
This project was a great learning experience for me. I enhanced my knowledge of how to use Vue Router for navigation,
how to use Pinia for state management, and how to use Drizzle ORM for interacting with the
database. I also learned how to use Hono.js and Express.js for building the server-side application
and how to use PostgreSQL for storing data.

## Reflections
### Development Process
 Building this Vue 3 Inventory app has been an enriching experience, allowing me to apply and deepen my understanding of Vue.js, Vue Router, and state management as well as creating and consuming APIs. The project began with the goal of creating a functional chef Inventory  application with features like CRUD operations. Each aspect of the development presented unique challenges and opportunities for growth.

## Front End:
### Understanding Vue.js and Composition API:

I deepened my understanding of Vue.js, especially the Composition API. Using ref, defineProps, and defineEmits allowed me to manage state and interactions more effectively. Vue's lifecycle hooks (onMounted) were crucial for data fetching.

### State Management with Pinia:

My first experience with Pinia taught me how to manage shared state across components, simplifying actions like adding and editing inventory items. Its simpler API made handling reactive data more straightforward than Vuex.

### Managing Modals and Forms:

I learned to manage modals and forms through Vue's v-if directive and v-model, ensuring smooth handling of user input and data validation.
Routing with Vue Router:

Implementing Vue Router helped me understand route protection and session management, particularly redirecting users after logout.

### CSS and Tailwind:

Tailwind’s utility-first approach allowed me to build a responsive UI quickly without custom CSS. I also used dynamic Tailwind classes based on state for styling.
Error Handling and User Feedback:

I learned to handle errors gracefully and provide feedback through modals and notifications, improving the user experience.

### Local Storage and Session Management:

Storing session data in localStorage helped me understand session management and authentication in web apps.
Building Reusable Components:

I gained experience in creating reusable Vue components, improving the app’s maintainability.

### Continuous Improvement and Refactoring:

Regular refactoring taught me the importance of keeping the code clean as new features were added.

## Back End:
### Setting Up a Database Connection (Drizzle ORM):

I learned to integrate a database with Drizzle ORM, gaining insights into client-server communication and handling connection errors.

### Working with TypeScript Modules:

Managing module imports in TypeScript helped me improve my understanding of ES modules and CommonJS, enhancing my ability to resolve module-related issues.
Error Handling and Debugging:

Debugging issues like missing modules strengthened my problem-solving skills, particularly with TypeScript configurations.

### Project Structure and Modularization:

Organizing my code into modules taught me the importance of clean, reusable code in larger projects.


### Applying the DRY Principle:

I applied the DRY principle to reduce repetitive code and improve maintainability by creating reusable functions and types.



### Usage
### Frontend Setup
1. Clone the Repository
2 .cd my-vue-app
3. npm install
4. npm run dev

 ### USERNAME: Lortech
 ### PASSWORD: Lortech@2024

### Backend setup
1. Clone the Repository
2. cd server
3. npm install
4. npm run dev

