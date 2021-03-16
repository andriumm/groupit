# Project description
In these days and age is very common to save a lot of online resources for different topic that interest us and that we want to use in a second moment. 
The problem is that then we forget about them, we save new resources and we never come back to them.
groupIT! is thought as the solution to this modern problem. This app will allow the user to save online resources, cathegorize them by topics and subtopics and be reminded of them if they haven't come back at the resource in a long time.

# Setup

## Dependencies

Run npm install in project directory. This will install server-related dependencies such as express.
cd client and run npm install. This will install client dependencies (React).

## Database Prep

Access the MySQL interface in your terminal by running mysql -u root -p
Create a new database called DogsProject: create database dogsproject
Add a .env file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

DB_HOST=localhost

DB_USER=root

DB_NAME=DogsProject

DB_PASS=YOURPASSWORD

Run npm run migrate in the project folder of this repository, in a new terminal window. This will create a table called 'users' and a table calle 'dog' in your database.

![db_schema](./captura.png)

Make sure you understand how the tables are constructed. In your MySQL console, you can run use DogsProject; and then describe users; (and describe dog;) to see the structure of the users and dog tables.

You can find the API routes plan here : ![API_routes](./APIroutes.png)

## Development

Run npm start in project directory to start the Express server on port 5000
In another terminal, do cd client and run npm start to start the client in development mode with hot reloading in port 3000.
