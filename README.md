## 📸 Preview

![App Preview](./screenshots/appoitment-menager.png)


# Appointment Manager
A clean React application for managing appointments with capacity limits and attendee lists.
Built as a portfolio-ready project to demonstrate real-world React patterns and state management.
✨ Features
Create appointments with:
title
date & time
capacity
List all appointments in a clean card-based UI
Add attendees to an appointment
Capacity enforcement:
prevents overbooking
shows remaining / filled slots
status: Open / Full
Remove attendees
Delete appointments
Warning for double booking (same date & time)
Persistent data using LocalStorage
Clear UX feedback (disabled buttons, status messages)
Empty & loading states

🧠 What This Project Demonstrates
This project is intentionally not over-engineered.
It focuses on concepts used daily in real React jobs:
React Context for global state
Immutable state updates
Derived state (e.g. capacity, status)
Local vs global state separation
Controlled forms with validation
Clean component structure
Conditional rendering & UX logic
LocalStorage persistence
Realistic business rules

🏗 Tech Stack
React (Vite)
Context API
Tailwind CSS
LocalStorage
lucide-react (icons)

src/
 ├── components/
 │    ├── AppointmentForm.jsx
 │    ├── AppointmentList.jsx
 │    ├── Appointment.jsx
 │    └── AddAttendeeForm.jsx
 ├── context/
 │    └── AppContext.jsx
 └── App.jsx

🚀 Getting Started
npm install
npm run dev

🎯 Design Decisions
Attendance tracking (present/absent) was intentionally excluded
Focused on appointment & capacity management only
No backend – LocalStorage simulates persistence
Simple, readable logic preferred over abstractions
This keeps the project clear, realistic, and portfolio-strong.

📌 Possible Extensions (Optional)
Edit appointment
Search / filter appointments
Backend integration (Firebase / REST API)
Authentication

👤 Author

Built by [Xhelil Xhelili]
React Developer – Portfolio Project