# TickTalk
TickTalk
TickTalk is a real-time chat application built using the MERN stack. It leverages TailwindCSS for styling, Recoil for state management, and Websockets for real-time communication. This application aims to provide a seamless and efficient chatting experience.

Features
Real-time messaging with Websockets
Modern UI with TailwindCSS
State management with Recoil
Built using the MERN (MongoDB, Express.js, React.js, Node.js) stack
Developed with TypeScript
React part implemented using Vite
Technologies Used
Frontend: React.js (Vite), TailwindCSS, Recoil, TypeScript
Backend: Node.js, Express.js
Database: MongoDB
Real-time Communication: Websockets
Installation and Setup
To run this project locally, follow these steps:

Prerequisites
Node.js and npm installed on your machine
MongoDB installed and running on your machine or a MongoDB Atlas account
Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/ticktalk.git
cd ticktalk
Install Dependencies
Backend
bash
Copy code
cd backend
npm install
Frontend
bash
Copy code
cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory and add the following:

plaintext
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
Running the Application
Backend
Start the backend server:

bash
Copy code
cd backend
npm start
Frontend
Start the frontend development server:

bash
Copy code
cd ../frontend
npm run dev
Accessing the Application
Open your browser and go to http://localhost:3000 to start using TickTalk.
