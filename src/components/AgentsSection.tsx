import type { Agent } from '../data/agents'

interface Props {
  agents: Agent[]
  onContactAgent: (agent: Agent) => void
}

export default function AgentsSection({ agents, onContactAgent }: Props) {
  return (
    <section id="agents" className="bg-mist/10 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-clay">Nuestro Equipo</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Agentes que conocen cada barrio</h2>

        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-midnight/5"
            >
              <img src={agent.photo} alt={agent.name} className="h-64 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-display text-lg text-ink">{agent.name}</h3>
                <p className="mt-1 text-sm text-ink/60">{agent.role}</p>
                <button
                  onClick={() => onContactAgent(agent)}
                  className="mt-4 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  Contactar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
