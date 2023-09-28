import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
