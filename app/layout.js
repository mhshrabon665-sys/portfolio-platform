export const metadata = {
  title: 'Portfolio Builder — builtbypassion.net',
  description: 'Build and publish your free portfolio in minutes.',
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
