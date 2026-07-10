import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { 
  Menu, X, Bell, Sun, Moon, LogOut, Calendar, 
  LayoutDashboard, Users, BookOpen, User, 
  PlusSquare, Building, Search, CheckCircle2 
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    // Redirect to login handled by router, but just in case
    return null;
  }

  // Filter notifications relevant to current role
  const userNotifications = notifications.filter(n => 
    n.role === 'All' || n.role === user.role
  );
  
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define sidebar menu options based on role
  const getMenuOptions = () => {
    const role = user.role;
    const items = [];

    switch (role) {
      case 'Admin':
        items.push(
          { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
          { name: 'Academic Calendar', path: '/calendar', icon: Calendar },
          { name: 'Create Event', path: '/create-event', icon: PlusSquare },
          { name: 'User Management', path: '/users', icon: Users },
          { name: 'Departments', path: '/departments', icon: Building }
        );
        break;
      case 'HOD':
        items.push(
          { name: 'Dashboard', path: '/hod', icon: LayoutDashboard },
          { name: 'Academic Calendar', path: '/calendar', icon: Calendar },
          { name: 'Schedule Event', path: '/create-event', icon: PlusSquare },
          { name: 'Departments', path: '/departments', icon: Building }
        );
        break;
      case 'Faculty':
        items.push(
          { name: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
          { name: 'Academic Calendar', path: '/calendar', icon: Calendar },
          { name: 'Schedule Event', path: '/create-event', icon: PlusSquare },
          { name: 'Departments', path: '/departments', icon: Building }
        );
        break;
      case 'Student':
        items.push(
          { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
          { name: 'Academic Calendar', path: '/calendar', icon: Calendar }
        );
        break;
      default:
        break;
    }

    // Common item
    items.push({ name: 'Profile', path: '/profile', icon: User });
    return items;
  };

  const menuItems = getMenuOptions();

  // Search redirection helper
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Find event or view search results (simulated by going to calendar)
      navigate(`/calendar?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs h-16 flex items-center justify-between px-4 sm:px-6">
        
        {/* Logo and Menu Trigger */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-primary/30">
              E
            </div>
            <span className="font-bold text-lg tracking-tight sm:block hidden text-slate-900 dark:text-white">
              EEC <span className="text-primary">Calendar</span>
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-72 lg:w-96 mx-4">
          <Search size={18} className="absolute left-3 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search events, venues, departments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-slate-200 dark:placeholder-slate-500 transition-all"
          />
        </form>

        {/* Right Nav Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-4 min-w-[16px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Menu */}
            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsNotifOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-40 overflow-hidden animate-slide-in">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllNotificationsRead}
                        className="text-xs font-semibold text-primary hover:text-blue-700 transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[360px] overflow-y-auto">
                    {userNotifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                        No notifications yet.
                      </div>
                    ) : (
                      userNotifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markNotificationRead(n.id);
                            setIsNotifOpen(false);
                            navigate('/calendar');
                          }}
                          className={`p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer transition-colors flex items-start gap-3 ${!n.read ? 'bg-blue-50/30 dark:bg-primary/5' : ''}`}
                        >
                          <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                          <div className="flex-1">
                            <p className={`text-xs sm:text-sm leading-relaxed ${!n.read ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                              {n.message}
                            </p>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 p-1 pl-1 pr-2 sm:pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs" 
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">{user.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{user.role}</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-40 overflow-hidden animate-slide-in">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{user.email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                      {user.role}
                    </span>
                  </div>
                  <div className="p-1">
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/profile');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
                    >
                      <User size={16} />
                      My Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex relative">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:block shrink-0">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      isActive 
                        ? 'bg-primary text-white shadow-sm shadow-primary/20' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Mobile/Tablet Sidebar Drawer */}
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Drawer */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 z-50 p-4 shadow-2xl flex flex-col justify-between lg:hidden animate-slide-in">
              <div>
                <div className="flex items-center justify-between pb-6 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-base">
                      E
                    </div>
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      EEC <span className="text-primary">Calendar</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                            isActive 
                              ? 'bg-primary text-white shadow-sm' 
                              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                          }`
                        }
                      >
                        <Icon size={18} />
                        {item.name}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;
