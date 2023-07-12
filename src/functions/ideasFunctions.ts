'use server';

import { Idea } from '@/database';

export async function getIdeas() {
  'use server';

  return await Idea.find();
}

// export async function editIdea(id: string, complete: boolean) {
//   'use server';

//   const t = await Idea.updateMany({ id });
// }

export async function deleteIdea(id: string) {
  'use server';

  await Idea.findByIdAndDelete(id);
}
