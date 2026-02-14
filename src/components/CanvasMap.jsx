import React, { useRef, useEffect, useState } from 'react';

const CanvasMap = ({ sessions, onSessionClick, selectedSession }) => {
    const canvasRef = useRef(null);
    const [hoveredSession, setHoveredSession] = useState(null);
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;
    const DOT_RADIUS = 5;
    const HOVER_RADIUS = 8;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Calculate viewport
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Draw sessions
        sessions.forEach((session) => {
            // Map normalized coordinates (0-1) to canvas space
            const x = centerX + (session.x - 0.5) * CANVAS_WIDTH * transform.scale + transform.x;
            const y = centerY + (session.y - 0.5) * CANVAS_HEIGHT * transform.scale + transform.y;

            // Check if in bounds
            if (x < -50 || x > rect.width + 50 || y < -50 || y > rect.height + 50) {
                return;
            }

            const isHovered = hoveredSession?.id === session.id;
            const isSelected = selectedSession?.id === session.id;
            const radius = (isHovered || isSelected) ? HOVER_RADIUS : DOT_RADIUS;

            // Draw dot
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);

            if (isSelected) {
                ctx.fillStyle = '#007AFF';
            } else if (isHovered) {
                ctx.fillStyle = '#34C759';
            } else {
                ctx.fillStyle = '#86868B';
            }

            ctx.fill();

            // Draw a subtle glow for hovered/selected
            if (isHovered || isSelected) {
                ctx.beginPath();
                ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
                ctx.strokeStyle = isSelected ? 'rgba(0, 122, 255, 0.3)' : 'rgba(52, 199, 89, 0.3)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        // Draw hover tooltip
        if (hoveredSession) {
            const x = centerX + (hoveredSession.x - 0.5) * CANVAS_WIDTH * transform.scale + transform.x;
            const y = centerY + (hoveredSession.y - 0.5) * CANVAS_HEIGHT * transform.scale + transform.y;

            const padding = 12;
            const maxWidth = 300;

            ctx.font = '14px Inter';
            const title = hoveredSession.title;
            const titleWidth = Math.min(ctx.measureText(title).width, maxWidth);

            const tooltipX = x + 15;
            const tooltipY = y - 30;
            const tooltipWidth = titleWidth + padding * 2;
            const tooltipHeight = 40;

            // Draw tooltip background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.beginPath();
            ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
            ctx.fill();

            // Draw tooltip text
            ctx.fillStyle = 'white';
            ctx.font = '600 13px Inter';
            ctx.fillText(
                title.length > 40 ? title.substring(0, 40) + '...' : title,
                tooltipX + padding,
                tooltipY + 25
            );
        }

    }, [sessions, hoveredSession, selectedSession, transform]);

    const getSessionAtPoint = (x, y) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        for (const session of sessions) {
            const sx = centerX + (session.x - 0.5) * CANVAS_WIDTH * transform.scale + transform.x;
            const sy = centerY + (session.y - 0.5) * CANVAS_HEIGHT * transform.scale + transform.y;

            const distance = Math.sqrt((x - sx) ** 2 + (y - sy) ** 2);
            if (distance < HOVER_RADIUS + 5) {
                return session;
            }
        }
        return null;
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isDragging) {
            setTransform(prev => ({
                ...prev,
                x: prev.x + (x - dragStart.x),
                y: prev.y + (y - dragStart.y)
            }));
            setDragStart({ x, y });
            return;
        }

        const session = getSessionAtPoint(x, y);
        setHoveredSession(session);

        // Change cursor
        canvas.style.cursor = session ? 'pointer' : 'grab';
    };

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const session = getSessionAtPoint(x, y);
        if (session) {
            onSessionClick(session);
        } else {
            setIsDragging(true);
            setDragStart({ x, y });
            canvas.style.cursor = 'grabbing';
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.cursor = hoveredSession ? 'pointer' : 'grab';
        }
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setTransform(prev => ({
            ...prev,
            scale: Math.max(0.5, Math.min(3, prev.scale * delta))
        }));
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'grab'
                }}
            />

            {/* Instructions */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                gap: 'var(--spacing-lg)',
                backdropFilter: 'blur(10px)'
            }}>
                <span>🖱️ Click dots to explore</span>
                <span>✋ Drag to pan</span>
                <span>🔍 Scroll to zoom</span>
            </div>
        </div>
    );
};

export default CanvasMap;
