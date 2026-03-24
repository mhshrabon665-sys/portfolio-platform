export const metadata = {
  metadataBase: new URL('https://www.webbuildershrabon.xyz'),
  title: 'Portfolio Builder — builtbypassion.net',
  description: 'Build and publish your free portfolio in minutes. No code needed. Pick a theme, fill in your details, get a real URL instantly.',
  keywords: ['portfolio builder', 'free portfolio', 'online portfolio', 'no code portfolio'],
  openGraph: {
    title: 'Portfolio Builder — builtbypassion.net',
    description: 'Build and publish your free portfolio in minutes. No code needed.',
    url: 'https://www.webbuildershrabon.xyz',
    siteName: 'builtbypassion.net',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Builder — builtbypassion.net',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Builder — builtbypassion.net',
    description: 'Build and publish your free portfolio in minutes. No code needed.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230ea5e9'/><text x='16' y='22' text-anchor='middle' font-family='monospace' font-weight='bold' font-size='16' fill='white'>&lt;/&gt;</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0d1117' }}>
        {children}
      </body>
    </html>
  );
}
