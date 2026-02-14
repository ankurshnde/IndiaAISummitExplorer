# India AI Summit Explorer 🇮🇳

An elegant, Apple-like web app for exploring 500+ sessions from the India AI Impact Summit 2026. Built with minimal dependencies for fast, clean interactions.

![Session Map](docs/hero.png)

## ✨ Features

- **Interactive Session Map**: Explore sessions visualized as an interactive 2D map with natural clustering
- **Semantic Search**: Find relevant sessions instantly using natural language queries
- **Similar Sessions**: Discover related sessions based on AI-powered similarity
- **Apple-like Design**: Clean, minimal interface with smooth animations and glassmorphism
- **Zero Backend**: Fully static deployment ready for GitHub Pages or Vercel

## 🎨 Design Philosophy

- **Extreme simplicity** with white backgrounds and high typography hierarchy
- **Lots of spacing** for breathing room
- **Subtle motion** with 200-300ms transitions
- **No clutter** - just clean, focused content
- **Inter font** for modern, readable typography

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (for frontend)
- Python 3.8+ (for data pipeline, optional)

### Run Locally

```bash
cd summit-explorer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📊 Data Pipeline

The data pipeline parses session `.txt` files and generates embeddings with precomputed 2D coordinates.

### Generate Full Dataset

```bash
cd summit-explorer/..
pip install -r requirements.txt
python build_embeddings.py
```

This will:
1. Parse all `.txt` files in the directory
2. Generate embeddings using `sentence-transformers`
3. Compute UMAP 2D coordinates
4. Calculate cosine similarity for "similar sessions"
5. Export `summit-explorer/public/data/sessions.json`

**Note**: The repository includes a sample dataset with 21 sessions for immediate testing.

## 🗂️ Project Structure

```
.
├── build_embeddings.py       # Data pipeline script
├── requirements.txt           # Python dependencies
├── *.txt                      # Session data files
└── summit-explorer/
    ├── public/
    │   └── data/
    │       └── sessions.json  # Precomputed session data
    ├── src/
    │   ├── components/
    │   │   ├── CanvasMap.jsx           # Interactive session map
    │   │   ├── FloatingSearchBar.jsx   # Search interface
    │   │   ├── SidePanel.jsx           # Session details panel
    │   │   └── SessionCard.jsx         # Session card component
    │   ├── App.jsx            # Main application
    │   └── index.css          # Design system & tokens
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🎯 How It Works

### 1. Session Visualization

Sessions are displayed as dots on a canvas, positioned using UMAP-reduced 2D coordinates from their embeddings. Natural clustering emerges based on semantic similarity.

### 2. Interactions

- **Hover**: See session title tooltip
- **Click**: Open detailed side panel
- **Drag**: Pan around the map
- **Scroll**: Zoom in/out
- **Search**: Filter sessions by keywords

### 3. Similar Sessions

Each session includes  precomputed similarity scores using cosine similarity on embeddings. The top 5 most similar sessions are displayed in the side panel.

## 🏗️ Building for Production

```bash
npm run build
```

The `dist/` folder will contain the static build ready for deployment.

### Deploy to GitHub Pages

```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

### Deploy to Vercel

```bash
vercel --prod
```

## 📝 Adding New Summit Data

1. Add new `.txt` files to the root directory
2. Run `python build_embeddings.py`
3. Rebuild frontend: `npm run build`

## 🎨 Design Tokens

```css
--bg-primary: #FFFFFF
--text-primary: #1D1D1F
--accent: #007AFF
--radius-xl: 24px
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08)
--font-family: 'Inter', -apple-system, system-ui
```

## 🔧 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS with design tokens
- **Visualization**: HTML5 Canvas
- **Data Pipeline**: Python + sentence-transformers + UMAP

## 📦 Bundle Size

Target: < 300KB (gzipped)

Current optimizations:
- No heavy UI libraries
- Canvas-based rendering
- Minimal dependencies
- Code splitting

## 🤝 Contributing

This is a minimal MVP. Potential enhancements:
- Dark mode toggle
- "Surprise me" random session button
- Export selected sessions
- Cluster labels
- Advanced filtering

## 📄 License

MIT

## 🙏 Acknowledgments

Built for the India AI Impact Summit 2026 - exploring the intersection of AI, policy, education, healthcare, agriculture, and economic growth.

---

**Note**: This application demonstrates how complex datasets can be made accessible through thoughtful design and AI-powered features. The focus is on discovery and exploration rather than overwhelming users with information.
