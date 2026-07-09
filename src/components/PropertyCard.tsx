import type { Property } from '../types/property'

interface Props {
  property: Property
  onSelect: (property: Property) => void
  saved: boolean
  onToggleSave: (id: string) => void
}

const formatPrice = (price: number, listingType: Property['listingType']) => {
  const formatted = price.toLocaleString('es-AR')
  return listingType === 'En Alquiler' ? `$ ${formatted} /mes` : `US$ ${formatted}`
}

export default function PropertyCard({ property, onSelect, saved, onToggleSave }: Props) {
  return (
    <div
      onClick={() => onSelect(property)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-midnight/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-semibold text-white shadow-sm ${
              property.listingType === 'En Venta' ? 'bg-ink' : 'bg-clay'
            }`}
          >
            {property.listingType}
          </span>
          {property.featured && (
            <span className="rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm">
              Destacada
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleSave(property.id)
          }}
          aria-label="Guardar propiedad"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-transform hover:scale-110"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={saved ? '#CF6766' : 'none'}
            stroke={saved ? '#CF6766' : 'currentColor'}
            strokeWidth="2"
          >
            <path
              d="M12 21s-7.5-4.8-10-9.3C.4 8.1 2 4.5 5.6 4c2-.3 3.9.6 5 2.2C11.7 4.6 13.6 3.7 15.6 4c3.6.5 5.2 4.1 3.6 7.7C17.5 16.2 12 21 12 21z"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-ink">{property.title}</h3>
        </div>
        <p className="mt-1 text-sm text-ink/60">
          {property.address}, {property.city}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-ink/70">
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10v10h18V10M1 10l11-7 11 7M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {property.ambientes} amb
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM4 12V7a2 2 0 012-2h2v2M8 21v-3M16 21v-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {property.bathrooms} baños
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" strokeLinejoin="round" />
            </svg>
            {property.m2.toLocaleString('es-AR')} m²
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-mist/20 pt-4">
          <span className="font-display text-xl text-clay">
            {formatPrice(property.price, property.listingType)}
          </span>
          <span className="text-xs font-semibold text-ink/40">{property.propertyType}</span>
        </div>
      </div>
    </div>
  )
}
