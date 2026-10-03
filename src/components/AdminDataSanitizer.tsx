import React, { useState } from 'react';
import { db } from '../lib/firebase'; // Assuming firebase init is here
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export const AdminDataSanitizer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');

  const sanitizeGradingSheets = async () => {
    setLoading(true);
    setStatus('Starting sanitation...');
    try {
      const sheetsRef = collection(db, 'grading_sheets');
      const snapshot = await getDocs(sheetsRef);
      
      let count = 0;
      for (const sheetDoc of snapshot.docs) {
        const data = sheetDoc.data();
        if (data.grades) {
          const updatedGrades = data.grades.map((g: any) => ({
            ...g,
            term2: 0,
            term3: 0
          }));
          await updateDoc(doc(db, 'grading_sheets', sheetDoc.id), { grades: updatedGrades });
          count++;
        }
      }
      setStatus(`Sanitized ${count} sheets successfully.`);
    } catch (e) {
      console.error(e);
      setStatus('Error during sanitation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Admin Data Sanitizer</h2>
      <button 
        onClick={sanitizeGradingSheets} 
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        {loading ? 'Sanitizing...' : 'Reset Term 2 & 3 to 0'}
      </button>
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
};
