import requests

events = [
    {
        "title": "Introduction to Climbing and Belaying Clinic",
        "date": "2025-04-01",
        "time": "17:30",
        "description": "Learn the basics of climbing and belaying in this introductory clinic.",
        "location": "Climbing Wall, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "Paint & Pose Yoga Workshop (water bottle)",
        "date": "2025-04-01",
        "time": "17:45",
        "description": "Combine creativity and relaxation in this unique yoga and painting workshop.",
        "location": "Yoga Studio, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "Wellness Wednesday",
        "date": "2025-04-02",
        "time": "17:30",
        "description": "Join us for activities focused on enhancing your well-being.",
        "location": "Wellness Suite, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "College Skate Night",
        "date": "2025-04-02",
        "time": "20:30",
        "description": "Enjoy a night of skating exclusively for college students.",
        "location": "Ice Arena",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "SRC Vitalant Blood Drive",
        "date": "2025-04-03",
        "time": "14:00",
        "description": "Donate blood and save lives at the Student Recreation Center.",
        "location": "Multipurpose Room, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "College Drop-in Clinics (swim clinics)",
        "date": "2025-04-03",
        "time": "17:00",
        "description": "Improve your swimming skills with our drop-in clinics.",
        "location": "Natatorium, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "Pool Kayak Clinic",
        "date": "2025-04-03",
        "time": "19:00",
        "description": "Learn kayaking techniques in the safety of our pool.",
        "location": "Natatorium, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "SRC Vitalant Blood Drive",
        "date": "2025-04-04",
        "time": "14:00",
        "description": "Another opportunity to donate blood at the Student Recreation Center.",
        "location": "Multipurpose Room, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "Public Ice Skating Session",
        "date": "2025-04-04",
        "time": "19:30",
        "description": "Open ice skating session for the public.",
        "location": "Ice Arena",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    },
    {
        "title": "Babysitting",
        "date": "2025-04-05",
        "time": "08:00",
        "description": "Comprehensive babysitting training course.",
        "location": "Seminar Room, Recreation Center",
        "link": "https://www.kent.edu/recwell/upcoming-events"
    }
]

# POST each event
for event in events:
    res = requests.post("http://127.0.0.1:5000/events/post", json=event)
    if res.status_code == 200:
        print(f"✅ Added: {event['title']}")
    else:
        print(f"❌ Failed to add: {event['title']} - Status Code: {res.status_code}")
