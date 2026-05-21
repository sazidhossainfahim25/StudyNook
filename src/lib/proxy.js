/**
 * Central API Proxy for handling all requests to the backend.
 * This keeps your components clean and reusable.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const proxyRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};

// Room operations
export const fetchRooms = () => proxyRequest('/rooms');
export const createRoom = (data) =>
  proxyRequest('/add-room', { method: 'POST', body: JSON.stringify(data) });

// Booking operations
export const fetchMyBookings = () => proxyRequest('/my-bookings');
export const createBooking = (data) =>
  proxyRequest('/bookings', { method: 'POST', body: JSON.stringify(data) });

// Add other helper functions as needed
