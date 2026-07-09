import { useEffect, useState } from 'react'
import type { Property } from '../types/property'

interface Props {
  property: Property
  onClose: () => void
  onRequestTour: (property: Property) => void
  onContactAgent: (property: Property) => void
}

const formatPrice = (price: number, listingType: Property['listingType']) => {
  const formatted = price.toLocaleString('es-AR')
  return listingType === 'En Alquiler' ? `$ ${formatted} /mes` : `US$ ${formatted}`
}

export default function PropertyModal({ property, onClose, onRequestTour, onContactAgent }: Props) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setActiveImage(0)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [property, onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="relative">
          <img src={property.images[activeImage]} alt={property.title} className="h-[340px] w-full object-cover sm:h-[420px]" />
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <span
            className={`absolute left-4 top-4 rounded-md px-3 py-1 text-xs font-semibold text-white shadow-sm ${
              property.listingType === 'En Venta' ? 'bg-ink' : 'bg-clay'
            }`}
          >
            {property.listingType}
          </span>

          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === activeImage ? 'w-6 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">{property.title}</h2>
              <p className="mt-1 text-sm text-ink/60">
                {property.address}, {property.city}
              </p>
            </div>
            <span className="font-display text-2xl text-clay sm:text-3xl">
              {formatPrice(property.price, property.listingType)}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-mist/10 p-5 sm:grid-cols-5">
            <Stat label="Ambientes" value={property.ambientes} />
            <Stat label="Dormitorios" value={property.bedrooms} />
            <Stat label="Baños" value={property.bathrooms} />
            <Stat label="m²" value={property.m2.toLocaleString('es-AR')} />
            <Stat label="Año" value={property.yearBuilt} />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink/70">{property.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onRequestTour(property)}
              className="flex-1 rounded-lg bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              Solicitar Visita
            </button>
            <button
              onClick={() => onContactAgent(property)}
              className="flex-1 rounded-lg border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
            >
              Contactar Agente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="font-display text-lg text-ink">{value}</p>
      <p className="text-xs uppercase tracking-wide text-ink/50">{label}</p>
    </div>
  )
}
