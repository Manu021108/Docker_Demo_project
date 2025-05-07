
# Node.js + MongoDB Profile Demo

This is a simple demo project that shows how to create a basic user profile API using **Node.js**, **Express.js**, and **MongoDB**. The application allows you to update and retrieve user profile information and serves a static profile picture.

##  Features

- Serve a static HTML file
- Upload and update user profile data
- Fetch user profile data
- Serve a static profile picture
- Connect to MongoDB (local or Docker)

##  Technologies Used

- Node.js
- Express.js
- MongoDB (local or Docker)
- Body-parser
- File System (fs)
- Path module

## Project Structure

```

Docker\_Practice/
└── app/
├── images/
│   └── profile-1.jpg
├── index.html
├── server.js
└── README.md

````

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd Docker_Practice/app
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Update MongoDB URL (if needed)**:

   * In `server.js`, update:

     ```js
     let mongoUrlLocal = "mongodb://admin:password@localhost:27018";
     ```
   * If running in Docker, use:

     ```js
     let mongoUrlDocker = "mongodb://admin:pass@mongodb";
     ```

## 🏃‍♂️ Running the App

### Option 1: Run Locally

Make sure MongoDB is running on `localhost:27018` with a user `admin` and password `password`.

```bash
node server.js
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Option 2: Run in Docker

Build your Docker image and run the container.

```bash
docker build -t node-profile-app .
docker run -p 3000:3000 node-profile-app
```

##  API Endpoints

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/`                | Serve the index.html page |
| GET    | `/profile-picture` | Return profile image      |
| POST   | `/update-profile`  | Update user profile       |
| GET    | `/get-profile`     | Get user profile data     |

## Example JSON for `/update-profile`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28
}
```

##  Docker Setup

If using Docker Compose, ensure MongoDB service is defined and exposed on the expected port. Update connection string in `server.js` accordingly.

Would you like me to generate a `Dockerfile` or `docker-compose.yml` for this app too?

