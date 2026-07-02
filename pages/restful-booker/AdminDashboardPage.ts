import {Locator, Page, expect} from '@playwright/test';

export interface RoomData {
  name : string;
  type : 'Single' | 'Twin' | 'Double ' | 'Family' | 'Suite' ;
  accessible : 'false' | 'true';
  price : string;
  description ?: string;
  roomDetails :
  {
    wifi ?: boolean;
    tv?: boolean;
    radio?: boolean;
    refreshments?: boolean;
    safe?: boolean;
    views?: boolean;
  }
}
export class AdminDashboardPage {
  constructor (private page: Page) {};

  get homeLink() : Locator { return this.page.getByRole('link', { name: 'Restful Booker Platform Demo' }); }
  get roomsLink() : Locator { return this.page.getByRole('link', { name: 'Rooms' }); }
  get reportLink() : Locator { return this.page.getByRole('link', { name: 'Report'});}
  get brandingLink() : Locator { return this.page.getByRole('link', {name: 'branding'});}
  get messagesLink() : Locator { return this.page.getByRole('link', { name: 'Messages'});}
  get rooms() : Locator { return this.page.getByTestId('roomlisting');}
  get createRoomFailedMessage() : Locator { return this.page.getByText('Failed to create room');}
  get createRoomPriceWrongMessage() : Locator {return this.page.getByText('must be greater than or equal to 1')}
  get reportTabCalender() : Locator {return this.page.getByRole('table', {name: 'Month View'})};
  get brandingTabHeadingBB() : Locator { return this.page.getByRole('heading', {name: 'B&B details'});}
  get brandingTabHeadingMap() : Locator { return this.page.getByRole('heading', {name: 'Map details'});}
  get brandingTabHeadingContact() : Locator { return this.page.getByRole('heading', {name: 'Contact details'});}
  get brandingTabHeadingAdderess() : Locator { return this.page.getByRole('heading', {name: 'Address details'});}
  get messageTabName() : Locator { return this.page.getByText('Name')};
  get messageTabSubject() : Locator { return this.page.getByText('Subject')};
  get firstMessage() : Locator { return this.page.getByTestId('message0')};
  get messageDetail() : Locator { return this.page.getByTestId('message')};
  getMessageBySubject(messageSubject : string) : Locator { return this.page.getByText(messageSubject)};

  async goto () {
    await this.page.goto('https://automationintesting.online/admin/rooms');
  }
  async clickHomeLink() {
    await this.homeLink.click();
  }
  async clickRoomsLink() {
    await this.roomsLink.click();
  }
  async clickReportLink() {
    await this.reportLink.click();
  }
  async clickBrandingLink() {
    await this.brandingLink.click();
  }
  async clickMessagesLink() {
    await this.messagesLink.click();
  }
  async viewMessage() {
    await this.firstMessage.click();
  }
  async closeMessage() {
    await this.page.getByRole('button', {name: 'Close'}).click();
  }
  async createRoom(roomdata : RoomData)
  {
    await this.page.getByTestId('roomName').fill(roomdata.name);
    await this.page.locator('#type').selectOption(roomdata.type);
    await this.page.locator('#accessible').selectOption(roomdata.accessible);
    await this.page.locator('#roomPrice').fill(roomdata.price);
    await this.page.getByRole('checkbox', { name: 'WiFi'}).setChecked(roomdata.roomDetails.wifi??false);
    await this.page.getByRole('checkbox', { name: 'Refreshments' }).setChecked(roomdata.roomDetails.refreshments??false);
    await this.page.getByRole('checkbox', { name: 'TV' }).setChecked(roomdata.roomDetails.tv??false);
    await this.page.getByRole('checkbox', { name: 'Safe' }).setChecked(roomdata.roomDetails.safe??false);
    await this.page.getByRole('checkbox', { name: 'Radio' }).setChecked(roomdata.roomDetails.radio??false);
    await this.page.getByRole('checkbox', { name: 'Views' }).setChecked(roomdata.roomDetails.views??false);
    await this.page.getByRole('button', {name: 'Create'}).click();
  }
  getRoomByName(roomName : string)
  {
    return this.rooms.filter({hasText: roomName});
  }
  async viewRoomDetails(roomnName : string)
  {
    await this.getRoomByName(roomnName).click();
  }
  async addRoomDescription(roomDescription : string)
  {
    await this.page.getByRole('button', { name: 'Edit' }).click();
    // await this.page.getByRole('textbox', { name: 'Description' }).fill(roomDescription);
    // await this.page.locator('#update').click();
    // await expect(this.page.getByText(roomDescription)).toBeVisible({timeout : 10000});

    const box = this.page.locator('#description');
    await box.fill(roomDescription);
    await expect(box).toHaveValue(roomDescription);

    await this.page.locator('#update').click();
    await this.page.waitForTimeout(1000);
    await this.page.reload();
    await expect(this.page.getByText(roomDescription)).toBeVisible();
  }
  async deleteRoom(roomName : string)
  {
    await this.getRoomByName(roomName).locator('.roomDelete').click();
  }
  getBookingByGuestName(guestname : string)
  {
    return this.page.locator('.detail').filter({hasText: guestname});
  }
}