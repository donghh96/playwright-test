import { test, expect, APIRequestContext } from '@playwright/test';
import { createBookingData } from '../fixtures/restful-booker/BookingDataFactory';  

async function createBooking( request : APIRequestContext,  data : object) 
{
  const response = await request.post('/booking', { data });
  expect(response.status()).toBe(200);
  const body = await response.json();
  return body.bookingid;
}

test.describe('restful-booker API tests', () => {
  let token: string;
  const createdId: number[] = [];

  test.beforeAll(async ({request}) => {
    //create a token
    const tokenResponse = await request.post('/auth', {
      data: {
        "username": "admin",
        "password": "password123"
      }
    });
    expect(tokenResponse.status()).toBe(200);
    const tokenBody = await tokenResponse.json();
    token = tokenBody.token;
    // console.log('Generated token: ', tokenBody.token);
  });

  test.afterAll(async ({request}) => {
    // Clean up - delete any created bookings
    for (const id of createdId) {
      const deleteResponse = await request.delete(`/booking/${id}`, {
        headers: {
          'Cookie': `token=${token}`
        }
      });
      expect(deleteResponse.status()).toBe(201);
      console.log(`Deleted booking ID: ${id}`);
    }
  });

  test('get all bookings', async ({request}) => {
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);
    const body = await response.json();
    // console.log(body);
    expect(body.length).toBeGreaterThan(0);
  });

  test('get booking by id', async ({request}) => {
    const bookingData = createBookingData();
    //create a booking first
    const bookingId = await createBooking(request, bookingData);
    createdId.push(bookingId);
    console.log('Created booking ID: ', bookingId);
   
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body).toMatchObject({...bookingData});
  });

  test('post create booking', async ({request}) => {
    const bookingData = createBookingData();
    const response = await request.post('/booking', {
      data: bookingData,
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    const bookingId = body.bookingid;
    createdId.push(bookingId);
    console.log('Created booking ID: ', bookingId);
    expect(body.booking).toMatchObject({...bookingData});
  }); 

  test('delete a booking', async ({request}) => {
    const bookingData = createBookingData();
    //create a booking first
    const bookingId = await createBooking(request, bookingData);
    console.log('Created booking ID: ', bookingId);

    // Now delete the booking
    const deleteResponse = await request.delete(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(deleteResponse.status()).toBe(201);
    console.log(`Deleted booking ID: ${bookingId}`); 
    //verify deletion
    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
  
  test('update a booking', async ({request}) => {
    const bookingData = createBookingData();
    //create a booking first
    const bookingId = await createBooking(request, bookingData);
    createdId.push(bookingId);
    console.log('Created booking ID: ', bookingId);

    // Now update the booking
    const updatedData = createBookingData({totalprice:320, bookingdates:{checkin: '2026-10-01', checkout: '2026-10-08' }});
    const updateResponse = await request.put(`/booking/${bookingId}`, {
      data: updatedData,
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    // console.log('Updated booking:', updateBody);
    expect(updateBody.totalprice).toBe(320);
    expect(updateBody.bookingdates.checkout).toBe('2026-10-08');
  });

  test('partially update a booking', async ({request}) => {
    //create a booking first
    const bookingData = createBookingData();
    const bookingId = await createBooking(request, bookingData);
    createdId.push(bookingId);
    console.log('Created booking ID: ', bookingId); 

    // Now partially update the booking
    const partialData = {
      "totalprice": 500,
      "additionalneeds": "Late checkout"
    };

    const updateResponse = await request.patch(`/booking/${bookingId}`, {
      data: partialData,
      headers: { 
        'Cookie': `token=${token}`
      }
    });
    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    // console.log('Partially updated booking:', updateBody);

    expect(updateBody.totalprice).toBe(500);
    expect(updateBody.additionalneeds).toBe('Late checkout');
  });
  test('get booking by invalid id returns 404', async ({ request }) => {
    const response = await request.get('/booking/999999999');

    expect(response.status()).toBe(404);
  });
});

