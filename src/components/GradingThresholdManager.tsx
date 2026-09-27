import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Settings, Save, AlertCircle } from 'lucide-react';

export interface GradingThresholds {
  passingPercentage: number;
  transmutationTable: { percentage: number; grade: number }[];
}

export const DEFAULT_THRESHOLDS: GradingThresholds = {
  passingPercentage: 75,
  transmutationTable: [
    { percentage: 95, grade: 99 },
    { percentage: 90, grade: 96 },
    { percentage: 85, grade: 93 },
    { percentage: 80, grade: 90 },
    { percentage: 75, grade: 85 },
  ]
};

export const GradingThresholdManager: React.FC = () => {
  const { currentUser } = useAuth();
  const [thresholds, setThresholds] = useState<GradingThresholds>(DEFAULT_THRESHOLDS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchThresholds = async () => {
      try {
        const docRef = doc(db, 'settings', `${currentUser.id}_grading_thresholds`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setThresholds(docSnap.data() as GradingThresholds);
        }
      } catch (e) {
        console.error('Failed to load thresholds', e);
      } finally {
        setLoading(false);
      }
    };
    fetchThresholds();
  }, [currentUser.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', `${currentUser.id}_grading_thresholds`), thresholds);
    } catch (e) {
      console.error('Failed to save thresholds', e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
      <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
        <Settings className="w-4 h-4 text-indigo-600" />
        Custom Grading Thresholds
      </h3>
      
      <div>
        <label className="block text-xs font-bold text-stone-600 mb-1">Passing Percentage</label>
        <input 
          type="number"
          value={thresholds.passingPercentage}
          onChange={(e) => setThresholds(prev => ({...prev, passingPercentage: Number(e.target.value)}))}
          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
        />
      </div>

      <button 
        onClick={handleSave}
        disabled={saving}
        className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 flex items-center justify-center gap-2"
      >
        {saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Thresholds</>}
      </button>
    </div>
  );
};
