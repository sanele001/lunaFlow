
import React, { useState } from 'react';
import { MOCK_SYMPTOMS_LIST } from '../constants';
import { Severity, Symptom, AppState } from '../types';
// Added Activity to the imports from lucide-react
import { Plus, Clock, Filter, Trash2, Calendar as CalendarIcon, Activity } from 'lucide-react';
import { format } from 'date-fns';

const SymptomTracker: React.FC<{ state: AppState, onAdd: (s: Symptom) => void, onDelete: (id: string) => void }> = ({ state, onAdd, onDelete }) => {
  const [selectedSymptom, setSelectedSymptom] = useState(MOCK_SYMPTOMS_LIST[0]);
  const [severity, setSeverity] = useState<Severity>(Severity.MILD);
  const [notes, setNotes] = useState('');

  const handleAdd = () => {
    const newSymptom: Symptom = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedSymptom,
      severity,
      timestamp: new Date().toISOString(),
      notes: notes.trim()
    };
    onAdd(newSymptom);
    setNotes('');
  };

  const getSeverityColor = (s: Severity) => {
    switch(s) {
      case Severity.MILD: return 'bg-blue-100 text-blue-600';
      case Severity.MODERATE: return 'bg-green-100 text-green-600';
      case Severity.HIGH: return 'bg-yellow-100 text-yellow-600';
      case Severity.SEVERE: return 'bg-orange-100 text-orange-600';
      case Severity.EXTREME: return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Log Form */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Log Symptom</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">What are you feeling?</label>
              <div className="flex flex-wrap gap-2">
                {MOCK_SYMPTOMS_LIST.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSymptom(s)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedSymptom === s
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Severity (1-5)</label>
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSeverity(level as Severity)}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                      severity === level
                        ? 'bg-purple-600 text-white scale-110 shadow-lg'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Mild</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Extreme</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific triggers or context?"
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-purple-200 h-24 outline-none"
              />
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-100 hover:shadow-purple-200 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Save Log
            </button>
          </div>
        </section>

        {/* History */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">History</h2>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {state.symptoms.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No logs yet. Start by adding one!</p>
              </div>
            ) : (
              state.symptoms.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((symptom) => (
                <div key={symptom.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-start gap-4 hover:shadow-sm transition-shadow">
                  <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center font-bold ${getSeverityColor(symptom.severity)}`}>
                    {symptom.severity}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{symptom.name}</h4>
                      <button onClick={() => onDelete(symptom.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {format(new Date(symptom.timestamp), 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(symptom.timestamp), 'h:mm a')}
                      </span>
                    </div>
                    {symptom.notes && (
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg italic">
                        "{symptom.notes}"
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SymptomTracker;
