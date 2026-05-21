import {test, expect} from '@playwright/test';
import {TodoPage} from '../../pages/TodoPage';

test.describe('todoMVC basic tests', () => {
  let todoPage: TodoPage;

  test.beforeEach(async({page}) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('add todo', async() => {
    await todoPage.addTodo('Cook');
    await todoPage.addTodo('Run 3km');
    await expect(todoPage.todoItems).toHaveCount(2);
    await expect(todoPage.todoCount).toHaveText('2 items left');
  });
  
  test('toggle todo', async() => {
    await todoPage.addTodo('buy milk');
    await todoPage.toggleTodo('buy milk');
    await expect(todoPage.todoCount).toHaveText('0 items left');
  });

  test('toggle all todos', async () => {
    await todoPage.addTodo('Cook');
    await todoPage.addTodo('Run 3km');
    await expect(todoPage.todoCount).toHaveText('2 items left');
    await todoPage.toggleAll();
    await expect(todoPage.todoCount).toHaveText('0 items left');
  });

  test('delete todo', async() => {
    await todoPage.addTodo('cleaning');
    await todoPage.removeTodo('cleaning');
    await todoPage.expectDeleteNotExists('cleaning');
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  test('edit todo', async() => {
    await todoPage.addTodo('cleaning');
    await todoPage.editTodo('cleaning', 'doing laundry');
    await expect(todoPage.todoItems).toHaveText('doing laundry');
  })

    test('edit todo cancel', async() => {
    await todoPage.addTodo('cleaning');
    await todoPage.editTodo('cleaning', 'doing laundry', 'Escape');
    await expect(todoPage.todoItems).toHaveText('cleaning');
  })

  test('check filters', async() => {
    await todoPage.addTodo('cleaning');
    await todoPage.addTodo('Cook');
    await todoPage.toggleTodo('Cook');

    await todoPage.filterBy('Completed');
    
    await todoPage.filterBy('Active');

    await todoPage.filterBy('All');

  });

  test('test clear completed', async() => {
    await todoPage.addTodo('cleaning');
    await todoPage.addTodo('Cook');
    await todoPage.toggleTodo('Cook');

    await todoPage.clearCompleted();
    await expect(todoPage.todoCount).toHaveText('1 item left');
  });

});

