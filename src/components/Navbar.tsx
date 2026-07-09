import { useEffect, useState } from 'react'

const links = ['Comprar', 'Alquilar', 'Vender', 'Agentes', 'Contacto']

interface Props {
  onNavClick: (label: string) => void
  onPublishClick: () => void
  savedCount: number
  savedActive: boolean
  onToggleSaved: () => void
}

export default function Navbar({ onNavClick, onPublishClick, savedCount, savedActive, onToggleSaved }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight/95 shadow-lg shadow-midnight/20 backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-clay text-white font-display text-lg">
            M
          </span>
          <span className="font-display text-xl tracking-wide text-white">
            Meridian<span className="text-mist"> Propiedades</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => onNavClick(link)}
              className="text-sm font-medium text-mist-light/90 transition-colors hover:text-white"
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onToggleSaved}
            aria-label="Ver propiedades guardadas"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              savedActive ? 'bg-clay text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={savedActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path
                d="M12 21s-7.5-4.8-10-9.3C.4 8.1 2 4.5 5.6 4c2-.3 3.9.6 5 2.2C11.7 4.6 13.6 3.7 15.6 4c3.6.5 5.2 4.1 3.6 7.7C17.5 16.2 12 21 12 21z"
                strokeLinejoin="round"
              />
            </svg>
            {savedCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-bold text-white ring-2 ring-midnight">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onPublishClick}
            className="rounded-md bg-clay px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clay-dark"
          >
            Publicá tu Propiedad
          </button>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-midnight px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setOpen(false)
                  onNavClick(link)
                }}
                className="text-left text-sm font-medium text-mist-light"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onToggleSaved()
              }}
              className="text-left text-sm font-medium text-mist-light"
            >
              Guardadas {savedCount > 0 ? `(${savedCount})` : ''}
            </button>
            <button
              onClick={() => {
                setOpen(false)
                onPublishClick()
              }}
              className="mt-2 rounded-md bg-clay px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Publicá tu Propiedad
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
