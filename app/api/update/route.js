import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

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

function extractPath(url) {
  if (!url) return null;
  try {
    const parts = url.split('/portfolio-photos/');
    if (parts.length < 2) return null;
    return decodeURIComponent(parts[1].split('?')[0]);
  } catch { return null; }
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

    if (error || !data) return Response.json({ error: 'Portfolio not found.' }, { status: 404 });

    const match = await bcrypt.compare(password, data.password_hash);
    if (!match) return Response.json({ error: 'Incorrect password.' }, { status: 401 });

    let photoUrl = data.photo_url;

    if (photo && photo.startsWith('data:image')) {
      const mimeType = photo.split(';')[0].split(':')[1];
      const base64Data = photo.split(',')[1];
      photoUrl = await uploadToCloudinary(base64Data, mimeType);
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
    console.error('Update error:', err.message);
    return Response.json({ error: 'Server error: ' + err.message }, { status: 500 });
  }
}
