'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Builder = dynamic(() => import('@/components/Builder'), { ssr: false });

const C = { bg:'#0d1117',surf:'#161b22',surf2:'#21262d',border:'#30363d',text:'#e6edf3',muted:'#8b949e',accent:'#0ea5e9',danger:'#f87171' };

export default function EditPage() {
  const { username } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editData, setEditData] = useState(null);
  const [checking, setChecking] = useState(true);

  // On mount: restore session so nav hash changes don't reset auth
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(`edit_${username}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate it's not stale (max 2 hours)
        if (parsed.ts && Date.now() - parsed.ts < 7200000) {
          setEditData(parsed);
        } else {
          sessionStorage.removeItem(`edit_${username}`);
        }
      }
    } catch(e) {}
    setChecking(false);
  }, [username]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Incorrect password.'); return; }
      const session = { ...data, password, ts: Date.now() };
      try { sessionStorage.setItem(`edit_${username}`, JSON.stringify(session)); } catch(e) {}
      setEditData(session);
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublished = () => {
    try { sessionStorage.removeItem(`edit_${username}`); } catch(e) {}
    router.push(`/${username}`);
  };

  // Show nothing while checking sessionStorage (avoids flash of password form)
  if (checking) {
    return (
      <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:34,height:34,border:`3px solid ${C.surf2}`,borderTopColor:C.accent,borderRadius:'50%',animation:'spin 0.75s linear infinite'}}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (editData) {
    return (
      <Builder
        initialData={editData.portfolioData}
        initialPhoto={editData.photoUrl}
        initialTheme={editData.themeId}
        editMode={true}
        editUsername={username}
        editPassword={editData.password}
        onPublished={handlePublished}
      />
    );
  }

  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,sans-serif'}}>
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:'36px 40px',width:'100%',maxWidth:400}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',color:C.accent,fontSize:'0.9rem',marginBottom:8}}>{'<edit-portfolio />'}</div>
        <h1 style={{fontSize:'1.2rem',fontWeight:700,color:C.text,marginBottom:4}}>
          Edit <span style={{color:C.accent}}>{username}</span>
        </h1>
        <p style={{fontSize:'0.8rem',color:C.muted,marginBottom:24}}>Enter your portfolio password to unlock the editor.</p>
        <form onSubmit={handleUnlock}>
          <label style={{display:'block',fontSize:'0.68rem',color:C.muted,marginBottom:6,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Your portfolio password"
            autoFocus
            style={{width:'100%',padding:'10px 14px',background:C.surf2,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:'0.9rem',outline:'none',boxSizing:'border-box',marginBottom:error?8:16}}
          />
          {error && <p style={{fontSize:'0.76rem',color:C.danger,marginBottom:12}}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            style={{width:'100%',padding:'11px',borderRadius:8,background:loading?C.surf2:C.accent,border:'none',color:'#000',fontWeight:700,fontSize:'0.9rem',cursor:loading||!password?'not-allowed':'pointer',opacity:!password?0.5:1}}
          >
            {loading ? 'Checking…' : '🔓 Unlock Editor'}
          </button>
        </form>
        <div style={{marginTop:16,textAlign:'center'}}>
          <a href={`/${username}`} style={{fontSize:'0.76rem',color:C.muted,textDecoration:'none'}}>← View portfolio</a>
        </div>
      </div>
    </div>
  );
}
