
import React from 'react';
import { AppState } from '../types';
import { Calendar as LucideCalendar, Info, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
// Added format import from date-fns
import { format } from 'date-fns';

const CycleTracker: React.FC<{ state: AppState }> = ({ state }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentMonth = "May 2024";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <LucideCalendar className="w-6 h-6 text-pink-500" />
              Cycle Calendar
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-500">{currentMonth}</span>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-50 rounded-full border border-gray-100"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-50 rounded-full border border-gray-100"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-6 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <span key={d} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
            ))}
            {days.map(d => {
              const isPeriod = d >= 3 && d <= 7;
              const isPredicted = d >= 28;
              return (
                <div key={d} className="relative flex flex-col items-center group cursor-pointer">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-2xl text-sm font-bold transition-all ${
                    isPeriod ? 'bg-pink-100 text-pink-600' : 
                    isPredicted ? 'border-2 border-dashed border-pink-200 text-pink-400' : 
                    'text-gray-600 hover:bg-gray-50'
                  }`}>
                    {d}
                  </div>
                  {isPeriod && <div className="absolute -bottom-1 w-1 h-1 bg-pink-500 rounded-full"></div>}
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-50 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-500">Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-dashed border-pink-300 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-500">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-500">Ovulation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-500">Logged Today</span>
            </div>
          </div>
        </div>

        {/* Insights & History */}
        <div className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h4 className="font-bold text-orange-900">Irregularity Detected</h4>
                <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                  Your last cycle was 45 days, which is longer than your average. This is common during perimenopause.
                </p>
                <button className="mt-3 text-xs font-bold text-orange-800 underline">Tell me more</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold mb-4">Cycle History</h3>
            <div className="space-y-4">
              {state.cycles.map(cycle => (
                <div key={cycle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Start Date</p>
                    <p className="font-bold">{format(new Date(cycle.startDate), 'MMMM d, yyyy')}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-pink-100 text-pink-600 uppercase">
                      {cycle.intensity}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">5 days</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-white border-2 border-purple-100 text-purple-600 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors">
            <Info className="w-5 h-5" />
            Cycle Predictions Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default CycleTracker;
