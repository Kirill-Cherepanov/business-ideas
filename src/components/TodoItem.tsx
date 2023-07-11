type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
};

export function TodoItem({ id, title, complete }: TodoItemProps) {
  return (
    <li key={id}>
      <button>Complete</button>
      <button>Delete</button>
      {title}
    </li>
  );
}
