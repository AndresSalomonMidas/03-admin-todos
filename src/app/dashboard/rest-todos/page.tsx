import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

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

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
