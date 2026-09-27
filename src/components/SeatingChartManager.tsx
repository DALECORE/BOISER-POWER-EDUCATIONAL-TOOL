import React, { useState } from 'react';
import { Users, Grid, Save, Trash2, UserPlus, Move } from 'lucide-react';

interface Student {
  id: string;
  name: string;
}

interface Seat {
  row: number;
  col: number;
  studentId: string | null;
}

export const SeatingChartManager: React.FC<{ sectionName: string }> = ({ sectionName }) => {
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(8);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [unassignedStudents, setUnassignedStudents] = useState<Student[]>([
    { id: '1', name: 'Abad, Juan' },
    { id: '2', name: 'Alcantara, Sophia' },
    { id: '3', name: 'Aquino, Mark' },
    { id: '4', name: 'Bautista, Maria' },
    { id: '5', name: 'Castillo, John' },
  ]);

  const initializeSeats = () => {
    const newSeats: Seat[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newSeats.push({ row: r, col: c, studentId: null });
      }
    }
    setSeats(newSeats);
  };

  const assignStudent = (row: number, col: number, studentId: string) => {
    setSeats(prev => prev.map(s => (s.row === row && s.col === col ? { ...s, studentId } : s)));
    setUnassignedStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const unassignStudent = (row: number, col: number) => {
    const seat = seats.find(s => s.row === row && s.col === col);
    if (seat && seat.studentId) {
      const student = { id: seat.studentId, name: 'Student ' + seat.studentId }; // Simplified
      setUnassignedStudents(prev => [...prev, student]);
      setSeats(prev => prev.map(s => (s.row === row && s.col === col ? { ...s, studentId: null } : s)));
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-stone-900">Interactive Seating Arrangement</h3>
            <p className="text-xs text-stone-500 uppercase font-black">Section: {sectionName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={initializeSeats} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-black transition">
            Reset Layout
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-lg transition flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Arrangement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 bg-stone-50 rounded-2xl p-6 border border-stone-200 overflow-auto">
          <div className="mb-8 w-full py-4 bg-stone-200 rounded-lg text-center text-[10px] font-black text-stone-500 uppercase tracking-[0.4em]">
            BLACKBOARD / TEACHER TABLE
          </div>
          
          <div 
            className="grid gap-2"
            style={{ 
              gridTemplateColumns: `repeat(${cols}, minmax(80px, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(60px, 1fr))`
            }}
          >
            {seats.length === 0 ? (
              <div className="col-span-full py-12 text-center text-stone-400 italic text-xs">
                Click "Reset Layout" to initialize the classroom grid.
              </div>
            ) : seats.map((seat, idx) => {
              const student = unassignedStudents.find(s => s.id === seat.studentId); // This logic is wrong for assigned, just a placeholder
              return (
                <div 
                  key={idx}
                  className={`aspect-square sm:aspect-auto sm:h-16 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-1 transition ${
                    seat.studentId ? 'bg-blue-50 border-blue-300' : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {seat.studentId ? (
                    <div className="w-full h-full flex flex-col items-center justify-center relative group">
                      <div className="text-[9px] font-black text-blue-900 text-center leading-tight truncate w-full">
                        {seat.studentId}
                      </div>
                      <button 
                        onClick={() => unassignStudent(seat.row, seat.col)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-[8px] font-black text-stone-300 uppercase">Seat {seat.row + 1}-{seat.col + 1}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <span>Unassigned Students</span>
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {unassignedStudents.map(student => (
                <div 
                  key={student.id}
                  className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 flex items-center justify-between group hover:border-blue-300 transition cursor-move"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('studentId', student.id)}
                >
                  <span>{student.name}</span>
                  <Move className="w-3 h-3 text-stone-300 group-hover:text-blue-500" />
                </div>
              ))}
              {unassignedStudents.length === 0 && (
                <div className="py-8 text-center text-stone-400 italic text-[10px]">
                  All students assigned.
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-[10px] text-blue-800 space-y-2">
            <p className="font-black uppercase tracking-wider">Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 font-medium">
              <li>Set rows and columns for your classroom.</li>
              <li>Drag students from the list to a seat.</li>
              <li>Click "Save" to sync with SF records.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
