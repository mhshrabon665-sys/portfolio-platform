import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Delete a specific file from storage by its path
    const deleteFile = async (filePath) => {
      try {
        console.log('[photo] deleting:', filePath);
        const { error: delError } = await supabaseAdmin.storage
          .from('portfolio-photos')
          .remove([filePath]);
        if (delError) console.error('[photo] delete error:', delError.message);
        else console.log('[photo] deleted ok:', filePath);
      } catch (e) {
        console.error('[photo] delete exception:', e.message);
      }
    };

    // Extract file path from a Supabase storage URL
    const extractPath = (url) => {
      if (!url) return null;
      const marker = '/portfolio-photos/';
      const idx = url.indexOf(marker);
      if (idx === -1) return null;
      return decodeURIComponent(url.slice(idx + marker.length).split('?')[0]);
    };

    let photoUrl = data.photo_url;

    if (photo && photo.startsWith('data:image')) {
      // Delete old photo first
      const oldPath = extractPath(data.photo_url);
      if (oldPath) await deleteFile(oldPath);

      // Upload new photo with timestamp filename (unique URL = no CDN cache)
      const base64Data = photo.split(',')[1];
      const mimeType = photo.split(';')[0].split(':')[1];
      const ext = mimeType.split('/')[1] || 'jpg';
      const fileName = `${u}/photo_${Date.now()}.${ext}`;
      const buffer = Buffer.from(base64Data, 'base64');

      console.log('[photo] uploading:', fileName);
      const { error: uploadError } = await supabaseAdmin.storage
        .from('portfolio-photos')
        .upload(fileName, buffer, { contentType: mimeType, upsert: false });

      if (uploadError) {
        console.error('[photo] upload error:', uploadError.message);
      } else {
        const { data: urlData } = supabaseAdmin.storage
          .from('portfolio-photos')
          .getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
        console.log('[photo] new url:', photoUrl);
      }
    } else if (photo === null) {
      // User removed photo — delete from storage
      const oldPath = extractPath(data.photo_url);
      if (oldPath) await deleteFile(oldPath);
      photoUrl = null;
    }
    // photo === undefined means no change — keep existing photoUrl

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
