import React from 'react';
import './index.css';
import { extractKeywords } from './utils/keywords';
import Hero from './components/Hero';
import LiveSection from './components/LiveSection';
import FavoritesFab from './components/FavoritesFab';
import LiveRadar from './components/LiveRadar';

function App() {
  const [sessions, setSessions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activeDay, setActiveDay] = React.useState('16th Feb');
  const [query, setQuery] = React.useState('');
  const [theme, setTheme] = React.useState('light');
  const [timeFilter, setTimeFilter] = React.useState('all');
  const [locationFilter, setLocationFilter] = React.useState('all');
  const [keywordFilter, setKeywordFilter] = React.useState('all');
  const [bookmarkedIds, setBookmarkedIds] = React.useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);

  // Mock current time for demonstration (Feb 16, 10:00 AM)
  const mockNow = React.useMemo(() => new Date('2026-02-16T10:00:00'), []);

  // Load theme from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Load bookmarks from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('bookmarkedSessions');
    if (saved) {
      setBookmarkedIds(new Set(JSON.parse(saved)));
    }
  }, []);

  // Load sessions data
  React.useEffect(() => {
    fetch('/data/sessions.json')
      .then(res => res.json())
      .then(data => {
        const parsed = data.map(s => ({
          ...s,
          start: s.time.match(/(\d{1,2}:\d{2}\s*[AP]M)/i)?.[1] || 'TBD',
          end: s.time.match(/-\s*(\d{1,2}:\d{2}\s*[AP]M)/i)?.[1] || s.time.match(/(\d{1,2}:\d{2}\s*[AP]M)/i)?.[1] || 'TBD',
          text: s.description || '',
          keywords: extractKeywords(s.description, s.title, s.speakers)
        }));
        setSessions(parsed);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading sessions:', err);
        setLoading(false);
      });
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Toggle bookmark
  const toggleBookmark = (sessionId) => {
    const newBookmarks = new Set(bookmarkedIds);
    if (newBookmarks.has(sessionId)) {
      newBookmarks.delete(sessionId);
    } else {
      newBookmarks.add(sessionId);
    }
    setBookmarkedIds(newBookmarks);
    localStorage.setItem('bookmarkedSessions', JSON.stringify([...newBookmarks]));
  };

  // Group sessions by date
  const sessionsByDay = React.useMemo(() => {
    const grouped = {};
    sessions.forEach(s => {
      const date = s.date;
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(s);
    });
    return grouped;
  }, [sessions]);

  // Get all dates sorted
  const allDates = React.useMemo(() => {
    return Object.keys(sessionsByDay).sort((a, b) => {
      const dayA = parseInt(a.match(/\d+/)?.[0] || '0');
      const dayB = parseInt(b.match(/\d+/)?.[0] || '0');
      return dayA - dayB;
    });
  }, [sessionsByDay]);

  // Filter by time of day
  const getTimeCategory = (timeStr) => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
    if (!match) return 'other';

    let hour = parseInt(match[1]);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'other';
  };

  // Get unique venues for filter
  const allVenues = React.useMemo(() => {
    const venues = new Set();
    sessions.forEach(s => {
      const venue = s.location.split(' - ')[0]; // Get main venue
      if (venue) venues.add(venue);
    });
    return Array.from(venues).sort();
  }, [sessions]);

  // Get unique keywords for filter
  const allKeywords = React.useMemo(() => {
    const keywords = new Set();
    sessions.forEach(s => {
      if (s.keywords) {
        s.keywords.forEach(k => keywords.add(k));
      }
    });
    return Array.from(keywords).sort();
  }, [sessions]);

  // Filter sessions for active day
  const visibleSessions = React.useMemo(() => {
    let daySessions = sessionsByDay[activeDay] || [];

    // Apply favorites filter
    if (showFavoritesOnly) {
      daySessions = daySessions.filter(s => bookmarkedIds.has(s.id));
    }

    // Apply time filter
    if (timeFilter !== 'all') {
      daySessions = daySessions.filter(s => getTimeCategory(s.start) === timeFilter);
    }

    // Apply location filter
    if (locationFilter !== 'all') {
      daySessions = daySessions.filter(s => s.location.startsWith(locationFilter));
    }

    // Apply keyword filter
    if (keywordFilter !== 'all') {
      daySessions = daySessions.filter(s =>
        s.keywords && s.keywords.includes(keywordFilter)
      );
    }

    // Apply search
    if (query.trim()) {
      const q = query.toLowerCase();
      daySessions = daySessions.filter(s =>
        (s.title + s.text + s.speakers.join(' ') + s.location + (s.keywords || []).join(' ')).toLowerCase().includes(q)
      );
    }

    return daySessions;
  }, [sessionsByDay, activeDay, query, timeFilter, locationFilter, keywordFilter]);

  // Group visible sessions by time slot
  const slotGroups = React.useMemo(() => {
    const grouped = {};
    visibleSessions.forEach(s => {
      const slot = `${s.start} – ${s.end}`;
      if (!grouped[slot]) grouped[slot] = [];
      grouped[slot].push(s);
    });

    return Object.entries(grouped).sort((a, b) => {
      const timeA = a[0].match(/(\d{1,2}):(\d{2})/);
      const timeB = b[0].match(/(\d{1,2}):(\d{2})/);
      if (!timeA || !timeB) return 0;
      const hourA = parseInt(timeA[1]) + (a[0].includes('PM') && timeA[1] !== '12' ? 12 : 0);
      const hourB = parseInt(timeB[1]) + (b[0].includes('PM') && timeB[1] !== '12' ? 12 : 0);
      return hourA !== hourB ? hourA - hourB : parseInt(timeA[2]) - parseInt(timeB[2]);
    });
  }, [visibleSessions]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-title">India AI Summit</div>
        <div className="loading-subtitle">Loading schedule...</div>
      </div>
    );
  }

  return (
    <div className="summit-page">
      <div style={{ position: 'fixed', top: 0, left: 0, background: 'red', color: 'white', zIndex: 9999, padding: '2px 5px', fontSize: '10px' }}>
        v1.2.0 - HERO+LIVE
      </div>
      <Hero sessions={sessions} />

      {!showFavoritesOnly && (
        <LiveSection
          sessions={sessions}
          currentTime={mockNow}
          onSessionClick={(session) => {
            // Optional: Toggle bookmark or scroll to session
            toggleBookmark(session.id);
          }}
        />
      )}

      <FavoritesFab
        isActive={showFavoritesOnly}
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      <header className="summit-header">
        <div className="header-left">
          <h1>India AI Summit 2026</h1>
          <nav className="day-tabs">
            {allDates.map(date => (
              <button
                key={date}
                className={`tab ${activeDay === date ? 'active' : ''}`}
                onClick={() => setActiveDay(date)}
              >
                {date}
                <span className="count"> ({sessionsByDay[date]?.length || 0})</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="header-right">
          <div className="filters">
            <select
              className="filter-select"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Times</option>
              <option value="morning">Morning (6AM-12PM)</option>
              <option value="afternoon">Afternoon (12PM-5PM)</option>
              <option value="evening">Evening (5PM-10PM)</option>
            </select>
            <select
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Venues</option>
              {allVenues.map(venue => (
                <option key={venue} value={venue}>{venue}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={keywordFilter}
              onChange={(e) => setKeywordFilter(e.target.value)}
            >
              <option value="all">All Topics</option>
              {allKeywords.map(keyword => (
                <option key={keyword} value={keyword}>{keyword}</option>
              ))}
            </select>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search sessions..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="search-input"
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')}>×</button>
            )}
          </div>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="schedule-content">
        {slotGroups.length === 0 ? (
          <div className="empty-state">
            <p>No sessions match your filters.</p>
          </div>
        ) : (
          slotGroups.map(([slot, slotSessions]) => (
            <section key={slot} className="time-slot">
              <h2 className="slot-time">{slot}</h2>
              <div className="session-grid">
                {slotSessions.map(session => (
                  <article
                    key={session.id}
                    className={`session-card ${bookmarkedIds.has(session.id) ? 'bookmarked' : ''}`}
                  >
                    <button
                      className={`bookmark-btn ${bookmarkedIds.has(session.id) ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(session.id)}
                      title={bookmarkedIds.has(session.id) ? 'Remove bookmark' : 'Bookmark session'}
                    >
                      {bookmarkedIds.has(session.id) ? '★' : '☆'}
                    </button>
                    <h3 className="session-title">{session.title}</h3>
                    <div className="session-meta">
                      <span className="session-location">📍 {session.location}</span>
                    </div>
                    {session.speakers.length > 0 && (
                      <div className="session-speakers">
                        <strong>Speakers:</strong> {session.speakers.slice(0, 2).join(', ')}
                        {session.speakers.length > 2 && ` +${session.speakers.length - 2} more`}
                      </div>
                    )}
                    {session.keywords && session.keywords.length > 0 && (
                      <div className="session-keywords">
                        {session.keywords.map(keyword => (
                          <span key={keyword} className="keyword-tag">{keyword}</span>
                        ))}
                      </div>
                    )}
                    <p className="session-description">{session.text.substring(0, 150)}...</p>
                    {session.knowledge_partners && (
                      <div className="session-partner">
                        <em>Partner: {session.knowledge_partners}</em>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
