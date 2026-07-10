import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, Search, Trash2, Edit2, Plus, Filter, Info, X } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '../components/Modal';

const CalendarPage = () => {
  const { events, deleteEvent, departments } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Modal and view states
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');

  // Load search query from URL if any
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // Filter events logic
  const filteredEvents = events.filter(evt => {
    // Search query matching
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category matching
    const matchesCategory = categoryFilter === 'All' || evt.visibility === categoryFilter;

    // Department matching
    const matchesDept = deptFilter === 'All' || evt.department === deptFilter;

    // Student role visibility boundary:
    // Students should only see: College, their own Dept (CSE), or their Class (CSE)
    const isVisibleToUser = 
      user.role !== 'Student' ||
      evt.visibility === 'College' ||
      (evt.department === user.department);

    return matchesSearch && matchesCategory && matchesDept && isVisibleToUser;
  });

  // Map to FullCalendar format
  const calendarEvents = filteredEvents.map(e => ({
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

  const handleDateClick = (info) => {
    if (user.role === 'Student') return; // Students cannot create events
    // Navigate to create event prefilled with date
    navigate(`/create-event?date=${info.dateStr}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
      setIsModalOpen(false);
      showToast('Event deleted successfully.');
    }
  };

  // Check delete permissions
  // Admin can delete any event. HOD can delete events in their department. Faculty can delete events in their department.
  const canModifyEvent = (evt) => {
    if (user.role === 'Admin') return true;
    if ((user.role === 'HOD' || user.role === 'Faculty') && evt.department === user.department) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700/10 text-sm font-semibold transition-all animate-slide-in">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
          {toast.message}
        </div>
      )}

      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Academic Calendar</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">Explore college timelines, department programs, and assessments.</p>
        </div>
        {user.role !== 'Student' && (
          <button 
            onClick={() => navigate('/create-event')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/10 hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus size={18} /> Schedule New Event
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-2xs flex flex-col md:flex-row md:items-center gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search calendar events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-650"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 items-center">
          
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 shrink-0">
            <Filter size={14} /> Filters:
          </div>

          {/* Category Filter */}
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Categories</option>
            <option value="College">College Events</option>
            <option value="Department">Department Events</option>
            <option value="Class">Class Events</option>
          </select>

          {/* Department Filter (Admins see all, HODs see all, Students locked if restricted, let's keep all for flexibility) */}
          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Departments</option>
            <option value="Administration">Administration</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>

        </div>

      </div>

      {/* Main Calendar Block */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs">
        
        {/* Instructions */}
        {user.role !== 'Student' && (
          <div className="flex items-start gap-2 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/10 p-3 rounded-xl mb-4 text-xs text-blue-600 dark:text-blue-400">
            <Info size={14} className="shrink-0 mt-0.5" />
            <span><strong>Tip:</strong> Click directly on any date cell block inside the grid to open the event creation form prefilled with that date.</span>
          </div>
        )}

        <div className="main-calendar-wrap">
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
            dateClick={handleDateClick}
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

      {/* Event Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Event Specifications">
        {selectedEvent && (
          <div className="space-y-5 text-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                selectedEvent.visibility === 'College' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/25 dark:text-blue-300 dark:border-blue-800/40' :
                selectedEvent.visibility === 'Department' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/25 dark:text-green-300 dark:border-green-800/40' :
                'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/25 dark:text-orange-300 dark:border-orange-800/40'
              }`}>
                {selectedEvent.visibility} Event
              </span>
              <span className="text-xs text-slate-450 font-semibold">{selectedEvent.department} Department</span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {selectedEvent.title}
              </h2>
              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-450 font-medium">
                <p><strong>Starts:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                <p><strong>Ends:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
                <p><strong>Venue:</strong> {selectedEvent.venue}</p>
              </div>
            </div>

            <div className="bg-slate-55 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/40 leading-relaxed text-slate-650 dark:text-slate-350 text-xs sm:text-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</span>
              {selectedEvent.description}
            </div>

            <div className="flex items-center gap-2 pt-2">
              {canModifyEvent(selectedEvent) ? (
                <button 
                  onClick={() => handleDelete(selectedEvent.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-red-200 text-red-650 hover:bg-red-50 dark:border-red-900/35 dark:text-red-400 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer text-xs font-semibold"
                >
                  <Trash2 size={15} /> Delete Event
                </button>
              ) : null}
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-850 dark:text-slate-250 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer text-center"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default CalendarPage;
