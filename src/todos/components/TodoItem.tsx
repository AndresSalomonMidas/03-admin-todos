'use client';

import { useOptimistic, startTransition } from 'react';
import { Todo } from '@prisma/client';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  // Acciones que quiero llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state: any, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue }),
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.complete);
      });
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      // Mostrar algún error handler
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.complete);
      });
    }
  };

  return (
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <button
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
          onClick={onToggleTodo}
          className={`
          flex p-2 rounded-md cursor-pointer text-black
          hover:bg-opacity-60
          ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'}
      `}>
          {todoOptimistic.complete
            ? <IoCheckboxOutline size={30} />
            : <IoSquareOutline size={30} />
          }
        </button>

        <div className='text-center sm:text-left text-black'>
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
