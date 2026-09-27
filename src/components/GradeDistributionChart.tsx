import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { getQualitativeDescriptor } from '../data/gradingRules';

interface GradeDistributionChartProps {
  grades: number[];
}

export const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({ grades }) => {
  // Define the ranges based on DepEd descriptors
  const categories = [
    { name: 'Advancing', range: '90-100', color: '#047857' }, // emerald-700
    { name: 'Benchmarking', range: '80-89', color: '#1d4ed8' }, // blue-700
    { name: 'Connecting', range: '75-79', color: '#b45309' }, // amber-700
    { name: 'Developing', range: '65-74', color: '#ea580c' }, // orange-600
    { name: 'Emerging', range: 'Below 65', color: '#be123c' }, // rose-700
  ];

  const distribution = categories.map(cat => {
    const count = grades.filter(g => {
      const descriptor = getQualitativeDescriptor(g).descriptor;
      return descriptor === cat.name;
    }).length;
    return { ...cat, count };
  });

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
          Batch Grade Distribution
        </h3>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase">
          Qualitative Descriptors
        </span>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 700 }}
              labelStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '4px' }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList 
                dataKey="count" 
                position="top" 
                style={{ fontSize: 12, fontWeight: 900, fill: '#1e293b' }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-2 pt-2">
        {distribution.map((cat) => (
          <div key={cat.name} className="text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">{cat.range}</div>
            <div className="h-1 w-full rounded-full" style={{ backgroundColor: cat.color + '20' }}>
              <div className="h-full rounded-full" style={{ backgroundColor: cat.color, width: `${(cat.count / (grades.length || 1)) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
