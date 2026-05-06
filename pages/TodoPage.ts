import  {Locator, Page, expect} from "@playwright/test";

//Class 
export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly todoItems: Locator;
  readonly clearCompletedButton: Locator;
  readonly todoCount: Locator;

  //constructor
  constructor(page:Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    //this.todoItems = page.locator('.todo-list li');
    this.clearCompletedButton = page.getByRole("button", {name: 'Clear Completed'});
    this.todoCount = page.getByTestId('todo-count');
  }

  //add an todo item
  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }

  //toggle an todo item
  async toggleTodo(text: string) {
    const row = this.todoItems.filter({hasText: text});
    await row.getByRole('checkbox').click();
  }

  //remove an todo item
  async removeTodo(text: string, index: number=0) {
    const row = this.todoItems.filter({hasText: text}).nth(index);
    await row.hover();
    await row.locator('button.destroy').click();
  }

  async exepectDeleteNotExists(text: string) {
    await expect(this.todoItems.filter({hasText: text})).not.toBeVisible();
  }

  //filter All/Active/Completed
  async filterBy(status : 'All'|'Active'|'Completed') {
    await this.page.getByRole('link', {name: status}).click();
  }

  //Clear completed
  async clearCompleted() {
    if (await this.clearCompletedButton.isVisible()){
      await this.clearCompletedButton.click();
    }
  }
}