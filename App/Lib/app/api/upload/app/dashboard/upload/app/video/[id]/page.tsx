import { supabase } from '@/lib/supabase';
import BuyButton from '@/components/BuyButton';

export default async function VideoPage({ params }: { params: { id: string } }) {
  const { data: video } = await supabase.from('videos').select('*').eq('id', params.id).single();
  if (!video) return <div>Not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{video.title}</h1>
      <div className="bg-gray-200 h-64 my-4" />
      <BuyButton videoId={video.id} price={video.price} />
    </div>
  );
}
