import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
export default function AuthNavbar() {
  return (
   <>
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img 
                  src="https://portal.moovymed.de/static/media/Logo.3f6f8480.svg" 
                  alt="Logo" 
                  className="h-12"
                />
              </a>
            </div>
             <LanguageSwitcher/>
          </div>
        </div>
      </header>

   </>
  )
}
