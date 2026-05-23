import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'MDPAI - Advanced CRM',
  description: 'AI Driven Lead Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
         Body me 'bg-black' isliye dala hai taaki har page (login bhi) 
         black rahe. 'antialiased' font ko saaf dikhayega.
      */}
      <body className="bg-black text-white antialiased">
        {children}
    <Navbar/>
      </body>
    </html>
  )
}