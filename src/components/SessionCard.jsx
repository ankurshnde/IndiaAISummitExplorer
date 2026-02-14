import React from 'react';

const SessionCard = ({ session, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
            }}
        >
            <div style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                color: 'var(--accent)',
                marginBottom: 'var(--spacing-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}>
                {session.date}
            </div>

            <h4 style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.4,
                marginBottom: 'var(--spacing-sm)'
            }}>
                {session.title}
            </h4>

            {session.speakers && session.speakers.length > 0 && (
                <div style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--text-secondary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: 'var(--spacing-sm)'
                }}>
                    {session.speakers.slice(0, 2).join(', ')}
                    {session.speakers.length > 2 && ` +${session.speakers.length - 2} more`}
                </div>
            )}

            {session.keywords && session.keywords.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-xs)',
                    marginTop: 'var(--spacing-xs)'
                }}>
                    {session.keywords.map(keyword => (
                        <span key={keyword} style={{
                            fontSize: 'var(--font-size-xs)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid var(--border)'
                        }}>
                            {keyword}
                        </span>
                    ))}
                </div>
            )}

            {/* Arrow icon */}
            <div style={{
                position: 'absolute',
                top: 'var(--spacing-lg)',
                right: 'var(--spacing-lg)',
                fontSize: '18px',
                color: 'var(--text-secondary)',
                transition: 'transform var(--transition-fast)'
            }}>
                →
            </div>
        </div>
    );
};

export default SessionCard;
