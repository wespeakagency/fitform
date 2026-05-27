export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  validityDays: number;
  perClass?: number;
  isPopular?: boolean;
}

export interface ClassSession {
  id: string;
  time: string;
  duration: number;
  instructor: string;
  type: 'Strong Pilates' | 'Recovery' | 'Intro';
  capacity: number;
  booked: number;
  status: 'open' | 'waitlist' | 'full';
  date?: string; // Add date for booking context
}

export interface Spot {
  id: number;
  isOccupied: boolean;
  isSelected: boolean;
  number: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PolicyLink {
  href: string;
  label: string;
}

export interface PolicyParagraph {
  emphasis?: string;
  separator?: ':' | '';
  text: string;
  link?: PolicyLink;
  textAfterLink?: string;
}

export interface PolicySection {
  title: string;
  paragraphs: PolicyParagraph[];
}

export interface PolicyContent {
  intro?: string;
  sections: PolicySection[];
}

export interface Instructor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export enum PackageType {
  STANDARD = 'STANDARD',
  PM = 'PM'
}
