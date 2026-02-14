import React from 'react';

const Hero = ({ sessions }) => {
    // Calculate stats
    const stats = React.useMemo(() => {
        const uniqueSpeakers = new Set();
        sessions.forEach(s => {
            if (s.speakers) s.speakers.forEach(sp => uniqueSpeakers.add(sp));
        });

        const uniqueVenues = new Set();
        sessions.forEach(s => {
            const v = s.location.split(' - ')[0];
            if (v) uniqueVenues.add(v);
        });

        const uniqueTopics = new Set();
        sessions.forEach(s => {
            if (s.keywords) s.keywords.forEach(k => uniqueTopics.add(k));
        });

        return {
            sessions: sessions.length,
            speakers: uniqueSpeakers.size,
            venues: uniqueVenues.size,
            topics: uniqueTopics.size
        };
    }, [sessions]);

    return (
        <div className="hero-section">
            <div className="hero-content">
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.85rem', borderLeft: '4px solid #ff3b30', textAlign: 'left' }}>
                    <strong>Note:</strong> This is an independent community project (v1.3.2). For official sessions and real-time updates from the Government of India, please visit <a href="https://impact.indiaai.gov.in/sessions" target="_blank" rel="noopener noreferrer" style={{ color: '#ff3b30', fontWeight: 'bold', textDecoration: 'underline' }}>impact.indiaai.gov.in/sessions</a>.
                </div>
                <h2 className="hero-title">Impact Summit Sessions at Various Locations</h2>
                <div className="hero-subtitle">AI IMPACT SUMMIT 2026</div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-value">{stats.sessions}</div>
                        <div className="stat-label">Total Sessions</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{stats.speakers}+</div>
                        <div className="stat-label">Speakers</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{stats.venues}</div>
                        <div className="stat-label">Venues</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{stats.topics}+</div>
                        <div className="stat-label">Topics</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
