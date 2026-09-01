export interface ProjectItem {
  id: string;
  title: string;
  category: 'Graphic Design' | 'UI/UX Design' | 'Web Design' | 'Branding';
  client: string;
  year: string;
  heading?: string;
  description: string;
  software?: string[];
  tags: string[];
  imageUrl?: string;
  image?: string;
  metrics?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  description: string;
  badgeUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  imageUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: 'brush' | 'movie_edit' | 'language' | 'palette' | 'sparkles';
  description: string;
  isFeatured?: boolean;
  deliverables: string[];
  pricingStarting: string;
  turnaround: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}
