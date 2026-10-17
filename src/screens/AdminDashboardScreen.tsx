import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  CheckCircle,
  XCircle,
  Activity,
  Calendar,
  DollarSign,
  TrendingUp,
  Cpu,
  BarChart3,
  Search,
  Filter,
  Check,
  X,
  MapPin
} from 'lucide-react';
import { AI_ML_EVALUATION_METRICS } from '../data/mockData';

const HYDERABAD_LOCATIONS = [
  { name: 'Hyderabad Metro', scale: 1 },
  { name: 'Gachibowli', scale: 0.24 },
  { name: 'Madhapur', scale: 0.22 },
  { name: 'Kukatpally', scale: 0.2 },
  { name: 'Kondapur', scale: 0.18 },
  { name: 'Secunderabad', scale: 0.16 }
] as const;

const FORECAST_SERVICES = [
  { key: 'electrician', label: 'Electrician', color: '#0d9488', className: 'bg-teal-600' },
  { key: 'plumber', label: 'Plumber', color: '#2563eb', className: 'bg-blue-600' },
  { key: 'ac_service', label: 'AC Service', color: '#f59e0b', className: 'bg-amber-500' },
  { key: 'cleaning', label: 'Cleaning', color: '#9333ea', className: 'bg-purple-600' }
] as const;

interface AdminDashboardScreenProps {
  onBack: () => void;
  initialTab?: 'overview' | 'verifications' | 'ai_metrics';
}

interface VerificationCandidate {
  id: string;
  name: string;
  category: string;
  phone: string;
  experienceYears: number;
  documentsSubmitted: string[];
  status: 'pending' | 'approved' | 'rejected';
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  onBack,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'ai_metrics'>(initialTab);
  const [forecastLocation, setForecastLocation] = useState<string>('Hyderabad Metro');
  const [forecastFormat, setForecastFormat] = useState<'bars' | 'line' | 'table'>('bars');
  const [candidates, setCandidates] = useState<VerificationCandidate[]>([
    {
      id: 'VRF-401',
      name: 'Ramesh Babu',
      category: 'Plumber',
      phone: '+91 98490 88776',
      experienceYears: 7,
      documentsSubmitted: ['Aadhaar Card', 'Trade ITI Certificate', 'Police Clearance Certificate'],
      status: 'pending'
    },
    {
      id: 'VRF-402',
      name: 'Mahesh Chary',
      category: 'Carpenter',
      phone: '+91 97000 33445',
      experienceYears: 10,
      documentsSubmitted: ['Aadhaar Card', 'Govt Skill Passbook', 'Bank Cancelled Cheque'],
      status: 'pending'
    },
    {
      id: 'VRF-403',
      name: 'Anita Devi',
      category: 'Cleaning',
      phone: '+91 98481 22334',
      experienceYears: 4,
      documentsSubmitted: ['Aadhaar Card', 'Police Record Check'],
      status: 'pending'
    }
  ]);

  const handleApprove = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' } : c))
    );
  };

  const handleReject = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' } : c))
    );
  };

  const locationScale =
    HYDERABAD_LOCATIONS.find((location) => location.name === forecastLocation)?.scale ?? 1;
  const forecastData = AI_ML_EVALUATION_METRICS.demandForecasting.map((dayData) => ({
    ...dayData,
    electrician: Math.round(dayData.electrician * locationScale),
    plumber: Math.round(dayData.plumber * locationScale),
    ac_service: Math.round(dayData.ac_service * locationScale),
    cleaning: Math.round(dayData.cleaning * locationScale)
  }));
  const dailyTotals = forecastData.map(
    (day) => day.electrician + day.plumber + day.ac_service + day.cleaning
  );
  const maxDailyTotal = Math.max(...dailyTotals, 1);
  const maxServiceDemand = Math.max(
    ...forecastData.flatMap((day) =>
      FORECAST_SERVICES.map(({ key }) => day[key])
    ),
    1
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Top Admin Header */}
      <div className="sticky top-0 z-30 bg-slate-900 text-white px-4 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-300 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold">Trustora Admin & AI Control</h1>
                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded">
                  Operator Role
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Active Nodes: 4 Clusters</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'overview'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Platform Overview
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'verifications'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verification Queue ({candidates.filter((c) => c.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('ai_metrics')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'ai_metrics'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Engineering & ML Metrics
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top KPI Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="animate-enter bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Registered Seekers
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">0</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
                  No live accounts yet
                </span>
              </div>

              <div className="animate-enter bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs [animation-delay:60ms]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Verified Pros
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">0</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
                  No verified pros yet
                </span>
              </div>

              <div className="animate-enter bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs [animation-delay:120ms]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Completed Jobs
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">0</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
                  No completed jobs yet
                </span>
              </div>

              <div className="animate-enter bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs [animation-delay:180ms]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Platform Gross
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">₹0</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
                  No platform earnings yet
                </span>
              </div>
            </div>
            <p className="-mt-3 text-xs text-slate-500">
              Platform totals start at zero and update when live account and transaction data is connected.
            </p>

            {/* Platform Demand Trend Forecast */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Weekly Service Demand Forecast (AI Time-Series)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Prophet / ARIMA predictive dispatch forecasting across Hyderabad
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                    <MapPin className="h-4 w-4 text-purple-700" />
                    <span className="sr-only">Forecast location</span>
                    <select
                      aria-label="Forecast location"
                      value={forecastLocation}
                      onChange={(event) => setForecastLocation(event.target.value)}
                      className="max-w-40 bg-transparent text-slate-800 outline-none"
                    >
                      {HYDERABAD_LOCATIONS.map((location) => (
                        <option key={location.name} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-2 text-xs font-mono font-bold text-purple-700">
                    MAE: 4.2%
                  </span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div
                  className="inline-flex rounded-xl bg-slate-100 p-1"
                  role="group"
                  aria-label="Forecast format"
                >
                  {([
                    ['bars', 'Stacked bars'],
                    ['line', 'Line chart'],
                    ['table', 'Table']
                  ] as const).map(([format, label]) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setForecastFormat(format)}
                      aria-pressed={forecastFormat === format}
                      className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                        forecastFormat === format
                          ? 'bg-white text-purple-800 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {forecastLocation} · forecast jobs per day
                </span>
              </div>

              {forecastFormat === 'bars' && (
                <div className="space-y-3 animate-enter">
                  {forecastData.map((dayData, index) => (
                    <div key={dayData.day} className="flex items-center gap-3 text-xs">
                      <span className="w-8 font-bold text-slate-700">{dayData.day}</span>
                      <div className="flex h-5 flex-1 gap-1 overflow-hidden rounded-md bg-slate-100 p-0.5">
                        {FORECAST_SERVICES.map(({ key, label, className }) => (
                          <div
                            key={key}
                            style={{
                              width: `${(dayData[key] / maxDailyTotal) * 100}%`,
                              animationDelay: `${index * 45}ms`
                            }}
                            className={`${className} animate-forecast-bar rounded-sm`}
                            title={`${label}: ${dayData[key]}`}
                          />
                        ))}
                      </div>
                      <span className="w-12 text-right font-mono font-bold text-slate-900">
                        {dailyTotals[index]}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {forecastFormat === 'line' && (
                <div className="overflow-x-auto animate-enter">
                  <svg
                    viewBox="0 0 720 250"
                    role="img"
                    aria-label={`Weekly service demand line chart for ${forecastLocation}`}
                    className="min-w-[560px] w-full"
                  >
                    {[0, 1, 2, 3].map((tick) => {
                      const y = 202 - (tick / 3) * 168;
                      return (
                        <g key={tick}>
                          <line x1="44" x2="700" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 5" />
                          <text x="34" y={y + 4} textAnchor="end" fill="#64748b" fontSize="10">
                            {Math.round((maxServiceDemand * tick) / 3)}
                          </text>
                        </g>
                      );
                    })}
                    {FORECAST_SERVICES.map(({ key, label, color }) => {
                      const points = forecastData
                        .map((day, index) => {
                          const x = 52 + (index / (forecastData.length - 1)) * 638;
                          const y = 202 - (day[key] / maxServiceDemand) * 168;
                          return `${x},${y}`;
                        })
                        .join(' ');
                      return (
                        <g key={key}>
                          <polyline
                            points={points}
                            fill="none"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {forecastData.map((day, index) => {
                            const x = 52 + (index / (forecastData.length - 1)) * 638;
                            const y = 202 - (day[key] / maxServiceDemand) * 168;
                            return <circle key={day.day} cx={x} cy={y} r="3.5" fill={color} />;
                          })}
                        </g>
                      );
                    })}
                    {forecastData.map((day, index) => (
                      <text
                        key={day.day}
                        x={52 + (index / (forecastData.length - 1)) * 638}
                        y="228"
                        textAnchor="middle"
                        fill="#475569"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {day.day}
                      </text>
                    ))}
                  </svg>
                </div>
              )}

              {forecastFormat === 'table' && (
                <div className="overflow-x-auto animate-enter">
                  <table className="w-full min-w-[620px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
                        <th scope="col" className="px-3 py-3 font-bold">Day</th>
                        {FORECAST_SERVICES.map(({ key, label }) => (
                          <th key={key} scope="col" className="px-3 py-3 text-right font-bold">
                            {label}
                          </th>
                        ))}
                        <th scope="col" className="px-3 py-3 text-right font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forecastData.map((day, index) => (
                        <tr key={day.day} className="border-b border-slate-100 last:border-0">
                          <th scope="row" className="px-3 py-3 font-bold text-slate-800">{day.day}</th>
                          {FORECAST_SERVICES.map(({ key }) => (
                            <td key={key} className="px-3 py-3 text-right font-mono text-slate-700">
                              {day[key]}
                            </td>
                          ))}
                          <td className="px-3 py-3 text-right font-mono font-bold text-slate-900">
                            {dailyTotals[index]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-600">
                {FORECAST_SERVICES.map(({ key, label, className }) => (
                  <span key={key} className="flex items-center gap-1.5">
                    <span className={`h-3 w-3 rounded-xs ${className}`} />
                    {label}
                  </span>
                ))}
                <span className="ml-auto text-slate-400">Sample forecast data</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Verification Queue */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Professional Verification Workflow
                </h3>
                <p className="text-xs text-slate-500">
                  Review trade certificates, police clearance, and identity credentials
                </p>
              </div>
              <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full">
                {candidates.filter((c) => c.status === 'pending').length} Action Required
              </span>
            </div>

            <div className="space-y-3.5">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">{cand.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{cand.name}</h4>
                      <span className="text-xs bg-teal-50 text-teal-800 px-2 py-0.2 rounded-md font-semibold">
                        {cand.category}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      <span>Phone: {cand.phone}</span>
                      <span className="mx-2">•</span>
                      <span>{cand.experienceYears} years trade experience</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {cand.documentsSubmitted.map((doc, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          📄 {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {cand.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(cand.id)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Grant Badge</span>
                        </button>
                        <button
                          onClick={() => handleReject(cand.id)}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                          cand.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {cand.status === 'approved' ? '✓ Verified & Onboarded' : '✗ Application Rejected'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: AI Engineering & ML Metrics (Section 26 in spec) */}
        {activeTab === 'ai_metrics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-teal-600" />
                    <span>Service Request NLP Classifier (DistilBERT + Ensemble)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evaluated on 3,500 natural language customer problem statements
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-full border border-teal-200">
                  Latency: {AI_ML_EVALUATION_METRICS.classifier.inferenceLatencyMs}ms
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Accuracy</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.accuracy}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Precision</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.precision}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Recall</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.recall}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">F1-Score</span>
                  <span className="text-xl font-black text-teal-700 block mt-1">
                    {AI_ML_EVALUATION_METRICS.classifier.f1Score}
                  </span>
                </div>
              </div>
            </div>

            {/* RAG Knowledge Grounding & Faithfulness */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>RAG Grounding & Hallucination Defense</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Benchmarked against 1,420 Ground Truth Trustora policy & pricing QA pairs
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Faithfulness</span>
                  <span className="text-xl font-black text-emerald-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.faithfulnessScore}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Answer Relevance</span>
                  <span className="text-xl font-black text-emerald-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.answerRelevance}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Hallucination Rate</span>
                  <span className="text-xl font-black text-emerald-700 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.hallucinationRate}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Retrieval Latency</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.ragGrounding.avgRetrievalLatencyMs}ms
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendation Engine Evaluation */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>Two-Tower Provider Recommendation Ranking</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Learned ranking balancing distance, verified rating, completion rate, and speed
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">NDCG @ 5</span>
                  <span className="text-xl font-black text-purple-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.ndcgAt5}
                  </span>
                </div>
                <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">MAP @ 5</span>
                  <span className="text-xl font-black text-purple-800 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.mapAt5}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Match Acceptance</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.providerMatchAcceptanceRate}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Avg Time to Match</span>
                  <span className="text-xl font-black text-slate-900 block mt-1">
                    {AI_ML_EVALUATION_METRICS.recommendationEngine.avgTimeToAcceptMinutes}m
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
