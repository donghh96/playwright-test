import {Locator, Page} from '@playwright/test';

interface RoomData {
  name : string;
  type : 'Single' | 'Twin' | 'Double ' | 'Family' | 'Suite' ;
  accessible : 'false' | 'true';
  price : string;
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
  get messagesLink() : Locator { return this.page.getByRole('link', { name: 'Messages'});}
  get rooms() : Locator { return this.page.getByTestId('roomlisting');}
  get createRoomFailedMessage() : Locator { return this.page.getByText('Failed to create room');}
  get createRoomPriceWrongMessage() : Locator {return this.page.getByText('must be greater than or equal to 1')}
  
  async clickHomeLink() {
    await this.homeLink.click();
  }
  async clickRoomsLink() {
    await this.roomsLink.click();
  }
  async clickReportLink() {
    await this.reportLink.click();
  }
  async clickMessagesLink() {
    await this.messagesLink.click();
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
  async deleteRoom(roomName : string)
  {
    await (await this.getRoomByName(roomName)).locator('.roomDelete').click();
  }
}