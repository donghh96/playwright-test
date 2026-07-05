// export function createBookingData(overrides = {}) {
//   return {
//     firstname: `Kitty_${Date.now()}`,
//     lastname: 'Cat',
//     totalprice: 100,
//     depositpaid: true,
//     bookingdates: {
//       checkin: '2024-10-01',
//       checkout: '2024-10-05'
//     },
//     additionalneeds: 'Breakfast',
//     ...overrides
//   };
// }
interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

export function createBookingData (overrides: Partial<BookingData>={}) : BookingData {
  const defaultBooking: BookingData = {
    firstname: `Kitty_${Date.now()}`,
    lastname: 'Cat',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-10-01',
      checkout: '2024-10-05'
    },
    additionalneeds: 'Breakfast',
  };
  return {
    ...defaultBooking,
    ...overrides,
  }
}