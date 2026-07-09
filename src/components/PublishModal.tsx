import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import type { ListingType, Property, PropertyType } from '../types/property'

interface Props {
  onClose: () => void
  onPublish: (property: Property) => void
}

const propertyTypes: PropertyType[] = ['Casa', 'Departamento', 'PH', 'Dúplex', 'Quinta']

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'

interface FormState {
  title: string
  listingType: ListingType
  propertyType: PropertyType
  address: string
  city: string
  price: string
  ambientes: string
  bedrooms: string
  bathrooms: string
  m2: string
  yearBuilt: string
  description: string
  image: string
}

const emptyForm: FormState = {
  title: '',
  listingType: 'En Venta',
  propertyType: 'Casa',
  address: '',
  city: '',
  price: '',
  ambientes: '',
  bedrooms: '',
  bathrooms: '',
  m2: '',
  yearBuilt: String(new Date().getFullYear()),
  description: '',
  image: '',
}

export default function PublishModal({ onClose, onPublish }: Props) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [published, setPublished] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const update = (field: keyof FormState, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.title.trim()) next.title = 'Ingresá un título.'
    if (!form.address.trim()) next.address = 'Ingresá una dirección.'
    if (!form.city.trim()) next.city = 'Ingresá barrio y ciudad.'
    if (!form.price || Number(form.price) <= 0) next.price = 'Ingresá un precio válido.'
    if (!form.ambientes || Number(form.ambientes) <= 0) next.ambientes = 'Ingresá los ambientes.'
    if (form.bedrooms === '' || Number(form.bedrooms) < 0) next.bedrooms = 'Ingresá los dormitorios.'
    if (form.bathrooms === '' || Number(form.bathrooms) <= 0) next.bathrooms = 'Ingresá los baños.'
    if (!form.m2 || Number(form.m2) <= 0) next.m2 = 'Ingresá los m².'
    if (!form.description.trim() || form.description.trim().length < 20)
      next.description = 'Contanos un poco más (mínimo 20 caracteres).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const image = form.image.trim() || DEFAULT_IMAGE
    const property: Property = {
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      price: Number(form.price),
      listingType: form.listingType,
      propertyType: form.propertyType,
      ambientes: Number(form.ambientes),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      m2: Number(form.m2),
      image,
      images: [image],
      description: form.description.trim(),
      featured: true,
      yearBuilt: Number(form.yearBuilt) || new Date().getFullYear(),
    }

    onPublish(property)
    setPublished(true)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {published ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-2xl text-ink">¡Tu propiedad ya está publicada!</h2>
            <p className="mt-2 max-w-sm text-sm text-ink/60">
              &quot;{form.title}&quot; ya figura en el listado principal, marcada como destacada.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-clay px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              Ver listado
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">Publicá tu Propiedad</h2>
                <p className="mt-1 text-sm text-ink/60">Completá los datos y tu propiedad aparecerá al instante en el listado.</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-mist/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="flex gap-2">
                {(['En Venta', 'En Alquiler'] as ListingType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update('listingType', type)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                      form.listingType === type ? 'bg-ink text-white' : 'bg-mist/20 text-ink/70 hover:bg-mist/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <Field label="Título" error={errors.title}>
                <input
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                  placeholder="Ej: Departamento con balcón en Belgrano"
                  className={inputClass(!!errors.title)}
                />
              </Field>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Dirección" error={errors.address}>
                  <input
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="Ej: Av. Cabildo 2100"
                    className={inputClass(!!errors.address)}
                  />
                </Field>
                <Field label="Barrio y ciudad" error={errors.city}>
                  <input
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="Ej: Belgrano, CABA"
                    className={inputClass(!!errors.city)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Tipo de propiedad">
                  <select
                    value={form.propertyType}
                    onChange={(e) => update('propertyType', e.target.value)}
                    className={inputClass(false)}
                  >
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={form.listingType === 'En Alquiler' ? 'Precio ($ ARS /mes)' : 'Precio (US$)'} error={errors.price}>
                  <input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => update('price', e.target.value)}
                    placeholder="0"
                    className={inputClass(!!errors.price)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                <Field label="Ambientes" error={errors.ambientes}>
                  <input
                    type="number"
                    min={0}
                    value={form.ambientes}
                    onChange={(e) => update('ambientes', e.target.value)}
                    className={inputClass(!!errors.ambientes)}
                  />
                </Field>
                <Field label="Dormitorios" error={errors.bedrooms}>
                  <input
                    type="number"
                    min={0}
                    value={form.bedrooms}
                    onChange={(e) => update('bedrooms', e.target.value)}
                    className={inputClass(!!errors.bedrooms)}
                  />
                </Field>
                <Field label="Baños" error={errors.bathrooms}>
                  <input
                    type="number"
                    min={0}
                    value={form.bathrooms}
                    onChange={(e) => update('bathrooms', e.target.value)}
                    className={inputClass(!!errors.bathrooms)}
                  />
                </Field>
                <Field label="m²" error={errors.m2}>
                  <input
                    type="number"
                    min={0}
                    value={form.m2}
                    onChange={(e) => update('m2', e.target.value)}
                    className={inputClass(!!errors.m2)}
                  />
                </Field>
              </div>

              <Field label="URL de imagen (opcional)">
                <input
                  value={form.image}
                  onChange={(e) => update('image', e.target.value)}
                  placeholder="https://..."
                  className={inputClass(false)}
                />
              </Field>

              <Field label="Descripción" error={errors.description}>
                <textarea
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  rows={4}
                  placeholder="Contanos sobre la propiedad: ambientes, luz, estado, amenities..."
                  className={inputClass(!!errors.description)}
                />
              </Field>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
                >
                  Publicar Propiedad
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm text-ink focus:outline-none ${
    hasError ? 'border-clay focus:border-clay' : 'border-mist/40 focus:border-clay'
  }`
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-clay">{error}</p>}
    </div>
  )
}
