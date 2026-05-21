# 🎬 Movie Explorer App

A modern, responsive movie search application powered by the [OMDb API](https://www.omdbapi.com/). Search millions of movies and series instantly with a clean, cinematic UI.

## 📸 Preview

> Open `index.html` in your browser after setting up your API key.

## ✨ Features

- 🔍 Search movies and TV series by title
- 🎴 Displays poster, title, year, and type (Movie / Series / Game)
- ⚡ Skeleton loading animation while results fetch
- 🖼️ Custom SVG fallback for missing posters
- ⌨️ Press **Enter** to search — no need to click the button
- 📭 Empty state on first load with a helpful prompt
- ⚠️ Error handling for empty input, no results, and network failures
- 📱 Fully responsive — works on mobile and desktop

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure |
| CSS3 | Styling, grid layout, animations |
| JavaScript (ES6+) | API calls, DOM manipulation |
| OMDb API | Movie data source |

## 🚀 Getting Started

### 1. Get a free API key
Go to [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) and sign up for a free key. It will be emailed to you instantly.

### 2. Add your key to the project
Open `script.js` and replace the placeholder on line 8:

```js
// Before
const API_KEY = "YOUR_OMDB_API_KEY";

// After (example)
const API_KEY = "a1b2c3d4";
```

### 3. Open the app
```bash
git clone https://github.com/regis-chifambaa/movie-explorer.git
cd movie-explorer
open index.html
```

No installs, no build tools — just open and go.

## 📁 Project Structure

```
movie-app/
├── index.html   # App layout and structure
├── style.css    # All styling, grid, and animations
├── script.js    # API logic and DOM rendering
└── README.md    # Project documentation
```

## 🔑 API Notes

- This app uses the **OMDb API** (Open Movie Database)
- The free tier allows **1,000 requests per day**
- Search returns up to **10 results per query**
- API docs: [https://www.omdbapi.com/](https://www.omdbapi.com/)

## 👨‍💻 Author

**Regis Tanaka Chifamba**  
[GitHub Profile](https://github.com/regis-chifambaa)
