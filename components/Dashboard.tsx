
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
// Added Calendar to the imports from lucide-react
import { Activity, Thermometer, Moon, Zap, ChevronRight, Plus, Calendar } from 'lucide-react';
import { AppState } from '../types';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', hot: 2, mood: 3, energy: 4 },
  { name: 'Tue', hot: 5, mood: 2, energy: 3 },
  { name: 'Wed', hot: 1, mood: 4, energy: 5 },
  { name: 'Thu', hot: 3, mood: 3, energy: 2 },
  { name: 'Fri', hot: 4, mood: 1, energy: 4 },
  { name: 'Sat', hot: 2, mood: 5, energy: 5 },
  { name: 'Sun', hot: 0, mood: 4, energy: 4 },
];

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string, trend: string }> = ({ icon, label, value, color, trend }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div className="mt-2">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-bold">{value}</h4>
        <span className="text-xs text-green-500 font-medium">{trend}</span>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<{ state: AppState }> = ({ state }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Thermometer className="w-6 h-6 text-orange-600" />}
          label="Symptom Load"
          value="Moderate"
          color="bg-orange-50"
          trend="-12% vs last week"
        />
        <StatCard 
          icon={<Moon className="w-6 h-6 text-indigo-600" />}
          label="Sleep Quality"
          value="7.2 hrs"
          color="bg-indigo-50"
          trend="+0.5 hrs"
        />
        <StatCard 
          icon={<Zap className="w-6 h-6 text-yellow-600" />}
          label="Energy Level"
          value="8/10"
          color="bg-yellow-50"
          trend="Stable"
        />
        <StatCard 
          icon={<Calendar className="w-6 h-6 text-pink-600" />}
          label="Cycle Day"
          value="14"
          color="bg-pink-50"
          trend="Regular"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Weekly Wellness Overview</h3>
            <select className="text-sm border-none bg-gray-50 rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="mood" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
                <Area type="monotone" dataKey="energy" stroke="#EC4899" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Recent */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-6 rounded-3xl text-white shadow-lg shadow-purple-200">
            <h4 className="font-bold mb-2">Feeling different today?</h4>
            <p className="text-sm opacity-90 mb-4">Logging your symptoms daily helps identify patterns faster.</p>
            <Link to="/symptoms" className="bg-white text-purple-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Plus className="w-4 h-4" />
              Log Symptoms
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Next Cycle Estimate</h3>
            </div>
            <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl border border-pink-100">
              <div className="flex-1">
                <p className="text-xs text-pink-600 font-semibold uppercase tracking-wider">Estimated Start</p>
                <p className="text-xl font-bold text-gray-800">June 12, 2024</p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-pink-200 border-t-pink-500 flex items-center justify-center text-xs font-bold text-pink-600">
                12d
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h3 className="col-span-full font-bold text-xl mt-4">Personalized for your stage</h3>
        {[
          { title: "Managing Hot Flashes Naturally", tag: "Hot Flashes", color: "bg-orange-100 text-orange-600" },
          { title: "Yoga for Hormone Balance", tag: "Wellness", color: "bg-teal-100 text-teal-600" },
          { title: "Bone Health in your 50s", tag: "Health", color: "bg-blue-100 text-blue-600" },
        ].map((article, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-40 bg-gray-200 relative">
              <img src={`https://picsum.photos/seed/article${i}/600/400`} alt="Article" className="w-full h-full object-cover" />
              <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase px-2 py-1 rounded-md ${article.color}`}>
                {article.tag}
              </span>
            </div>
            <div className="p-4">
              <h4 className="font-bold group-hover:text-purple-600 transition-colors">{article.title}</h4>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>5 min read</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
