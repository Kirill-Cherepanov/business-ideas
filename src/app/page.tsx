import { TodoItem } from '@/components/TodoItem';
import { prisma } from '@/db';

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <main>
      <h1>Todos</h1>
      <button>New</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </main>
  );
}
