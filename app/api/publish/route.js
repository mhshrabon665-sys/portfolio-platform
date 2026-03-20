import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { RESERVED } from '@/lib/builderData';

async function uploadToImgbb(base64Data) {
  const formData = new URLSearchParams();
  formData.append('image', base64Data);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    { method: 'POST', body: formData }
  );
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message || 'imgbb upload failed');
  return data.data.url;
}

export async function POST(request) {
  try {
    const { username, password, portfolioData, photo, themeId } = await request.json();

    if (!username || !password || !portfolioData) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const u = username.toLowerCase().trim();
    if (!/^[a-z0-9-]{3,30}$/.test(u)) {
      return Response.json({ error: 'Invalid username format.' }, { status: 400 });
    }
    if (RESERVED.includes(u)) {
      return Response.json({ error: 'This username is reserved.' }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from('portfolios').select('username').eq('username', u).single();
    if (existing) {
      return Response.json({ error: 'Username already taken.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let photoUrl = null;
    if (photo && photo.startsWith('data:image')) {
      const base64Data = photo.split(',')[1];
      photoUrl = await uploadToImgbb(base64Data);
    }

    const { error } = await supabaseAdmin.from('portfolios').insert({
      username: u,
      password_hash: passwordHash,
      portfolio_data: portfolioData,
      photo_url: photoUrl,
      theme_id: themeId || 'ocean',
    });
    if (error) throw error;

    return Response.json({ success: true, url: `/${u}` });
  } catch (err) {
    console.error('Publish error:', err);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
