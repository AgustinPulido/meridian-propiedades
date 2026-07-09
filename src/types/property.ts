export type ListingType = 'En Venta' | 'En Alquiler'

export type PropertyType = 'Casa' | 'Departamento' | 'PH' | 'Dúplex' | 'Quinta'

export interface Property {
  id: string
  title: string
  address: string
  city: string
  price: number
  listingType: ListingType
  propertyType: PropertyType
  ambientes: number
  bedrooms: number
  bathrooms: number
  m2: number
  image: string
  images: string[]
  description: string
  featured: boolean
  yearBuilt: number
}
