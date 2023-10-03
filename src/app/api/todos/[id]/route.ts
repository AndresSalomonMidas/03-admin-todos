import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Segments {
  params: {
    id: string
  }
}

// eslint-disable-next-line no-unused-vars
export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json(
      { message: 'Todo no encontrado o no existe' },
      { status: 400 },
    );
  }

  return NextResponse.json(todo);
}

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  // Solo para asegurarse que existe el todo
  if (!todo) {
    return NextResponse.json(
      { message: 'Todo no encontrado o no existe' },
      { status: 400 },
    );
  }

  const body = await request.json();

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedTodo);
}
