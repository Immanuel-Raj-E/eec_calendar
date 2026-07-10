import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  BookOpen, Users, Calendar, Clock, PlusSquare, 
  Settings, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const { events } = useData();
  const navigate = useNavigate();

  // Faculty specific details
  const facultyData = user.stats || {
    studentCount: 65,
    weeklyClasses: 14,
    assignedEvents: 4
  };

  // Filter events: only Class events, or specific department events
  const classEvents = events.filter(e => 
    e.department === user.department && (e.visibility === 'Class' || e.visibility === 'Department')
  );

  const today = new Date('2026-07-06T00:00:00');
  const upcomingClassEvents = classEvents
    .filter(e => new Date(e.start) >= today)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);

  // Today's lectures timetable (mock)
  const todaysSchedule = [
    { time: '09:00 AM - 09:50 AM', subject: 'Data Structures', code: 'CS3301', room: 'LH 301', active: false },
    { time: '10:00 AM - 10:50 AM', subject: 'Design & Analysis of Algorithms', code: 'CS3302', room: 'LH 301', active: false },
    { time: '11:10 AM - 12:50 PM', subject: 'Java Programming Lab', code: 'CS3311', room: 'CSE Lab 2', active: true },
    { time: '01:40 PM - 02:30 PM', subject: 'Student Mentoring Session', code: 'MENTOR', room: 'Cabin F4', active: false }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Faculty Portal</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
            Instructor: {user.name} | Advisor for <span className="font-semibold text-primary">{user.assignedClass}</span>
          </p>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs">
          Academic Term: Odd Semester
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">Class Strength</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{facultyData.studentCount}</p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Active students in roll</span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl shrink-0">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">Weekly Lectures</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{facultyData.weeklyClasses}</p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Hours of classroom sessions</span>
          </div>
          <div className="p-3 bg-green-500/10 text-green-600 rounded-2xl shrink-0">
            <BookOpen size={22} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">Class Events</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{upcomingClassEvents.length}</p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Scheduled evaluations/tests</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl shrink-0">
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Instructor Quick Planner</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button 
            onClick={() => navigate(`/create-event?dept=${user.department}&visibility=Class`)}
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <PlusSquare size={16} /> Schedule Class Event
          </button>
          <button 
            onClick={() => navigate('/calendar')}
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <Settings size={16} /> Manage Events
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Timetable */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base mb-4">
              <Clock size={18} className="text-primary" />
              Today's Teaching Timetable
            </h3>
            
            <div className="space-y-3.5">
              {todaysSchedule.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors ${
                    item.active 
                      ? 'border-primary/40 bg-primary/5 dark:bg-primary/10' 
                      : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                      item.active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{item.subject}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Code: {item.code} | Venue: {item.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.time}</span>
                    {item.active && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20 animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Class specific upcoming Events */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
              <Calendar size={18} className="text-amber-500" />
              Class Deadlines
            </h3>
            <button 
              onClick={() => navigate('/calendar')}
              className="text-xs text-primary hover:text-blue-700 font-semibold"
            >
              All Events
            </button>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {upcomingClassEvents.length === 0 ? (
              <div className="text-center text-slate-400 py-8 text-xs">
                No class events scheduled.
              </div>
            ) : (
              upcomingClassEvents.map(e => (
                <div key={e.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{e.title}</h4>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 rounded-md text-[9px] font-bold uppercase shrink-0">
                      {e.visibility}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{e.description}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400/90 pt-1 border-t border-slate-100/50 dark:border-slate-800/50">
                    <span>{new Date(e.start).toLocaleDateString()}</span>
                    <span>Venue: {e.venue}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default FacultyDashboard;
