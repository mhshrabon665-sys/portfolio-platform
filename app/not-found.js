export default function NotFound() {
  return (
    <html lang="en">
      <head><title>Portfolio Not Found</title></head>
      <body style={{margin:0,background:'#0d1117',color:'#e6edf3',fontFamily:'Inter,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',flexDirection:'column',gap:16}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',color:'#0ea5e9',fontSize:'1.1rem'}}>{'<404 />'}</div>
        <h1 style={{margin:0,fontSize:'1.4rem'}}>Portfolio not found</h1>
        <p style={{color:'#8b949e',fontSize:'0.9rem'}}>This username doesn't exist yet.</p>
        <a href="/portfolio" style={{color:'#0ea5e9',textDecoration:'none',fontSize:'0.9rem',border:'1px solid #0ea5e9',padding:'8px 20px',borderRadius:8}}>Build yours →</a>
      </body>
    </html>
  );
}
