export type AttractionCategory =
  | "All"
  | "Hotels"
  | "Nature"
  | "Historical"
  | "Beaches"
  | "Religious"
  | "Dining";

export interface Attraction {
  id: number;
  name: string;
  category: Exclude<AttractionCategory, "All">;
  city: string;
  location: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  latitude: number;
  longitude: number;
  openingHours: string;
  entryFee: string;
  estimatedTime: string;
  tags: string[];
  features: string[];
  tips: string[];
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  label: string;
}

export interface UserProfile {
  name: string;
  preferredCity: string;
  preferredCategory: AttractionCategory;
}
