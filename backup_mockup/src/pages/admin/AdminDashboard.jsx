import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
  Users, Briefcase, Building, Calendar, 
  Plus, CalendarDays, BellRing, ArrowUpRight 
} from 'lucide-react';
import Modal from '../../components/Modal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { 
    students, faculty, departments, events, notifications,
    addStudent, addFaculty 
  } = useData();

  // Modal states
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  
  // Toast states
  const [toast, setToast] = useState({ show: false, message: '' });

  // Form states
  const [studentForm, setStudentForm] = useState({ name: '', rollNo: '', email: '', mobile: '', department: 'CSE', year: 'III', section: 'A' });
  const [facultyForm, setFacultyForm] = useState({ name: '', employeeId: '', email: '', mobile: '', department: 'CSE', designation: 'Assistant Professor', assignedClass: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.rollNo || !studentForm.email) return;
    addStudent(studentForm);
    setIsStudentModalOpen(false);
    showToast(`Student ${studentForm.name} added successfully!`);
    setStudentForm({ name: '', rollNo: '', email: '', mobile: '', department: 'CSE', year: 'III', section: 'A' });
  };

  const handleFacultySubmit = (e) => {
    e.preventDefault();
    if (!facultyForm.name || !facultyForm.employeeId || !facultyForm.email) return;
    addFaculty(facultyForm);
    setIsFacultyModalOpen(false);
    showToast(`Faculty member ${facultyForm.name} added successfully!`);
    setFacultyForm({ name: '', employeeId: '', email: '', mobile: '', department: 'CSE', designation: 'Assistant Professor', assignedClass: '' });
  };

  // Stats computation
  const stats = [
    { label: 'Total Students', value: students.length * 40 + 210, icon: Users, color: 'bg-blue-500 text-blue-500', detail: '+12% from last term' },
    { label: 'Total Faculty', value: faculty.length, icon: Briefcase, color: 'bg-green-500 text-green-500', detail: '100% active staff' },
    { label: 'Departments', value: departments.length, icon: Building, color: 'bg-indigo-500 text-indigo-500', detail: 'All streams enabled' },
    { label: 'Total Events', value: events.length, icon: Calendar, color: 'bg-amber-500 text-amber-500', detail: 'Active this month' }
  ];

  // Sorting and filtering events
  const today = new Date('2026-07-06T00:00:00');
  const upcomingEvents = events
    .filter(e => new Date(e.start) >= today)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 4);

  const recentEvents = events
    .filter(e => new Date(e.start) < today)
    .sort((a, b) => new Date(b.start) - new Date(a.start))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700/10 text-sm font-semibold transition-all animate-slide-in">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
          {toast.message}
        </div>
      )}

      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Admin Administration</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">Welcome back, Principal Dr. Ramesh Kumar.</p>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs">
          Academic Year: 2026-2027
        </div>
      </div>

      {/* Grid Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex items-center justify-between transition-all hover:shadow-xs">
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">{s.label}</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 block">{s.detail}</span>
              </div>
              <div className={`p-3 rounded-2xl ${s.color.split(' ')[0]}/10 ${s.color.split(' ')[1]}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">Quick Administrative Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => setIsStudentModalOpen(true)}
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <Plus size={16} /> Add Student
          </button>
          <button 
            onClick={() => setIsFacultyModalOpen(true)}
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <Plus size={16} /> Add Faculty
          </button>
          <button 
            onClick={() => navigate('/create-event')}
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <Plus size={16} /> Add Event
          </button>
          <button 
            onClick={() => navigate('/departments')}
            className="flex items-center justify-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            View Departments
          </button>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Events & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming events list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
                <CalendarDays size={18} className="text-primary" />
                Upcoming Events Schedule
              </h3>
              <button 
                onClick={() => navigate('/calendar')}
                className="text-xs text-primary hover:text-blue-700 font-semibold flex items-center gap-0.5"
              >
                View Full Calendar <ArrowUpRight size={14} />
              </button>
            </div>
            
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {upcomingEvents.map(e => (
                <div key={e.id} className="py-3.5 flex items-start gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 px-2 rounded-xl transition-colors">
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    e.visibility === 'College' ? 'bg-blue-100/70 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' :
                    e.visibility === 'Department' ? 'bg-green-100/70 text-green-700 dark:bg-green-950/40 dark:text-green-300' :
                    'bg-orange-100/70 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300'
                  }`}>
                    <Calendar size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">{e.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        e.visibility === 'College' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        e.visibility === 'Department' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>{e.visibility}</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      <span>Date: {new Date(e.start).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                      <span>Time: {new Date(e.start).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})}</span>
                      <span>Venue: {e.venue}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Chart Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-4">Event Frequency by Month</h3>
            {/* Visual simulation of Column chart */}
            <div className="h-44 flex items-end justify-between gap-2.5 pt-4 px-2">
              {[
                { m: 'Jan', val: 30, h: 'h-[30%]', color: 'bg-slate-300 dark:bg-slate-700' },
                { m: 'Feb', val: 45, h: 'h-[45%]', color: 'bg-slate-300 dark:bg-slate-700' },
                { m: 'Mar', val: 65, h: 'h-[65%]', color: 'bg-slate-300 dark:bg-slate-700' },
                { m: 'Apr', val: 50, h: 'h-[50%]', color: 'bg-slate-300 dark:bg-slate-700' },
                { m: 'May', val: 20, h: 'h-[20%]', color: 'bg-slate-300 dark:bg-slate-700' },
                { m: 'Jun', val: 15, h: 'h-[15%]', color: 'bg-slate-300 dark:bg-slate-700' },
                { m: 'Jul', val: 85, h: 'h-[85%]', color: 'bg-primary' },
                { m: 'Aug', val: 60, h: 'h-[60%]', color: 'bg-slate-300 dark:bg-slate-700' },
                { m: 'Sep', val: 75, h: 'h-[75%]', color: 'bg-slate-300 dark:bg-slate-700' }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                  <div className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}</div>
                  <div className={`w-full ${bar.h} ${bar.color} rounded-t-lg transition-all duration-300 group-hover:brightness-105`} />
                  <span className="text-[10px] font-semibold text-slate-400 mt-1">{bar.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Announcements / Notifications */}
        <div className="space-y-6">
          
          {/* Notifications panel widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs flex flex-col max-h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
                <BellRing size={18} className="text-amber-500" />
                Live Notification Logs
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {notifications.slice(0, 5).map(n => (
                <div key={n.id} className="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/40 text-xs">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{n.message}</p>
                  <div className="flex items-center justify-between mt-1.5 text-[9px] text-slate-400">
                    <span>{n.time}</span>
                    <span className="font-bold uppercase tracking-wider text-slate-400/80">{n.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical / Recent Events list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-3">Recently Completed Events</h3>
            <div className="space-y-3">
              {recentEvents.length === 0 ? (
                <p className="text-xs text-slate-400">No events completed recently.</p>
              ) : (
                recentEvents.map(e => (
                  <div key={e.id} className="p-3 border border-slate-100 dark:border-slate-800/80 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">{e.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{new Date(e.start).toLocaleDateString()}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md text-[9px] font-semibold">Done</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Add Student Modal */}
      <Modal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} title="Add Student Record">
        <form onSubmit={handleStudentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={studentForm.name} 
                onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Roll Number</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. 23CS101"
                value={studentForm.rollNo} 
                onChange={(e) => setStudentForm({...studentForm, rollNo: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={studentForm.email} 
              onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Department</label>
              <select 
                value={studentForm.department}
                onChange={(e) => setStudentForm({...studentForm, department: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Year</label>
              <select 
                value={studentForm.year}
                onChange={(e) => setStudentForm({...studentForm, year: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                <option value="I">I Year</option>
                <option value="II">II Year</option>
                <option value="III">III Year</option>
                <option value="IV">IV Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Section</label>
              <input 
                type="text" 
                placeholder="A, B or C"
                value={studentForm.section} 
                onChange={(e) => setStudentForm({...studentForm, section: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile Number</label>
            <input 
              type="text" 
              value={studentForm.mobile} 
              onChange={(e) => setStudentForm({...studentForm, mobile: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer mt-4"
          >
            Create Student Record
          </button>
        </form>
      </Modal>

      {/* Add Faculty Modal */}
      <Modal isOpen={isFacultyModalOpen} onClose={() => setIsFacultyModalOpen(false)} title="Add Faculty Roster">
        <form onSubmit={handleFacultySubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={facultyForm.name} 
                onChange={(e) => setFacultyForm({...facultyForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Employee ID</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. EEC_CSE_099"
                value={facultyForm.employeeId} 
                onChange={(e) => setFacultyForm({...facultyForm, employeeId: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={facultyForm.email} 
              onChange={(e) => setFacultyForm({...facultyForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Department</label>
              <select 
                value={facultyForm.department}
                onChange={(e) => setFacultyForm({...facultyForm, department: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Designation</label>
              <select 
                value={facultyForm.designation}
                onChange={(e) => setFacultyForm({...facultyForm, designation: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile Number</label>
              <input 
                type="text" 
                value={facultyForm.mobile} 
                onChange={(e) => setFacultyForm({...facultyForm, mobile: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Assigned Class Advisor</label>
              <input 
                type="text" 
                placeholder="e.g. CSE III Year - Sec A"
                value={facultyForm.assignedClass} 
                onChange={(e) => setFacultyForm({...facultyForm, assignedClass: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer mt-4"
          >
            Create Faculty Record
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default AdminDashboard;
