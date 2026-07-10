import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Users, Briefcase, UserCheck, Building, 
  Search, Plus, Trash2, X, AlertCircle 
} from 'lucide-react';
import Modal from '../../components/Modal';

const UserManagement = () => {
  const { 
    students, faculty, hods, departments,
    addStudent, deleteStudent, addFaculty, deleteFaculty,
    addHOD, deleteHOD 
  } = useData();

  // Active tab state
  const [activeTab, setActiveTab] = useState('students');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Form states
  const [studentForm, setStudentForm] = useState({ name: '', rollNo: '', email: '', mobile: '', department: 'CSE', year: 'III', section: 'A' });
  const [facultyForm, setFacultyForm] = useState({ name: '', employeeId: '', email: '', mobile: '', department: 'CSE', designation: 'Assistant Professor', assignedClass: '' });
  const [hodForm, setHodForm] = useState({ name: '', employeeId: '', email: '', mobile: '', department: 'CSE', designation: 'Professor & Head' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'students') {
      if (!studentForm.name || !studentForm.rollNo) return;
      addStudent(studentForm);
      showToast(`Student "${studentForm.name}" registered successfully.`);
      setStudentForm({ name: '', rollNo: '', email: '', mobile: '', department: 'CSE', year: 'III', section: 'A' });
    } else if (activeTab === 'faculty') {
      if (!facultyForm.name || !facultyForm.employeeId) return;
      addFaculty(facultyForm);
      showToast(`Faculty member "${facultyForm.name}" registered successfully.`);
      setFacultyForm({ name: '', employeeId: '', email: '', mobile: '', department: 'CSE', designation: 'Assistant Professor', assignedClass: '' });
    } else if (activeTab === 'hods') {
      if (!hodForm.name || !hodForm.employeeId) return;
      addHOD(hodForm);
      showToast(`HOD "${hodForm.name}" registered successfully.`);
      setHodForm({ name: '', employeeId: '', email: '', mobile: '', department: 'CSE', designation: 'Professor & Head' });
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id, name, type) => {
    if (window.confirm(`Are you sure you want to delete ${name} from the directory?`)) {
      if (type === 'student') deleteStudent(id);
      if (type === 'faculty') deleteFaculty(id);
      if (type === 'hod') deleteHOD(id);
      showToast(`Deleted ${name} from roster.`);
    }
  };

  // Filter lists based on search
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHods = hods.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDepts = departments.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.hodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'students', label: 'Students Roster', icon: Users, count: students.length },
    { id: 'faculty', label: 'Faculty Roster', icon: Briefcase, count: faculty.length },
    { id: 'hods', label: 'HODs Directory', icon: UserCheck, count: hods.length },
    { id: 'departments', label: 'Departments', icon: Building, count: departments.length }
  ];

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700/10 text-sm font-semibold transition-all animate-slide-in">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">User Directory & Roster</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">Manage students, faculty members, department heads, and structures.</p>
        </div>
        {activeTab !== 'departments' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/10 hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus size={18} /> Add {activeTab === 'students' ? 'Student' : activeTab === 'faculty' ? 'Faculty' : 'HOD'}
          </button>
        )}
      </div>

      {/* Tab select bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 pb-3 px-2 border-b-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive 
                  ? 'border-primary text-primary font-bold' 
                  : 'border-transparent text-slate-400 hover:text-slate-750 dark:text-slate-500'
              }`}
            >
              <Icon size={16} />
              <span>{t.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                isActive ? 'bg-primary/15 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>{t.count}</span>
            </button>
          );
        })}
      </div>

      {/* Search Filter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-2xs">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder={`Search by name, ID, or department in ${activeTab}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-850 border border-slate-200/55 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
          />
        </div>
      </div>

      {/* Tables container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          
          {/* STUDENTS TABLE */}
          {activeTab === 'students' && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-150 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Roll Number</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Class / Year</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400">No students matching search.</td>
                  </tr>
                ) : (
                  filteredStudents.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-white">{s.name}</td>
                      <td className="px-6 py-3.5 font-mono text-slate-600 dark:text-slate-400">{s.rollNo}</td>
                      <td className="px-6 py-3.5"><span className="px-2.5 py-0.5 bg-blue-100/60 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-md text-[10px] font-bold">{s.department}</span></td>
                      <td className="px-6 py-3.5 font-semibold text-slate-500">{s.year} Year - Sec {s.section}</td>
                      <td className="px-6 py-3.5 text-slate-500">{s.email}</td>
                      <td className="px-6 py-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteUser(s.id, s.name, 'student')}
                          className="p-1.5 text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer inline-flex"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* FACULTY TABLE */}
          {activeTab === 'faculty' && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-150 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">ID / Designation</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Assigned Class</th>
                  <th className="px-6 py-3.5">Contact Details</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredFaculty.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400">No faculty members matching search.</td>
                  </tr>
                ) : (
                  filteredFaculty.map(f => (
                    <tr key={f.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-white">{f.name}</td>
                      <td className="px-6 py-3.5">
                        <p className="font-mono text-xs text-slate-600 dark:text-slate-400">{f.employeeId}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{f.designation}</p>
                      </td>
                      <td className="px-6 py-3.5"><span className="px-2.5 py-0.5 bg-green-100/60 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-md text-[10px] font-bold">{f.department}</span></td>
                      <td className="px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400">{f.assignedClass || 'N/A'}</td>
                      <td className="px-6 py-3.5">
                        <p className="text-slate-500">{f.email}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{f.mobile}</p>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteUser(f.id, f.name, 'faculty')}
                          className="p-1.5 text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer inline-flex"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* HODs TABLE */}
          {activeTab === 'hods' && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-150 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Employee ID</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Designation</th>
                  <th className="px-6 py-3.5">Email / Mobile</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredHods.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400">No HOD records matching search.</td>
                  </tr>
                ) : (
                  filteredHods.map(h => (
                    <tr key={h.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-white">{h.name}</td>
                      <td className="px-6 py-3.5 font-mono text-slate-600 dark:text-slate-400">{h.employeeId}</td>
                      <td className="px-6 py-3.5"><span className="px-2.5 py-0.5 bg-indigo-100/60 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 rounded-md text-[10px] font-bold">{h.department}</span></td>
                      <td className="px-6 py-3.5 font-semibold text-slate-500">{h.designation}</td>
                      <td className="px-6 py-3.5">
                        <p className="text-slate-500">{h.email}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{h.mobile}</p>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteUser(h.id, h.name, 'hod')}
                          className="p-1.5 text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer inline-flex"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* DEPARTMENTS TABLE */}
          {activeTab === 'departments' && (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-150 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Full Stream Name</th>
                  <th className="px-6 py-3.5 font-semibold">HOD Assigned</th>
                  <th className="px-6 py-3.5 text-center">Student Roster</th>
                  <th className="px-6 py-3.5 text-center">Faculty Count</th>
                  <th className="px-6 py-3.5">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredDepts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400">No departments matching search.</td>
                  </tr>
                ) : (
                  filteredDepts.map(d => (
                    <tr key={d.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-white">{d.name}</td>
                      <td className="px-6 py-3.5 font-medium text-slate-700 dark:text-slate-350">{d.fullName}</td>
                      <td className="px-6 py-3.5 font-semibold text-primary">{d.hodName}</td>
                      <td className="px-6 py-3.5 text-center font-semibold text-slate-650">{d.studentCount}</td>
                      <td className="px-6 py-3.5 text-center font-semibold text-slate-650">{d.facultyCount}</td>
                      <td className="px-6 py-3.5 text-slate-500 font-mono text-xs">{d.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* Add User Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Add New Record: ${activeTab === 'students' ? 'Student' : activeTab === 'faculty' ? 'Faculty' : 'HOD'}`}
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          
          {/* STUDENT FORM */}
          {activeTab === 'students' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Student Name</label>
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
                    value={studentForm.rollNo} 
                    onChange={(e) => setStudentForm({...studentForm, rollNo: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
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
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Year</label>
                  <select 
                    value={studentForm.year}
                    onChange={(e) => setStudentForm({...studentForm, year: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none"
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
                    value={studentForm.section} 
                    onChange={(e) => setStudentForm({...studentForm, section: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile</label>
                <input 
                  type="text" 
                  value={studentForm.mobile} 
                  onChange={(e) => setStudentForm({...studentForm, mobile: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl"
                />
              </div>
            </>
          )}

          {/* FACULTY FORM */}
          {activeTab === 'faculty' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Faculty Name</label>
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
                    value={facultyForm.employeeId} 
                    onChange={(e) => setFacultyForm({...facultyForm, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
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
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Designation</label>
                  <select 
                    value={facultyForm.designation}
                    onChange={(e) => setFacultyForm({...facultyForm, designation: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none"
                  >
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor">Professor</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile</label>
                  <input 
                    type="text" 
                    value={facultyForm.mobile} 
                    onChange={(e) => setFacultyForm({...facultyForm, mobile: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Assigned Class Advisor</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CSE III Year - Sec A"
                    value={facultyForm.assignedClass} 
                    onChange={(e) => setFacultyForm({...facultyForm, assignedClass: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl"
                  />
                </div>
              </div>
            </>
          )}

          {/* HOD FORM */}
          {activeTab === 'hods' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">HOD Name</label>
                  <input 
                    type="text" 
                    required 
                    value={hodForm.name} 
                    onChange={(e) => setHodForm({...hodForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Employee ID</label>
                  <input 
                    type="text" 
                    required 
                    value={hodForm.employeeId} 
                    onChange={(e) => setHodForm({...hodForm, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                <input 
                  type="email" 
                  required 
                  value={hodForm.email} 
                  onChange={(e) => setHodForm({...hodForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Department</label>
                  <select 
                    value={hodForm.department}
                    onChange={(e) => setHodForm({...hodForm, department: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Designation</label>
                  <input 
                    type="text" 
                    required
                    value={hodForm.designation} 
                    onChange={(e) => setHodForm({...hodForm, designation: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile</label>
                <input 
                  type="text" 
                  value={hodForm.mobile} 
                  onChange={(e) => setHodForm({...hodForm, mobile: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer mt-4"
          >
            Create Record
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default UserManagement;
