// Utility for generating and retrieving a persistent guestId for guest users
// Uses localStorage to persist the guestId across sessions

function generateGuestId() {
  // Simple UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateGuestId() {
  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = generateGuestId();
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
}

export function clearGuestId() {
  localStorage.removeItem('guestId');
} 