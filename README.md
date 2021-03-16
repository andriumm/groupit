# Project description

In these days and age it is very common to save a lot of online resources for different topics that interest us and that we want to use in a second moment.
The problem is that then we forget about them, we save new resources and we never come back to them.
groupIT! is thought as the solution to this modern problem. This app will allow the user to save online resources, cathegorize them by topics and subtopics and be reminded of them if they haven't come back at the resource in a long time.

# Project Setup

## Dependencies

Run npm install in project directory. This will install server-related dependencies such as express.
cd client and run npm install. This will install client dependencies (React).

## Database Prep

Access the MySQL interface in your terminal by running mysql -u root -p
Create a new database: create database projectname
Add a .env file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

DB_HOST=localhost

DB_USER=root

DB_NAME=DBNAME

DB_PASS=YOURPASSWORD

-set the steps of the migration with sequelize

- picture of the schema

Make sure you understand how the tables are constructed. In your MySQL console, you can see the structure of the tables.

You can find the API routes plan here : -screeshot of the APIs Excel?

## Development

Run npm start in project directory to start the Express server on port 5000
In another terminal, do cd client and run npm start to start the client in development mode with hot reloading in port 3000.
