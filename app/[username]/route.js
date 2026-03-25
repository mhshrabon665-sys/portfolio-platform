import { supabaseAdmin } from '@/lib/supabase';
import { genHTML } from '@/lib/genHTML';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request, { params }) {
  const { data, error } = await supabaseAdmin
    .from('portfolios')
    .select('portfolio_data, photo_url, theme_id')
    .eq('username', params.username)
    .single();

  if (error || !data) {
    return new Response(
      `<!DOCTYPE html><html><head><title>Not Found</title></head>
      <body style="background:#0d1117;color:#e6edf3;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px;margin:0;">
        <div style="font-family:'JetBrains Mono',monospace;color:#0ea5e9;">&lt;404 /&gt;</div>
        <h1 style="margin:0;font-size:1.4rem;">Portfolio not found</h1>
        <p style="color:#8b949e;font-size:0.9rem;">This username does not exist yet.</p>
        <a href="/portfolio" style="color:#0ea5e9;text-decoration:none;border:1px solid #0ea5e9;padding:8px 20px;border-radius:8px;">Build yours &rarr;</a>
      </body></html>`,
      { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const html = genHTML(data.portfolio_data, data.photo_url, data.theme_id, params.username);

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
