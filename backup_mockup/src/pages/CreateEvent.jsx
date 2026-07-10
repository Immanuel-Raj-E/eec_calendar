import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, AlignLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';

const CreateEvent = () => {
  const { addEvent, departments } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Toast
  const [toast, setToast] = useState({ show: false, message: '' });

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [venue, setVenue] = useState('');
  const [targetDept, setTargetDept] = useState('All');
  const [visibility, setVisibility] = useState('College');
  const [targetRole, setTargetRole] = useState('All');

  // Load shortcuts from query params
  useEffect(() => {
    const qDate = searchParams.get('date');
    const qDept = searchParams.get('dept');
    const qVis = searchParams.get('visibility');

    if (qDate) setDate(qDate);
    if (qDept) setTargetDept(qDept);
    if (qVis) setVisibility(qVis);
  }, [searchParams]);

  // Adjust role visibility options for safety:
  // Faculty can only schedule Class events for their own department.
  // HOD can schedule Department or Class events.
  // Admin can do anything.
  useEffect(() => {
    if (user.role === 'Faculty') {
      setVisibility('Class');
      setTargetDept(user.department);
    } else if (user.role === 'HOD') {
      setTargetDept(user.department);
      if (visibility === 'College') {
        setVisibility('Department');
      }
    }
  }, [user, visibility]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !date || !startTime || !endTime || !venue) {
      alert('Please fill out all required fields.');
      return;
    }

    // Combine Date and Times into ISO strings
    const startIso = `${date}T${startTime}:00`;
    const endIso = `${date}T${endTime}:00`;

    const newEvent = {
      title,
      description,
      start: startIso,
      end: endIso,
      venue,
      department: targetDept,
      visibility,
      role: targetRole
    };

    addEvent(newEvent);
    showToast(`Event "${title}" scheduled successfully!`);
    
    // Redirect to calendar after brief timeout
    setTimeout(() => {
      navigate('/calendar');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Toast Alert */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700/10 text-sm font-semibold transition-all animate-slide-in">
          <CheckCircle2 size={18} className="text-green-500" />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Schedule Calendar Event</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">Publish college assessments, guest seminars, or special holiday slots.</p>
      </div>

      {/* Main Form container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Title input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Event Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                required
                placeholder="e.g. Internal Assessment I - Python Programming"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white font-semibold"
              />
            </div>
          </div>

          {/* Description input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Description
            </label>
            <div className="relative">
              <textarea 
                rows="4"
                placeholder="Describe details, portion guidelines, target audience, or eligibility requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white leading-relaxed"
              />
            </div>
          </div>

          {/* Date and Timing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Start Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="time" 
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                End Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="time" 
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                />
              </div>
            </div>

          </div>

          {/* Venue & Audiences info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Venue <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. CSE Seminar Hall / Class 301 / Online"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Target Department
              </label>
              <select 
                disabled={user.role === 'HOD' || user.role === 'Faculty'}
                value={targetDept}
                onChange={(e) => setTargetDept(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                <option value="All">All Departments</option>
                {departments.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Visibility and Roles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Visibility Category
              </label>
              <select 
                disabled={user.role === 'Faculty'}
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                {user.role === 'Admin' && <option value="College">College Event (Blue)</option>}
                {(user.role === 'Admin' || user.role === 'HOD') && <option value="Department">Department Event (Green)</option>}
                <option value="Class">Class Specific Event (Orange)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Target Role Audience
              </label>
              <select 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                <option value="All">All Audiences</option>
                <option value="Student">Students Only</option>
                <option value="Faculty">Faculty Only</option>
                <option value="HOD">HODs Only</option>
              </select>
            </div>

          </div>

          {/* Role locks details info box */}
          {user.role !== 'Admin' && (
            <div className="flex items-start gap-2 bg-slate-50 dark:bg-slate-850/50 p-3.5 border border-slate-200/20 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
              <ShieldAlert size={14} className="shrink-0 mt-0.5 text-amber-500" />
              <span>
                As a <strong>{user.role}</strong>, you have restricted write privileges. Scheduling is locked to 
                {user.role === 'HOD' ? ' Department and Class visibilities for ' : ' Class visibilities for '} 
                <strong>{user.department}</strong> department.
              </span>
            </div>
          )}

          {/* Save button */}
          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
          >
            Schedule & Publish Event
          </button>

        </form>
      </div>

    </div>
  );
};

export default CreateEvent;
