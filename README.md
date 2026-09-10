# 🇰🇷 Korean Learning App (MVP)

A gamified web application for learning Korean across **Beginner**, **Intermediate**, and **Advanced** levels, featuring Vocabulary Matching, Grammar Fill-in-the-Blank challenges, and authentic Korean Folk Fable reading comprehension with persistent score tracking.

---

## 🚀 Quick Start: How to Run the App

Because this app uses modern JavaScript ES Modules (`import`/`export`), it must be served over a local HTTP server rather than opened directly as a raw `file://` path.

### Step 1: Start the Local Server

Open your terminal, navigate to the project directory, and run:

```bash
python3 -m http.server 8000
```

> **Note for macOS:** `python3` comes pre-installed on macOS by default.

#### Alternative Server Commands (Optional)

If you prefer using Node.js or editor extensions:
- **Node `serve`:** `npx serve .`
- **Node `http-server`:** `npx http-server -p 8000`
- **VS Code:** Install the *Live Server* extension, right-click `index.html`, and choose **"Open with Live Server"**.

---

### Step 2: Open the App in Your Browser

Once the server is running, open your web browser and navigate to:

👉 **[http://localhost:8000](http://localhost:8000)**  
*(or [http://127.0.0.1:8000](http://127.0.0.1:8000))*

---

### Step 3: Stop the Server

When you are done practicing, go back to your terminal window and press:

```text
Ctrl + C
```

---

## 🔑 Login & Demo Account

The app supports user authentication and persistent progress stored locally in your browser (`localStorage`).

- **⚡ 1-Click Demo Login:** Click the **"⚡ Quick Demo Learner"** button on the home screen to log in immediately without typing credentials.
- **Demo Account Details:**
  - **Email:** `learner@koreanapp.io`
  - **Password:** `learnkorean123`
- **Custom Account:** You can also register any email and password (minimum 6 characters) using the **"Sign In / Register"** button.

---

## 🎮 Features & Practice Modes

| Mode | Description | Scoring |
|---|---|---|
| 🃏 **Vocabulary Match** | Match Korean words with their English meanings in timed rounds. | Base points + Speed Bonus per match |
| ✍️ **Grammar Fill-in** | Type missing Korean particles and verb endings into example sentences (exact match). | Base points + Speed Bonus |
| 📖 **Korean Fables** | Read classic Korean folktales (with inline vocab help) and answer multiple-choice questions. | Base points per correct answer |
| 🏆 **Score Tracker** | Personal high scores saved automatically per game mode and proficiency level. | Persistent across sessions |

---

## 📁 Project Structure

```text
korean learning app/
├── index.html           # Main single-page application entry point
├── README.md            # App startup and usage documentation
├── srs.md               # Software Requirements Specification (MVP)
├── css/
│   └── main.css         # Modern dark-mode UI stylesheet
└── js/
    ├── app.js           # Main UI controller & state management
    ├── data/            # Leveled content pools (Vocab, Grammar, Fables)
    │   ├── fables-data.js
    │   ├── grammar-data.js
    │   └── vocab-data.js
    ├── games/           # Game mode logic & timer engines
    │   ├── vocab-game.js
    │   ├── grammar-game.js
    │   └── reading-game.js
    └── services/        # Supporting services (Auth, Storage, Audio/Score)
        ├── auth-service.js
        ├── db-service.js
        └── score-engine.js
```
