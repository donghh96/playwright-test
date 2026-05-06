import  {test, expect} from '@playwright/test';
import {TodoPage} from '../pages/TodoPage';

//add a todo item
test('basicMVCtest', async({page}) => {
  const todoPage = new TodoPage(page);
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  await todoPage.addTodo('Cook');
  await todoPage.addTodo('Run 3km');
  await expect(todoPage.todoCount).toHaveText('2 items left');

  await todoPage.toggleTodo('Run 3km');
  await expect(todoPage.todoCount).toHaveText('1 item left');

  await todoPage.filterBy('Completed');
  await expect(todoPage.todoItems).toHaveText('Run 3km');

  await todoPage.filterBy('Active');
  await expect(todoPage.todoItems).toHaveText('Cook');

  await todoPage.filterBy('All');
  await todoPage.removeTodo('Cook');
  await todoPage.exepectDeleteNotExists('Cook');

  await expect(todoPage.todoCount).toHaveText('0 items left');

  await todoPage.clearCompleted();
  //await expect(todoPage.todoItems.filter({hasText: 'Run 3km'})).not.toBeVisible();

  await expect(todoPage.todoItems).toHaveCount(0);
})