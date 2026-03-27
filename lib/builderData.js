// ─── THEMES ──────────────────────────────────────────────────────────────────
export const THEMES = [
  { id:"ocean",    name:"Ocean Dark",   cat:"dark",  bg:"#0d1117",surf:"#161b22",surf2:"#21262d",border:"#30363d",text:"#e6edf3",muted:"#8b949e",accent:"#0ea5e9",accentDark:"#0284c7",accentGlow:"rgba(14,165,233,0.15)"  },
  { id:"violet",   name:"Violet Night", cat:"dark",  bg:"#0f0a1a",surf:"#1a1130",surf2:"#251840",border:"#3d2d5e",text:"#e8e0f5",muted:"#9b8bb5",accent:"#a855f7",accentDark:"#9333ea",accentGlow:"rgba(168,85,247,0.15)"  },
  { id:"emerald",  name:"Matrix Green", cat:"dark",  bg:"#050f0a",surf:"#0a1f14",surf2:"#0f2d1e",border:"#1a4a2e",text:"#d4f5e2",muted:"#6b9e80",accent:"#22c55e",accentDark:"#16a34a",accentGlow:"rgba(34,197,94,0.15)"   },
  { id:"twilight", name:"Twilight",     cat:"mixed", bg:"#3b3680",surf:"#4d48a0",surf2:"#5d58b8",border:"#7870cc",text:"#f0eeff",muted:"#c4c0f0",accent:"#e879f9",accentDark:"#d946ef",accentGlow:"rgba(232,121,249,0.20)" },
  { id:"dusk",     name:"Dusk Amber",   cat:"mixed", bg:"#7c4f1a",surf:"#9a6228",surf2:"#b07535",border:"#cc9550",text:"#fff4e0",muted:"#f0c878",accent:"#fbbf24",accentDark:"#f59e0b",accentGlow:"rgba(251,191,36,0.25)"  },
  { id:"light",    name:"Clean Light",  cat:"light", bg:"#f8fafc",surf:"#ffffff",surf2:"#f1f5f9",border:"#cbd5e1",text:"#1e293b",muted:"#64748b",accent:"#0ea5e9",accentDark:"#0284c7",accentGlow:"rgba(14,165,233,0.10)"  },
  { id:"paper",    name:"Warm Paper",   cat:"light", bg:"#fdf6ec",surf:"#fffdf7",surf2:"#fef3d8",border:"#e8d5a3",text:"#3d2b1f",muted:"#8b6f47",accent:"#b45309",accentDark:"#92400e",accentGlow:"rgba(180,83,9,0.10)"    },
  { id:"mint",     name:"Mint Fresh",   cat:"light", bg:"#f0fdf4",surf:"#ffffff",surf2:"#dcfce7",border:"#bbf7d0",text:"#14532d",muted:"#4d7c5f",accent:"#16a34a",accentDark:"#15803d",accentGlow:"rgba(22,163,74,0.10)"   },
];

// ─── SOCIAL META ─────────────────────────────────────────────────────────────
export const SOCIAL_META = [
  {key:"linkedin",label:"LinkedIn",placeholder:"https://linkedin.com/in/username",group:"Social"},
  {key:"github",label:"GitHub",placeholder:"https://github.com/username",group:"Social"},
  {key:"whatsapp",label:"WhatsApp",placeholder:"https://wa.me/1XXXXXXXXXX",group:"Social"},
  {key:"facebook",label:"Facebook",placeholder:"https://facebook.com/username",group:"Social"},
  {key:"twitter",label:"Twitter / X",placeholder:"https://twitter.com/username",group:"Social"},
  {key:"instagram",label:"Instagram",placeholder:"https://instagram.com/username",group:"Social"},
  {key:"youtube",label:"YouTube",placeholder:"https://youtube.com/@channel",group:"Social"},
  {key:"telegram",label:"Telegram",placeholder:"https://t.me/username",group:"Social"},
  {key:"discord",label:"Discord",placeholder:"https://discord.gg/invitecode",group:"Social"},
  {key:"website",label:"Website / Blog",placeholder:"https://yourwebsite.com",group:"Social"},
  {key:"medium",label:"Medium",placeholder:"https://medium.com/@username",group:"Social"},
  {key:"stackoverflow",label:"Stack Overflow",placeholder:"https://stackoverflow.com/users/...",group:"Social"},
  {key:"behance",label:"Behance",placeholder:"https://behance.net/username",group:"Creative"},
  {key:"dribbble",label:"Dribbble",placeholder:"https://dribbble.com/username",group:"Creative"},
  {key:"researchgate",label:"ResearchGate",placeholder:"https://researchgate.net/profile/...",group:"Academic"},
  {key:"orcid",label:"ORCID",placeholder:"https://orcid.org/0000-0000-0000-0000",group:"Academic"},
  {key:"googlescholar",label:"Google Scholar",placeholder:"https://scholar.google.com/citations?user=",group:"Academic"},
  {key:"academia",label:"Academia.edu",placeholder:"https://independent.academia.edu/username",group:"Academic"},
];

export const BLANK_SOCIALS = Object.fromEntries(SOCIAL_META.map(s => [s.key, ""]));

// ─── RESERVED USERNAMES ───────────────────────────────────────────────────────
export const RESERVED = [
  'portfolio','edit','admin','api','publish','update','check-username',
  'verify-password','login','signup','dashboard','home','index','www',
  'static','assets','images','public','favicon','robots','sitemap',
];

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
export const INIT = {
  navBrand:"Name|Role ",
  name:"Your Name", nameHighlight:"Your", greeting:"Hi, I'm", emoji:"👋",
  rolesLine1:"Your Role · Your Title",
  rolesLine2:"Your Organisation · Your Community",
  bio:"Write a short bio that appears in the hero section of your portfolio.",
  about:"Write a detailed about me section here. You can use <strong>bold</strong> and <a href='https://example.com'>links</a>.",
  videoUrl:"",
  heroSocials:["linkedin","github","whatsapp"],
  showExperience:true, showProjects:true, showAchievements:true, showCertifications:true, showLeadership:true,
  email:"your@email.com", phone:"", location:"", footerYear:new Date().getFullYear().toString(),
  socials:{...Object.fromEntries([
    'linkedin','github','whatsapp','facebook','twitter','instagram','youtube',
    'telegram','discord','website','medium','stackoverflow','behance','dribbble',
    'researchgate','orcid','googlescholar','academia'
  ].map(k=>[k,""]))},
  skillGroups:[
    {label:"Skills",skills:["Your Skill"]},
  ],
  education:[
    {year:"2020 – Present",degree:"Your Degree",institution:"Your Institution",badge:""},
  ],
  experience:[
    {year:"2023 – Present",title:"Your Role",company:"Your Company",link:"",bullets:["What you did"]},
  ],
  projects:[
    {featured:true,year:"FEATURED · 2024",name:"Your Project",link:"",desc:"Describe your project.",tags:["Tag"]},
  ],
  achievements:[
    {icon:"🏆",text:"Your Achievement",link:"",year:"2024"},
  ],
  certifications:[],
  leadership:[],
  references:[],
};
