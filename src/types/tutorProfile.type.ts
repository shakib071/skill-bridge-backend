
export interface CreateTutorProfileInput {
  userId: string;
  categoryId: string;
  bio?: string;
  hourly_rate?: number;
  subjects?: string[];
  total_session_completed?: number;
  languages?: string[];
  isFeatured?: boolean;
  experienceYears?: number;
  education?: string;
}