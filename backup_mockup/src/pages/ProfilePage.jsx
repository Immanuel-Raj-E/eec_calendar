import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Shield, Building, Edit3, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Form states prefilled with current user details
  const [formName, setFormName] = useState(user?.name || '');
  const [formEmail, setFormEmail] = useState(user?.email || '');
  const [formMobile, setFormMobile] = useState(user?.mobile || '');

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    const updatedUser = {
      ...user,
      name: formName,
      email: formEmail,
      mobile: formMobile
    };

    updateProfile(updatedUser);
    setIsEditModalOpen(false);
    showToast('Profile updated successfully.');
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700/10 text-sm font-semibold transition-all animate-slide-in">
          <CheckCircle2 size={18} className="text-green-500" />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">My Profile Specifications</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">Manage your personal credentials, contact card, and account settings.</p>
      </div>

      {/* Profile Card Wrapper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs relative">
        
        {/* Colorful backdrop card header banner */}
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-650" />

        {/* Content container */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col items-center sm:items-start">
          
          {/* Avatar floating above */}
          <div className="relative -mt-16 mb-4">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-28 w-28 rounded-full border-4 border-white dark:border-slate-900 object-cover shadow-md"
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 text-center sm:text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-sans">{user.name}</h2>
              <span className="inline-block mt-1.5 px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                {user.role}
              </span>
            </div>
            
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 rounded-xl text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs self-center"
            >
              <Edit3 size={14} /> Edit Profile Card
            </button>
          </div>

          {/* Details list info items */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-slate-50 dark:border-slate-800/60 pt-6 text-sm">
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-slate-100/50 dark:border-slate-850/50">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <Shield size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Role</p>
                <p className="font-semibold text-slate-805 text-slate-800 dark:text-slate-200 mt-0.5">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-slate-100/50 dark:border-slate-850/50">
              <div className="p-2 bg-indigo-500/10 text-indigo-505 text-indigo-500 rounded-xl">
                <Building size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
                <p className="font-semibold text-slate-805 text-slate-800 dark:text-slate-200 mt-0.5">{user.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-slate-100/50 dark:border-slate-850/50">
              <div className="p-2 bg-green-500/10 text-green-605 text-green-500 rounded-xl">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                <p className="font-semibold text-slate-805 text-slate-800 dark:text-slate-200 mt-0.5 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-slate-100/50 dark:border-slate-850/50">
              <div className="p-2 bg-amber-500/10 text-amber-605 text-amber-500 rounded-xl">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mobile Number</p>
                <p className="font-semibold text-slate-805 text-slate-800 dark:text-slate-200 mt-0.5">{user.mobile}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Modify Profile Specifications">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={formName} 
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={formEmail} 
              onChange={(e) => setFormEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile Number</label>
            <input 
              type="text" 
              value={formMobile} 
              onChange={(e) => setFormMobile(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 cursor-pointer mt-4"
          >
            Update Profile Specifications
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default ProfilePage;
