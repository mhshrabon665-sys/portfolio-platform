import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { RESERVED } from '@/lib/builderData';

async function uploadToCloudinary(base64Data, mimeType) {
  // Convert base64 to Blob to avoid mimeType slash issues with JSON body
  const byteCharacters = atob(base64Data);
  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([byteArray], { type: mimeType });

  const formData = new FormData();
  formData.append('file', blob, 'photo');
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
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
      const mimeType = photo.split(';')[0].split(':')[1];
      const base64Data = photo.split(',')[1];
      photoUrl = await uploadToCloudinary(base64Data, mimeType);
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
    console.error('Publish error:', err.message);
    return Response.json({ error: 'Server error: ' + err.message }, { status: 500 });
  }
}
