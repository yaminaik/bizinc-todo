# ToDoList Application
A simple full-stack ToDoList application built with **Next.js** on the frontend, **Node.js/Express** for the backend, and **PostgreSQL** as the database. The application supports user authentication, creating, reading, and commenting on posts.

## Features
- User registration and login
- JWT-based authentication
- CRUD operations for blog posts (except delete)
- Commenting system on posts
- Responsive design using CSS modules

## Tech Stack
- **Frontend**: React.js, Next.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Styling**: CSS Modules

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed the latest version of [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- You have a PostgreSQL instance running locally or via a cloud provider.

## Environment Variables
To run this project, you will need to add the following environment variables in a `.env.local` file (for local development) 


## Database Setup

1. **Install PostgreSQL** if you don’t have it installed on your machine. Follow the instructions on the [PostgreSQL website](https://www.postgresql.org/download/) for your operating system.

2. **Create a new database**:
    - Open your PostgreSQL client (e.g., `psql`).
    - Run the following commands to create a new database and user:
      ```sql
      CREATE DATABASE todolist;
      CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
      GRANT ALL PRIVILEGES ON DATABASE todolist TO your_username;
      ```
3. **Migrate the database schema**:
   - Use the following SQL to create the necessary tables for the app:
      ```sql
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id)
      );
      
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        post_id INTEGER REFERENCES posts(id)
      );
      ```

4. **Update your `.env` file** with your PostgreSQL credentials to connect to the database.


### Backend Setup

1. Clone the repository:
   git clone https://github.com/yourusername/ToDoList.git
   cd ToDoList/backend
   
2. Install dependencies: npm install
3. Set up PostgreSQL and run migrations as described in the Database Setup section.
4. Run the backend server:   npm run dev

Frontend Setup
1. Navigate to the frontend directory:   cd frontend   
2. Install dependencies:   npm install
3. Run the frontend server: npm run dev

API Endpoints
Users
* POST /api/users/register: Register a new user.
* POST /api/users/login: Login a user and return a JWT.
* POST /api/users/logout: Log out the authenticated user.

Posts
* GET /api/posts: Get all posts.
* POST /api/posts: Create a new post (authentication required).

Comments
* GET /api/comments/post/:postId: Get all comments for a specific post.
* POST /api/comments/post/:postId: Add a comment to a specific post (authentication required).

Usage
Add a Post
* Login using your registered account.
* Navigate to the "Add Post" page.
* Fill in the title and content, and click "Submit."

View Comments
* Click on any post to view all comments related to that post.

Let me know if you'd like any further adjustments!
