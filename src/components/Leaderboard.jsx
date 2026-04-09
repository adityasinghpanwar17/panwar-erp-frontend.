import React from 'react';
import { FaTrophy, FaStar } from 'react-icons/fa';

const Leaderboard = ({ students }) => {
  return (
    <div className="bg-slate-800/20 rounded-[2.5rem] border border-slate-800 p-8 shadow-2xl">
      <h2 className="text-2xl font-black mb-8 uppercase flex items-center gap-3">
        🏆 Class Champions
      </h2>
      <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition">
            <div className="flex items-center gap-4">
              <span className="w-8 font-black text-slate-500">#{student.rank}</span>
              <span className="font-bold">{student.name}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-black text-xl">
              {student.score}% <FaStar className="text-yellow-500 text-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;