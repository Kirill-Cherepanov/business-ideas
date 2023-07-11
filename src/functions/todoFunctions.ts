'use server';

import { prisma } from '@/db';

export async function getTodos() {
  'use server';

  return prisma.todo.findMany();
}

export async function toggleTodo(id: string, complete: boolean) {
  'use server';

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export async function deleteTodo(id: string) {
  'use server';

  await prisma.todo.delete({ where: { id } });
}
