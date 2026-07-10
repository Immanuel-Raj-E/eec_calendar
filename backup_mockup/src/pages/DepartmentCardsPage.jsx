import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Users, Briefcase, Calendar, Award, Building, ArrowRight } from 'lucide-react';

const DepartmentCardsPage = () => {
  const { departments, events } = useData();
  const navigate = useNavigate();

  // Helper to get upcoming events for a specific department
  const getDeptEvents = (deptName) => {
    const today = new Date('2026-07-06T00:00:00');
    return events
      .filter(e => e.department === deptName && new Date(e.start) >= today)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 3);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Academic Departments</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">Explore staffing, enrollment, and event calendars across streams.</p>
        </div>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const deptEvents = getDeptEvents(dept.name);
          return (
            <div 
              key={dept.id} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="min-w-0">
                    <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-extrabold rounded-md mb-1.5 uppercase">
                      {dept.name}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base truncate" title={dept.fullName}>
                      {dept.fullName}
                    </h3>
                  </div>
                  <div className="h-10 w-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0">
                    <Building size={20} />
                  </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex items-center gap-2">
                    <Users size={16} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-[10px] font-semibold text-slate-405 text-slate-400">Students</p>
                      <p className="font-bold text-slate-900 dark:text-white">{dept.studentCount}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex items-center gap-2">
                    <Briefcase size={16} className="text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-[10px] font-semibold text-slate-405 text-slate-400">Faculty</p>
                      <p className="font-bold text-slate-900 dark:text-white">{dept.facultyCount}</p>
                    </div>
                  </div>
                </div>

                {/* HOD Field */}
                <div className="text-xs py-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Head of Department</span>
                  <p className="font-bold text-slate-850 dark:text-slate-205 text-slate-800 flex items-center gap-1.5">
                    <Award size={14} className="text-amber-500 shrink-0" />
                    {dept.hodName}
                  </p>
                </div>

                {/* Department Events */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} /> Upcoming Department Events
                  </span>
                  
                  {deptEvents.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No events listed for this department.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {deptEvents.map(evt => (
                        <div 
                          key={evt.id} 
                          onClick={() => navigate('/calendar')}
                          className="p-2 border border-slate-100 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/30 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors"
                        >
                          <span className="font-semibold text-slate-750 dark:text-slate-250 truncate pr-2">{evt.title}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {new Date(evt.start).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* View Agenda Button */}
              <button 
                onClick={() => navigate(`/calendar?search=${encodeURIComponent(dept.name)}`)}
                className="w-full mt-5 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all group-hover:bg-primary group-hover:text-white cursor-pointer"
              >
                <span>View Department Agenda</span>
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DepartmentCardsPage;
