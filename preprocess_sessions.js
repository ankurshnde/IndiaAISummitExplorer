const fs = require('fs');

// Load sessions
const sessions = JSON.parse(fs.readFileSync('./public/data/sessions.json', 'utf-8'));

function parseSession(session) {
    // Parse date to get day number
    const dateStr = session.date || '';
    let day;
    if (dateStr.includes('16 Feb')) {
        day = 'Day 1';
    } else if (dateStr.includes('17 Feb')) {
        day = 'Day 2';
    } else if (dateStr.includes('18 Feb')) {
        day = 'Day 3';
    } else {
        day = 'Day 1'; // default
    }

    // Parse time to get start and end
    const timeStr = session.time || '';

    // Match time range: "9:30 AM - 10:30 AM"
    const timeRangeMatch = timeStr.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i);
    // Match single time: "9:30 AM"
    const singleTimeMatch = timeStr.match(/(\d{1,2}:\d{2}\s*[AP]M)/i);

    let start, end;
    if (timeRangeMatch) {
        start = timeRangeMatch[1].trim();
        end = timeRangeMatch[2].trim();
    } else if (singleTimeMatch) {
        start = singleTimeMatch[1].trim();
        end = start; // Same as start if no end time
    } else {
        start = "TBD";
        end = "TBD";
    }

    return {
        ...session,
        day,
        start,
        end,
        text: session.description || session.full_description || ''
    };
}

// Process all sessions
const processed = sessions.map(parseSession);

// Save back
fs.writeFileSync('./public/data/sessions.json', JSON.stringify(processed, null, 2));

console.log(`✓ Processed ${processed.length} sessions`);
console.log(`\nSample output:`);
processed.slice(0, 3).forEach((s, i) => {
    console.log(`\n${i + 1}. ${s.title.substring(0, 60)}...`);
    console.log(`   Day: ${s.day}, Time: ${s.start} - ${s.end}`);
});
