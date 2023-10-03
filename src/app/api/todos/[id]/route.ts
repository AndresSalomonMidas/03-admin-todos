import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  return todo;
};

// eslint-disable-next-line no-unused-vars
export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: 'Todo no encontrado o no existe' },
      { status: 400 },
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await getTodo(id);

  // Solo para asegurarse que existe el todo
  if (!todo) {
    return NextResponse.json(
      { message: 'Todo no encontrado o no existe' },
      { status: 400 },
    );
  }

  try {
    const { complete, description } = await putSchema.validate(await request.json());

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
