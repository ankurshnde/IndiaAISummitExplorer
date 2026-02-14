import React from 'react';

const LiveSection = ({ sessions, currentTime, onSessionClick }) => {
    const liveSessions = React.useMemo(() => {
        return sessions.filter(s => {
            const sessionStart = new Date(`${s.date} ${s.start}`.replace(/(st|nd|rd|th)/, ''));
            const sessionEnd = new Date(`${s.date} ${s.end}`.replace(/(st|nd|rd|th)/, ''));
            return currentTime >= sessionStart && currentTime <= sessionEnd;
        });
    }, [sessions, currentTime]);

    const upcomingSessions = React.useMemo(() => {
        return sessions.filter(s => {
            const sessionStart = new Date(`${s.date} ${s.start}`.replace(/(st|nd|rd|th)/, ''));
            return sessionStart > currentTime && sessionStart <= new Date(currentTime.getTime() + 15 * 60000);
        });
    }, [sessions, currentTime]);

    if (liveSessions.length === 0 && upcomingSessions.length === 0) return null;

    return (
        <div className="live-section">
            {liveSessions.length > 0 && (
                <>
                    <div className="live-header">
                        <div className="live-indicator"></div>
                        Happening Now
                    </div>
                    <div className="live-grid">
                        {liveSessions.map(session => (
                            <div
                                key={session.id}
                                className="live-card"
                                onClick={() => onSessionClick && onSessionClick(session)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="live-badge">LIVE</div>
                                <div className="session-title" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    {session.title}
                                </div>
                                <div className="session-location" style={{ fontSize: '0.8rem' }}>
                                    📍 {session.location}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {upcomingSessions.length > 0 && (
                <>
                    <div className="live-header" style={{ marginTop: '1rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>⏭</span> Up Next (15 min)
                    </div>
                    <div className="live-grid">
                        {upcomingSessions.map(session => (
                            <div key={session.id} className="live-card">
                                <div className="session-title" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    {session.title}
                                </div>
                                <div className="session-meta" style={{ fontSize: '0.8rem' }}>
                                    <span style={{ marginRight: '0.5rem' }}>🕒 {session.start}</span>
                                    <span>📍 {session.location}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LiveSection;
