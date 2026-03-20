import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

// Delete a storage file using direct HTTP — more reliable in serverless than JS client
async function deleteStorageFile(filePath) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/portfolio-photos/${encodeURIComponent(filePath)}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('[delete] status:', res.status, 'path:', filePath);
    return res.ok;
  } catch (e) {
    console.error('[delete] error:', e.message);
    return false;
  }
}

// Extract storage path from a Supabase public URL
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
      // Step 1: Upload new photo first
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

        // Step 2: Delete old photo via direct HTTP after successful upload
        if (oldPath) await deleteStorageFile(oldPath);
      }

    } else if (photo === null) {
      photoUrl = null;
      if (oldPath) await deleteStorageFile(oldPath);
    }

    // Step 3: Update database
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
