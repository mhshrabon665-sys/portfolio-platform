import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { RESERVED } from '@/lib/builderData';

export async function POST(request) {
  try {
    const { username, password, portfolioData, photo, themeId } = await request.json();

    // Validate
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

    // Check if taken
    const { data: existing } = await supabaseAdmin
      .from('portfolios')
      .select('username')
      .eq('username', u)
      .single();

    if (existing) {
      return Response.json({ error: 'Username already taken.' }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Handle photo — store in Supabase Storage if provided
    let photoUrl = null;
    if (photo && photo.startsWith('data:image')) {
      const base64Data = photo.split(',')[1];
      const mimeType = photo.split(';')[0].split(':')[1];
      const ext = mimeType.split('/')[1];
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
    }

    // Save to database
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
