import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Inserción en la BD
  // La idea del Seed es que purgue la BD antes de insertar otro dato
  await prisma.todo.deleteMany(); // DELETE * FROM todo

  const todo = await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra del poder' },
      { description: 'Piedra del tiempo', complete: true },
      { description: 'Piedra del espacio' },
      { description: 'Piedra de la realidad' },
    ],
  });

  console.log(todo);

  return NextResponse.json({ message: 'Seed Executed' });
}
