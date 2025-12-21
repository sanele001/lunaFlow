
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SymptomTracker from './components/SymptomTracker';
import WellnessHub from './components/WellnessHub';
import CycleTracker from './components/CycleTracker';
import { AppState, Symptom } from './types';
import { getAppState, saveAppState, MOCK_ARTICLES } from './services/mockApi';
import { FileText, ArrowLeft, Share2, Download } from 'lucide-react';

const InsightsPage = () => (
  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center py-20">
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Share2 className="w-10 h-10 text-purple-600" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Personalized Pattern Recognition</h2>
      <p className="text-gray-500 mb-8">We're analyzing your data to find correlations between symptoms, sleep, and triggers. Keep logging to unlock deeper insights!</p>
      <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-left">
        <h4 className="font-bold text-purple-900 mb-2">Early Observation:</h4>
        <p className="text-sm text-purple-700">Your "Hot Flashes" tend to peak 2 hours after your logged "High Stress" events. Try a Quick Calm session when you feel stress rising.</p>
      </div>
      <button className="mt-8 bg-gray-100 text-gray-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 mx-auto hover:bg-gray-200 transition-colors">
        <Download className="w-4 h-4" />
        Export Report for Doctor
      </button>
    </div>
  </div>
);

const ResourcesPage = () => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold">Knowledge Center</h2>
        <p className="text-gray-500">Expert-backed articles for your wellness journey</p>
      </div>
      <div className="flex gap-2">
        {['All', 'Education', 'Wellness', 'Nutrition'].map(tag => (
          <button key={tag} className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all">
            {tag}
          </button>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_ARTICLES.map(article => (
        <a key={article.slug} href={`#/resources/${article.slug}`} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
          <div className="h-48 overflow-hidden">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{article.category}</span>
            <h3 className="text-xl font-bold mt-3 leading-tight">{article.title}</h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-gray-400">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Read Article
              </span>
              <span>May 24, 2024</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const article = MOCK_ARTICLES.find(a => a.slug === slug);

  if (!article) return <div className="text-center py-20">Article not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <div className="h-64 md:h-96 relative">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        <a href="#/resources" className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg hover:bg-white transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </a>
      </div>
      <div className="p-8 md:p-12">
        <span className="text-xs font-black uppercase tracking-widest text-purple-600 mb-4 block">{article.category}</span>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-8">{article.title}</h1>
        <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>{article.content}</p>
          <p>The journey through hormonal transitions is unique for everyone. While some may experience intense symptoms, others may find the transition smoother. The key is monitoring your body and seeking professional advice when needed.</p>
          <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 mt-8">
            <h4 className="font-bold text-purple-900 mb-2">Key Takeaways</h4>
            <ul className="list-disc list-inside space-y-2 text-purple-800 text-sm">
              <li>Track symptoms daily for accurate patterns</li>
              <li>Maintain a consistent sleep hygiene routine</li>
              <li>Prioritize anti-inflammatory nutrition</li>
              <li>Consult your GP for severe or persistent issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(getAppState());

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const addSymptom = (symptom: Symptom) => {
    setState(prev => ({
      ...prev,
      symptoms: [symptom, ...prev.symptoms]
    }));
  };

  const deleteSymptom = (id: string) => {
    setState(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(s => s.id !== id)
    }));
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard state={state} />} />
          <Route path="/symptoms" element={<SymptomTracker state={state} onAdd={addSymptom} onDelete={deleteSymptom} />} />
          <Route path="/cycle" element={<CycleTracker state={state} />} />
          <Route path="/wellness" element={<WellnessHub />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ArticleDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
