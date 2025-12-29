
import { LayoutDashboard, Activity, Calendar, Heart, Lightbulb, BookOpen } from 'lucide-react';
import React from 'react';

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Symptoms', path: '/symptoms', icon: <Activity className="w-5 h-5" /> },
  { label: 'Cycle', path: '/cycle', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Wellness', path: '/wellness', icon: <Heart className="w-5 h-5" /> },
  { label: 'Insights', path: '/insights', icon: <Lightbulb className="w-5 h-5" /> },
  { label: 'Resources', path: '/resources', icon: <BookOpen className="w-5 h-5" /> },
];

export const ABOUT = [{ label: 'About this project', path: '/About', icon: <BookOpen className="w-5 h-5" /> }]

export const MOCK_SYMPTOMS_LIST = [
  "Hot Flashes", "Night Sweats", "Brain Fog", "Joint Pain", "Insomnia", "Anxiety", "Mood Swings", "Fatigue"
];

export const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😫', label: 'Stressed' },
  { emoji: '😤', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
];
