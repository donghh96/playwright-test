export function createBookingData() {
  return {
    firstname: `Kitty_${Date.now()}`,
    lastname: 'Cat',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-10-01',
      checkout: '2024-10-05'
    },
    additionalneeds: 'Breakfast'
    // ...overrides
  };
}