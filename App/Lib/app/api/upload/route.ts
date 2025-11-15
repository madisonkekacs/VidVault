import { supabase } from '@/lib/supabase';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const title = formData.get('title') as string;
  const price = formData.get('price') as string;
  const userId = req.headers.get('x-user-id');

  if (!file || !title || !price || !userId) {
    return new Response('Missing data', { status: 400 });
  }

  const { data: storageData } = await supabase.storage
    .from('videos')
    .upload(`public/${userId}/${file.name}`, file);

  const { data } = await supabase
    .from('videos')
    .insert({
      title,
      price: parseFloat(price),
      creator_id: userId,
      storage_path: storageData?.path,
      for_sale: true,
    })
    .select()
    .single();

  return Response.json({ video: data });
};
