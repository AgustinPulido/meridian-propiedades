const stats = [
  { label: 'Propiedades Activas', value: '1.240+' },
  { label: 'Ciudades Cubiertas', value: '24' },
  { label: 'Días Promedio en el Mercado', value: '18' },
  { label: 'Satisfacción de Clientes', value: '98%' },
]

export default function StatsBar() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4 lg:px-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <p className="font-display text-3xl text-white">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-mist-light/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
