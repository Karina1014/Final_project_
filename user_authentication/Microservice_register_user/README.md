# User Authentication API

This is a backend application that provides user authentication features, including registration. It allows users to register by providing their details (name, email, password). Passwords are hashed before storing them in a MongoDB database.

## Features

- 📝 **User Registration**: Register new users by providing a name, email, and password.
- 🔐 **Password Hashing**: Passwords are securely hashed before saving to the database using bcrypt.
- 🌐 **API Endpoints**: Simple API for registering users and handling authentication.

## Technologies Used

- 🟩 **Node.js**: JavaScript runtime environment used for building the backend.
- 🖥️ **Express.js**: Web framework for building RESTful APIs.
- 🗃️ **MongoDB**: NoSQL database used for storing user information.
- 🔒 **bcrypt**: Library used to hash user passwords securely.
- 🔌 **dotenv**: Loads environment variables from `.env` file.

## Installation

### Prerequisites

Ensure you have the following installed:

- 🟩 **Node.js** (v14 or higher)
- 🗄️ **MongoDB** (local or cloud instance, such as MongoDB Atlas)
- ⚙️ **Nodemon** (for development) *(optional)*

### Install dependencies

Navigate to the project folder and run:
## Install dependencies: Navigate to the project folder and run:

``` bash 
    npm install 
```
## Set up environment variables: Create a .env file in the root directory and add the following:
``` bash 
   MONGODB_URI=your_mongodb_connection_string
   PORT=3010
```
## Start the server: To start the server, run:
``` bash 
   node server.js
```
# API Endpoints
## POST /api/auth/register: Register a new user.
``` bash 
   http://localhost:3010/api/auth/register
```
*Body:*

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourPassword123"
}
```

*Response:*

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

# Result:
![image](https://github.com/user-attachments/assets/cb46b15c-b5e6-4ca5-9144-07c7d9dd3b33)

![image](https://github.com/user-attachments/assets/37c6e797-8f7e-4293-a1de-0ff43592f898)

