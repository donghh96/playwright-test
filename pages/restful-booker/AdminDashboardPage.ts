import {Locator, Page} from '@playwright/test';

interface RoomOptions {
  wifi ?: boolean;
  tv?: boolean;
  radio?: boolean;
  refreshments?: boolean;
  safe?: boolean;
  views?: boolean;
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

  // get roomName() : Locator { return this.page.getByTestId('roomName')};
  // get roomType() : Locator { return this.page.locator('#type')};
  // get roomAccessible() : Locator { return this.page.locator('#accessible')};
  
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
  async createRoom(name: string, type: string, accessbile: string, price: string, options : RoomOptions = {})
  {
    const { wifi = false, tv = false, radio = false, refreshments = false, safe = false, views = false } = options;
    await this.page.getByTestId('roomName').fill(name);
    await this.page.locator('#type').selectOption(type);
    await this.page.locator('#accessible').selectOption('true');
    await this.page.locator('#roomPrice').fill(price);
    await this.page.getByRole('checkbox', { name: 'WiFi'}).setChecked(wifi);
    await this.page.getByRole('checkbox', { name: 'Refreshments' }).setChecked(refreshments);
    await this.page.getByRole('checkbox', { name: 'TV' }).setChecked(tv);
    await this.page.getByRole('checkbox', { name: 'Safe' }).setChecked(safe);
    await this.page.getByRole('checkbox', { name: 'Radio' }).setChecked(radio);
    await this.page.getByRole('checkbox', { name: 'Views' }).setChecked(views);
    await this.page.getByRole('button', {name: 'Create'}).click();
  }
}