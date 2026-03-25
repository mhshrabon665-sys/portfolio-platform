import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: 'Missing fields.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('portfolios')
      .select('password_hash, portfolio_data, photo_url, theme_id')
      .eq('username', username.toLowerCase())
      .single();

    if (error || !data) {
      return Response.json({ error: 'Portfolio not found.' }, { status: 404 });
    }

    const match = await bcrypt.compare(password, data.password_hash);
    if (!match) {
      return Response.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    return Response.json({
      success: true,
      portfolioData: data.portfolio_data,
      photoUrl: data.photo_url,
      themeId: data.theme_id,
    });

  } catch (err) {
    console.error('Verify error:', err);
    return Response.json({ error: 'Server error.' }, { status: 500 });
  }
}
