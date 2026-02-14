import json
import re

# Load sessions
with open('public/data/sessions.json', 'r', encoding='utf-8') as f:
    sessions = json.load(f)

def parse_session(session):
    """Extract day, start, and end times from date and time fields"""
    # Parse date to get day number
    date_str = session.get('date', '')
    if '16 Feb' in date_str:
        day = 'Day 1'
    elif '17 Feb' in date_str:
        day = 'Day 2'
    elif '18 Feb' in date_str:
        day = 'Day 3'
    else:
        day = 'Day 1'  # default
    
    # Parse time to get start and end
    time_str = session.get('time', '')
    
    # Handle different time formats
    # Format 1: "9:30 AM - 10:30 AM"
    # Format 2: "9:30 AM"
    time_range = re.search(r'(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)', time_str, re.IGNORECASE)
    single_time = re.search(r'(\d{1,2}:\d{2}\s*[AP]M)', time_str, re.IGNORECASE)
    
    if time_range:
        start = time_range.group(1).strip()
        end = time_range.group(2).strip()
    elif single_time:
        start = single_time.group(1).strip()
        end = start  # Same as start if no end time
    else:
        start = "TBD"
        end = "TBD"
    
    # Normalize time format (remove spaces before AM/PM)
    start = re.sub(r'\s+([AP]M)', r' \1', start)
    end = re.sub(r'\s+([AP]M)', r' \1', end)
    
    return {
        **session,
        'day': day,
        'start': start,
        'end': end,
        'text': session.get('description', '') or session.get('full_description', '')
    }

# Process all sessions
processed_sessions = [parse_session(s) for s in sessions]

# Save back
with open('public/data/sessions.json', 'w', encoding='utf-8') as f:
    json.dump(processed_sessions, f, ensure_ascii=False, indent=2)

print(f"✓ Processed {len(processed_sessions)} sessions")
print(f"\nSample output:")
for i, s in enumerate(processed_sessions[:3]):
    print(f"\n{i+1}. {s['title'][:60]}...")
    print(f"   Day: {s['day']}, Time: {s['start']} - {s['end']}")
