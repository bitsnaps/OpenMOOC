# TalentCampus (MOOC) 🎓

A modern, lightweight MOOC (Massive Open Online Course) platform built for demonstration purposes. This project features a RESTful API backend using **FastAPI** and a responsive, component-driven frontend using **Vue 3** and **Tailwind CSS v4**.

## 🚀 Features

-   **Authentication**: Secure User Registration & Login (JWT w/ OAuth2).
-   **Course Management**: Create and list courses.
-   **State Management**: Centralized auth state using Pinia.
-   **Modern UI**: Glassmorphism header, responsive grid layouts, and clean typography using Tailwind CSS v4.
-   **Testing**: Unit tests for both backend (Pytest) and frontend (Vitest/Vue Test Utils).

## 🛠 Tech Stack

### Backend
-   **Language**: Python 3.9+
-   **Framework**: FastAPI
-   **Database**: SQLite (Local file `mooc.db`)
-   **ORM**: SQLAlchemy
-   **Auth**: Passlib (Bcrypt) + Python-Jose

### Frontend
-   **Framework**: Vue 3 (Composition API)
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS v4 (via Vite Plugin)
-   **State**: Pinia
-   **Routing**: Vue Router
-   **HTTP Client**: Axios
-   **Testing**: Vitest + JSDOM

---

## 📂 Project Structure

```text
.
├── main.py                 # Complete Backend (API, Models, Auth)
├── test_backend.py         # Backend integration tests
├── requirements.txt        # Python dependencies (optional creation)
└── frontend/               # Vue 3 Frontend
    ├── index.html
    ├── vite.config.js      # Configured with @tailwindcss/vite
    ├── package.json
    ├── src/
    │   ├── main.js
    │   ├── App.vue         # Layout (Navbar/Footer)
    │   ├── style.css       # Tailwind v4 imports & @theme
    │   ├── router/
    │   ├── stores/         # Pinia Auth Store
    │   └── views/          # Page Components (Login, Courses)
    └── tests/              # Frontend Unit Tests
        └── Login.spec.js
```

## Setup:

```bash
# dependencies
pnpm create vite frontend --template vue
cd frontend
pnpm install axios vue-router pinia

# dev dependencies
pnpm add -D tailwindcss @tailwindcss/vite

# for testing
pnpm add -D vitest @vue/test-utils jsdom @pinia/testing
```
Then setup `src/style.css` for styling with TailwindCSS.

### Run

Backend:
```bash
python main.py
```

Frontend:
```bash
pnpm dev
```

### Test

#### Backend API testing:
```bash
python -m unittest test_backend.py
```
#### Frontend testing:
The you can the following command:
```bash
pnpm test
```
It uses the `vitest test tests/*` from the `package.json` file.
