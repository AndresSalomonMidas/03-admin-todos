import prisma from '@/lib/prisma';

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
      <h1>RestTodos Page</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
}
