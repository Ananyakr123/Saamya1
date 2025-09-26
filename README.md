
# 🌸 Saamya – AI-Powered Youth Mental Wellness Platform

Saamya is an **AI-powered mental-wellness platform** offering confidential, empathetic, and accessible support for youth.  
It reduces mental-health stigma through guidance, journaling, resources, and AI-driven companionship in a safe space.

---

## 🚀 Features
- 🤖 **AI Chatbot** – Empathetic conversations powered by Hugging Face  
- 📅 **Mood & Journal Tracker** – Daily logs for emotions, thoughts, and reflections  
- 📍 **Nearby Resources** – Connects users with local mental-health professionals & events  
- 👥 **Community Support** – Safe space for youth to share experiences  
- 🛡️ **Privacy First** – Secure data handling with Firebase + MongoDB  
- 💻 **Modern UI** – Built with React, Tailwind, and shadcn/ui  

---

## 🛠️ Tech Stack
**Frontend:** React + Vite, Tailwind CSS, shadcn/ui, React Router  
**Backend:** Firebase Authentication & APIs, MongoDB  
**AI:** Hugging Face Inference API  
**Deployment:** GitHub Pages (frontend), Firebase (backend services)

---

## 📂 Project Structure
Use a **plain-text tree** so GitHub preserves spacing:

Saamya ├─ public/                 # Static files (HTML, images, icons) │  └─ index.html           # Entry HTML file ├─ src/                    # Application source code │  ├─ components/          # Reusable UI components │  ├─ pages/               # Home, Dashboard, Journal, Chat, etc. │  ├─ firebase/            # Firebase configs & Hugging Face API integration │  ├─ App.jsx              # Main app component │  └─ main.jsx             # React entry point ├─ demo/                   # MongoDB setup │  └─ userdata             # User data collection ├─ package.json            # Dependencies & scripts └─ README.md               # Documentation

> Tip: The backticks around this block **must** start and end with three backticks and the word `none` or nothing after them (`````` or ```none```) to avoid GitHub applying unwanted syntax coloring.

---

## ⚙️ Installation & Setup
> **Requires:** Node.js and npm

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Ananyakr123/Saamya1.git
cd Saamya1

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start development server
npm run dev

# 4️⃣ Build for production
npm run build

# 5️⃣ Deploy to GitHub Pages (ensure "deploy" script exists)
npm run deploy


---

🔑 Environment Variables

Create a .env file in the project root:

VITE_HF_API_KEY=your_huggingface_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id


---

💡 Usage

Sign Up / Login – Authenticate via Firebase

Dashboard – Track mood, journal entries, and goals

AI Chatbot – Real-time empathetic conversations

Resources – Access local events and mental-wellness guidance



---

📊 Impact & Benefits

🌍 Reduces stigma around mental health

🧠 Provides safe, private mental-health support for youth

💬 Encourages open conversations about emotions

🔒 Ensures privacy with secure authentication

🤝 Connects users with real-world resources



---

👥 Contributors

Team Jeevan – Ideation, AI Integration, Research

Ananya Kumari – Frontend & Backend Engineer

Swasti Jain – AI Integrator

Stuti Jain – UI/UX Designer



---

📜 License

Licensed under the MIT License – free to use and modify.

### Key Fix
- The **tree diagram** is wrapped in a **triple-backtick block without a language hint** (` ``` ` or ` ```none `).  
  GitHub will then preserve all spaces and vertical bars so it stays perfectly aligned in dark mode and on mobile.


