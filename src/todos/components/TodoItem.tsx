import { Todo } from '@prisma/client';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  // Acciones que quiero llamar
}

export const TodoItem = ({ todo }: Props) => (
  <div className={todo.complete ? styles.todoDone : styles.todoPending}>
    <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
      <div className={`
        flex p-2 rounded-md cursor-pointer text-black
        hover:bg-opacity-60
        ${todo.complete ? 'bg-blue-100' : 'bg-red-100'}
      `}>
        {todo.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
      </div>

      <div className='text-center sm:text-left text-black'>
        {todo.description}
      </div>
    </div>
  </div>
);
