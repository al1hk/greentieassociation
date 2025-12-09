export type SponsorTier = 'TITLE' | 'GOLD' | 'SILVER' | 'BRONZE';

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  logoUrl?: string; // Optional URL if we had real images
}

export interface NavItem {
  label: string;
  href: string;
}

export interface EventDetails {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  galleryUrl?: string;
}