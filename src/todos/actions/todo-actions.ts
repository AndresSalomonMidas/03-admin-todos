'use server';

import prisma from '@/lib/prisma';
import type { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

/**
 * Sleeps for the specified number of seconds.
 *
 * @param {number} seconds - The number of seconds to sleep.
 * @return {Promise<boolean>} A promise that resolves to true after the specified number of seconds.
 */
export const sleep = (seconds: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, seconds * 1000);
});

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw new Error(`Todo con id ${id} no encontrado`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  // Revalidar o refresh el path para que se muestren los cambios
  // Similar al route.refresh() solo que del lado del servidor
  revalidatePath('/dashboard/server-todos');

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: { description },
    });

    revalidatePath('/dashboard/server-todos');

    return todo;
  } catch (error) {
    return {
      message: 'Error al crear el TODO',
      error,
    };
  }
};

export const deleteCompletedTodos = async () => {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath('/dashboard/server-todos');
};
