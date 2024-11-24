# SecretSphere

Simple Secret sharing application. Users can create account and share their secret and others will not know who's secret is.

## Features

1. User Authentication
   a. Sign Up
   b. Login
   c. Forget Password
   d. Reset Password
   e. Logout
2. Secrets
   a. Add secret
   b. Edit or Delete
3. All authenticated user can see all the secrets but no one know who shared
4. Pagination
5. Response user interface for all kind of screens

### Technologies used

1. Backend
   a. Express - backend setup and api routes
   b. Mongoose - connection with DB and user schema
   c. JSON WEB TOKEN - for user authentication
   d. Bcrypt - Password hashing
   e. Cors - for cross origin request

2. Frontend
   a. React - Build user interface components
   b. React Router Dom - routing
   c. Context api - Glocal state management
   d. React hooks - define states
   e. Toastify - alert popups
   f. React icons - icons
   g. CSS - styling and responsiveness(media query)

3. Database
   a. MongoDB Atlas

### Steps to Run Application

1. git clone -- https://github.com/rekha0suthar/secret-sphere
2. cd frontend
   a. npm install
   b. npm start
3. cd backend
   a. npm install
   b. create .env file and add these two environment variables
   (i) JWT_SECRET=your_secret_key
   (ii) MONGO_URI=your_mongodb_uri
   c. npm start or npm run dev

### Demo Link

https://secret-sphere.vercel.app/
