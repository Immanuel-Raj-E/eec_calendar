import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Users, Briefcase, Calendar, Bell, PlusCircle, 
  ArrowUpRight, Megaphone, HelpCircle 
} from 'lucide-react';

const HODDashboard = () => {
  const { user } = useAuth();
  const { events, announcements, departments } = useData();
  const navigate = useNavigate();

  // Find department details
  const deptData = departments.find(d => d.name === user.department) || {
    studentCount: 480,
    facultyCount: 24,
    fullName: 'Computer Science and Engineering'
  };

  // Filter events: either 'All' or specific department, and relevant to the department calendar
  const deptEvents = events.filter(e => 
    e.department === user.department || e.department === 'All'
  );

  // Sorting
  const today = new Date('2026-07-06T00:00:00');
  const upcomingDeptEvents = deptEvents
    .filter(e => new Date(e.start) >= today)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 4);

  // Announcements specific to dept or All
  const deptAnnouncements = announcements.filter(a => 
    a.department === user.department || a.department === 'All'
  ).slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Department Administration</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
            Head of Department: {user.name} | {deptData.fullName} ({user.department})
          </p>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs">
          HOD Portal Active
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">Department Students</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{deptData.studentCount}</p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Registered in current year</span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl shrink-0">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">Faculty Members</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{deptData.facultyCount}</p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Full-time teaching staff</span>
          </div>
          <div className="p-3 bg-green-500/10 text-green-600 rounded-2xl shrink-0">
            <Briefcase size={22} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">Upcoming Events</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{upcomingDeptEvents.length}</p>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Scheduled for this month</span>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-2xl shrink-0">
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Department Planner Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button 
            onClick={() => navigate(`/create-event?dept=${user.department}&visibility=Department`)}
            className="flex items-center justify-center gap-2 p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <PlusCircle size={16} /> Schedule Department Event
          </button>
          <button 
            onClick={() => navigate(`/create-event?dept=${user.department}&visibility=Class`)}
            className="flex items-center justify-center gap-2 p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <PlusCircle size={16} /> Schedule Class Event
          </button>
        </div>
      </div>

      {/* Two Column details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Department Calendar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
                <Calendar size={18} className="text-primary" />
                Department Agenda Timeline
              </h3>
              <button 
                onClick={() => navigate('/calendar')}
                className="text-xs text-primary hover:text-blue-700 font-semibold flex items-center gap-0.5"
              >
                Open Calendar Panel <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="space-y-3.5">
              {upcomingDeptEvents.length === 0 ? (
                <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                  No department events scheduled.
                </div>
              ) : (
                upcomingDeptEvents.map(e => (
                  <div key={e.id} className="p-4 border border-slate-100 dark:border-slate-800/70 rounded-xl flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                    <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${
                          e.visibility === 'College' ? 'bg-blue-500' :
                          e.visibility === 'Department' ? 'bg-green-500' :
                          'bg-orange-500'
                        }`} />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">{e.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1">{e.description}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        {new Date(e.start).toLocaleString(undefined, {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})} | Venue: {e.venue}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      e.visibility === 'College' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20' :
                      e.visibility === 'Department' ? 'bg-green-100 text-green-700 dark:bg-green-900/20' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900/20'
                    }`}>{e.visibility}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Announcements */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base mb-4">
            <Megaphone size={18} className="text-indigo-500" />
            Recent Announcements
          </h3>
          
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {deptAnnouncements.length === 0 ? (
              <div className="text-center text-slate-400 py-8 text-xs">
                No announcements published.
              </div>
            ) : (
              deptAnnouncements.map(a => (
                <div key={a.id} className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{a.title}</h4>
                    <span className="text-[9px] text-slate-400">{a.date}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{a.content}</p>
                  <span className="text-[9px] font-semibold text-slate-400 block mt-1">By: {a.author}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default HODDashboard;
