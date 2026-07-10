import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, GraduationCap, UserCheck, Briefcase } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState('Student');
  const [username, setUsername] = useState('student');
  const [password, setPassword] = useState('student123');
  const [error, setError] = useState('');

  const roles = [
    { name: 'Admin', icon: ShieldCheck, defaultUser: 'admin', defaultPass: 'admin123', color: 'border-blue-500 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20' },
    { name: 'HOD', icon: UserCheck, defaultUser: 'hod', defaultPass: 'hod123', color: 'border-indigo-500 text-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20' },
    { name: 'Faculty', icon: Briefcase, defaultUser: 'faculty', defaultPass: 'faculty123', color: 'border-green-500 text-green-600 bg-green-50/50 dark:bg-green-950/20' },
    { name: 'Student', icon: GraduationCap, defaultUser: 'student', defaultPass: 'student123', color: 'border-amber-500 text-amber-600 bg-amber-50/50 dark:bg-amber-950/20' }
  ];

  const handleRoleSelect = (roleName) => {
    setSelectedRole(roleName);
    const roleInfo = roles.find(r => r.name === roleName);
    if (roleInfo) {
      setUsername(roleInfo.defaultUser);
      setPassword(roleInfo.defaultPass);
    }
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    
    // Simulate auth check
    const success = login(selectedRole);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-8 sm:p-10 relative overflow-hidden">
        
        {/* Subtle accent border at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-600 to-indigo-600" />

        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 bg-primary text-white items-center justify-center font-bold text-2xl rounded-2xl shadow-md shadow-primary/30 mb-4">
            E
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            EEC <span className="text-primary font-bold">Calendar</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Easwari Engineering College Calendar Portal
          </p>
        </div>

        {/* Role Quick Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center sm:text-left">
            Select Demo Role
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.name;
              return (
                <button
                  type="button"
                  key={r.name}
                  onClick={() => handleRoleSelect(r.name)}
                  className={`flex flex-col items-center justify-center py-3.5 px-2 border rounded-2xl transition-all ${
                    isSelected 
                      ? `${r.color} ring-2 ring-primary/20 font-bold scale-[1.02] shadow-xs` 
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1.5 shrink-0" />
                  <span className="text-xs">{r.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Username
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-xs font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-primary hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer mt-6"
          >
            Access Dashboard as {selectedRole}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">
          EEC Calendar Demonstration Portal. All data is mock-generated and simulated locally. No real network requests will be made.
        </p>
      </div>
    </div>
  );
};

export default Login;
