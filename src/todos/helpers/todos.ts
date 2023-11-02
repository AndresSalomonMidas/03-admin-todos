import { Todo } from '@prisma/client';

export const sleep = (seconds: number = 0): Promise<boolean> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, 1000 * seconds);
});

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
  // TODO: optimistic update
  // await sleep(2); // To test updates and loaders properly

  const body = { complete };

  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const todoJson = await todo.json();

  return todoJson;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const todo = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const todoJson = await todo.json();

  return todoJson;
};

export const deleteCompletedTodos = async (): Promise<boolean> => {
  await fetch('/api/todos', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  return true;
};
