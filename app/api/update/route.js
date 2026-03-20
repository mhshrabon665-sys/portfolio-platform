import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

// Call the Edge Function to delete old photo
async function deleteOldPhoto(filePath) {
  try {
    const res = await fetch(
      'https://jrgtzyqsfgtjmugllsgz.supabase.co/functions/v1/delete-old-photo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': process.env.SUPABASE_SERVICE_ROLE_KEY,
        },
        body: JSON.stringify({ filePath }),
      }
    );
    const result = await res.json();
    console.log('[edge-delete]', res.status, JSON.stringify(result));
  } catch (e) {
    console.error('[edge-delete] error:', e.message);
  }
}

// Extract storage path from Supabase public URL
function extractPath(url) {
  if (!url) return null;
  try {
    const parts = url.split('/portfolio-photos/');
    if (parts.length < 2) return null;
    return decodeURIComponent(parts[1].split('?')[0]);
  } catch {
    return null;
  }
}

export async function PUT(request) {
  try {
    const { username, password, portfolioData, photo, themeId } = await request.json();

    if (!username || !password || !portfolioData) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const u = username.toLowerCase();

    const { data, error } = await supabaseAdmin
      .from('portfolios')
      .select('password_hash, photo_url')
      .eq('username', u)
      .single();

    if (error || !data) {
      return Response.json({ error: 'Portfolio not found.' }, { status: 404 });
    }

    const match = await bcrypt.compare(password, data.password_hash);
    if (!match) {
      return Response.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    let photoUrl = data.photo_url;
    const oldPath = extractPath(data.photo_url);

    if (photo && photo.startsWith('data:image')) {
      // Upload new photo
      const base64Data = photo.split(',')[1];
      const mimeType = photo.split(';')[0].split(':')[1];
      const ext = mimeType.split('/')[1] || 'jpg';
      const fileName = `${u}/photo_${Date.now()}.${ext}`;
      const buffer = Buffer.from(base64Data, 'base64');

      const { error: uploadError } = await supabaseAdmin.storage
        .from('portfolio-photos')
        .upload(fileName, buffer, { contentType: mimeType, upsert: false });

      if (!uploadError) {
        const { data: urlData } = supabaseAdmin.storage
          .from('portfolio-photos')
          .getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
        // Delete old photo via Edge Function
        if (oldPath) await deleteOldPhoto(oldPath);
      }

    } else if (photo === null) {
      photoUrl = null;
      if (oldPath) await deleteOldPhoto(oldPath);
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
