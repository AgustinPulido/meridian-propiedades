import { useEffect, useState, type FormEvent } from 'react'

export interface ContactContext {
  subject: string
  message: string
}

interface Props {
  context: ContactContext
  onClose: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactModal({ context, onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(context.message)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    setMessage(context.message)
    setStatus('idle')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [context, onClose])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Ingresá tu nombre.'
    if (!EMAIL_RE.test(email.trim())) next.email = 'Ingresá un email válido.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-midnight/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {status === 'sent' ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-2xl text-ink">¡Mensaje enviado!</h2>
            <p className="mt-2 max-w-xs text-sm text-ink/60">
              Gracias {name.split(' ')[0]}, un asesor de Meridian Propiedades se va a contactar con vos a la brevedad.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-clay px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-dark"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">{context.subject}</h2>
                <p className="mt-1 text-sm text-ink/60">Dejanos tus datos y te contactamos a la brevedad.</p>
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

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Nombre
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm text-ink focus:outline-none ${
                    errors.name ? 'border-clay' : 'border-mist/40 focus:border-clay'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-clay">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vos@email.com"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm text-ink focus:outline-none ${
                      errors.email ? 'border-clay' : 'border-mist/40 focus:border-clay'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-clay">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
                    Teléfono (opcional)
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 9 11..."
                    className="w-full rounded-lg border border-mist/40 px-3 py-2.5 text-sm text-ink focus:border-clay focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Mensaje
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-mist/40 px-3 py-2.5 text-sm text-ink focus:border-clay focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-lg bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-dark disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
