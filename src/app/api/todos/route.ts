import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as yup from 'yup';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10'); // default 10
  const skip = Number(searchParams.get('skip') ?? '0'); // default 0

  // check if take is a number
  if (Number.isNaN(take)) {
    return NextResponse.json(
      { message: 'Take tiene que ser un número' },
      { status: 400 },
    );
  }

  // check if skip is a number
  if (Number.isNaN(skip)) {
    return NextResponse.json(
      { message: 'Skip tiene que ser un número' },
      { status: 400 },
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return NextResponse.json('No auth', { status: 401 });

  try {
    const { complete, description } = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({
      data: { complete, description, userId: session?.user.id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return NextResponse.json('No auth', { status: 401 });

  try {
    await prisma.todo.deleteMany({ where: { complete: true, userId: session?.user.id } });

    return NextResponse.json('Todos deleted');
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
