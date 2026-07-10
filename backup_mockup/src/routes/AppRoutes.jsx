import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Login from '../pages/Login';
import ProfilePage from '../pages/ProfilePage';
import CalendarPage from '../pages/CalendarPage';
import CreateEvent from '../pages/CreateEvent';
import DepartmentCardsPage from '../pages/DepartmentCardsPage';

// Role Dashboards
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import HODDashboard from '../pages/hod/HODDashboard';
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';

// Guard for protected pages
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Guard for public pages (Login)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Root Redirector based on user role
const RootRedirect = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user.role) {
    case 'Admin':
      return <Navigate to="/admin" replace />;
    case 'HOD':
      return <Navigate to="/hod" replace />;
    case 'Faculty':
      return <Navigate to="/faculty" replace />;
    case 'Student':
      return <Navigate to="/student" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />

      {/* Protected Dashboard Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Root Route Redirects dynamically */}
        <Route index element={<RootRedirect />} />
        
        {/* Admin Dashboard */}
        <Route 
          path="admin" 
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin User Management */}
        <Route 
          path="users" 
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />

        {/* HOD Dashboard */}
        <Route 
          path="hod" 
          element={
            <ProtectedRoute allowedRoles={['HOD']}>
              <HODDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Faculty Dashboard */}
        <Route 
          path="faculty" 
          element={
            <ProtectedRoute allowedRoles={['Faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Student Dashboard */}
        <Route 
          path="student" 
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Shared Protected Pages */}
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="departments" element={<DepartmentCardsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        
        <Route 
          path="create-event" 
          element={
            <ProtectedRoute allowedRoles={['Admin', 'HOD', 'Faculty']}>
              <CreateEvent />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
