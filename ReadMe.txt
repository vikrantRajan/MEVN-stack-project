This is a simple MEVN stack CRUD (create, read, update, delete) application built with MongoDB, Express.js, Vue.js & Node.js

Once you download the repositiory please run
"npm install" on the root directory of the project
AND inside the "checklist-app" folder a second time

After that you can run "npm run dev" (from the root directory) to start the local server.

The dependencies I am using:
1. Express - backend framework
2. mongoose - tool to connect to MongoDB
3. body-parser - allow us to convert response into json
4. cors - allow the frontend dev server to make AJAX calls to the backend
5. morgan - will log all command requests to the server
6. nodemon/concurrently - keeps the application running and refresh everytime we make a change


Server.js - entry point for the application
