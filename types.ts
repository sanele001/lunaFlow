
export enum Severity {
  NONE = 0,
  MILD = 1,
  MODERATE = 2,
  HIGH = 3,
  SEVERE = 4,
  EXTREME = 5
}

export interface Symptom {
  id: string;
  name: string;
  severity: Severity;
  timestamp: string;
  notes?: string;
}

export interface CycleEntry {
  id: string;
  startDate: string;
  endDate?: string;
  intensity: 'Light' | 'Medium' | 'Heavy' | 'Spotting';
}

export interface WellnessEntry {
  id: string;
  date: string;
  mood: string;
  sleepHours: number;
  energyLevel: number;
  waterIntake: number;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  imageUrl: string;
}

export interface AppState {
  symptoms: Symptom[];
  cycles: CycleEntry[];
  wellness: WellnessEntry[];
  userProfile: {
    name: string;
    stage: 'Perimenopause' | 'Menopause' | 'Postmenopause' | 'Early Signs';
  };
}
