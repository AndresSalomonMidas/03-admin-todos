'use client';

import { Todo } from '@prisma/client';
// import * as todosApi from '@/todos/helpers/todos';
// import { useRouter } from 'next/navigation';
import { TodoItem } from './TodoItem';
import { toggleTodo } from '../actions/todo-actions';

interface Props {
  todos?: Todo[]
}

// CON SERVER ACTIONS
export const TodosGrid = ({ todos = [] }: Props) => (
  <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
    ))}
  </div>
);

// CON API REST
// export const TodosGrid = ({ todos = [] }: Props) => {
//   const router = useRouter();

//   const toggleTodo = async (id: string, complete: boolean) => {
//     await todosApi.updateTodo(id, complete);

//     router.refresh(); // refresh current route and update the components
//   };

//   return (
//     <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
//       {todos.map((todo) => (
//         <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
//       ))}
//     </div>
//   );
// };
