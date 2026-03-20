import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

async function uploadToCloudinary(base64Data, mimeType) {
  const dataUri = `data:${mimeType};base64,${base64Data}`;
  const formData = new FormData();
  formData.append('file', dataUri);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'portfolio-photos');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
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
    console.error('Update error:', err);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
