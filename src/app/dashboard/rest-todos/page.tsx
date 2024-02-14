import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos',
};

/*
  Para usar una url en el fetch:
  Client component: url relativa
  Server component: url absoluta
*/

export default async function RestTodosPage() {
  // Client
  // useEffect(() => {
  //   fetch('/api/todos')
  //     .then((resp) => resp.json())
  //     .then((json) => console.log(json));
  // }, []);

  const session = await getServerSession(authOptions);

  if (!session?.user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
    orderBy: { description: 'asc' },
  });

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
