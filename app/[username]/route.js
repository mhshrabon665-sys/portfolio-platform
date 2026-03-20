import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function PUT(request) {
  try {
    const { username, password, portfolioData, photo, themeId } = await request.json();

    if (!username || !password || !portfolioData) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const u = username.toLowerCase();

    // Verify password first
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

    // Helper: delete old photo from storage bucket
    const deleteOldPhoto = async () => {
      if (!data.photo_url) return;
      try {
        // Extract file path from URL: everything after /portfolio-photos/
        const marker = '/portfolio-photos/';
        const idx = data.photo_url.indexOf(marker);
        if (idx !== -1) {
          const filePath = decodeURIComponent(data.photo_url.slice(idx + marker.length).split('?')[0]);
          await supabaseAdmin.storage.from('portfolio-photos').remove([filePath]);
        }
      } catch (e) {
        console.warn('Old photo delete failed (non-critical):', e.message);
      }
    };

    let photoUrl = data.photo_url;

    if (photo && photo.startsWith('data:image')) {
      // New photo uploaded — delete old one first, then upload new
      await deleteOldPhoto();

      const base64Data = photo.split(',')[1];
      const mimeType = photo.split(';')[0].split(':')[1];
      const ext = mimeType.split('/')[1] || 'jpg';
      const fileName = `${u}/photo.${ext}`;
      const buffer = Buffer.from(base64Data, 'base64');

      const { error: uploadError } = await supabaseAdmin.storage
        .from('portfolio-photos')
        .upload(fileName, buffer, { contentType: mimeType, upsert: true });

      if (!uploadError) {
        const { data: urlData } = supabaseAdmin.storage
          .from('portfolio-photos')
          .getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
      }
    } else if (photo === null) {
      // User explicitly removed photo — delete from storage too
      await deleteOldPhoto();
      photoUrl = null;
    }
    // if photo is undefined — not changed, keep existing photoUrl

    // Update database
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
