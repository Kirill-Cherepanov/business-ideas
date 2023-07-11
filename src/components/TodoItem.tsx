'use client';

import { deleteTodo, toggleTodo } from '@/functions/todoFunctions';

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
};

export function TodoItem({ id, title, complete }: TodoItemProps) {
  return (
    <li key={id}>
      <button onClick={() => toggleTodo(id, !complete)}>Complete</button>
      <button onClick={() => deleteTodo(id)}>Delete</button>
      {title}
    </li>
  );
}
