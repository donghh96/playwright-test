import  {Locator, Page, expect} from "@playwright/test";

//Class 
export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly todoItems: Locator;
  readonly clearCompletedButton: Locator;
  readonly todoCount: Locator;
  readonly toggleAllButton: Locator;

  //constructor
  constructor(page:Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    //this.todoItems = page.locator('.todo-list li');
    // this.toggleAllButton = page.getByText('Mark all as complete');
    // this.toggleAllButton = page.getByLabel('Mark all as complete');
    this.toggleAllButton = page.locator('input.toggle-all');
    this.clearCompletedButton = page.getByRole("button", {name: 'Clear Completed'});
    this.todoCount = page.getByTestId('todo-count');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  //add an todo item
  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }

  //toggle an todo item
  async toggleTodo(text: string) {
    const row = this.todoItems.filter({hasText: text});
    await row.getByRole('checkbox').click({force:true});
  }

  async toggleAll() {
    await this.toggleAllButton.click();
  }

  //remove an todo item
  async removeTodo(text: string, index: number=0) {
    const row = this.todoItems.filter({hasText: text}).nth(index);
    await row.hover();
    await row.locator('button.destroy').click();
  }

  //edit an todo item
  async editTodo(oldText: string, newText: string, pressKey: 'Enter' | 'Escape' = 'Enter') {
    const todoItem = this.todoItems.filter({hasText: oldText});
    await todoItem.dblclick();
    const editInput = todoItem.locator('input.edit');

    await editInput.fill(newText);
    await editInput.press(pressKey);
  }

  async expectDeleteNotExists(text: string) {
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