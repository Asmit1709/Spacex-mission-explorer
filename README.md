# 🚀 SpaceX Mission Explorer

A minimalist React app to explore SpaceX missions via the public SpaceX v4 API.
Built with a dark theme inspired by SpaceX and X (Twitter), focusing on clean UI, responsiveness, and accessibility.

---

## ✨ Features

* **Mission Explorer**: Browse SpaceX launches — see mission name, year, and status
* **Search & Filters**:

  * Text search by mission name
  * Filter by launch year
  * Toggle to show only successful missions
* **Detail View**:

  * Mission patch image
  * Description and launch details
  * External links (Wikipedia, webcast, etc.)
* **Favorites**:

  * Mark missions as ⭐ favorites
  * Persist favorites locally (via `localStorage`)
* **State Handling**:

  * Loading indicator
  * Error message on failure
  * Empty state when no matches
* **Responsive & Accessible**:

  * Works across devices (mobile / tablet / desktop)
  * Modal with keyboard navigation, ARIA labels

---

## 🛠️ Tech Stack

* React
* Axios (for API calls)
* React Router
* TailwindCSS (for minimalist dark theme)
* LocalStorage (persisting favorites)
* Deployment platforms: Vercel / Netlify / GitHub Pages

---

## 📁 Project Structure

```
src/
 ├── components/        # Reusable UI components: Card, Modal, Header, Filters
 ├── pages/             # Page-level components: Home, Favorites, Details
 ├── hooks/             # Custom hooks for fetch, state logic
 ├── context/           # Context API for global state (launches, favorites)
 ├── utils/             # Utility functions/helpers
 ├── App.js             # Root component & routing setup
 └── index.js           # Entry point
```

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/Asmit1709/Spacex-mission-explorer.git
cd Spacex-mission-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm start
```

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

---

## 🌐 Deployment & Demo

This app can be deployed to Vercel, Netlify, or GitHub Pages.
**Live Demo**: *([Add your deployment link here once available](https://spacexmissionexplorer.netlify.app/))*

---

## 📖 API Reference

* **Base URL**: `https://api.spacexdata.com/v4/launches`
* Fields used:

  * `name` (mission name)
  * `date_utc` (launch date/year)
  * `success` (boolean)
  * `details` (mission description)
  * `links.patch.small` (mission patch image)
  * `links.webcast`, `links.wikipedia` (external references)

---

## 🎯 Design & Implementation Choices

* **TailwindCSS** to speed up styling and maintain a consistent dark theme
* **LocalStorage** over a backend to keep things lightweight
* **Axios** for cleaner HTTP request handling
* Emphasis on **minimal UI** to match aesthetics of SpaceX/X

---

## ✅ Assignment Completion Checklist

* [x] React app consuming the SpaceX v4 API
* [x] List + search + launch year filter + “successful only” toggle
* [x] Detail view with patch, mission data, and links
* [x] Favorites feature (persistent)
* [x] Loading, error, and empty states
* [x] Responsive & accessible design
* [x] Public GitHub repo
* [ ] Live demo link *(to be added)*
* [x] README with setup instructions and project details

---

## 📬 Submission Instructions

When you're done, send a fresh email with the subject line:
**`React assignment completed`**

---

*Built by Asmit — powered by React & TailwindCSS — for the Atmosly React internship assignment.*
