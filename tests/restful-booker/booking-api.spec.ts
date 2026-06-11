import {test, expect} from '@playwright/test';
test.describe('restful-booker API tests', () => {
  let token: string;
  const BASEURL = 'https://restful-booker.herokuapp.com';
  const createdId: number[] = [];
  
  const bookingData = {
      "firstname": "Kitty",
      "lastname": "Cat",
      "totalprice": 100,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2026-10-01",
        "checkout": "2026-10-05"
      },
      "additionalneeds": "Breakfast"
  };

  test.beforeAll(async ({request}) => {
    //create a token
    const tokenResponse = await request.post(`${BASEURL}/auth`, {
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
      const deleteResponse = await request.delete(`${BASEURL}/booking/${id}`, {
        headers: {
          'Cookie': `token=${token}`
        }
      });
      expect(deleteResponse.status()).toBe(201);
      console.log(`Deleted booking ID: ${id}`);
    }
  });

  test('get all bookings', async ({request}) => {
    const response = await request.get(`${BASEURL}/booking`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    // console.log(body);
    expect(body.length).toBeGreaterThan(0);
  });

  test('get booking by id', async ({request}) => {
    const allResponse = await request.get(`${BASEURL}/booking`);
    expect(allResponse.status()).toBe(200);
    const allBookings = await allResponse.json();
    const bookingId = allBookings[0].bookingid;

    const response = await request.get(`${BASEURL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });

  test('post create booking', async ({request}) => {
    
    const response = await request.post(`${BASEURL}/booking`, {
      data: bookingData
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    const bookingId = body.bookingid;
    createdId.push(bookingId);
    console.log('Created booking ID: ', bookingId);
    expect(body.booking.firstname).toBe(bookingData.firstname);
    expect(body.booking.lastname).toBe(bookingData.lastname);
    expect(body.booking.bookingdates.checkin).toBe(bookingData.bookingdates.checkin);
    expect(body.booking.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);
    expect(body.booking.additionalneeds).toBe(bookingData.additionalneeds);
    expect(body.booking.totalprice).toBe(bookingData.totalprice);
    expect(body.booking.depositpaid).toBe(bookingData.depositpaid);
  }); 

  test('delete a booking', async ({request}) => {
    //create a booking first
    const createResponse = await request.post(`${BASEURL}/booking`, { 
      data: bookingData,
    });
    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    console.log('Created booking ID: ', bookingId);
    // Now delete the booking
    const deleteResponse = await request.delete(`${BASEURL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(deleteResponse.status()).toBe(201);
    console.log(`Deleted booking ID: ${bookingId}`); 
    //verify deletion
    const getResponse = await request.get(`${BASEURL}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
  
  test('update a booking', async ({request}) => {
    //create a booking first
    const createResponse = await request.post(`${BASEURL}/booking`, { 
      data: bookingData,
    });
    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    createdId.push(bookingId);
    console.log('Created booking ID: ', bookingId);

    // Now update the booking
    const updatedData = {
      "firstname": "Kitty",
      "lastname": "Cat",
      "totalprice": 320,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2026-10-01",
        "checkout": "2026-10-08"
      },
      "additionalneeds": "Breakfast"
    };
    const updateResponse = await request.put(`${BASEURL}/booking/${bookingId}`, {
      data: updatedData,
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    console.log('Updated booking:', updateBody);
    expect(updateBody.totalprice).toBe(320);
    expect(updateBody.bookingdates.checkout).toBe('2026-10-08');
  });

  test('partially update a booking', async ({request}) => {
    //create a booking first
    const createResponse = await request.post(`${BASEURL}/booking`, { 
      data: bookingData,
    });
    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    createdId.push(bookingId);
    console.log('Created booking ID: ', bookingId); 

    // Now partially update the booking
    const partialData = {
      "totalprice": 500,
      "additionalneeds": "Late checkout"
    };

    const updateResponse = await request.patch(`${BASEURL}/booking/${bookingId}`, {
      data: partialData,
      headers: { 
        'Cookie': `token=${token}`
      }
    });
    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    console.log('Partially updated booking:', updateBody);

    expect(updateBody.totalprice).toBe(500);
    expect(updateBody.additionalneeds).toBe('Late checkout');
  });
});

