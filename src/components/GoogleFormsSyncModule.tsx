import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, Sparkles, Send, Copy, Check, ListChecks } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createGoogleForm, addQuestionsToGoogleForm, fetchFormResponses, FormQuestionItem, GoogleFormDetails } from '../services/googleFormsService';

export const GoogleFormsSyncModule: React.FC = () => {
  const { isGoogleConnected, googleAccessToken, connectGoogle } = useAuth();

  const [formTitle, setFormTitle] = useState('MATATAG Grade 11 Life and Career Skills Assessment');
  const [formDescription, setFormDescription] = useState('Standardized 1st Quarter Summative Quiz & Feedback Survey for DepEd SHS Students.');
  const [isCreating, setIsCreating] = useState(false);
  const [createdForm, setCreatedForm] = useState<GoogleFormDetails | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const [questions, setQuestions] = useState<FormQuestionItem[]>([
    {
      title: 'Full Name of Student (Last Name, First Name, M.I.)',
      type: 'TEXT',
      required: true
    },
    {
      title: 'Grade & Section Assignment',
      type: 'CHOICE',
      options: ['Grade 11 - STEM ABELLS', 'Grade 11 - TVL ICT ABELLS', 'Grade 11 - HUMSS ABELLS'],
      required: true
    },
    {
      title: 'Which career domain best aligns with your DepEd Senior High School specialization?',
      type: 'CHOICE',
      options: ['Information Technology & Computing', 'Engineering & Applied Sciences', 'Public Administration & Humanities', 'Business & Entrepreneurship'],
      required: true
    },
    {
      title: 'Provide a brief essay on your personal goals after completing DepEd SHS.',
      type: 'TEXT',
      required: false
    }
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: `New Question ${questions.length + 1}`,
        type: 'TEXT',
        required: true
      }
    ]);
  };

  const handleQuestionChange = (index: number, field: keyof FormQuestionItem, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleCreateForm = async () => {
    if (!googleAccessToken) {
      setStatusMessage({
        type: 'error',
        text: 'Google Authentication required. Please connect your Google account.'
      });
      return;
    }

    setIsCreating(true);
    setStatusMessage(null);

    try {
      // 1. Create Form
      const newForm = await createGoogleForm(formTitle, formDescription);

      // 2. Add Questions
      if (questions.length > 0) {
        await addQuestionsToGoogleForm(newForm.formId, questions);
      }

      setCreatedForm(newForm);
      setStatusMessage({
        type: 'success',
        text: '🎉 Google Form successfully generated and deployed to your Google Drive!'
      });
    } catch (err: any) {
      console.error('Google Form creation error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to create Google Form.'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyFormLink = () => {
    if (createdForm?.responderUri) {
      navigator.clipboard.writeText(createdForm.responderUri);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-4 border-amber-400">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <FileText className="w-6 h-6 text-purple-300" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-purple-200">Google Forms Creator & Response Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Automated Google Forms Generator
          </h1>
          <p className="text-sm text-purple-100 max-w-2xl leading-relaxed">
            Generate DepEd quizzes, diagnostic tests, and student feedback surveys directly in your Google Forms account.
          </p>
        </div>

        {!isGoogleConnected && (
          <button
            onClick={connectGoogle}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer hover:brightness-110"
          >
            <span>Connect Google Account</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Builder */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Quiz & Assessment Metadata
            </h3>
            <span className="text-xs font-bold text-slate-400 font-mono">{questions.length} Items Configured</span>
          </div>

          {statusMessage && (
            <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}>
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Form Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm text-slate-800 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Description / DepEd Subject Instructions</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-700 focus:ring-2 focus:ring-purple-600 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-slate-700">Questions & Choices</h4>
              <button
                onClick={handleAddQuestion}
                className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question Item</span>
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {questions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black text-purple-900 font-mono">Q{idx + 1}</span>
                    <select
                      value={q.type}
                      onChange={(e) => handleQuestionChange(idx, 'type', e.target.value)}
                      className="text-xs font-bold bg-white border border-slate-300 rounded-lg p-1.5 text-slate-700"
                    >
                      <option value="TEXT">Short Answer / Essay</option>
                      <option value="CHOICE">Multiple Choice</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    value={q.title}
                    onChange={(e) => handleQuestionChange(idx, 'title', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                    placeholder="Enter question prompt..."
                  />

                  {q.type === 'CHOICE' && q.options && (
                    <div className="pl-3 border-l-2 border-purple-300 space-y-1">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="text-xs font-mono text-slate-600 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateForm}
            disabled={isCreating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-slate-900 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:brightness-110 disabled:opacity-50"
          >
            {isCreating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Google Form in Drive...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-300" />
                <span>Deploy Google Form to Drive</span>
              </>
            )}
          </button>
        </div>

        {/* Deploy & Share Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xs font-black uppercase text-slate-800 tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-emerald-600" />
            Deployment & Student Link
          </h3>

          {createdForm ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-xs">
                <span className="text-[10px] font-black uppercase text-purple-800 block">Deploy Status</span>
                <p className="font-bold text-slate-900">{createdForm.info.title}</p>
                <p className="text-[11px] text-slate-500 font-mono">Form ID: {createdForm.formId}</p>
              </div>

              {createdForm.responderUri && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 block">Student Shareable URL</label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-mono text-purple-700 truncate">
                    {createdForm.responderUri}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={handleCopyFormLink}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>

                    <a
                      href={createdForm.responderUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Form</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              Configure your quiz questions and click "Deploy Google Form to Drive".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
