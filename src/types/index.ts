export type Language = 'EN' | 'NE';

export type Theme = 'dark' | 'light';

export interface NewsArticle {
  id: string;
  title: string;
  titleNe: string;
  source: string;
  url: string;
  date: string;
  category: string;
  categoryNe: string;
  summary: string;
  summaryNe: string;
  readTime?: string;
  featured?: boolean;
}

export type DevelopmentCategory = 
  | 'All' 
  | 'Infrastructure' 
  | 'Agriculture & Energy' 
  | 'Heritage & Tourism' 
  | 'Social Justice';

export interface DevelopmentProject {
  id: string;
  title: string;
  titleNe: string;
  category: 'Infrastructure' | 'Agriculture & Energy' | 'Heritage & Tourism' | 'Social Justice';
  categoryNe: string;
  location: string;
  locationNe: string;
  year: string;
  impactMetric: string;
  impactMetricNe: string;
  metricLabel: string;
  metricLabelNe: string;
  summary: string;
  summaryNe: string;
  description: string;
  descriptionNe: string;
  image: string;
  highlights: string[];
  highlightsNe: string[];
  status: 'Completed' | 'Ongoing' | 'Expanded';
  statusNe: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  titleNe: string;
  role: string;
  roleNe: string;
  description: string;
  descriptionNe: string;
  tag: string;
  tagNe: string;
  isKeyMandate?: boolean;
  image?: string;
}

export interface GrievanceFormData {
  fullName: string;
  phone: string;
  municipality: string;
  ward: string;
  category: string;
  message: string;
}

export interface GrievanceTicket extends GrievanceFormData {
  id: string;
  createdAt: string;
  status: 'Received' | 'Assigned to Secretariat Team' | 'Assigned to Constituency Team' | 'In Progress' | 'Resolved';
  statusNe: string;
  estimatedResolution: string;
}

export interface SocialPost {
  id: string;
  platform: 'youtube' | 'facebook' | 'tiktok';
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  url: string;
  author: string;
  date: string;
  engagement: string;
  embedType: 'video' | 'post' | 'reel';
  thumbnailUrl?: string;
}
