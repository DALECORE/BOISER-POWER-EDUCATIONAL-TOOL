import React, { useMemo } from 'react';
import { BarChart3, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { BatchStudentGradeEntry } from '../utils/batchGradingPdfExporter';

interface ClassPerformanceSummaryProps {
  batchStudents: BatchStudentGradeEntry[];
}

export const ClassPerformanceSummary: React.FC<ClassPerformanceSummaryProps> = React.memo(({ batchStudents }) => {
  
  // High-performance memoized computation of metrics
  const metrics = useMemo(() => {
    if (batchStudents.length === 0) return null;

    const totalStudents = batchStudents.length;
    const scores = batchStudents.map(s => s.gradingResult?.percentage || 0);
    const avgPercentage = scores.reduce((a, b) => a + b, 0) / totalStudents;
    
    const masteryCount = batchStudents.filter(s => (s.gradingResult?.percentage || 0) >= 75).length;
    const masteryRate = (masteryCount / totalStudents) * 100;
    
    const lowConfidenceTotal = batchStudents.reduce((sum, s) => sum + (s.gradingResult?.lowConfidenceCount || 0), 0);

    return {
      totalStudents,
      avgPercentage: Math.round(avgPercentage),
      masteryRate: Math.round(masteryRate),
      lowConfidenceTotal
    };
  }, [batchStudents]);

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 text-stone-500 mb-1">
          <Users className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase">Total Students</span>
        </div>
        <div className="text-xl font-black text-stone-900">{metrics.totalStudents}</div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 text-stone-500 mb-1">
          <TrendingUp className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase">Avg Percentage</span>
        </div>
        <div className="text-xl font-black text-indigo-600">{metrics.avgPercentage}%</div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 text-stone-500 mb-1">
          <BarChart3 className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase">Mastery Rate</span>
        </div>
        <div className="text-xl font-black text-emerald-600">{metrics.masteryRate}%</div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 text-stone-500 mb-1">
          <AlertCircle className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase">Pending Reviews</span>
        </div>
        <div className={`text-xl font-black ${metrics.lowConfidenceTotal > 0 ? 'text-amber-600' : 'text-stone-900'}`}>
          {metrics.lowConfidenceTotal}
        </div>
      </div>
    </div>
  );
});
