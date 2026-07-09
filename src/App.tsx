import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import PropertyGrid from './components/PropertyGrid'
import PropertyModal from './components/PropertyModal'
import PublishModal from './components/PublishModal'
import ContactModal, { type ContactContext } from './components/ContactModal'
import AgentsSection from './components/AgentsSection'
import Footer from './components/Footer'
import { properties as baseProperties } from './data/properties'
import { agents, type Agent } from './data/agents'
import { defaultFilters, type Filters } from './types/filters'
import type { Property } from './types/property'
import { useLocalStorage } from './hooks/useLocalStorage'

const scrollTo = (id: string) => {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  })
}

export default function App() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selected, setSelected] = useState<Property | null>(null)
  const [customProperties, setCustomProperties] = useLocalStorage<Property[]>('meridian:custom-properties', [])
  const [savedIds, setSavedIds] = useLocalStorage<string[]>('meridian:saved', [])
  const [savedOnly, setSavedOnly] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const [contactContext, setContactContext] = useState<ContactContext | null>(null)

  const allProperties = useMemo(() => [...customProperties, ...baseProperties], [customProperties])
  const savedSet = useMemo(() => new Set(savedIds), [savedIds])

  const updateFilters = (partial: Partial<Filters>) => setFilters((prev) => ({ ...prev, ...partial }))

  const toggleSaved = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const openContact = (subject: string, message: string) => setContactContext({ subject, message })

  const handleNavClick = (label: string) => {
    switch (label) {
      case 'Comprar':
        updateFilters({ listingType: 'En Venta' })
        setSavedOnly(false)
        scrollTo('listings')
        break
      case 'Alquilar':
        updateFilters({ listingType: 'En Alquiler' })
        setSavedOnly(false)
        scrollTo('listings')
        break
      case 'Vender':
        setPublishOpen(true)
        break
      case 'Agentes':
        scrollTo('agents')
        break
      case 'Contacto':
        openContact('Contactanos', '')
        break
    }
  }

  const handleFooterLink = (label: string) => {
    switch (label) {
      case 'Comprar una Propiedad':
        handleNavClick('Comprar')
        break
      case 'Alquilar una Propiedad':
        handleNavClick('Alquilar')
        break
      case 'Vender tu Propiedad':
        setPublishOpen(true)
        break
      case 'Obra Nueva':
        updateFilters({ sort: 'newest' })
        setSavedOnly(false)
        scrollTo('listings')
        break
      case 'Quiénes Somos':
        scrollTo('top')
        break
      case 'Nuestros Agentes':
        scrollTo('agents')
        break
      case 'Trabajá con Nosotros':
        openContact('Trabajá con Nosotros', 'Hola, me interesa sumarme al equipo de Meridian Propiedades.')
        break
      case 'Prensa':
        window.location.href = 'mailto:prensa@meridianpropiedades.com.ar'
        break
      case 'Calculadora de Crédito Hipotecario':
        openContact(
          'Calculadora de Crédito Hipotecario',
          'Hola, me gustaría recibir información sobre financiación hipotecaria.',
        )
        break
      case 'Tendencias del Mercado':
        openContact('Tendencias del Mercado', 'Hola, me gustaría recibir el último informe de tendencias del mercado.')
        break
      case 'Guía del Comprador':
        openContact('Guía del Comprador', 'Hola, me gustaría recibir la guía del comprador.')
        break
      case 'Preguntas Frecuentes':
        openContact('Preguntas Frecuentes', 'Hola, tengo una consulta.')
        break
    }
  }

  const handleContactAgent = (agent: Agent) =>
    openContact(`Contactar a ${agent.name}`, `Hola ${agent.name.split(' ')[0]}, quisiera más información.`)

  const handleRequestTour = (property: Property) =>
    openContact(
      'Solicitar Visita',
      `Hola, quiero coordinar una visita a "${property.title}" (${property.address}, ${property.city}).`,
    )

  const handleContactPropertyAgent = (property: Property) =>
    openContact(
      'Contactar Agente',
      `Hola, quiero más información sobre "${property.title}" (${property.address}, ${property.city}).`,
    )

  const handlePublish = (property: Property) => {
    setCustomProperties((prev) => [property, ...prev])
    scrollTo('listings')
  }

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    let result = allProperties.filter((p) => {
      if (savedOnly && !savedSet.has(p.id)) return false
      if (filters.listingType !== 'All' && p.listingType !== filters.listingType) return false
      if (filters.propertyType !== 'All' && p.propertyType !== filters.propertyType) return false
      if (p.bedrooms < filters.minBedrooms) return false
      if (p.price > filters.maxPrice) return false
      if (query) {
        const haystack = `${p.title} ${p.address} ${p.city}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })

    switch (filters.sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result = [...result].sort((a, b) => b.yearBuilt - a.yearBuilt)
        break
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return result
  }, [filters, allProperties, savedOnly, savedSet])

  return (
    <div className="min-h-screen bg-mist/10">
      <Navbar
        onNavClick={handleNavClick}
        onPublishClick={() => setPublishOpen(true)}
        savedCount={savedIds.length}
        savedActive={savedOnly}
        onToggleSaved={() => {
          setSavedOnly((v) => !v)
          scrollTo('listings')
        }}
      />
      <Hero filters={filters} onChange={updateFilters} resultCount={filtered.length} />
      <StatsBar />
      <PropertyGrid
        properties={filtered}
        filters={filters}
        onSortChange={(sort) => updateFilters({ sort })}
        onSelect={setSelected}
        onReset={() => {
          setFilters(defaultFilters)
          setSavedOnly(false)
        }}
        savedIds={savedSet}
        onToggleSave={toggleSaved}
        savedOnly={savedOnly}
        onClearSavedOnly={() => setSavedOnly(false)}
      />
      <AgentsSection agents={agents} onContactAgent={handleContactAgent} />
      <Footer onLinkClick={handleFooterLink} />

      {selected && (
        <PropertyModal
          property={selected}
          onClose={() => setSelected(null)}
          onRequestTour={handleRequestTour}
          onContactAgent={handleContactPropertyAgent}
        />
      )}

      {publishOpen && <PublishModal onClose={() => setPublishOpen(false)} onPublish={handlePublish} />}

      {contactContext && <ContactModal context={contactContext} onClose={() => setContactContext(null)} />}
    </div>
  )
}
