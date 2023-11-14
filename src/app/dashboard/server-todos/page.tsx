import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

// Estos routes segments funcionan mejor con las server actions
// Caso contrario, se pueden utilizar con el fetch
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos',
};

/*
  Para usar una url en el fetch:
  Client component: url relativa
  Server component: url absoluta
*/

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <>
      <span className='text-3xl mb-10'>Server Actions</span>

      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  );
}
