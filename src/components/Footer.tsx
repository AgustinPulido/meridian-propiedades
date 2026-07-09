const columns = [
  {
    title: 'Explorar',
    links: ['Comprar una Propiedad', 'Alquilar una Propiedad', 'Vender tu Propiedad', 'Obra Nueva'],
  },
  {
    title: 'Empresa',
    links: ['Quiénes Somos', 'Nuestros Agentes', 'Trabajá con Nosotros', 'Prensa'],
  },
  {
    title: 'Recursos',
    links: ['Calculadora de Crédito Hipotecario', 'Tendencias del Mercado', 'Guía del Comprador', 'Preguntas Frecuentes'],
  },
]

interface Props {
  onLinkClick: (label: string) => void
}

export default function Footer({ onLinkClick }: Props) {
  return (
    <footer className="bg-midnight text-mist-light/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-clay text-white font-display text-lg">
                M
              </span>
              <span className="font-display text-xl text-white">
                Meridian<span className="text-mist"> Propiedades</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Ayudamos a compradores, vendedores e inquilinos a encontrar su próximo capítulo
              desde 2011. Conocimiento local, alcance en todo el país.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-base text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <button onClick={() => onLinkClick(link)} className="text-left transition-colors hover:text-white">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Meridian Propiedades. Todos los derechos reservados.</p>
          <p>Diseño y desarrollo por tu nombre — disponible para trabajos freelance.</p>
        </div>
      </div>
    </footer>
  )
}
