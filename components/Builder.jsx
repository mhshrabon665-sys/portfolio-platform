'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { genHTML } from '@/lib/genHTML';
import { THEMES, SOCIAL_META, BLANK_SOCIALS, INIT } from '@/lib/builderData';

const C = { bg:"#0d1117",surf:"#161b22",surf2:"#21262d",border:"#30363d",text:"#e6edf3",muted:"#8b949e",accent:"#0ea5e9",danger:"#f87171" };
const inp = { width:"100%",padding:"8px 12px",background:C.surf2,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:"0.84rem",outline:"none",fontFamily:"inherit",boxSizing:"border-box" };
const lbl = { display:"block",fontSize:"0.68rem",color:C.muted,marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em" };
// ─── BRAND ICONS ─────────────────────────────────────────────────────────────
const BRAND = {
  linkedin:     {path:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",color:"#0A66C2"},
  github:       {path:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",color:"#181717"},
  whatsapp:     {path:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",color:"#25D366"},
  facebook:     {path:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",color:"#1877F2"},
  twitter:      {path:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",color:"#000000"},
  instagram:    {path:"M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.059 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.059 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.059-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",color:"#E4405F"},
  youtube:      {path:"M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",color:"#FF0000"},
  website:      {path:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",color:"#4285F4"},
  telegram:     {path:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",color:"#26A5E4"},
  discord:      {path:"M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.13.14 18.2.198 18.244a19.896 19.896 0 0 0 5.993 3.03c.078.025.158-.006.204-.068l1.17-1.572a.077.077 0 0 0-.008-.105 13.28 13.28 0 0 1-1.895-.9.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.905.077.077 0 0 0-.007.105 19.5 19.5 0 0 0 1.162 1.615.076.076 0 0 0 .204.066A19.9 19.9 0 0 0 23.9 18.055c.06-.044.098-.113.1-.186.445-4.622-.773-8.632-3.683-12.797a.062.062 0 0 0-.032-.026zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",color:"#5865F2"},
  medium:       {path:"M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",color:"#000000"},
  stackoverflow:{path:"M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.093L6.785 12.743zM6 18h11v2H6zm.024 3.764l-.402 2.082 10.506 2.031.402-2.082z",color:"#F58025"},
  researchgate: {path:"M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.193 12.193 0 0 0-.39 2.948c0 .76.135 1.463.407 2.113a3.257 3.257 0 0 0 1.21 1.473c.54.352 1.177.528 1.915.528a3.91 3.91 0 0 0 1.59-.332 3.47 3.47 0 0 0 1.226-.952v1.073c0 .754-.172 1.335-.514 1.739-.342.404-.837.606-1.484.606-.46 0-.87-.119-1.228-.354a2.103 2.103 0 0 1-.776-.952l-1.501.657a3.576 3.576 0 0 0 1.39 1.718c.63.418 1.377.626 2.24.626a4.23 4.23 0 0 0 2.053-.49 3.406 3.406 0 0 0 1.373-1.408c.325-.607.488-1.317.488-2.13V.207h-1.686v.893a3.67 3.67 0 0 0-1.18-.74A3.994 3.994 0 0 0 19.586 0zm.005 1.537c.557 0 1.04.159 1.45.478.41.319.712.764.907 1.335a6.2 6.2 0 0 1 .296 1.985 4.93 4.93 0 0 1-.302 1.765c-.198.52-.491.93-.88 1.23-.388.3-.844.449-1.371.449-.545 0-1.025-.158-1.44-.474-.413-.316-.727-.768-.94-1.352a5.85 5.85 0 0 1-.317-1.992c0-.69.1-1.315.3-1.875.2-.56.499-1.003.898-1.329.4-.325.875-.488 1.399-.488v.263zm-9.586 0c-3.313 0-6.197 2.646-6.197 6.032 0 3.455 2.884 6.066 6.197 6.066a6.1 6.1 0 0 0 4.204-1.667v.85h1.687V7.569C15.896 4.103 13.168 1.537 10.005 1.537zm-.08 1.516c2.43 0 4.404 2.057 4.404 4.516 0 2.46-1.974 4.55-4.404 4.55-2.43 0-4.404-2.09-4.404-4.55 0-2.459 1.974-4.516 4.404-4.516zm0 2.19a2.324 2.324 0 0 0-2.323 2.326 2.324 2.324 0 0 0 2.323 2.324 2.324 2.324 0 0 0 2.323-2.324 2.324 2.324 0 0 0-2.323-2.326z",color:"#00CCBB"},
  orcid:        {path:"M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.209 3.872-3.722 0-2.016-1.284-3.722-3.872-3.722h-2.297z",color:"#A6CE39"},
  googlescholar:{path:"M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z",color:"#4285F4"},
  academia:     {letters:"Ac",color:"#41454A",fs:11},
  behance:      {path:"M22.5 6h-7.5v1.5h7.5V6zM9.75 10.5c.69 0 1.5-.45 1.5-1.5S10.44 7.5 9.75 7.5H3v9h6.75c.69 0 1.5-.45 1.5-1.5s-.56-1.5-1.5-1.5H4.5V12h5.25zm0 3H4.5v-1.5h5.25c.41 0 .75.34.75.75s-.34.75-.75.75zM4.5 9h5.25c.41 0 .75.34.75.75S10.16 10.5 9.75 10.5H4.5V9zM24 13.5H16.5c0 1.66 1.34 3 3 3s2.63-.84 2.91-2.25H24c-.28 2.09-2.1 3.75-4.5 3.75-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5zm-2.25-.75c-.25-1.03-1.16-1.75-2.25-1.75s-2 .72-2.25 1.75h4.5z",color:"#1769FF"},
  dribbble:     {path:"M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.966c.19-.38 2.81-5.04 7.99-6.75l.07-.024c-.36-.81-.75-1.62-1.15-2.41-4.948 1.48-9.745 1.415-10.2 1.406l-.016.025c0 2.64.976 5.054 2.6 6.9zm-2.58-8.293c.46.003 4.67.093 9.357-1.23-1.678-2.984-3.484-5.495-3.748-5.865C4.655 5.66 2.88 8.006 2.805 12.191zm7.283-8.57c.275.38 2.107 2.887 3.762 5.93 3.588-1.344 5.104-3.38 5.284-3.64-1.66-1.477-3.83-2.37-6.134-2.37-.985 0-1.93.14-2.845.4z",color:"#EA4C89"},
};

function BrandIcon({id, size=18}) {
  const b = BRAND[id];
  if (!b) return <span style={{fontSize:size*0.75,flexShrink:0}}>🌐</span>;
  if (b.letters) return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{flexShrink:0}}>
      <rect width="24" height="24" rx="5" fill={b.color}/>
      <text x="12" y={14+(24-(b.fs||10))/2} textAnchor="middle" fill="white" fontSize={b.fs||10} fontFamily="Arial" fontWeight="bold">{b.letters}</text>
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={b.color} style={{flexShrink:0}}>
      <path d={b.path}/>
    </svg>
  );
}



// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function RichEditor({value,onChange}){
  const editorRef=useRef();const[showLink,setShowLink]=useState(false);const[linkUrl,setLinkUrl]=useState("https://");const savedRange=useRef(null);
  useEffect(()=>{if(editorRef.current)editorRef.current.innerHTML=value||"";},[]);
  const saveSelection=()=>{const sel=window.getSelection();if(sel&&sel.rangeCount>0)savedRange.current=sel.getRangeAt(0).cloneRange();};
  const restoreSelection=()=>{if(!savedRange.current)return;const sel=window.getSelection();sel.removeAllRanges();sel.addRange(savedRange.current);};
  const exec=(cmd,val=null)=>{editorRef.current.focus();document.execCommand(cmd,false,val);onChange(editorRef.current.innerHTML);};
  const handleInsertLink=()=>{restoreSelection();editorRef.current.focus();document.execCommand("createLink",false,linkUrl);editorRef.current.querySelectorAll("a").forEach(a=>{a.setAttribute("target","_blank");a.style.color="var(--accent)";a.style.fontWeight="600";a.style.textDecoration="none";a.style.borderBottom="1px solid var(--accent)";});onChange(editorRef.current.innerHTML);setShowLink(false);};
  const tb=(active)=>({padding:"5px 11px",borderRadius:5,cursor:"pointer",fontSize:"0.8rem",fontWeight:700,border:`1px solid ${active?C.accent:C.border}`,background:active?C.accent:C.surf2,color:active?"#000":C.text,lineHeight:1.4,flexShrink:0});
  return(<div>
    <div style={{display:"flex",gap:5,padding:"7px 10px",background:C.surf2,borderRadius:"8px 8px 0 0",border:`1px solid ${C.border}`,borderBottom:"none",flexWrap:"wrap",alignItems:"center"}}>
      <button style={tb()} onMouseDown={e=>{e.preventDefault();exec("bold");}}><b>B</b></button>
      <button style={{...tb(),fontStyle:"italic"}} onMouseDown={e=>{e.preventDefault();exec("italic");}}><i>I</i></button>
      <button style={{...tb(),textDecoration:"underline"}} onMouseDown={e=>{e.preventDefault();exec("underline");}}><u>U</u></button>
      <div style={{width:1,height:18,background:C.border,margin:"0 2px"}}/>
      <button style={tb()} onMouseDown={e=>{e.preventDefault();saveSelection();setLinkUrl("https://");setShowLink(true);}}>🔗 Link</button>

    </div>
    {showLink&&(<div style={{display:"flex",gap:6,padding:"8px 10px",background:"#0f2132",border:`1px solid ${C.accent}`,borderTop:"none",alignItems:"center",flexWrap:"wrap"}}>
      <span style={{fontSize:"0.74rem",color:C.accent,fontWeight:600,flexShrink:0}}>🔗 URL:</span>
      <input autoFocus value={linkUrl} onChange={e=>setLinkUrl(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();handleInsertLink();}if(e.key==="Escape")setShowLink(false);}} placeholder="https://example.com" style={{...inp,flex:1,padding:"5px 10px",minWidth:180}}/>
      <button onMouseDown={e=>{e.preventDefault();handleInsertLink();}} style={{padding:"5px 14px",borderRadius:5,background:C.accent,border:"none",color:"#000",cursor:"pointer",fontSize:"0.76rem",fontWeight:700,flexShrink:0}}>Insert</button>
      <button onMouseDown={e=>{e.preventDefault();setShowLink(false);}} style={{padding:"5px 10px",borderRadius:5,background:"transparent",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",fontSize:"0.76rem",flexShrink:0}}>Cancel</button>
    </div>)}
    <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={()=>onChange(editorRef.current.innerHTML)} style={{...inp,minHeight:150,borderRadius:"0 0 8px 8px",borderTop:"none",padding:"12px 14px",lineHeight:1.85,outline:"none",whiteSpace:"pre-wrap",overflowY:"auto"}}/>
  </div>);
}
function Field({label,value,onChange,multiline,rows=3,placeholder=""}){
  return(<div style={{marginBottom:12}}>
    {label&&<label style={lbl}>{label}</label>}
    {multiline?<textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder} style={{...inp,resize:"vertical"}}/>:<input type="text" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={inp}/>}
  </div>);
}
function SCard({children}){return<div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px",marginBottom:12}}>{children}</div>;}
function CardHdr({label,onUp,onDown,onRemove}){
  const sb=(onClick,icon,danger)=><button onClick={onClick} style={{padding:"3px 8px",borderRadius:4,cursor:"pointer",fontSize:"0.72rem",fontWeight:600,background:"transparent",color:danger?C.danger:C.muted,border:`1px solid ${danger?C.danger:C.border}`}}>{icon}</button>;
  return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
    <span style={{fontSize:"0.68rem",color:C.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</span>
    <div style={{display:"flex",gap:4}}>{onUp&&sb(onUp,"↑",false)}{onDown&&sb(onDown,"↓",false)}{onRemove&&sb(onRemove,"✕",true)}</div>
  </div>);
}
function WBtn({label,onClick}){return<button onClick={onClick} style={{width:"100%",padding:"10px",borderRadius:8,background:"transparent",border:`1px dashed ${C.accent}`,color:C.accent,cursor:"pointer",fontSize:"0.8rem",fontWeight:600,marginTop:4}}>{label}</button>;}
function G2({children}){return<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{children}</div>;}
function ThemePicker({themeId,onChange}){
  const cats=[{id:"dark",label:"🌑 Dark"},{id:"mixed",label:"🌗 Mixed"},{id:"light",label:"☀️ Light"}];
  return(<div>{cats.map(cat=>(<div key={cat.id} style={{marginBottom:14}}>
    <div style={{fontSize:"0.64rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7}}>{cat.label}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
      {THEMES.filter(t=>t.cat===cat.id).map(t=>(<div key={t.id} onClick={()=>onChange(t.id)} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:`2px solid ${t.id===themeId?C.accent:C.border}`,transition:"border-color 0.15s"}}>
        <div style={{background:t.bg,padding:"10px 8px",display:"flex",flexDirection:"column",gap:4}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:t.accent}}/>
          <div style={{width:"100%",height:2,borderRadius:2,background:t.surf}}/>
          <div style={{width:"65%",height:2,borderRadius:2,background:t.accent}}/>
          <div style={{width:"80%",height:2,borderRadius:2,background:t.surf2}}/>
        </div>
        <div style={{padding:"5px 6px",background:C.surf2,textAlign:"center"}}>
          <div style={{fontSize:"0.56rem",color:t.id===themeId?C.accent:C.muted,fontWeight:t.id===themeId?700:400,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.name}</div>
        </div>
      </div>))}
    </div>
  </div>))}</div>);
}
// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS=[
  {id:"basic",icon:"👤",label:"Basic"},{id:"contact",icon:"📬",label:"Contact"},
  {id:"about",icon:"📝",label:"About"},{id:"skills",icon:"⚡",label:"Skills"},
  {id:"education",icon:"🎓",label:"Education"},{id:"experience",icon:"💼",label:"Experience"},
  {id:"projects",icon:"🚀",label:"Projects"},{id:"achievements",icon:"🏆",label:"Awards"},
  {id:"certifications",icon:"📜",label:"Certs"},{id:"leadership",icon:"🌟",label:"Leadership"},
  {id:"references",icon:"👥",label:"References"},
];
const TAB_DESC={
  basic:"Profile photo, name, headline, bio, video resume URL and portfolio theme.",
  contact:"Email, phone, location and all social / academic links.",
  about:"Rich text bio — bold, italic, underline and hyperlinks supported.",
  skills:"Grouped skill chips. Click any chip to edit inline.",
  education:"Academic qualifications in reverse chronological order.",
  experience:"Work history, internships and notable roles.",
  projects:"Showcase your best work. Toggle 'Featured' for a full-width card.",
  achievements:"Awards, competitions, honors and certifications.",
  certifications:"Courses, licences and professional certificates with optional verify links.",
  leadership:"Clubs, co-curriculars and community involvement.",
  references:"Professional references with their contact info.",
};
// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Builder({ initialData, initialPhoto, initialTheme, editMode=false, editUsername="", editPassword="", onPublished }) {
  const[d,setD]=useState({...(initialData||INIT),heroSocials:(initialData?.heroSocials)||(INIT.heroSocials)||['linkedin','github','whatsapp']});const[tab,setTab]=useState("basic");const[photo,setPhoto]=useState(initialPhoto||null);
  const[done,setDone]=useState(false);const[showPublish,setShowPublish]=useState(false);
  const[published,setPublished]=useState(null);const[themeId,setThemeId]=useState(initialTheme||"ocean");const fileRef=useRef();
  const[showEditHint,setShowEditHint]=useState(false);
  const[isMobile,setIsMobile]=useState(false);
  useEffect(()=>{const check=()=>setIsMobile(window.innerWidth<=768);check();window.addEventListener('resize',check);return()=>window.removeEventListener('resize',check);},[]);
  const upd=(k,v)=>setD(p=>({...p,[k]:v}));
  const updArr=(k,i,f,v)=>setD(p=>({...p,[k]:p[k].map((it,j)=>j===i?{...it,[f]:v}:it)}));
  const addArr=(k,tpl)=>setD(p=>({...p,[k]:[...p[k],{...tpl}]}));
  const rmArr=(k,i)=>setD(p=>({...p,[k]:p[k].filter((_,j)=>j!==i)}));
  const mvArr=(k,i,dir)=>setD(p=>{const a=[...p[k]],n=i+dir;if(n<0||n>=a.length)return p;[a[i],a[n]]=[a[n],a[i]];return{...p,[k]:a};});
  const updSocial=(k,v)=>setD(p=>({...p,socials:{...p.socials,[k]:v}}));
  const updBullet=(ei,bi,v)=>setD(p=>({...p,experience:p.experience.map((e,j)=>j!==ei?e:{...e,bullets:e.bullets.map((b,k)=>k===bi?v:b)})}));
  const addBullet=ei=>setD(p=>({...p,experience:p.experience.map((e,j)=>j!==ei?e:{...e,bullets:[...e.bullets,""]})}));
  const rmBullet=(ei,bi)=>setD(p=>({...p,experience:p.experience.map((e,j)=>j!==ei?e:{...e,bullets:e.bullets.filter((_,k)=>k!==bi)})}));
  const updSkill=(gi,si,v)=>setD(p=>({...p,skillGroups:p.skillGroups.map((g,j)=>j!==gi?g:{...g,skills:g.skills.map((s,k)=>k===si?v:s)})}));
  const addSkill=gi=>setD(p=>({...p,skillGroups:p.skillGroups.map((g,j)=>j!==gi?g:{...g,skills:[...g.skills,""]})}));
  const rmSkill=(gi,si)=>setD(p=>({...p,skillGroups:p.skillGroups.map((g,j)=>j!==gi?g:{...g,skills:g.skills.filter((_,k)=>k!==si)})}));
  const updTag=(pi,ti,v)=>setD(p=>({...p,projects:p.projects.map((pr,j)=>j!==pi?pr:{...pr,tags:pr.tags.map((t,k)=>k===ti?v:t)})}));
  const addTag=pi=>setD(p=>({...p,projects:p.projects.map((pr,j)=>j!==pi?pr:{...pr,tags:[...pr.tags,""]})}));
  const rmTag=(pi,ti)=>setD(p=>({...p,projects:p.projects.map((pr,j)=>j!==pi?pr:{...pr,tags:pr.tags.filter((_,k)=>k!==ti)})}));
  const handlePhoto=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setPhoto(ev.target.result);r.readAsDataURL(f);};
  // download replaced by publish modal
function buildPdfHtml(d){
  const e=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const lh=d.socials?.linkedin?d.socials.linkedin.replace(/.*linkedin\.com\/in\//,""):"";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${e(d.name)} — CV</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',Arial,sans-serif;font-size:10.5pt;color:#111;background:#fff;padding:22mm 24mm;}
h1{font-size:21pt;font-weight:700;letter-spacing:-0.02em;margin-bottom:3pt;}
.sub{font-size:10.5pt;color:#333;margin-bottom:7pt;}
.contacts{font-size:9pt;color:#444;display:flex;flex-wrap:wrap;gap:0 20pt;margin-bottom:18pt;border-bottom:1px solid #ccc;padding-bottom:10pt;}
.sec{margin-bottom:13pt;page-break-inside:avoid;}
.sh{font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#111;border-bottom:1.5px solid #111;padding-bottom:3pt;margin-bottom:9pt;}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:8pt;margin-bottom:1pt;}
.t{font-size:10.5pt;font-weight:600;}.s{font-size:9.5pt;color:#444;}.d{font-size:9pt;color:#555;white-space:nowrap;}
.bul{margin:4pt 0 9pt 14pt;}.bul li{font-size:9.5pt;color:#333;margin-bottom:2pt;list-style:disc;}
.tag{display:inline-block;font-size:8pt;color:#444;background:#f0f0f0;padding:1pt 7pt;border-radius:3pt;margin:2pt 3pt 0 0;}
.sk{margin-bottom:5pt;}.sk b{font-size:9pt;color:#222;}.sk span{font-size:9.5pt;color:#444;}
.rg{display:grid;grid-template-columns:1fr 1fr;gap:12pt;}.ri b{display:block;font-weight:600;margin-bottom:2pt;font-size:9.5pt;}.ri i{color:#555;font-size:9pt;display:block;margin-bottom:3pt;}.ri p{font-size:9pt;color:#555;margin-bottom:1pt;}
.ach{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5pt;}.ach span{font-size:9.5pt;color:#333;}.ach b{font-size:9pt;color:#555;white-space:nowrap;margin-left:8pt;}
.cert{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6pt;}.cert-l{font-size:9.5pt;color:#333;}.cert-i{font-size:9pt;color:#666;margin-left:5pt;}.cert b{font-size:9pt;color:#555;white-space:nowrap;margin-left:8pt;}
@page{margin:20mm;}@media print{body{padding:0;}}
</style></head><body>
<h1>${e(d.name)}</h1>
<div class="sub">${e(d.rolesLine1)}${d.rolesLine2?" · "+e(d.rolesLine2):""}</div>
<div class="contacts">${d.email?`<span>✉ ${e(d.email)}</span>`:""}${d.phone?`<span>✆ ${e(d.phone)}</span>`:""}${d.location?`<span>⌂ ${e(d.location)}</span>`:""}${lh?`<span>🔗 ${e(lh)}</span>`:""}</div>
${d.bio?`<div class="sec"><div class="sh">Professional Summary</div><p style="font-size:9.5pt;color:#333;line-height:1.6;">${e(d.bio)}</p></div>`:""}
${d.education?.length?`<div class="sec"><div class="sh">Education</div>${d.education.map(x=>`<div style="margin-bottom:8pt;"><div class="row"><span class="t">${e(x.degree)}</span><span class="d">${e(x.year)}</span></div><div class="s">${e(x.institution)}${x.badge?` &nbsp;<span style="background:#f0f0f0;padding:1pt 7pt;border-radius:3pt;font-size:8.5pt;">${e(x.badge)}</span>`:""}</div></div>`).join("")}</div>`:""}
${d.experience?.length&&d.showExperience!==false?`<div class="sec"><div class="sh">Experience</div>${d.experience.map(x=>`<div style="margin-bottom:8pt;"><div class="row"><span class="t">${e(x.title)}</span><span class="d">${e(x.year)}</span></div><div class="s">${e(x.company)}</div>${x.bullets?.length?`<ul class="bul">${x.bullets.map(b=>`<li>${e(b)}</li>`).join("")}</ul>`:""}</div>`).join("")}</div>`:""}
${d.projects?.length&&d.showProjects!==false?`<div class="sec"><div class="sh">Projects</div>${d.projects.map(x=>`<div style="margin-bottom:9pt;"><div class="row"><span class="t">${e(x.name)}</span><span class="d">${e(x.year)}</span></div><p style="font-size:9.5pt;color:#333;margin-top:3pt;line-height:1.5;">${e(x.desc)}</p>${x.tags?.length?`<div style="margin-top:4pt;">${x.tags.map(t=>`<span class="tag">${e(t)}</span>`).join("")}</div>`:""}</div>`).join("")}</div>`:""}
${d.certifications?.length&&d.showCertifications!==false?`<div class="sec"><div class="sh">Certifications</div>${d.certifications.map(x=>`<div class="cert"><span><span class="cert-l">${e(x.name)}</span>${x.issuer?`<span class="cert-i">— ${e(x.issuer)}</span>`:""}</span><b>${e(x.year)}</b></div>`).join("")}</div>`:""}
${d.achievements?.length&&d.showAchievements!==false?`<div class="sec"><div class="sh">Achievements &amp; Recognition</div>${d.achievements.map(x=>`<div class="ach"><span>${x.icon} ${e(x.text)}</span><b>${e(x.year)}</b></div>`).join("")}</div>`:""}
${d.leadership?.length&&d.showLeadership!==false?`<div class="sec"><div class="sh">Leadership &amp; Extracurricular</div>${d.leadership.map(x=>`<div style="margin-bottom:6pt;"><div class="row"><span class="t">${e(x.role)}</span><span class="d">${e(x.date)}</span></div><div class="s">${e(x.org)}</div></div>`).join("")}</div>`:""}
${d.skillGroups?.length?`<div class="sec"><div class="sh">Skills &amp; Technologies</div>${d.skillGroups.map(g=>`<div class="sk"><b>${e(g.label)}: </b><span>${g.skills.map(s=>e(s)).join(" · ")}</span></div>`).join("")}</div>`:""}
${d.references?.length?`<div class="sec"><div class="sh">References</div><div class="rg">${d.references.map(r=>`<div class="ri"><b>${e(r.name)}</b><i>${r.role.split("\\n").map(l=>e(l)).join("<br>")}</i><p>✆ ${e(r.phone)}</p><p>✉ ${e(r.email)}</p></div>`).join("")}</div></div>`:""}
<script>window.onload=function(){window.print();}<\/script>
</body></html>`;
}

  const downloadPDF=()=>{
    const html=buildPdfHtml(d);
    const blob=new Blob([html],{type:'text/html'});
    const url=URL.createObjectURL(blob);
    const win=window.open(url,'_blank');
    if(!win){
      const a=document.createElement('a');
      a.href=url; a.target='_blank';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    setTimeout(()=>URL.revokeObjectURL(url),60000);
  };
  const socialGroups=[...new Set(SOCIAL_META.map(s=>s.group))];
  const curTheme=THEMES.find(t=>t.id===themeId)||THEMES[0];

  const panels={
    basic:(<div>
      <SCard><div style={{display:"flex",gap:18,alignItems:"center"}}>
        <div onClick={()=>fileRef.current.click()} style={{width:80,height:80,borderRadius:"50%",border:`3px solid ${C.accent}`,boxShadow:`0 0 0 5px rgba(14,165,233,0.12)`,background:C.surf2,overflow:"hidden",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.62rem",color:C.muted,textAlign:"center",flexShrink:0}}>
          {photo?<img src={photo} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<span style={{lineHeight:1.5}}>Click to<br/>upload</span>}
        </div>
        <div style={{flex:1}}>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6}}>
            <button onClick={()=>fileRef.current.click()} style={{padding:"7px 14px",borderRadius:6,background:C.surf2,border:`1px solid ${C.accent}`,color:C.accent,cursor:"pointer",fontSize:"0.78rem",fontWeight:600}}>📷 Upload Photo</button>
            {photo&&<button onClick={()=>setPhoto(null)} style={{padding:"7px 14px",borderRadius:6,background:"transparent",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",fontSize:"0.78rem"}}>Remove</button>}
          </div>
          <p style={{fontSize:"0.7rem",color:C.muted}}>Shown as circle in portfolio. JPG, PNG or WebP.</p>
        </div>
      </div></SCard>
      <Field label="Nav Brand" value={d.navBrand} onChange={v=>upd("navBrand",v)} placeholder="your brand "/>
      <Field label="Full Name" value={d.name} onChange={v=>upd("name",v)}/>
      <Field label="Highlighted Name (accent colour)" value={d.nameHighlight} onChange={v=>upd("nameHighlight",v)}/>
      <G2><Field label="Greeting" value={d.greeting} onChange={v=>upd("greeting",v)} placeholder="Hi, I'm"/><Field label="Emoji" value={d.emoji} onChange={v=>upd("emoji",v)} placeholder="👋"/></G2>
      <Field label="Roles Line 1 (bold)" value={d.rolesLine1} onChange={v=>upd("rolesLine1",v)}/>
      <Field label="Roles Line 2" value={d.rolesLine2} onChange={v=>upd("rolesLine2",v)}/>
      <Field label="Hero Bio" value={d.bio} onChange={v=>upd("bio",v)} multiline rows={3}/>
      <Field label="Footer Year" value={d.footerYear} onChange={v=>upd("footerYear",v)} placeholder="2025"/>

      <div style={{borderTop:`1px solid ${C.border}`,marginTop:20,paddingTop:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div><div style={{fontSize:"0.72rem",color:C.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:2}}>🎨 Portfolio Theme</div><div style={{fontSize:"0.7rem",color:C.muted}}>Preview updates live.</div></div>
          <div style={{fontSize:"0.72rem",color:C.accent,fontWeight:700,background:C.surf2,padding:"3px 10px",borderRadius:20,border:`1px solid ${C.accent}`}}>{curTheme.name}</div>
        </div>
        <ThemePicker themeId={themeId} onChange={setThemeId}/>
      </div>
    </div>),
    contact:(<div>
      <Field label="Email (required)" value={d.email} onChange={v=>upd("email",v)} placeholder="your@email.com"/>
      <G2><Field label="Phone" value={d.phone} onChange={v=>upd("phone",v)} placeholder="+1 (555) 000-0000"/><Field label="Location" value={d.location} onChange={v=>upd("location",v)} placeholder="City, Country"/></G2>
      {socialGroups.map(group=>(<div key={group} style={{marginTop:16}}>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:12}}>
          <div style={{fontSize:"0.7rem",color:C.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{group} Links</div>
          {group==="Social"&&<p style={{fontSize:"0.68rem",color:C.muted}}>★ <strong style={{color:C.text}}>Star</strong> any filled social to show it as a button in the <strong style={{color:C.text}}>hero section</strong>.</p>}
        </div>
        {SOCIAL_META.filter(s=>s.group===group).map(s=>{
          const isHero=(d.heroSocials||[]).includes(s.key);
          const toggleHero=()=>setD(p=>{const hs=p.heroSocials||[];return{...p,heroSocials:isHero?hs.filter(k=>k!==s.key):[...hs,s.key]};});
          return(<div key={s.key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
            <button title={isHero?"Remove from hero":"Show in hero"} onClick={toggleHero} style={{flexShrink:0,width:22,height:22,borderRadius:"50%",border:`1px solid ${isHero?"#fbbf24":C.border}`,background:isHero?"rgba(251,191,36,0.15)":"transparent",color:isHero?"#fbbf24":C.border,cursor:"pointer",fontSize:"0.85rem",display:"flex",alignItems:"center",justifyContent:"center",padding:0,transition:"all 0.15s"}}>★</button>
            <div style={{width:80,display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
              <BrandIcon id={s.key} size={18}/>
              <span style={{fontSize:"0.7rem",color:isHero?"#fbbf24":d.socials[s.key]?C.text:C.muted,fontWeight:isHero?700:400,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.label}{isHero?" ★":""}</span>
            </div>
            <input type="text" value={d.socials[s.key]||""} onChange={e=>updSocial(s.key,e.target.value)} placeholder={s.placeholder} style={{...inp,flex:1}}/>
            {d.socials[s.key]&&<button onClick={()=>updSocial(s.key,"")} style={{padding:"5px 8px",borderRadius:4,background:"transparent",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",fontSize:"0.7rem",flexShrink:0}}>✕</button>}
          </div>);
        })}
      </div>))}
    </div>),
    about:(<div>
      <RichEditor value={d.about} onChange={v=>upd("about",v)}/>
      <div style={{borderTop:`1px solid ${C.border}`,marginTop:20,paddingTop:16}}>
        <div style={{fontSize:"0.72rem",color:C.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>🎬 Introducing Myself</div>
        <p style={{fontSize:"0.7rem",color:C.muted,marginBottom:10}}>Paste a YouTube link — a clickable thumbnail will appear after your About section.</p>
        <Field label="YouTube URL (optional)" value={d.videoUrl} onChange={v=>upd("videoUrl",v)} placeholder="https://youtube.com/watch?v=..."/>
        {d.videoUrl&&(()=>{const id=(d.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)||[])[1];return id?(<div style={{borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,marginTop:6}}><img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt="thumb" style={{width:"100%",display:"block"}}/><div style={{padding:"6px 10px",background:C.surf2,fontSize:"0.7rem",color:C.muted}}>✅ Valid YouTube link detected</div></div>):<p style={{fontSize:"0.7rem",color:C.danger,marginTop:4}}>⚠ Could not detect a valid YouTube URL</p>;})()}
      </div>
    </div>),
    skills:(<div>
      {d.skillGroups.map((g,gi)=>(<SCard key={gi}>
        <CardHdr label={`Group ${gi+1}`} onUp={gi>0?()=>mvArr("skillGroups",gi,-1):null} onDown={gi<d.skillGroups.length-1?()=>mvArr("skillGroups",gi,1):null} onRemove={()=>rmArr("skillGroups",gi)}/>
        <Field label="Group Label" value={g.label} onChange={v=>setD(p=>({...p,skillGroups:p.skillGroups.map((x,j)=>j!==gi?x:{...x,label:v})}))}/>
        <label style={{...lbl,marginBottom:8}}>Skills (click chip to edit)</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
          {g.skills.map((s,si)=>(<div key={si} style={{display:"flex",alignItems:"center",gap:4,background:C.surf2,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:C.accent,flexShrink:0}}/>
            <input value={s} onChange={e=>updSkill(gi,si,e.target.value)} style={{background:"transparent",border:"none",outline:"none",color:C.text,fontSize:"0.74rem",fontFamily:"'JetBrains Mono',monospace",width:Math.max(50,s.length*8)+"px"}}/>
            <button onClick={()=>rmSkill(gi,si)} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:"0.7rem",padding:"0 2px",lineHeight:1}}>✕</button>
          </div>))}
          <button onClick={()=>addSkill(gi)} style={{padding:"4px 10px",borderRadius:6,background:"transparent",border:`1px dashed ${C.accent}`,color:C.accent,cursor:"pointer",fontSize:"0.74rem"}}>+ Add</button>
        </div>
      </SCard>))}
      <WBtn label="+ Add Skill Group" onClick={()=>addArr("skillGroups",{label:"New Group",skills:["Skill"]})}/>
    </div>),
    education:(<div>
      {d.education.map((e,i)=>(<SCard key={i}>
        <CardHdr label={`Education ${i+1}`} onUp={i>0?()=>mvArr("education",i,-1):null} onDown={i<d.education.length-1?()=>mvArr("education",i,1):null} onRemove={()=>rmArr("education",i)}/>
        <Field label="Year / Period" value={e.year} onChange={v=>updArr("education",i,"year",v)} placeholder="2021 – Present"/>
        <Field label="Degree / Title" value={e.degree} onChange={v=>updArr("education",i,"degree",v)}/>
        <Field label="Institution" value={e.institution} onChange={v=>updArr("education",i,"institution",v)}/>
        <Field label="Badge (GPA, Grade etc.)" value={e.badge} onChange={v=>updArr("education",i,"badge",v)} placeholder="GPA 3.8 / 4.0"/>
      </SCard>))}
      <WBtn label="+ Add Education" onClick={()=>addArr("education",{year:"",degree:"",institution:"",badge:""})}/>
    </div>),
    experience:(<div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer",padding:"10px 14px",background:C.surf,border:`1px solid ${C.border}`,borderRadius:8}} onClick={()=>upd("showExperience",d.showExperience===false)}>
        <div style={{width:36,height:20,borderRadius:10,background:d.showExperience!==false?C.accent:C.surf2,border:`1px solid ${d.showExperience!==false?C.accent:C.border}`,position:"relative",transition:"background 0.2s",flexShrink:0}}>
          <div style={{position:"absolute",top:3,left:d.showExperience!==false?18:3,width:12,height:12,borderRadius:"50%",background:d.showExperience!==false?"#000":C.muted,transition:"left 0.2s"}}/>
        </div>
        <span style={{fontSize:"0.78rem",color:d.showExperience!==false?C.accent:C.muted,fontWeight:600}}>{d.showExperience!==false?"Show Experience in portfolio & PDF":"Experience hidden from portfolio & PDF"}</span>
      </div>
      {d.experience.map((e,i)=>(<SCard key={i}>
        <CardHdr label={`Experience ${i+1}`} onUp={i>0?()=>mvArr("experience",i,-1):null} onDown={i<d.experience.length-1?()=>mvArr("experience",i,1):null} onRemove={()=>rmArr("experience",i)}/>
        <G2><Field label="Year / Period" value={e.year} onChange={v=>updArr("experience",i,"year",v)} placeholder="2023 – Present"/><Field label="Job Title" value={e.title} onChange={v=>updArr("experience",i,"title",v)}/></G2>
        <Field label="Company / Organisation" value={e.company} onChange={v=>updArr("experience",i,"company",v)}/>
        <Field label="🔗 Reference Link (optional)" value={e.link} onChange={v=>updArr("experience",i,"link",v)} placeholder="https://company.com"/>
        <label style={{...lbl,marginBottom:8}}>Bullet Points</label>
        {e.bullets.map((b,bi)=>(<div key={bi} style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
          <span style={{color:C.accent,fontWeight:700}}>›</span>
          <input value={b} onChange={ev=>updBullet(i,bi,ev.target.value)} style={{...inp,flex:1}} placeholder={`Point ${bi+1}`}/>
          <button onClick={()=>rmBullet(i,bi)} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:"0.85rem"}}>✕</button>
        </div>))}
        <button onClick={()=>addBullet(i)} style={{padding:"6px 12px",borderRadius:6,background:"transparent",border:`1px dashed ${C.accent}`,color:C.accent,cursor:"pointer",fontSize:"0.76rem",marginTop:4}}>+ Add Bullet</button>
      </SCard>))}
      <WBtn label="+ Add Experience" onClick={()=>addArr("experience",{year:"",title:"",company:"",link:"",bullets:[""]})}/>
    </div>),
    projects:(<div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer",padding:"10px 14px",background:C.surf,border:`1px solid ${C.border}`,borderRadius:8}} onClick={()=>upd("showProjects",d.showProjects===false)}>
        <div style={{width:36,height:20,borderRadius:10,background:d.showProjects!==false?C.accent:C.surf2,border:`1px solid ${d.showProjects!==false?C.accent:C.border}`,position:"relative",transition:"background 0.2s",flexShrink:0}}>
          <div style={{position:"absolute",top:3,left:d.showProjects!==false?18:3,width:12,height:12,borderRadius:"50%",background:d.showProjects!==false?"#000":C.muted,transition:"left 0.2s"}}/>
        </div>
        <span style={{fontSize:"0.78rem",color:d.showProjects!==false?C.accent:C.muted,fontWeight:600}}>{d.showProjects!==false?"Show Projects in portfolio & PDF":"Projects hidden from portfolio & PDF"}</span>
      </div>
      {d.projects.map((p,pi)=>(<SCard key={pi}>
        <CardHdr label={`Project ${pi+1}`} onUp={pi>0?()=>mvArr("projects",pi,-1):null} onDown={pi<d.projects.length-1?()=>mvArr("projects",pi,1):null} onRemove={()=>rmArr("projects",pi)}/>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,cursor:"pointer"}} onClick={()=>updArr("projects",pi,"featured",!p.featured)}>
          <div style={{width:36,height:20,borderRadius:10,background:p.featured?C.accent:C.surf2,border:`1px solid ${p.featured?C.accent:C.border}`,position:"relative",transition:"background 0.2s"}}>
            <div style={{position:"absolute",top:3,left:p.featured?18:3,width:12,height:12,borderRadius:"50%",background:p.featured?"#000":C.muted,transition:"left 0.2s"}}/>
          </div>
          <span style={{fontSize:"0.78rem",color:p.featured?C.accent:C.muted,fontWeight:600}}>Featured (full-width card)</span>
        </div>
        <Field label="Year / Label" value={p.year} onChange={v=>updArr("projects",pi,"year",v)} placeholder="FEATURED · 2024"/>
        <Field label="Project Name" value={p.name} onChange={v=>updArr("projects",pi,"name",v)}/>
        <Field label="🔗 Reference Link (optional)" value={p.link} onChange={v=>updArr("projects",pi,"link",v)} placeholder="https://github.com/..."/>
        <Field label="Description" value={p.desc} onChange={v=>updArr("projects",pi,"desc",v)} multiline rows={3}/>
        <label style={{...lbl,marginBottom:8}}>Tags</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:6}}>
          {p.tags.map((t,ti)=>(<div key={ti} style={{display:"flex",alignItems:"center",gap:4,background:C.surf2,border:`1px solid ${C.border}`,borderRadius:4,padding:"3px 8px"}}>
            <input value={t} onChange={e=>updTag(pi,ti,e.target.value)} style={{background:"transparent",border:"none",outline:"none",color:C.muted,fontSize:"0.7rem",fontFamily:"'JetBrains Mono',monospace",width:Math.max(40,t.length*7)+"px"}}/>
            <button onClick={()=>rmTag(pi,ti)} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:"0.7rem",lineHeight:1}}>✕</button>
          </div>))}
          <button onClick={()=>addTag(pi)} style={{padding:"3px 9px",borderRadius:4,background:"transparent",border:`1px dashed ${C.accent}`,color:C.accent,cursor:"pointer",fontSize:"0.7rem"}}>+ Tag</button>
        </div>
      </SCard>))}
      <WBtn label="+ Add Project" onClick={()=>addArr("projects",{featured:false,year:"",name:"",link:"",desc:"",tags:[]})}/>
    </div>),
    achievements:(<div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer",padding:"10px 14px",background:C.surf,border:`1px solid ${C.border}`,borderRadius:8}} onClick={()=>upd("showAchievements",d.showAchievements===false)}>
        <div style={{width:36,height:20,borderRadius:10,background:d.showAchievements!==false?C.accent:C.surf2,border:`1px solid ${d.showAchievements!==false?C.accent:C.border}`,position:"relative",transition:"background 0.2s",flexShrink:0}}>
          <div style={{position:"absolute",top:3,left:d.showAchievements!==false?18:3,width:12,height:12,borderRadius:"50%",background:d.showAchievements!==false?"#000":C.muted,transition:"left 0.2s"}}/>
        </div>
        <span style={{fontSize:"0.78rem",color:d.showAchievements!==false?C.accent:C.muted,fontWeight:600}}>{d.showAchievements!==false?"Show Awards in portfolio & PDF":"Awards hidden from portfolio & PDF"}</span>
      </div>
      {d.achievements.map((a,i)=>(<SCard key={i}>
        <CardHdr label={`Achievement ${i+1}`} onUp={i>0?()=>mvArr("achievements",i,-1):null} onDown={i<d.achievements.length-1?()=>mvArr("achievements",i,1):null} onRemove={()=>rmArr("achievements",i)}/>
        <G2><Field label="Icon (emoji)" value={a.icon} onChange={v=>updArr("achievements",i,"icon",v)} placeholder="🏆"/><Field label="Year" value={a.year} onChange={v=>updArr("achievements",i,"year",v)} placeholder="2024"/></G2>
        <Field label="Achievement Text" value={a.text} onChange={v=>updArr("achievements",i,"text",v)}/>
        <Field label="🔗 Reference Link (optional)" value={a.link} onChange={v=>updArr("achievements",i,"link",v)} placeholder="https://certificate-link.com"/>
      </SCard>))}
      <WBtn label="+ Add Achievement" onClick={()=>addArr("achievements",{icon:"🏅",text:"",link:"",year:""})}/>
    </div>),
    certifications:(<div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer",padding:"10px 14px",background:C.surf,border:`1px solid ${C.border}`,borderRadius:8}} onClick={()=>upd("showCertifications",d.showCertifications===false)}>
        <div style={{width:36,height:20,borderRadius:10,background:d.showCertifications!==false?C.accent:C.surf2,border:`1px solid ${d.showCertifications!==false?C.accent:C.border}`,position:"relative",transition:"background 0.2s",flexShrink:0}}>
          <div style={{position:"absolute",top:3,left:d.showCertifications!==false?18:3,width:12,height:12,borderRadius:"50%",background:d.showCertifications!==false?"#000":C.muted,transition:"left 0.2s"}}/>
        </div>
        <span style={{fontSize:"0.78rem",color:d.showCertifications!==false?C.accent:C.muted,fontWeight:600}}>{d.showCertifications!==false?"Show Certifications in portfolio & PDF":"Certifications hidden from portfolio & PDF"}</span>
      </div>
      <p style={{fontSize:"0.72rem",color:C.muted,marginBottom:14,lineHeight:1.6}}>Add courses, licences and professional certificates. The verify link makes the title clickable on the portfolio.</p>
      {d.certifications.map((c,i)=>(<SCard key={i}>
        <CardHdr label={`Certification ${i+1}`} onUp={i>0?()=>mvArr("certifications",i,-1):null} onDown={i<d.certifications.length-1?()=>mvArr("certifications",i,1):null} onRemove={()=>rmArr("certifications",i)}/>
        <Field label="Certification / Course Name" value={c.name} onChange={v=>updArr("certifications",i,"name",v)} placeholder="AWS Certified Solutions Architect"/>
        <Field label="Issuing Organisation" value={c.issuer} onChange={v=>updArr("certifications",i,"issuer",v)} placeholder="Amazon Web Services, Coursera…"/>
        <G2><Field label="Year" value={c.year} onChange={v=>updArr("certifications",i,"year",v)} placeholder="2024"/><Field label="🔗 Verify / Certificate Link" value={c.link} onChange={v=>updArr("certifications",i,"link",v)} placeholder="https://..."/></G2>
      </SCard>))}
      <WBtn label="+ Add Certification" onClick={()=>addArr("certifications",{name:"",issuer:"",year:"",link:""})}/>
    </div>),
    leadership:(<div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer",padding:"10px 14px",background:C.surf,border:`1px solid ${C.border}`,borderRadius:8}} onClick={()=>upd("showLeadership",d.showLeadership===false)}>
        <div style={{width:36,height:20,borderRadius:10,background:d.showLeadership!==false?C.accent:C.surf2,border:`1px solid ${d.showLeadership!==false?C.accent:C.border}`,position:"relative",transition:"background 0.2s",flexShrink:0}}>
          <div style={{position:"absolute",top:3,left:d.showLeadership!==false?18:3,width:12,height:12,borderRadius:"50%",background:d.showLeadership!==false?"#000":C.muted,transition:"left 0.2s"}}/>
        </div>
        <span style={{fontSize:"0.78rem",color:d.showLeadership!==false?C.accent:C.muted,fontWeight:600}}>{d.showLeadership!==false?"Show Leadership in portfolio & PDF":"Leadership hidden from portfolio & PDF"}</span>
      </div>
      {d.leadership.map((l,i)=>(<SCard key={i}>
        <CardHdr label={`Role ${i+1}`} onUp={i>0?()=>mvArr("leadership",i,-1):null} onDown={i<d.leadership.length-1?()=>mvArr("leadership",i,1):null} onRemove={()=>rmArr("leadership",i)}/>
        <G2><Field label="Role / Title" value={l.role} onChange={v=>updArr("leadership",i,"role",v)} placeholder="Co-Founder"/><Field label="Date / Period" value={l.date} onChange={v=>updArr("leadership",i,"date",v)} placeholder="2023 – Present"/></G2>
        <Field label="Organisation / Description" value={l.org} onChange={v=>updArr("leadership",i,"org",v)}/>
        <Field label="🔗 Reference Link (optional)" value={l.link} onChange={v=>updArr("leadership",i,"link",v)} placeholder="https://organisation-website.com"/>
      </SCard>))}
      <WBtn label="+ Add Leadership Role" onClick={()=>addArr("leadership",{role:"",org:"",link:"",date:""})}/>
    </div>),
    references:(<div>
      {d.references.map((r,i)=>(<SCard key={i}>
        <CardHdr label={`Reference ${i+1}`} onUp={i>0?()=>mvArr("references",i,-1):null} onDown={i<d.references.length-1?()=>mvArr("references",i,1):null} onRemove={()=>rmArr("references",i)}/>
        <Field label="Full Name" value={r.name} onChange={v=>updArr("references",i,"name",v)}/>
        <Field label={'Title & Organisation (\\n = new line)'} value={r.role} onChange={v=>updArr("references",i,"role",v)} placeholder={"Job Title\nOrganisation"}/>
        <G2><Field label="Phone" value={r.phone} onChange={v=>updArr("references",i,"phone",v)} placeholder="01xxx-xxxxxx"/><Field label="Email" value={r.email} onChange={v=>updArr("references",i,"email",v)} placeholder="ref@org.com"/></G2>
      </SCard>))}
      <WBtn label="+ Add Reference" onClick={()=>addArr("references",{name:"",role:"",phone:"",email:""})}/>
    </div>),
  };

  const handlePublishSuccess = (uname) => {
    setShowPublish(false);
    if (editMode && onPublished) { onPublished(); return; }
    setPublished(uname);
    setShowEditHint(true);
  };

  const handleEditHintClose = () => {
    setShowEditHint(false);
  };

  if (published) {
    return (
      <>
        <PublishSuccess username={published} />
        {showEditHint && <EditHintModal onClose={handleEditHintClose} />}
      </>
    );
  }

  return(
    <>
    {showPublish && (
      <PublishModal
        d={d} photo={photo} themeId={themeId}
        editMode={editMode} editUsername={editUsername} editPassword={editPassword}
        onClose={() => setShowPublish(false)}
        onSuccess={handlePublishSuccess}
      />
    )}
    <div style={{height:isMobile?"auto":"100vh",minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Inter',sans-serif",display:"flex",flexDirection:"column",overflow:isMobile?"auto":"hidden"}}>
      {/* TOP BAR */}
      <div style={{background:C.surf,borderBottom:`1px solid ${C.border}`,padding:isMobile?"8px 12px":"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",color:C.accent,fontSize:isMobile?"0.75rem":"0.88rem",fontWeight:600}}>&lt;portfolio-builder /&gt;</span>
          {!isMobile&&<span style={{fontSize:"0.66rem",color:C.muted,background:C.surf2,padding:"2px 8px",borderRadius:4,border:`1px solid ${C.border}`}}>LIVE EDITOR</span>}
        </div>
        {!isMobile&&<div style={{display:"flex",alignItems:"center",gap:8,marginLeft:"auto"}}>
          <div style={{width:12,height:12,borderRadius:"50%",background:curTheme.accent,boxShadow:`0 0 6px ${curTheme.accent}`}}/>
          <span style={{fontSize:"0.72rem",color:C.muted}}>{curTheme.name}</span>
        </div>}
        <button onClick={downloadPDF} style={{display:"flex",alignItems:"center",gap:6,padding:isMobile?"7px 10px":"9px 18px",borderRadius:8,background:"transparent",border:`1px solid ${C.border}`,color:C.text,cursor:"pointer",fontWeight:600,fontSize:isMobile?"0.74rem":"0.82rem",flexShrink:0,marginLeft:isMobile?"auto":"0"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.border}>
          {isMobile?"📄":"📄 Download PDF"}
        </button>
        <button onClick={()=>setShowPublish(true)} style={{display:"flex",alignItems:"center",gap:6,padding:isMobile?"7px 12px":"9px 20px",borderRadius:8,background:done?"#22c55e":C.accent,border:"none",color:"#000",cursor:"pointer",fontWeight:700,fontSize:isMobile?"0.74rem":"0.82rem",transition:"background 0.3s",flexShrink:0}}>
          {isMobile?(editMode?"💾 Save":done?"✓ Done":"🚀 Publish"):(editMode?"💾 Save Changes":done?"✓ Published!":"🚀 Publish Website")}
        </button>
      </div>
      <div style={{display:"flex",flex:1,overflow:isMobile?"visible":"hidden",flexDirection:isMobile?"column":"row"}}>
        {/* SIDEBAR */}
        <div style={{width:isMobile?"100%":112,background:C.surf,borderRight:isMobile?"none":`1px solid ${C.border}`,borderBottom:isMobile?`1px solid ${C.border}`:"none",display:"flex",flexDirection:isMobile?"row":"column",gap:2,padding:isMobile?"6px 8px":8,flexShrink:0,overflowX:isMobile?"auto":"hidden",overflowY:isMobile?"hidden":"auto"}}>
          {TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",flexDirection:isMobile?"row":"column",alignItems:"center",gap:isMobile?5:4,padding:isMobile?"7px 10px":"10px 4px",borderRadius:8,border:"none",cursor:"pointer",background:tab===t.id?C.surf2:"transparent",color:tab===t.id?C.accent:C.muted,borderLeft:isMobile?"none":tab===t.id?`2px solid ${C.accent}`:"2px solid transparent",borderBottom:isMobile?(tab===t.id?`2px solid ${C.accent}`:"2px solid transparent"):"none",transition:"all 0.15s",flexShrink:0,whiteSpace:"nowrap"}}>
            <span style={{fontSize:isMobile?"0.9rem":"1.05rem"}}>{t.icon}</span>
            <span style={{fontSize:"0.58rem",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.04em"}}>{t.label}</span>
          </button>))}
        </div>
        {/* FORM PANEL */}
        <div style={{flex:isMobile?"1 1 auto":"0 0 400px",width:isMobile?"100%":"auto",overflowY:"auto",padding:isMobile?"16px 14px":"20px 22px",borderRight:isMobile?"none":`1px solid ${C.border}`}}>
          <div style={{marginBottom:16}}>
            <h2 style={{fontSize:"0.96rem",fontWeight:700,color:C.text,marginBottom:4}}>{TABS.find(t=>t.id===tab)?.icon}&nbsp;{TABS.find(t=>t.id===tab)?.label}</h2>
            <p style={{fontSize:"0.72rem",color:C.muted,lineHeight:1.5}}>{TAB_DESC[tab]}</p>
          </div>
          {panels[tab]}
        </div>
        {/* LIVE PREVIEW — desktop only */}
        {!isMobile&&<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"8px 14px",background:C.surf,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            <div style={{display:"flex",gap:5}}>{["#f87171","#fbbf24","#22c55e"].map(col=><span key={col} style={{width:10,height:10,borderRadius:"50%",background:col,display:"inline-block"}}/>)}</div>
            <span style={{fontSize:"0.7rem",color:C.muted,fontFamily:"'JetBrains Mono',monospace"}}>live preview</span>
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:curTheme.accent}}/>
              <span style={{fontSize:"0.68rem",color:C.muted}}>{curTheme.name} theme</span>
            </div>
          </div>
          <div style={{flex:1,position:"relative",overflow:"hidden"}}>
            <iframe key={JSON.stringify(d)+photo+themeId} srcDoc={genHTML(d,photo,themeId)} style={{width:"100%",height:"100%",border:"none",background:"#000",display:"block"}} title="Portfolio Preview" sandbox="allow-scripts"/>
            <div style={{position:"absolute",top:0,left:0,right:0,height:"60px",zIndex:10,cursor:"default"}}/>
          </div>
        </div>}
      </div>
    </div>
    </>
  );
}
// ─── PUBLISH MODAL ────────────────────────────────────────────────────────────
function PublishModal({ d, photo, themeId, editMode, editUsername, editPassword, onClose, onSuccess }) {
  const [username, setUsername] = useState(editMode ? editUsername : '');
  const [password, setPassword] = useState(editMode ? editPassword : '');
  const [confirmPass, setConfirmPass] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(editMode ? true : null);
  const [availMsg, setAvailMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  const checkUsername = useCallback((val) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val || val.length < 3) { setAvailable(null); setAvailMsg(''); return; }
    setChecking(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-username?u=${encodeURIComponent(val)}`);
        const data = await res.json();
        setAvailable(data.available);
        setAvailMsg(data.available ? '✓ Available' : data.reason || '✗ Already taken');
      } catch { setAvailMsg('Could not check'); }
      finally { setChecking(false); }
    }, 500);
  }, []);

  const handleUsernameChange = (val) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setUsername(clean);
    if (!editMode) checkUsername(clean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!editMode && !available) { setError('Please choose an available username.'); return; }
    if (!editMode && password !== confirmPass) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    try {
      const url = editMode ? '/api/update' : '/api/publish';
      const method = editMode ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: editMode ? editUsername : username,
          password,
          portfolioData: d,
          photo: photo,
          themeId,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }
      onSuccess(editMode ? editUsername : username);
    } catch { setError('Connection error. Please try again.'); }
    finally { setLoading(false); }
  };

  const overlay = { position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20 };
  const box = { background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:'32px 36px',width:'100%',maxWidth:440,fontFamily:'Inter,sans-serif' };
  const finp = { width:'100%',padding:'10px 14px',background:C.surf2,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:'0.88rem',outline:'none',boxSizing:'border-box' };
  const flbl = { display:'block',fontSize:'0.68rem',color:C.muted,marginBottom:6,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em' };

  return (
    <div style={overlay} onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={box}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div>
            <div style={{fontFamily:'JetBrains Mono,monospace',color:C.accent,fontSize:'0.82rem',marginBottom:4}}>
              {editMode ? '<save-changes />' : '<publish-portfolio />'}
            </div>
            <h2 style={{fontSize:'1.1rem',fontWeight:700,color:C.text,margin:0}}>
              {editMode ? 'Save your changes' : 'Publish your portfolio'}
            </h2>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:C.muted,cursor:'pointer',fontSize:'1.2rem',lineHeight:1}}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username — only shown when creating new */}
          {!editMode && (
            <div style={{marginBottom:16}}>
              <label style={flbl}>Choose your username</label>
              <div style={{position:'relative'}}>
                <div style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:'0.82rem',color:C.muted,pointerEvents:'none',whiteSpace:'nowrap'}}>
                  yoursite.com/
                </div>
                <input
                  value={username}
                  onChange={e=>handleUsernameChange(e.target.value)}
                  placeholder="alexjack"
                  style={{...finp,paddingLeft:110}}
                  maxLength={30}
                  required
                />
              </div>
              {username.length > 0 && (
                <p style={{fontSize:'0.72rem',marginTop:5,color: checking ? C.muted : available ? '#22c55e' : C.danger}}>
                  {checking ? '⏳ Checking…' : availMsg}
                </p>
              )}
              <p style={{fontSize:'0.68rem',color:C.muted,marginTop:4}}>Letters, numbers and hyphens only. 3–30 characters.</p>
            </div>
          )}

          {/* Editing — show locked username */}
          {editMode && (
            <div style={{marginBottom:16,padding:'10px 14px',background:C.surf2,borderRadius:8,border:`1px solid ${C.border}`}}>
              <span style={{fontSize:'0.72rem',color:C.muted}}>Editing: </span>
              <span style={{fontSize:'0.82rem',color:C.accent,fontWeight:600}}>yoursite.com/{editUsername}</span>
            </div>
          )}

          {/* Password */}
          <div style={{marginBottom:editMode?16:12}}>
            <label style={flbl}>{editMode ? 'Your password (to confirm)' : 'Set a password'}</label>
            <input
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder={editMode ? 'Enter your portfolio password' : 'Min. 6 characters'}
              style={finp}
              required
            />
          </div>

          {!editMode && (
            <div style={{marginBottom:16}}>
              <label style={flbl}>Confirm password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={e=>setConfirmPass(e.target.value)}
                placeholder="Repeat your password"
                style={finp}
                required
              />
            </div>
          )}

          {!editMode && (
            <div style={{padding:'10px 14px',background:'rgba(14,165,233,0.08)',border:`1px solid rgba(14,165,233,0.25)`,borderRadius:8,marginBottom:16}}>
              <p style={{fontSize:'0.72rem',color:C.muted,margin:0,lineHeight:1.6}}>
                ⚠️ <strong style={{color:C.text}}>Save your password.</strong> There is no recovery option — if you forget it, your portfolio cannot be edited.
              </p>
            </div>
          )}

          {error && (
            <p style={{fontSize:'0.76rem',color:C.danger,marginBottom:12,padding:'8px 12px',background:'rgba(248,113,113,0.1)',borderRadius:6,border:`1px solid rgba(248,113,113,0.25)`}}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || (!editMode && !available)}
            style={{width:'100%',padding:'12px',borderRadius:8,background:loading?C.surf2:C.accent,border:'none',color:'#000',fontWeight:700,fontSize:'0.9rem',cursor:loading||(!editMode&&!available)?'not-allowed':'pointer',opacity:(!editMode&&!available)?0.5:1,transition:'background 0.2s'}}
          >
            {loading ? (editMode ? 'Saving…' : 'Publishing…') : (editMode ? '💾 Save Changes' : '🚀 Publish Portfolio')}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── PUBLISH SUCCESS PAGE ─────────────────────────────────────────────────────
function PublishSuccess({ username }) {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${username}`;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,sans-serif',padding:20}}>
      <div style={{textAlign:'center',maxWidth:480}}>
        <div style={{fontSize:'3rem',marginBottom:16}}>🎉</div>
        <h1 style={{fontSize:'1.6rem',fontWeight:700,color:C.text,marginBottom:8}}>Your portfolio is live!</h1>
        <p style={{color:C.muted,fontSize:'0.9rem',marginBottom:24}}>Share your link with the world.</p>

        <div style={{display:'flex',gap:8,alignItems:'center',background:C.surf,border:`1px solid ${C.border}`,borderRadius:10,padding:'12px 16px',marginBottom:20}}>
          <span style={{flex:1,fontSize:'0.88rem',color:C.accent,fontFamily:'JetBrains Mono,monospace',textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{url}</span>
          <button onClick={copy} style={{padding:'6px 14px',borderRadius:6,background:copied?'#22c55e':C.surf2,border:`1px solid ${C.border}`,color:copied?'#000':C.text,cursor:'pointer',fontSize:'0.76rem',fontWeight:600,flexShrink:0}}>
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
          <a href={url} target="_blank" rel="noreferrer" style={{padding:'6px 14px',borderRadius:6,background:C.accent,color:'#000',fontSize:'0.76rem',fontWeight:600,textDecoration:'none',flexShrink:0}}>Visit →</a>
        </div>

      </div>
    </div>
  );
}

// ─── EDIT HINT MODAL ─────────────────────────────────────────────────────────
function EditHintModal({ onClose }) {
  const overlay = { position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20 };
  const box = { background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:'32px 36px',width:'100%',maxWidth:420,fontFamily:'Inter,sans-serif',textAlign:'center' };

  return (
    <div style={overlay}>
      <div style={box}>
        <div style={{fontSize:'2.5rem',marginBottom:16}}>🎉</div>
        <h2 style={{fontSize:'1.05rem',fontWeight:700,color:C.text,marginBottom:12}}>Your portfolio is published!</h2>
        <p style={{fontSize:'0.88rem',color:C.muted,lineHeight:1.7,marginBottom:24}}>
          Remember, you can always edit your profile by tapping the{' '}
          <span style={{display:'inline-flex',alignItems:'center',verticalAlign:'middle',background:C.surf2,border:`1px solid ${C.border}`,borderRadius:6,padding:'3px 7px',margin:'0 3px'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </span>
          {' '}edit icon at the footer of your portfolio page.
        </p>
        <button
          onClick={onClose}
          style={{padding:'11px 32px',borderRadius:8,background:C.accent,border:'none',color:'#000',fontWeight:700,fontSize:'0.9rem',cursor:'pointer',transition:'opacity 0.2s'}}
          onMouseOver={e=>e.currentTarget.style.opacity='0.88'}
          onMouseOut={e=>e.currentTarget.style.opacity='1'}
        >
          Got it! 👍
        </button>
      </div>
    </div>
  );
}
