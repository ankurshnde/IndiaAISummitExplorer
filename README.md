# India AI Summit 2026 - Schedule Viewer

A modern, feature-rich schedule viewer for the India AI Impact Summit 2026 featuring 581 sessions across 6 days (February 16-21, 2026).

## ✨ Features

### 🌓 Dark Mode
- Beautiful dark theme with seamless toggle
- Preference saved in localStorage
- Optimized for both light and dark viewing conditions

### 📱 Mobile Responsive
- Fully responsive design for all screen sizes
- Touch-optimized interface
- Scrollable day tabs on mobile
- Single-column layout for easy reading

### 🔍 Advanced Filters
- **Time-of-Day Filter**: Morning (6AM-12PM), Afternoon (12PM-5PM), Evening (5PM-10PM)
- **Venue Filter**: Bharat Mandapam, Sushma Swaraj Bhavan, Expo Area
- **Keyword Search**: Search across titles, descriptions, speakers, and locations
- All filters work together cumulatively

### ⭐ Session Bookmarking
- Bookmark your favorite sessions
- Saved to localStorage (persists across sessions)
- Works on both mobile and desktop
- Visual indicators for bookmarked sessions

### 📍 Detailed Location Information
Sessions display complete venue details:
- Main venue (Bharat Mandapam / Sushma Swaraj Bhavan)
- Room type (Auditorium / Meeting Room / Expo Area)
- Specific room numbers (West Wing Room No. 6, etc.)

### 🎨 Premium Design
- Poppins font for modern typography
- Clean, Apple-like UI aesthetic
- Smooth animations and transitions
- Organized by time slots

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ankurshnde/IndiaAISummitExplorer.git

# Navigate to project directory
cd IndiaAISummitExplorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📊 Data

- **Total Sessions**: 581
- **Days Covered**: 6 (16th Feb - 21st Feb 2026)
- **Main Venues**: 
  - Bharat Mandapam (multiple halls and rooms)
  - Sushma Swaraj Bhavan
  - Expo Areas

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **CSS Variables** - Theme management
- **localStorage** - Data persistence
- **Poppins Font** - Typography

## 📱 Usage

1. **Browse Sessions**: Select a date tab to view all sessions for that day
2. **Filter**: Use the time and venue dropdowns to narrow down sessions
3. **Search**: Type keywords to find specific topics, speakers, or locations
4. **Bookmark**: Click the ★ icon to save sessions to your schedule
5. **Dark Mode**: Toggle theme using the 🌙/☀️ button in the header

## 🎯 Key Benefits

- **Fast**: All data loaded upfront, instant filtering
- **Static**: No backend required, deploy anywhere
- **Offline-Ready**: Works after initial load
- **User-Friendly**: Intuitive interface for quick navigation
- **Accessible**: Mobile-responsive, touch-optimized

## 📂 Project Structure

```
summit-explorer/
├── public/
│   └── data/
│       └── sessions.json      # All session data
├── src/
│   ├── App.jsx               # Main application component
│   ├── index.css            # Styles with dark mode support
│   └── main.jsx             # Entry point
├── index.html               # HTML template
└── vite.config.js          # Vite configuration
```

## 🌐 Deployment

This is a static site and can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Enable Pages in repository settings
- **Any static hosting service**

## 📝 License

MIT License - feel free to use for your own events!

## 🙏 Acknowledgments

Built for the India AI Impact Summit 2026 - Empowering innovation and collaboration in AI.

---

**Live Demo**: [Coming Soon]

**Questions?** Open an issue on GitHub!
