import type { Filters } from '../types/filters'
import SearchFilters from './SearchFilters'

interface Props {
  filters: Filters
  onChange: (partial: Partial<Filters>) => void
  resultCount: number
}

export default function Hero({ filters, onChange, resultCount }: Props) {
  return (
    <section id="top" className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden bg-midnight pt-28">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Living moderno y luminoso"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/70 via-transparent to-midnight/40" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-mist-light backdrop-blur">
          Más de 2.400 compradores e inquilinos confían en nosotros
        </p>
        <h1 className="max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Encontrá el lugar al que vas a querer volver.
        </h1>
        <p className="mt-5 max-w-xl text-base text-mist-light/90 sm:text-lg">
          Explorá propiedades curadas en los barrios más buscados del país, con filtros en
          tiempo real pensados para cómo buscás de verdad.
        </p>

        <div className="mt-10">
          <SearchFilters filters={filters} onChange={onChange} resultCount={resultCount} />
        </div>
      </div>
    </section>
  )
}
