# 🌸 Saamya – AI-Powered Youth Mental Wellness Platform

Saamya is an **AI-powered mental-wellness platform** that offers confidential, empathetic, and accessible support for youth.  
It reduces mental-health stigma by providing guidance, journaling, resources, and AI-driven companionship in a safe space.

## 🚀 Features
- 🤖 **AI Chatbot** – Empathetic conversations powered by Hugging Face  
- 📅 **Mood & Journal Tracker** – Daily logs for emotions, thoughts, and reflections  
- 📍 **Nearby Resources** – Connects users with local mental-health professionals & events  
- 👥 **Community Support** – Safe space for youth to share experiences  
- 🛡️ **Privacy First** – Secure data handling with Firebase + MongoDB  
- 💻 **Modern UI** – Built with React, Tailwind, and shadcn/ui

## 🛠️ Tech Stack
**Frontend**
- React + Vite  
- Tailwind CSS  
- shadcn/ui  
- React Router  

**Backend**
- Firebase Authentication & APIs  
- MongoDB for user data (courses, journals, mood tracking, etc.)  

**AI**
- Hugging Face Inference API  

**Deployment**
- GitHub Pages (frontend)  
- Firebase (backend services)

## 📂 Project Structure

```text
Saamya/
├── public/               # Static files (HTML, images, icons)
│   └── index.html        # Entry HTML file
├── src/                  # Application source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Pages (Home, Dashboard, Journal, Chat, etc.)
│   ├── firebase/         # Firebase configs & Hugging Face API integration
│   ├── App.jsx           # Main app component
│   └── main.jsx          # React entry point
├── demo/                 # MongoDB setup
│   └── userdata          # User data collection
├── package.json          # Dependencies & scripts
└── README.md             # Documentation
## ⚙️ Installation & Setup
> **Prerequisite:** Node.js and npm installed

git clone https://github.com/Ananyakr123/Saamya1.git
cd Saamya1

npm install

npm run dev

npm run build

npm run deploy  # requires "deploy" script in package.json

