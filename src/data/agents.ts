const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`

export interface Agent {
  id: string
  name: string
  role: string
  photo: string
  email: string
  phone: string
}

export const agents: Agent[] = [
  {
    id: 'ag1',
    name: 'Martina Sosa',
    role: 'Directora Comercial',
    photo: img('photo-1573497019940-1c28c88b4f3e'),
    email: 'martina@meridianpropiedades.com.ar',
    phone: '+54 9 11 5555-0142',
  },
  {
    id: 'ag2',
    name: 'Lucas Fernández',
    role: 'Especialista en Alquileres',
    photo: img('photo-1519085360753-af0119f7cbe7'),
    email: 'lucas@meridianpropiedades.com.ar',
    phone: '+54 9 11 5555-0198',
  },
  {
    id: 'ag3',
    name: 'Sofía Giménez',
    role: 'Asesora en Propiedades Premium',
    photo: img('photo-1544005313-94ddf0286df2'),
    email: 'sofia@meridianpropiedades.com.ar',
    phone: '+54 9 11 5555-0231',
  },
]
