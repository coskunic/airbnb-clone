export interface Home {
  id: number;
  title: string;
  description: string;
  pricePerNight: number;
  location: string;
  imageUrl: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
}
