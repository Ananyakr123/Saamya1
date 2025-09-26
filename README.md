# 🌸 Saamya – AI-Powered Youth Mental Wellness Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face">
</div>

<br>

Saamya is an AI-powered mental-wellness platform that offers confidential, empathetic, and accessible support for youth. It reduces mental-health stigma by providing guidance, journaling, resources, and AI-driven companionship in a safe space.

---

## 🚀 Features

🤖 **AI Chatbot** – Empathetic conversations powered by Hugging Face.

📅 **Mood & Journal Tracker** – Daily logs for emotions, thoughts, and reflections.

📍 **Nearby Resources** – Connects users with local mental-health professionals & events.

👥 **Community Support** – Safe space for youth to share experiences.

🛡️ **Privacy First** – Secure data handling with Firebase Authentication and MongoDB.

💻 **Modern UI** – Built with React, Tailwind CSS, and shadcn/ui for a clean, responsive experience.

---

## 🛠️ Tech Stack

| Category        | Technology                                                                          |
| --------------- | ----------------------------------------------------------------------------------- |
| **Frontend** | `React` `Vite` `Tailwind CSS` `shadcn/ui` `React Router`                              |
| **Backend** | `Firebase Authentication & APIs` `MongoDB` for user data (journals, mood tracking)  |
| **AI** | `Hugging Face Inference API`                                                        |
| **Deployment** | `GitHub Pages` (frontend) `Firebase` (backend services)                             |

---

## 📂 Project Structure


Saamya/
│
├── public/                # Static files (HTML, images, icons)
│   └── index.html         # Entry HTML file
│
├── src/                   # Application source code
│   ├── components/        # Reusable UI components
│   ├── pages/             # Pages (Home, Dashboard, Journal, Chat, etc.)
│   ├── firebase/          # Firebase configs & Hugging Face API integration
│   ├── App.jsx            # Main app component
│   └── main.jsx           # React entry point
│
├── demo/                  # MongoDB setup
│   └── userdata           # User data collection
│
├── package.json           # Dependencies & scripts
└── README.md              # Documentation

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

> **Prerequisite**: Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your machine.

**1️⃣ Clone the repository**
```bash
git clone [https://github.com/Ananyakr123/Saamya1.git](https://github.com/Ananyakr123/Saamya1.git)
cd Saamya1

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm run dev

The application will be available at http://localhost:5173.
4️⃣ Build for production
npm run build

This command bundles the app into static files for production in the dist folder.
5️⃣ Deploy to GitHub Pages
This requires a "deploy" script in your package.json (e.g., using the gh-pages package).
npm run deploy

🔑 Environment Variables
To run this project, you will need to add the following environment variables to a .env file in the project's root directory:
# Hugging Face API Key
VITE_HF_API_KEY=your_huggingface_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

💡 Usage
 * Sign up / Login: Users authenticate securely via Firebase to access their personal space.
 * Dashboard: Get an overview of your mental wellness journey. Track your mood, view recent journal entries, and set personal goals.
 * AI Chatbot: Engage in real-time, empathetic conversations with our AI companion for immediate support.
 * Resources: Find and access local mental wellness events, workshops, and professional guidance.
📊 Impact & Benefits
🌍 Reduces Stigma: Creates a judgment-free zone, making it easier for youth to seek help.
🧠 Accessible Support: Provides safe, private, and instant mental-health support anytime, anywhere.
💬 Encourages Self-Reflection: Promotes open conversations about emotions through journaling and AI chats.
🔒 Ensures Privacy: Guarantees user data is safe with secure authentication and database management.
🤝 Connects with Community: Bridges the gap between digital support and real-world resources.
👥 Contributors
This project is a collaborative effort by:
 * Team Jeevan – Ideation, AI Integration, Research
 * Ananya Kumari – Frontend & Backend Engineer
 * Swasti Jain – AI Integrator
 * Stuti Jain – UI/UX Designer
📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute it.
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


