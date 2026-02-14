import React from 'react';
import SessionCard from './SessionCard';

const SidePanel = ({ session, similarSessions, onClose, onSessionClick }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'var(--overlay)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 200,
                    animation: 'fadeIn 0.3s ease-out'
                }}
            />

            {/* Panel */}
            <div
                className="slide-in"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    maxWidth: '480px',
                    background: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 201,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    background: 'white',
                    borderBottom: '1px solid var(--border)',
                    padding: 'var(--spacing-xl)',
                    zIndex: 10
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: 'var(--spacing-lg)',
                            right: 'var(--spacing-lg)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: 'none',
                            background: 'var(--bg-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            color: 'var(--text-secondary)',
                            transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--border)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'var(--bg-secondary)';
                        }}
                    >
                        ×
                    </button>

                    <div style={{
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {session.date} · {session.time}
                    </div>

                    <h1 style={{
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                        marginBottom: 'var(--spacing-md)',
                        paddingRight: '2rem'
                    }}>
                        {session.title}
                    </h1>

                    {session.location && (
                        <div style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--text-secondary)',
                            marginBottom: 'var(--spacing-sm)'
                        }}>
                            📍 {session.location}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div style={{
                    flex: 1,
                    padding: 'var(--spacing-xl)'
                }}>
                    {/* Speakers */}
                    {session.speakers && session.speakers.length > 0 && (
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <h3 style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginBottom: 'var(--spacing-md)'
                            }}>
                                Speakers
                            </h3>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-sm)'
                            }}>
                                {session.speakers.slice(0, 5).map((speaker, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            fontSize: 'var(--font-size-sm)',
                                            color: 'var(--text-primary)',
                                            padding: 'var(--spacing-sm)',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: 'var(--radius-sm)'
                                        }}
                                    >
                                        {speaker}
                                    </div>
                                ))}
                                {session.speakers.length > 5 && (
                                    <div style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--text-secondary)',
                                        fontStyle: 'italic'
                                    }}>
                                        +{session.speakers.length - 5} more speakers
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h3 style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            About
                        </h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--text-primary)',
                            lineHeight: 1.7,
                            whiteSpace: 'pre-line'
                        }}>
                            {session.full_description || session.description}
                        </p>
                    </div>

                    {/* Knowledge Partners */}
                    {session.knowledge_partners && (
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <h3 style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginBottom: 'var(--spacing-md)'
                            }}>
                                Knowledge Partner
                            </h3>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--accent)',
                                fontWeight: 500
                            }}>
                                {session.knowledge_partners}
                            </div>
                        </div>
                    )}

                    {/* Similar Sessions */}
                    {similarSessions && similarSessions.length > 0 && (
                        <div>
                            <h3 style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                You May Also Like
                            </h3>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-md)'
                            }}>
                                {similarSessions.slice(0, 5).map((similarSession) => (
                                    <SessionCard
                                        key={similarSession.id}
                                        session={similarSession}
                                        onClick={() => onSessionClick(similarSession)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SidePanel;
