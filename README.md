# Project description

In these days and age it is very common to save a lot of online resources for different topics that interest us and that we want to use in a second moment.
The problem is that then we forget about them, we save new resources and we never come back to them.
groupIT! is thought as the solution to this modern problem. This app will allow the user to save online resources, cathegorize them by topics and subtopics and be reminded of them if they haven't come back at the resource in a long time.

# Project Setup

## Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as express, nodemailer and crone.
- Run `cd client` and run `npm install`. This will install client dependencies (React).
- 

## Database Prep

Access the MySQL interface in your terminal by running `mysql -u root -p`
Create a new database: `create database projectname`
Add a .env file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```javascript
DB_HOST = localhost;
DB_USER = root;
DB_NAME = bodyCultureBcn;
DB_PASS = YOURPASSWORD;
SUPER_SECRET = YOURSECRET;
```
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This command is a Script that will run Sequelize to create 3 tables called 'users','topics' and 'resources' in your database.

- Make sure you understand how all the tables are constructed. In your MySQL console, you can run `use database name_of_your_table`; and then `show tables`; to see the structure of the table. Run `describe users` in case you want to check the content of the users table. You can do the same with the rest of the tables.

- ![Db Schema](client/public/Db_Schema_GroupIt.png)

Make sure you understand how the tables are constructed. In your MySQL console, you can see the structure of the tables.

### Table endpoints

You can find the API routes plan here : 

![endpoints](client/public/Wireframe_GroupIt.png)


## Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Stack
- JavaScript, React.js, Express.js, Node.js, mySQL
- Other libraries: axios, Sequelize, nodemailer

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._

