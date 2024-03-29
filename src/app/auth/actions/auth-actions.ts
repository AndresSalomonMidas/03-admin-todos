'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0],
    },
  });

  return user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If user doesn't exist, create it
  if (!user) {
    const dbUser = await createUser(email, password);

    return dbUser;
  }

  // If user exists, compare passwords - if don't match, return null
  if (!bcrypt.compareSync(password, user.password ?? '')) return null;

  return user;
};
