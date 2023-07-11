import { TodoItem } from '@/components/TodoItem';
import { prisma } from '@/db';
import Link from 'next/link';
import { getTodos } from '@/functions/todoFunctions';

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header>
        <h1>Todos</h1>
      </header>
      <main>
        <Link href="/new">New</Link>
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      </main>
    </>
  );
}
