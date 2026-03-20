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

    let photoUrl = data.photo_url;
    let oldFilePath = null;

    if (photo && photo.startsWith('data:image')) {
      // Extract old file path BEFORE uploading new one
      if (data.photo_url) {
        try {
          // URL format: .../storage/v1/object/public/portfolio-photos/USERNAME/FILENAME
          // Split on 'portfolio-photos/' and take everything after, strip query params
          const parts = data.photo_url.split('portfolio-photos/');
          if (parts.length > 1) {
            oldFilePath = decodeURIComponent(parts[1].split('?')[0]);
          }
        } catch (e) {
          console.error('Path extraction failed:', e.message);
        }
      }

      // Upload new photo with timestamp in filename
      const base64Data = photo.split(',')[1];
      const mimeType = photo.split(';')[0].split(':')[1];
      const ext = mimeType.split('/')[1] || 'jpg';
      const fileName = `${u}/photo_${Date.now()}.${ext}`;
      const buffer = Buffer.from(base64Data, 'base64');

      const { error: uploadError } = await supabaseAdmin.storage
        .from('portfolio-photos')
        .upload(fileName, buffer, { contentType: mimeType, upsert: false });

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
      } else {
        const { data: urlData } = supabaseAdmin.storage
          .from('portfolio-photos')
          .getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
      }

    } else if (photo === null) {
      // User removed photo
      if (data.photo_url) {
        try {
          const parts = data.photo_url.split('portfolio-photos/');
          if (parts.length > 1) {
            oldFilePath = decodeURIComponent(parts[1].split('?')[0]);
          }
        } catch (e) {}
      }
      photoUrl = null;
    }

    // Update DB first
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

    // Delete old file AFTER DB is updated successfully
    if (oldFilePath) {
      console.log('Deleting old file:', oldFilePath);
      const { error: delError } = await supabaseAdmin.storage
        .from('portfolio-photos')
        .remove([oldFilePath]);
      if (delError) console.error('Delete failed:', delError.message);
      else console.log('Deleted successfully:', oldFilePath);
    }

    return Response.json({ success: true });

  } catch (err) {
    console.error('Update error:', err);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
