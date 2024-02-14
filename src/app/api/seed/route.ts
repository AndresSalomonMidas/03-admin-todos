import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  // Inserción en la BD
  // La idea del Seed es que purgue la BD antes de insertar otro dato
  await prisma.todo.deleteMany(); // DELETE * FROM todo
  await prisma.user.deleteMany(); // DELETE * FROM user

  // eslint-disable-next-line no-unused-vars
  const user = await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo', complete: true },
          { description: 'Piedra del espacio' },
          { description: 'Piedra de la realidad' },
        ],
      },
    },
  });

  // const todo = await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma', complete: true },
  //     { description: 'Piedra del poder' },
  //     { description: 'Piedra del tiempo', complete: true },
  //     { description: 'Piedra del espacio' },
  //     { description: 'Piedra de la realidad' },
  //   ],
  // });

  // console.log(todo);

  return NextResponse.json({ message: 'Seed Executed' });
}
