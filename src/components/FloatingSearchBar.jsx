import React from 'react';

const FloatingSearchBar = ({ query, onQueryChange, sessionCount }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            width: '90%',
            maxWidth: '600px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)'
            }}>
                <input
                    type="text"
                    placeholder="Search sessions... (e.g., AI agents, policy, startups)"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 500,
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        outline: 'none'
                    }}
                />
                <div style={{
                    marginTop: 'var(--spacing-sm)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--text-secondary)',
                    paddingLeft: 'var(--spacing-lg)'
                }}>
                    {sessionCount} sessions {query && '· Semantic search active'}
                </div>
            </div>
        </div>
    );
};

export default FloatingSearchBar;
