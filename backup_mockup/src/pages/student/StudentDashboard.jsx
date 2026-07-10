import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Award, Percent, GraduationCap, Calendar, Clock, 
  MapPin, Bell, Megaphone, ArrowUpRight 
} from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '../../components/Modal';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { events, announcements, notifications } = useData();
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter events relevant to this student
  // Students see College events, and events specific to their Department (e.g. CSE)
  const studentEvents = events.filter(e => 
    e.visibility === 'College' || 
    (e.visibility === 'Department' && e.department === user.department) ||
    (e.visibility === 'Class' && e.department === user.department)
  );

  // Map to FullCalendar format
  const calendarEvents = studentEvents.map(e => ({
    id: e.id,
    title: e.title,
    start: e.start,
    end: e.end,
    extendedProps: {
      description: e.description,
      venue: e.venue,
      visibility: e.visibility,
      department: e.department
    }
  }));

  const handleEventClick = (info) => {
    const evt = events.find(e => e.id === info.event.id);
    if (evt) {
      setSelectedEvent(evt);
      setIsModalOpen(true);
    }
  };

  // Timelines
  const today = new Date('2026-07-06T00:00:00');
  const todayStr = '2026-07-06';
  
  const todaysEvents = studentEvents.filter(e => 
    e.start.startsWith(todayStr)
  );

  const upcomingEvents = studentEvents
    .filter(e => new Date(e.start) > today && !e.start.startsWith(todayStr))
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 4);

  // Filter student notifications
  const studentNotifs = notifications
    .filter(n => n.role === 'All' || n.role === 'Student')
    .slice(0, 3);

  // Filter announcements
  const studentAnnouncements = announcements
    .filter(a => a.department === 'All' || a.department === user.department)
    .slice(0, 3);

  // Academic Summary Mock
  const academic = user.academicSummary || {
    cgpa: '8.76',
    attendance: '92%',
    creditsEarned: 112,
    pendingBacklogs: 0
  };

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Panel */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-linear-to-r from-blue-600 to-indigo-650 p-6 rounded-3xl text-white shadow-md shadow-blue-500/10">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-100 bg-white/10 px-3 py-1 rounded-full">
            Student Portal
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2.5">Hello, {user.name}!</h1>
          <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
            Roll: {user.currentClass.split(' ')[0]} | {user.currentClass} | Department of {user.department}
          </p>
        </div>
        <div className="text-xs sm:text-sm font-semibold bg-white/10 text-white px-4 py-2 rounded-2xl border border-white/10">
          Today: {today.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Academic Summary and Info Column Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Academic Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
          <h2 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Academic Summary</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <Award className="text-blue-600 dark:text-blue-400 mb-1" size={20} />
              <span className="text-[9px] font-bold text-slate-400">CGPA</span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">{academic.cgpa}</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <Percent className="text-green-600 dark:text-green-400 mb-1" size={20} />
              <span className="text-[9px] font-bold text-slate-400">Attendance</span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">{academic.attendance}</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <GraduationCap className="text-indigo-600 dark:text-indigo-400 mb-1" size={20} />
              <span className="text-[9px] font-bold text-slate-400">Credits</span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">{academic.creditsEarned}</p>
            </div>
          </div>
        </div>

        {/* Live Notifications (Compact) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
          <h2 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Bell size={16} className="text-amber-500" /> Notifications
          </h2>
          <div className="space-y-3">
            {studentNotifs.map(n => (
              <div key={n.id} className="flex gap-2.5 items-start">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed">{n.message}</p>
                  <span className="text-[9px] text-slate-400 block mt-0.5">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
          <h2 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Megaphone size={16} className="text-indigo-500" /> Announcements
          </h2>
          <div className="space-y-3">
            {studentAnnouncements.map(a => (
              <div key={a.id} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{a.title}</h4>
                  <span className="text-[8px] text-slate-400 shrink-0">{a.date}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{a.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Main Grid: Left calendar, Right today's schedule / upcoming events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Calendar Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
              <Calendar size={18} className="text-primary" />
              Academic Calendar View
            </h3>
            
            {/* Color Indicator Legend */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span className="h-3 w-3 bg-blue-500 rounded-md" /> College
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span className="h-3 w-3 bg-green-500 rounded-md" /> Department
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span className="h-3 w-3 bg-orange-500 rounded-md" /> Class
              </div>
            </div>
          </div>

          <div className="student-calendar-wrap">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate="2026-07-06"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={calendarEvents}
              eventClick={handleEventClick}
              eventClassNames={(arg) => {
                const vis = arg.event.extendedProps.visibility;
                if (vis === 'College') return 'event-college';
                if (vis === 'Department') return 'event-department';
                if (vis === 'Class') return 'event-class';
                return '';
              }}
              height="auto"
            />
          </div>
        </div>

        {/* Right Sidebar Schedule */}
        <div className="space-y-6">
          
          {/* Today's Events */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base mb-3">
              Today's Schedule
            </h3>
            <div className="space-y-3">
              {todaysEvents.length === 0 ? (
                <div className="p-4 border border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400 rounded-xl text-xs">
                  No academic events listed for today.
                </div>
              ) : (
                todaysEvents.map(e => (
                  <div 
                    key={e.id} 
                    onClick={() => {
                      setSelectedEvent(e);
                      setIsModalOpen(true);
                    }}
                    className={`p-3 border rounded-xl cursor-pointer hover:shadow-xs transition-all ${
                      e.visibility === 'College' ? 'border-blue-200 bg-blue-50/20 dark:border-blue-900/40' :
                      e.visibility === 'Department' ? 'border-green-200 bg-green-50/20 dark:border-green-900/40' :
                      'border-orange-200 bg-orange-50/20 dark:border-orange-900/40'
                    }`}
                  >
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{e.title}</h4>
                    <div className="flex flex-col gap-0.5 mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                      <span className="flex items-center gap-1"><Clock size={12} /> {new Date(e.start).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {e.venue}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Schedule list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base mb-3">
              Upcoming Deadlines
            </h3>
            <div className="space-y-3.5">
              {upcomingEvents.map(e => (
                <div 
                  key={e.id}
                  onClick={() => {
                    setSelectedEvent(e);
                    setIsModalOpen(true);
                  }}
                  className="flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/20 p-2 rounded-xl cursor-pointer transition-colors"
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    e.visibility === 'College' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                    e.visibility === 'Department' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                    'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
                  }`}>
                    {new Date(e.start).getDate()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">{e.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(e.start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} | {e.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Details Event Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Calendar Event Details"
      >
        {selectedEvent && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                selectedEvent.visibility === 'College' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/25 dark:text-blue-300 dark:border-blue-800/40' :
                selectedEvent.visibility === 'Department' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/25 dark:text-green-300 dark:border-green-800/40' :
                'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/25 dark:text-orange-300 dark:border-orange-800/40'
              }`}>
                {selectedEvent.visibility} Event
              </span>
              <span className="text-xs text-slate-400 font-semibold">{selectedEvent.department} Department</span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {selectedEvent.title}
              </h2>
              <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> Start: {new Date(selectedEvent.start).toLocaleString()}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> End: {new Date(selectedEvent.end).toLocaleString()}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> Venue: {selectedEvent.venue}</span>
              </div>
            </div>

            <div className="space-y-1 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800/40 leading-relaxed text-slate-650 dark:text-slate-350 text-xs sm:text-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</span>
              {selectedEvent.description}
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer text-center"
            >
              Close Details
            </button>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default StudentDashboard;
