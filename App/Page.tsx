import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .eq("for_sale", true);

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
        VidSell
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {videos?.map((v) => (
          <a href={`/video/${v.id}`} key={v.id} className="border p-4 rounded">
            <div className="bg-gray-200 h-40 mb-2" />
            <h3 className="font-bold">{v.title}</h3>
            <p className="text-red-600">${v.price}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
