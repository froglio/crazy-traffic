# Crazy Traffic - v0.1.0

A modern, interactive 3D traffic control game built with React and Three.js.

## 🚦 Project Overview

**Crazy Traffic** is a browser-based game where you take on the role of a traffic controller. Your mission: manage traffic lights at increasingly complex intersections, prevent collisions, and keep the flow of cars moving. Each phase introduces new challenges, requiring quick thinking and strategic timing.

<img width="1505" alt="image" src="https://github.com/user-attachments/assets/03de0096-653a-4952-88f7-e74b4d727037" />

[🎬 Assistir ao Trailer](https://imgur.com/a/5JJtynh)
---

## 🎯 Objective

- **Manage Flow:** Ensure the target number of cars safely pass in each phase.
- **Prevent Collisions:** Switch traffic lights to avoid car crashes at intersections.
- **Progress:** Complete all phases, each with unique layouts and increasing difficulty.

---

## 🕹️ Gameplay & Features

- **3D Graphics:** Immersive intersections rendered with Three.js.
- **Interactive Traffic Lights:** Click on traffic lights to change their state (red/green) and control the flow.
- **Multiple Phases:**
  - _Phase 1 – Simple Crossover:_ Learn the basics of traffic control.
  - _Phase 2 – Two Intersections:_ Manage two intersections simultaneously.
  - _Phase 3 – Heavy Traffic:_ Handle a high volume of cars with little time to think.
- **Car Behavior:** Cars become impatient if stopped too long, honking their horns and crossing the red light.
<img width="108" alt="image" src="https://github.com/user-attachments/assets/b3f04790-d95e-49f0-b402-91eb4b994c02" />
- **Sound Effects:** Realistic audio feedback for clicks, crashes, horns, and victories.
- **HUD:** Real-time stats, progress bar, phase info, and game controls.
- **Progress Save:** Your progress is automatically saved in your browser.

---

## 🧑‍💻 Technologies Used

- **React 19** – UI and state management
- **Three.js** – 3D rendering
- **@react-three/fiber** – React renderer for Three.js
- **@react-three/drei** – Useful helpers for Three.js
- **use-sound** – Audio hooks for React
- **Vite** – Fast development and build tool
- **ESLint** – Code linting

---

## 📁 Project Structure

```
crazy-traffic/
├── public/                # Static assets (sounds, favicon)
├── src/
│   ├── components/        # Game components (Car, TrafficLight, HUD, etc.)
│   ├── contexts/          # React contexts for state management
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions (phases, paths)
│   ├── App.jsx            # Main app entry
│   └── main.jsx           # React root
├── index.html             # HTML entry point
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
```

---

## 🚀 Installation & Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Clone the repository

```bash
git clone <repository-url>
cd crazy-traffic
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

- Open your browser and go to [http://localhost:5173](http://localhost:5173) to play.

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, new features, or improvements.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and open a Pull Request

---

## 🙏 Credits

- Developed by [Fabricio Roglio de Sousa]
- Built with [React](https://react.dev/) and [Three.js](https://threejs.org/)
- Sound effects AI generated from [elevenlabs.ios](https://elevenlabs.io/)
