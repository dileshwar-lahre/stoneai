import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'MDPAI - Advanced CRM',
  description: 'AI Driven Lead Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 1. 'suppressHydrationWarning' jodh diya hai taaki browser extensions (cz-shortcut) ki wajah se build crash na ho.
          2. Layout structure ekdum clean lock kar diya hai.
      */}
      <body className="bg-black text-white antialiased" suppressHydrationWarning>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}