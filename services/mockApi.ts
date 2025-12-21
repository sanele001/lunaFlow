
import { AppState, Symptom, CycleEntry, WellnessEntry, Article } from '../types';

const STORAGE_KEY = 'lunaflow_data';

const DEFAULT_STATE: AppState = {
  symptoms: [
    { id: '1', name: 'Hot Flashes', severity: 3, timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', name: 'Brain Fog', severity: 2, timestamp: new Date(Date.now() - 172800000).toISOString() },
  ],
  cycles: [
    { id: '1', startDate: '2024-04-01', endDate: '2024-04-05', intensity: 'Medium' },
    { id: '2', startDate: '2024-05-03', endDate: '2024-05-08', intensity: 'Heavy' },
  ],
  wellness: [
    { id: '1', date: new Date().toISOString(), mood: 'Calm', sleepHours: 7, energyLevel: 4, waterIntake: 8 },
  ],
  userProfile: {
    name: 'Sarah',
    stage: 'Perimenopause',
  }
};

export const getAppState = (): AppState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_STATE;
};

export const saveAppState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const MOCK_ARTICLES: Article[] = [
  {
    slug: 'navigating-perimenopause',
    title: 'Navigating the Early Signs of Perimenopause',
    category: 'Education',
    excerpt: 'Understanding the hormonal shifts that begin in your 40s.',
    content: 'Perimenopause is the transitional phase leading up to menopause. During this time, the production of estrogen and progesterone by your ovaries begins to fluctuate...',
    imageUrl: 'https://picsum.photos/seed/peri/800/400'
  },
  {
    slug: 'sleep-hygiene-tips',
    title: 'Improving Sleep During Hormonal Changes',
    category: 'Wellness',
    excerpt: 'Strategies to beat insomnia and night sweats.',
    content: 'Sleep disturbances are one of the most common complaints during menopause. Maintaining a cool room temperature and a consistent schedule can help...',
    imageUrl: 'https://picsum.photos/seed/sleep/800/400'
  },
  {
    slug: 'nutrition-and-bone-health',
    title: 'Nutrition for Stronger Bones',
    category: 'Health',
    excerpt: 'Why calcium and vitamin D matter more than ever.',
    content: 'As estrogen levels drop, bone density can decrease. Focus on calcium-rich foods like leafy greens, dairy, and fortified alternatives...',
    imageUrl: 'https://picsum.photos/seed/bones/800/400'
  }
];
