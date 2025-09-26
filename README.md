
# 🌸 Saamya – AI-Powered Youth Mental Wellness Platform

Saamya is an **AI-powered mental wellness platform** designed to provide confidential, empathetic, and accessible support for youth. The project aims to reduce the stigma around mental health by offering guidance, journaling, resources, and AI-driven companionship in a safe space.  

---

## 🚀 Features

- 🤖 **AI Chatbot** – Powered by Hugging Face model for empathetic conversations  
- 📅 **Mood & Journal Tracker** – Daily logs for emotions, thoughts, and reflections  
- 📍 **Nearby Resources** – Connects users with local mental health professionals & events  
- 👥 **Community Support** – Safe space for youth to share experiences  
- 🛡️ **Privacy First** – Secure data handling with Firebase + MongoDB  
- 💻 **Modern UI** – Built using React, Tailwind, and shadcn/ui  

---

## 🛠️ Tech Stack

**Frontend:**  
- React + Vite  
- Tailwind CSS  
- shadcn/ui (UI Components)  
- React Router  

**Backend:**  
- Firebase Authentication & API integration  
- MongoDB for storing user data (courses, journals, mood tracking, etc.)  

**AI Integration:**  
- Hugging Face Inference API for chatbot functionality  

**Deployment:**  
- GitHub Pages (Frontend)  
- Firebase (Backend services)  

---

## 📂 Project Structure

```

Saamya/
│── public/                # Static files (HTML, images, icons, etc.)
│   ├── index.html          # Entry HTML file
│
│── src/                   # Application source code
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application pages (Home, Dashboard, Journal, Chat, etc.)
│   ├── firebase/          # Firebase configs & Hugging Face API integration
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│
│── demo/                  # MongoDB setup
│   └── userdata           # User data collection
│
│── package.json           # Dependencies & scripts
│── README.md              # Documentation


```
---


## ⚙️ Installation & Setup
```
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Ananyakr123/Saamya1.git
   cd Saamya1
  ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run on Localhost**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Deploy on GitHub Pages**

   ```bash
   npm run deploy
   ```

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_HF_API_KEY=your_huggingface_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## 💡 Usage

* **Sign up / Login** – Users authenticate via Firebase
* **Dashboard** – Add and track mood, journal entries, and personal goals
* **AI Chatbot** – Get real-time, empathetic conversations
* **Resources** – Access local events and mental wellness guidance

---

## 📊 Impact & Benefits

* 🌍 Reduces stigma around mental health
* 🧠 Provides safe, private mental health support for youth
* 💬 Encourages open conversations about emotions
* 🔒 Ensures privacy with secure authentication
* 🤝 Connects users with real-world resources

---

## 👩‍💻 Contributors

## 👥 Team Jeevan

- **Team Jeevan** – Ideation, AI Integration, Research  
- **Ananya Kumari** – Frontend & Backend Engineer    
- **Swasti Jain** – AI Integrator  
- **Stuti Jain**- UI/UX designer 
---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify.

```
```
