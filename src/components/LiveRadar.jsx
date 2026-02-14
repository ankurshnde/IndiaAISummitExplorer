import React, { useState, useEffect } from 'react';

const LiveRadar = ({ sessions, mockNow, onShowSession }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [pulse, setPulse] = useState(0);

    // Filter logic mirroring standalone
    const getLiveSessions = () => {
        return sessions.filter(s => {
            const sessionStart = new Date(`${s.date} ${s.start}`.replace(/(st|nd|rd|th)/, ''));
            const sessionEnd = new Date(`${s.date} ${s.end}`.replace(/(st|nd|rd|th)/, ''));
            return mockNow >= sessionStart && mockNow <= sessionEnd;
        });
    };

    const getUpcomingSessions = () => {
        return sessions.filter(s => {
            const sessionStart = new Date(`${s.date} ${s.start}`.replace(/(st|nd|rd|th)/, ''));
            return sessionStart > mockNow && sessionStart <= new Date(mockNow.getTime() + 15 * 60000);
        });
    };

    const liveSessions = getLiveSessions();
    const upcomingSessions = getUpcomingSessions();

    return (
        <div className={`live-radar ${isExpanded ? 'active' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
            <div className="radar-collapsed">
                <div className="radar-indicator">
                    <div className="radar-pulse"></div>
                    {liveSessions.length} sessions live now
                </div>
                <div className="radar-hint">
                    Tap to expand Radar
                </div>
            </div>

            {isExpanded && (
                <div className="radar-expanded" onClick={(e) => e.stopPropagation()}>
                    <div className="radar-section">
                        <div className="radar-section-title">🔴 Happening Now</div>
                        <div className="radar-grid">
                            {liveSessions.length > 0 ? liveSessions.map(s => (
                                <div key={s.id} className="radar-card">
                                    <h4>{s.title}</h4>
                                    <div className="meta">
                                        <span>📍 {s.location}</span>
                                        <span>🕙 Ends {s.end}</span>
                                    </div>
                                    <button className="take-me" onClick={() => onShowSession(s.id)}>Take me there</button>
                                </div>
                            )) : <div className="radar-empty">No sessions running right now</div>}
                        </div>
                    </div>

                    <div className="radar-section">
                        <div className="radar-section-title">⏭ Up Next (15 min)</div>
                        <div className="radar-grid">
                            {upcomingSessions.length > 0 ? upcomingSessions.map(s => (
                                <div key={s.id} className="radar-card" style={{ borderBottomColor: '#8e8e93' }}>
                                    <h4>{s.title}</h4>
                                    <div className="meta">
                                        <span>📍 {s.location}</span>
                                        <span>🕒 Starts at {s.start}</span>
                                    </div>
                                    <button className="take-me" onClick={() => onShowSession(s.id)}>Take me there</button>
                                </div>
                            )) : <div className="radar-empty">Nothing starting soon</div>}
                        </div>
                    </div>

                    <div className="radar-footer">
                        <button className="radar-close-btn" onClick={() => setIsExpanded(false)}>Close Radar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveRadar;
