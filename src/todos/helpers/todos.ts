import { Todo } from '@prisma/client';

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const body = { complete };

  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const todoJson = await todo.json();

  return todoJson;
};
