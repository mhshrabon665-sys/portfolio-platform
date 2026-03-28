export const metadata = {
  metadataBase: new URL('https://boundforthe.top'),
  title: '100% Free Portfolio Maker | boundforthe.top',
  description: 'Build and publish your free portfolio in minutes. No code needed. Pick a theme, fill in your details, get a real URL instantly.',
  keywords: ['portfolio builder', 'free portfolio', 'online portfolio', 'no code portfolio', 'developer portfolio', 'cv maker'],
  openGraph: {
    title: '100% Free Portfolio Maker | boundforthe.top',
    description: 'Build and publish your free portfolio in minutes. No code needed.',
    url: 'https://boundforthe.top',
    siteName: 'boundforthe.top',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '100% Free Portfolio Maker | boundforthe.top',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '100% Free Portfolio Maker | boundforthe.top',
    description: 'Build and publish your free portfolio in minutes. No code needed.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
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
