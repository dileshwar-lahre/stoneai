export const metadata = {
  title: "Stonenox - Best Tech Company",
  description: "Web, Android & iOS App Development",
  // Ye Next.js ka built-in way hai favicon set karne ka
  icons: {
    icon: [
      { url: '/stonenoxlogo.jpg', type: 'image/jpeg' }
    ],
    shortcut: ['/stonenoxlogo.jpg'],
    apple: ['/stonenoxlogo.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Backup ke liye direct HTML tag taaki browser 100% pakad le */}
        <link rel="icon" type="image/jpeg" href="/stonenoxlogo.jpg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}