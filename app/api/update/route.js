import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

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

export async function PUT(request) {
  try {
    const { username, password, portfolioData, photo, themeId } = await request.json();

    if (!username || !password || !portfolioData) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const u = username.toLowerCase();
    const { data, error } = await supabaseAdmin
      .from('portfolios').select('password_hash, photo_url').eq('username', u).single();

    if (error || !data) {
      return Response.json({ error: 'Portfolio not found.' }, { status: 404 });
    }

    const match = await bcrypt.compare(password, data.password_hash);
    if (!match) {
      return Response.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    let photoUrl = data.photo_url;

    if (photo && photo.startsWith('data:image')) {
      const base64Data = photo.split(',')[1];
      photoUrl = await uploadToImgbb(base64Data);
    } else if (photo === null) {
      photoUrl = null;
    }

    const { error: updateError } = await supabaseAdmin
      .from('portfolios')
      .update({
        portfolio_data: portfolioData,
        photo_url: photoUrl,
        theme_id: themeId || 'ocean',
        updated_at: new Date().toISOString(),
      })
      .eq('username', u);

    if (updateError) throw updateError;

    return Response.json({ success: true });
  } catch (err) {
    console.error('Update error:', err);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
