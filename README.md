🩺 Healthcare Appointment System
A modern, full-stack web application designed to streamline healthcare appointment management, connecting patients, doctors, and administrators seamlessly. With an intuitive interface and robust features, it ensures efficient interactions for all user roles.

🔑 Default Credentials

Note: Use these credentials to log in to the respective roles for testing purposes.


AdminEmail: mdarfinji45@gmail.comPassword: 23fefege

DoctorEmail: mji45@gmail.comPassword: 12345678

PatientEmail: md45@gmail.comPassword: 123456789



📋 Table of Contents

Features
Patient Features
Doctor Features
Admin Features


Tech Stack
Installation
Usage
Environment Variables
Contributing
License


🌟 Features
🧑‍⚕️ Patient Features

Filter Doctors: 🔍 Search and filter doctors by specialty.
View Profiles: 📄 Explore detailed doctor profiles with qualifications and availability.
Book Appointments: 📅 Schedule appointments effortlessly.
Manage Profile: ✏️ Update personal details and account settings.
Patient Dashboard: 📊 Track and cancel appointments with automatic notifications sent to doctors.

👨‍⚕️ Doctor Features

Earnings Tracking: 💰 Monitor earnings from appointments.
Appointment Management: 🕒 View and manage scheduled appointments.
Status Updates: ✅ Update availability to inform patients.
Profile Customization: 🖼️ Edit specialties, availability, and consultation fees.

🛠️ Admin Features

Doctor Management: ➕ Add new doctors and manage existing profiles.
Appointment Oversight: 📈 Access detailed appointment information, including booking status and payments.
System Control: 🎛️ Oversee all platform activities for smooth operation.


🛠 Tech Stack

Frontend: 
⚛️ React
🎨 Tailwind CSS
🎥 Framer Motion


Backend: 
🟢 Node.js
🚀 Express.js


Database: 
🍃 MongoDB


File Storage: 
☁️ Cloudinary (for profile images and media)


File Uploads: 
📤 Multer


Authentication: 🔒 JWT-based authentication


🚀 Installation

Clone the Repository:
git clone https://github.com/your-username/healthcare-appointment-system.git
cd healthcare-appointment-system


Install Dependencies:

Backend:cd server
npm install


Frontend:cd client
npm install




Set Up Environment Variables:Create a .env file in the server directory with the following:
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
PORT=5000


Run the Application:

Start the backend:cd server
npm start


Start the frontend:cd client
npm start



