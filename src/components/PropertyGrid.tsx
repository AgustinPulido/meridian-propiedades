import type { Property } from '../types/property'
import type { Filters } from '../types/filters'
import PropertyCard from './PropertyCard'

interface Props {
  properties: Property[]
  filters: Filters
  onSortChange: (sort: Filters['sort']) => void
  onSelect: (property: Property) => void
  onReset: () => void
  savedIds: Set<string>
  onToggleSave: (id: string) => void
  savedOnly: boolean
  onClearSavedOnly: () => void
}

const sortOptions: { value: Filters['sort']; label: string }[] = [
  { value: 'featured', label: 'Destacadas' },
  { value: 'newest', label: 'Más nuevas' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
]

export default function PropertyGrid({
  properties,
  filters,
  onSortChange,
  onSelect,
  onReset,
  savedIds,
  onToggleSave,
  savedOnly,
  onClearSavedOnly,
}: Props) {
  return (
    <section id="listings" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            {savedOnly ? 'Guardadas' : 'Propiedades'}
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {properties.length} {properties.length === 1 ? 'propiedad' : 'propiedades'}
            {savedOnly ? ' guardadas' : ' disponibles'}
          </h2>
          {savedOnly && (
            <button onClick={onClearSavedOnly} className="mt-2 text-sm font-semibold text-clay hover:underline">
              Ver todas las propiedades
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-ink/50">Ordenar por</label>
          <select
            value={filters.sort}
            onChange={(e) => onSortChange(e.target.value as Filters['sort'])}
            className="rounded-lg border border-mist/40 bg-white px-3 py-2 text-sm text-ink focus:border-clay focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-mist/40 py-20 text-center">
          <p className="font-display text-2xl text-ink">
            {savedOnly ? 'Todavía no guardaste ninguna propiedad' : 'No encontramos propiedades con esos filtros'}
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink/50">
            {savedOnly
              ? 'Tocá el corazón en cualquier propiedad para guardarla y verla acá.'
              : 'Probá ampliar el rango de precio o quitar algún filtro para ver más resultados.'}
          </p>
          <button
            onClick={savedOnly ? onClearSavedOnly : onReset}
            className="mt-6 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-light"
          >
            {savedOnly ? 'Ver todas las propiedades' : 'Limpiar filtros'}
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelect}
              saved={savedIds.has(property.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </section>
  )
}
