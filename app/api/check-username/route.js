import { supabaseAdmin } from '@/lib/supabase';
import { RESERVED } from '@/lib/builderData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('u')?.toLowerCase().trim();

  if (!username) return Response.json({ error: 'No username provided' }, { status: 400 });

  // Validate format: 3-30 chars, alphanumeric + hyphens only
  if (!/^[a-z0-9-]{3,30}$/.test(username)) {
    return Response.json({ available: false, reason: 'Username must be 3–30 characters, letters, numbers and hyphens only.' });
  }

  // Check reserved
  if (RESERVED.includes(username)) {
    return Response.json({ available: false, reason: 'This username is reserved.' });
  }

  // Check database
  const { data } = await supabaseAdmin
    .from('portfolios')
    .select('username')
    .eq('username', username)
    .single();

  return Response.json({ available: !data });
}
