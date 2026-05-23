# StudyNook – Library Study Room Booking System

Live Site: https://study-nook-flax.vercel.app


---

## Project Overview

StudyNook is a full-stack web application that allows students and users to browse, list, and book study rooms in libraries or private spaces.  
Users can create room listings, manage their own rooms, and book available rooms with real-time conflict prevention.

The system is built with secure authentication using JWT and supports a fully responsive UI for mobile, tablet, and desktop devices.

---

## Key Features

- Secure authentication system (JWT + HTTP-only cookies / Better Auth compatible)
- Users can add, update, and delete their own study rooms
- Real-time booking system with time conflict detection
- Search and filter rooms by name, amenities, and price
- My Listings dashboard for room owners
- My Bookings page for users
- Prevents double booking using backend validation
- Fully responsive design (mobile, tablet, desktop)
- Toast notifications for all success/error actions (no alerts used)
- Clean and modern UI

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Native Driver)
- JWT Authentication
- Cookie-based session handling

---

## Project Structure

### Client
- /app
- /components
- /hooks
- /utils

### Server
- /routes
- /middleware
- /config
- server.js

---

## Authentication System

- Login and registration system
- JWT generated on login
- Token stored in HTTP-only cookies
- Protected routes using middleware
- User-specific data access control

---

## Core Functionalities

### Room Management
- Add Room
- Update Room (Owner only)
- Delete Room (Owner only)
- View all rooms

### Booking System
- Book study rooms with time slots
- Prevent overlapping bookings
- Cancel booking feature
- Booking count tracking

### Search & Filter
- Search by room name
- Filter by amenities
- Filter by hourly rate range

---

## Responsive Design

- Mobile friendly layout
- Tablet optimized grid system
- Desktop dashboard experience

---

## Rules & Constraints

- No Lorem Ipsum text used
- No alert() used for messages
- All errors handled via toast notifications
- Secure environment variables used (.env)
- Private routes protected with authentication
- Page reload does not break routing

---

## Deployment

- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## Screenshots

(Add screenshots here)

---

## Future Improvements

- Google OAuth login enhancement
- Payment integration for premium rooms
- Advanced analytics dashboard
- Email notification system

---

## Author

Developed for Assignment CAT_12 – StudyNook Project
