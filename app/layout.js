export const metadata = {
  title: 'Portfolio Builder — builtbypassion.net',
  description: 'Build and publish your free portfolio in minutes.',
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
