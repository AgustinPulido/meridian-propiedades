import type { ListingType, PropertyType } from './property'

export interface Filters {
  query: string
  listingType: ListingType | 'All'
  propertyType: PropertyType | 'All'
  maxPrice: number
  minBedrooms: number
  sort: 'featured' | 'price-asc' | 'price-desc' | 'newest'
}

export const defaultFilters: Filters = {
  query: '',
  listingType: 'All',
  propertyType: 'All',
  maxPrice: 950000,
  minBedrooms: 0,
  sort: 'featured',
}
