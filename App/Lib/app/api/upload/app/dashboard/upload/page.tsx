'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleUpload = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('price', price);

    await fetch('/api/upload', {
      method: 'POST',
      headers: { 'x-user-id': user.id },
      body: formData,
    });

    alert('Uploaded!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full my-2" />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full my-2" />
      <button onClick={handleUpload} className="bg-red-600 text-white w-full py-2">Upload</button>
    </div>
  );
}
