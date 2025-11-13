Talent Directory - Backend
🚀 Live API
URL: https://talent-server-5gdg.onrender.com/api/talents

📋 Features
REST API for talent management

MongoDB database

Add and view talents

Filter by skills

Input validation & error handling

🛠️ Tech Stack
Node.js + Express

MongoDB + Mongoose

CORS enabled

🗝️ Environment Variables

Create a .env file in the root of your backend folder and add the following:

MONGODB_URI=<your-mongodb-connection-string>
PORT=5000

🔧 Setup
bash
cd backend
npm install
npm run dev
Runs on http://localhost:5000

📊 API Endpoints
GET /api/talents - Get all talents

GET /api/talents?skill=React - Filter by skill

POST /api/talents - Add new talent
