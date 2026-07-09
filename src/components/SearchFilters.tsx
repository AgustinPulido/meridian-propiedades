import type { Filters } from '../types/filters'
import type { ListingType, PropertyType } from '../types/property'

interface Props {
  filters: Filters
  onChange: (partial: Partial<Filters>) => void
  resultCount?: number
}

const listingTypes: (ListingType | 'All')[] = ['All', 'En Venta', 'En Alquiler']
const listingTypeLabels: Record<ListingType | 'All', string> = {
  All: 'Todas',
  'En Venta': 'En Venta',
  'En Alquiler': 'En Alquiler',
}
const propertyTypes: (PropertyType | 'All')[] = [
  'All',
  'Casa',
  'Departamento',
  'PH',
  'Dúplex',
  'Quinta',
]
const bedroomOptions = [0, 1, 2, 3, 4, 5]

const formatPrice = (n: number) => `$ ${n.toLocaleString('es-AR')}`

export default function SearchFilters({ filters, onChange, resultCount }: Props) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-midnight/5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {listingTypes.map((type) => (
          <button
            key={type}
            onClick={() => onChange({ listingType: type })}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              filters.listingType === type
                ? 'bg-ink text-white'
                : 'bg-mist/20 text-ink/70 hover:bg-mist/30'
            }`}
          >
            {listingTypeLabels[type]}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr_auto] lg:items-end lg:gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
            Barrio, ciudad o dirección
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-mist/40 px-3 py-2.5 focus-within:border-clay">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-ink/40">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={filters.query}
              onChange={(e) => onChange({ query: e.target.value })}
              placeholder="Palermo, Nordelta, Av. Santa Fe..."
              className="w-full text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
            Tipo de propiedad
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => onChange({ propertyType: e.target.value as Filters['propertyType'] })}
            className="w-full rounded-lg border border-mist/40 px-3 py-2.5 text-sm text-ink focus:border-clay focus:outline-none"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'Todos' : type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
            Dormitorios
          </label>
          <select
            value={filters.minBedrooms}
            onChange={(e) => onChange({ minBedrooms: Number(e.target.value) })}
            className="w-full rounded-lg border border-mist/40 px-3 py-2.5 text-sm text-ink focus:border-clay focus:outline-none"
          >
            {bedroomOptions.map((n) => (
              <option key={n} value={n}>
                {n === 0 ? 'Cualquiera' : `${n}+`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-ink/50">
            <span>Precio máximo</span>
            <span className="text-clay">{formatPrice(filters.maxPrice)}</span>
          </label>
          <input
            type="range"
            min={50000}
            max={950000}
            step={5000}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-clay"
          />
        </div>

        <button
          onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center justify-center gap-2 rounded-lg bg-clay px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-dark lg:h-[42px]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          Buscar
        </button>
      </div>

      {typeof resultCount === 'number' && (
        <p className="mt-4 text-xs text-ink/50">
          {resultCount} {resultCount === 1 ? 'propiedad coincide' : 'propiedades coinciden'} con tu búsqueda
        </p>
      )}
    </div>
  )
}
