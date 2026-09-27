import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Download,
  Calendar,
  Layers,
  FileText,
  Eye,
  Info,
  ExternalLink,
  Tag
} from 'lucide-react';
import {
  CurriculumRecordMaster,
  CurriculumVersion,
  SourceStatus
} from '../types/masterResearchCurriculum';
import { SEED_CURRICULUM_RECORDS } from '../data/masterDatabaseSeed';
import { Edit3, Save, X, Trash2 } from 'lucide-react';

interface CurriculumDatabaseModuleProps {
  importedRecords?: CurriculumRecordMaster[];
}

export const CurriculumDatabaseModule: React.FC<CurriculumDatabaseModuleProps> = ({
  importedRecords = []
}) => {
  const [records, setRecords] = useState<CurriculumRecordMaster[]>(() => {
    const saved = localStorage.getItem('lnnchs_custom_curriculum_records');
    if (saved) return JSON.parse(saved);
    return [...SEED_CURRICULUM_RECORDS, ...importedRecords];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<CurriculumVersion | 'ALL'>('ALL');
  const [selectedTerm, setSelectedTerm] = useState<'ALL' | 'Term 1' | 'Term 2' | 'Term 3'>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<SourceStatus | 'ALL'>('ALL');
  const [inspectRecord, setInspectRecord] = useState<CurriculumRecordMaster | null>(null);
  const [editingRecord, setEditingRecord] = useState<CurriculumRecordMaster | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<CurriculumRecordMaster | null>(null);

  const saveRecords = (newRecords: CurriculumRecordMaster[]) => {
    setRecords(newRecords);
    localStorage.setItem('lnnchs_custom_curriculum_records', JSON.stringify(newRecords));
  };

  const handleUpdateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;
    const updated = records.map(r => r.curriculum_id === editingRecord.curriculum_id ? editingRecord : r);
    saveRecords(updated);
    setEditingRecord(null);
  };

  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.competency_code.toLowerCase().includes(q) ||
      r.competency_text.toLowerCase().includes(q) ||
      r.subject.toLowerCase().includes(q) ||
      (r.domain && r.domain.toLowerCase().includes(q));

    const matchesVersion = selectedVersion === 'ALL' || r.curriculum_version === selectedVersion;
    const matchesTerm = selectedTerm === 'ALL' || r.term === selectedTerm;
    const matchesGrade = selectedGrade === 'ALL' || r.grade_level === selectedGrade;
    const matchesStatus = selectedStatus === 'ALL' || r.verification_status === selectedStatus;

    return matchesSearch && matchesVersion && matchesTerm && matchesGrade && matchesStatus;
  });

  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    const headers = [
      'curriculum_id',
      'curriculum_version',
      'school_year',
      'grade_level',
      'key_stage',
      'track',
      'learning_area',
      'subject',
      'subject_code',
      'domain',
      'competency_code',
      'competency_text',
      'term',
      'week',
      'quarter',
      'content_standard',
      'performance_standard',
      'bow_source',
      'cg_source',
      'assessment_weight_set',
      'transition_flag',
      'source_document',
      'verification_status'
    ];

    const csvLines = [
      headers.join(','),
      ...filtered.map((r) =>
        [
          r.curriculum_id,
          r.curriculum_version,
          r.school_year,
          r.grade_level,
          r.key_stage || '',
          r.track || '',
          r.learning_area,
          r.subject,
          r.subject_code || '',
          r.domain || '',
          r.competency_code,
          `"${(r.competency_text || '').replace(/"/g, '""')}"`,
          r.term,
          r.week || '',
          r.quarter || '',
          `"${(r.content_standard || '').replace(/"/g, '""')}"`,
          `"${(r.performance_standard || '').replace(/"/g, '""')}"`,
          `"${(r.bow_source || '').replace(/"/g, '""')}"`,
          `"${(r.cg_source || '').replace(/"/g, '""')}"`,
          `"${(r.assessment_weight_set || '').replace(/"/g, '""')}"`,
          r.transition_flag ? 'TRUE' : 'FALSE',
          `"${(r.source_document || '').replace(/"/g, '""')}"`,
          r.verification_status
        ].join(',')
      )
    ];

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `deped_curriculum_database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#0038A8] to-[#002776] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-[#002776] text-xs font-black uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Version-Controlled Repository
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Curriculum &amp; Competency Database</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              Strictly version-controlled DepEd curriculum repository. Preserves historical K-12, MELC, and MATATAG revisions without undifferentiated merging.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-[#FCD116] hover:bg-yellow-400 text-[#002776] font-extrabold text-xs transition shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#002776]" />
            <span>Export CSV / Excel ({filtered.length})</span>
          </button>
        </div>

        {/* Quick Version Metrics */}
        <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">MATATAG_2026</span>
            <span className="text-lg font-black text-[#FCD116]">
              {records.filter((r) => r.curriculum_version === 'MATATAG_2026').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">MATATAG (Phase 1)</span>
            <span className="text-lg font-black text-white">
              {records.filter((r) => r.curriculum_version === 'MATATAG').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">MELC_2020</span>
            <span className="text-lg font-black text-white">
              {records.filter((r) => r.curriculum_version === 'MELC_2020').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">Official Verified</span>
            <span className="text-lg font-black text-emerald-300">
              {records.filter((r) => r.verification_status === 'VERIFIED_OFFICIAL').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, competency, subject..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-2xl border border-stone-300 focus:outline-none focus:border-[#0038A8]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value as any)}
              className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
            >
              <option value="ALL">All Curriculum Versions</option>
              <option value="MATATAG_2026">MATATAG_2026 (DepEd 015, s. 2026)</option>
              <option value="MATATAG">MATATAG (Phase 1)</option>
              <option value="MELC_2020">MELC_2020</option>
              <option value="K12_ORIGINAL">K12_ORIGINAL</option>
            </select>

            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value as any)}
              className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
            >
              <option value="ALL">All 3-Terms</option>
              <option value="Term 1">Term 1 (Jun–Sep)</option>
              <option value="Term 2">Term 2 (Oct–Jan)</option>
              <option value="Term 3">Term 3 (Feb–May)</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
            >
              <option value="ALL">All Verification Statuses</option>
              <option value="VERIFIED_OFFICIAL">VERIFIED_OFFICIAL</option>
              <option value="SECONDARY_SOURCE">SECONDARY_SOURCE</option>
              <option value="USER_IMPORTED">USER_IMPORTED</option>
              <option value="NEEDS_VERIFICATION">NEEDS_VERIFICATION</option>
            </select>
          </div>
        </div>
      </div>

      {/* Curriculum Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((record) => (
          <div
            key={record.curriculum_id}
            className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs hover:border-[#0038A8] transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-black text-[#0038A8] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {record.competency_code}
                </span>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      record.verification_status === 'VERIFIED_OFFICIAL'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {record.verification_status}
                  </span>

                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    {record.curriculum_version}
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-stone-900 leading-snug">{record.competency_text}</h4>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-stone-600">
                  <span><strong>Subject:</strong> {record.subject} ({record.grade_level})</span>
                  <span className="font-bold text-[#0038A8] bg-blue-100/60 px-2 py-0.5 rounded-md">{record.term}</span>
                </div>
                {record.domain && (
                  <div className="text-stone-500 truncate">
                    <strong>Domain:</strong> {record.domain}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] gap-2">
              <span className="text-stone-400 truncate flex-1" title={record.source_document}>
                Source: {record.source_document}
              </span>
              <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                <button
                  onClick={() => setEditingRecord(record)}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setInspectRecord(record)}
                  className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0038A8] font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
                <button
                  onClick={() => setRecordToDelete(record)}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition flex items-center gap-1 cursor-pointer animate-fade-in"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Record Edit Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">Manual Record Adjustment</h3>
                  <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">{editingRecord.competency_code}</p>
                </div>
              </div>
              <button onClick={() => setEditingRecord(null)} className="p-2 hover:bg-stone-100 rounded-full transition">
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleUpdateRecord} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-stone-500">Competency Statement</label>
                <textarea
                  value={editingRecord.competency_text}
                  onChange={(e) => setEditingRecord({ ...editingRecord, competency_text: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500">Grade Level</label>
                  <input
                    type="text"
                    value={editingRecord.grade_level}
                    onChange={(e) => setEditingRecord({ ...editingRecord, grade_level: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500">Subject Title</label>
                  <input
                    type="text"
                    value={editingRecord.subject}
                    onChange={(e) => setEditingRecord({ ...editingRecord, subject: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500">Subject Code</label>
                  <input
                    type="text"
                    value={editingRecord.subject_code || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, subject_code: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500">Track</label>
                  <input
                    type="text"
                    value={editingRecord.track || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, track: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500">Key Stage</label>
                  <input
                    type="text"
                    value={editingRecord.key_stage || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, key_stage: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500">Week</label>
                  <input
                    type="text"
                    value={editingRecord.week || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, week: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-stone-500">Assessment Weight</label>
                  <input
                    type="text"
                    value={editingRecord.assessment_weight_set || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, assessment_weight_set: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-stone-500">Content Standard</label>
                <textarea
                  value={editingRecord.content_standard || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, content_standard: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs min-h-[60px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-stone-500">Performance Standard</label>
                <textarea
                  value={editingRecord.performance_standard || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, performance_standard: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs min-h-[60px]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Manual Edits</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Inspection Modal */}
      {inspectRecord && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-black text-sm text-[#0038A8]">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Curriculum Record Provenance Details</span>
              </div>
              <button
                onClick={() => setInspectRecord(null)}
                className="text-stone-400 hover:text-stone-700 font-bold text-xs"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-3 text-xs max-h-96 overflow-y-auto">
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="font-mono font-bold text-[#0038A8] text-sm block">{inspectRecord.competency_code}</span>
                <p className="font-medium text-stone-800">{inspectRecord.competency_text}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Curriculum Version</span>
                  <span className="font-bold text-stone-800">{inspectRecord.curriculum_version}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Term, Week &amp; Quarter</span>
                  <span className="font-bold text-stone-800">{inspectRecord.term} - {inspectRecord.week || 'N/A'} ({inspectRecord.quarter || 'N/A'})</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Grade, Subject &amp; Code</span>
                  <span className="font-bold text-stone-800">{inspectRecord.grade_level} - {inspectRecord.subject} ({inspectRecord.subject_code || 'N/A'})</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Verification Status</span>
                  <span className="font-bold text-emerald-700">{inspectRecord.verification_status}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Key Stage &amp; Track</span>
                  <span className="font-bold text-stone-800">{inspectRecord.key_stage || 'N/A'} - {inspectRecord.track || 'N/A'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Assessment Weight Set</span>
                  <span className="font-bold text-blue-700">{inspectRecord.assessment_weight_set || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="text-blue-500 block">BOW Source</span>
                  <span className="font-bold text-blue-900">{inspectRecord.bow_source || 'N/A'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="text-blue-500 block">CG Source</span>
                  <span className="font-bold text-blue-900">{inspectRecord.cg_source || 'N/A'}</span>
                </div>
              </div>

              {inspectRecord.content_standard && (
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-700 block">Content Standard:</span>
                  <p className="text-stone-600">{inspectRecord.content_standard}</p>
                </div>
              )}

              {inspectRecord.performance_standard && (
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-700 block">Performance Standard:</span>
                  <p className="text-stone-600">{inspectRecord.performance_standard}</p>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1 text-[11px]">
                <span className="font-bold block">Source Document Provenance:</span>
                <p>{inspectRecord.source_document}</p>
                {inspectRecord.source_url && (
                  <a
                    href={inspectRecord.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 underline font-semibold flex items-center gap-1 mt-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Official DepEd Source Document</span>
                  </a>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectRecord(null)}
                className="px-5 py-2 rounded-xl bg-[#0038A8] text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Dialog */}
      {recordToDelete && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-red-500 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700 shadow-xs">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">Confirm Deletion</h3>
                <p className="text-xs text-red-600 font-bold tracking-wider">Accidental Loss Prevention</p>
              </div>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-stone-700">
              <p className="font-medium text-stone-900">
                Are you absolutely sure you want to delete the following item from the master Competency Database?
              </p>
              
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl font-mono text-[11px] space-y-1.5">
                <div>
                  <span className="text-stone-400 block uppercase font-bold text-[9px]">Competency Code:</span>
                  <span className="font-black text-red-700">{recordToDelete.competency_code}</span>
                </div>
                <div>
                  <span className="text-stone-400 block uppercase font-bold text-[9px]">Statement:</span>
                  <p className="text-stone-800 line-clamp-3 leading-normal">{recordToDelete.competency_text}</p>
                </div>
                <div>
                  <span className="text-stone-400 block uppercase font-bold text-[9px]">Subject &amp; Term:</span>
                  <span className="font-bold text-stone-700">{recordToDelete.subject} ({recordToDelete.term})</span>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-900 text-[11px] font-medium">
                ⚠️ Warning: This action cannot be undone. Removing items from the curriculum database can disrupt associated weekly lesson planners and active daily logs.
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setRecordToDelete(null)}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black rounded-xl text-xs transition cursor-pointer"
              >
                No, Keep Record
              </button>
              <button
                onClick={() => {
                  const updated = records.filter(r => r.curriculum_id !== recordToDelete.curriculum_id);
                  saveRecords(updated);
                  setRecordToDelete(null);
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-xs transition shadow-md cursor-pointer animate-pulse"
              >
                Yes, Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
