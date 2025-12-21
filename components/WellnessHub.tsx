
import React, { useState, useEffect } from 'react';
import { MOODS } from '../constants';
import { Play, Pause, RotateCcw, Droplets, Moon, Battery, Sparkles } from 'lucide-react';

const WellnessHub: React.FC = () => {
  const [mood, setMood] = useState('Happy');
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [waterCount, setWaterCount] = useState(0);

  useEffect(() => {
    let interval: number;
    if (timerActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = ((300 - timeLeft) / 300) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Meditation Timer */}
      <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Quick Calm
          </h2>
          <p className="text-sm text-gray-500">Take a moment to breathe</p>
        </div>
        
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96" cy="96" r="80"
              stroke="#F3F4F6" strokeWidth="8" fill="transparent"
            />
            <circle
              cx="96" cy="96" r="80"
              stroke="#A855F7" strokeWidth="8" fill="transparent"
              strokeDasharray={502.4}
              strokeDashoffset={502.4 - (502.4 * progress) / 100}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-black text-gray-800">{formatTime(timeLeft)}</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              {timerActive ? 'Exhale' : 'Ready?'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => setTimerActive(!timerActive)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              timerActive ? 'bg-orange-100 text-orange-600' : 'bg-purple-600 text-white shadow-lg shadow-purple-200'
            }`}
          >
            {timerActive ? <Pause /> : <Play className="ml-1" />}
          </button>
          <button
            onClick={() => { setTimerActive(false); setTimeLeft(300); }}
            className="w-14 h-14 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </section>

      <div className="space-y-8">
        {/* Mood Tracker */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">How are you feeling?</h3>
          <div className="grid grid-cols-3 gap-3">
            {MOODS.map((m) => (
              <button
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border ${
                  mood === m.label
                    ? 'bg-pink-50 border-pink-200 shadow-sm scale-105'
                    : 'bg-white border-gray-100 grayscale opacity-60'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Daily Stats Loggers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="w-6 h-6 text-blue-500" />
              <button onClick={() => setWaterCount(c => Math.min(c+1, 12))} className="text-xl font-bold bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-blue-600">+</button>
            </div>
            <p className="text-sm font-semibold text-blue-800">Hydration</p>
            <p className="text-2xl font-black text-blue-900">{waterCount} <span className="text-sm font-medium">glasses</span></p>
            <div className="flex gap-1 mt-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i < waterCount ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <Moon className="w-6 h-6 text-indigo-500" />
              <Battery className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm font-semibold text-indigo-800">Sleep & Energy</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-black text-indigo-900">7.5</span>
              <span className="text-xs font-medium text-indigo-600 mb-1">hrs</span>
            </div>
            <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mt-2">Recovery: Good</p>
          </div>
        </div>

        {/* Affirmation */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 rounded-3xl text-white">
          <p className="text-xs uppercase font-bold opacity-80 mb-2">Daily Affirmation</p>
          <p className="text-lg font-medium leading-relaxed italic">
            "I am in harmony with my body's changes and I honor my needs today."
          </p>
        </div>
      </div>
    </div>
  );
};

export default WellnessHub;
