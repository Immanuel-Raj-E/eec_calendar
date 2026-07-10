import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEPARTMENTS, 
  INITIAL_EVENTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ANNOUNCEMENTS,
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_HODS
} from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Load initial data from localStorage if exists, otherwise load from mockData
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('eec_departments');
    return saved ? JSON.parse(saved) : DEPARTMENTS;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eec_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('eec_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('eec_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('eec_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('eec_faculty');
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  const [hods, setHods] = useState(() => {
    const saved = localStorage.getItem('eec_hods');
    return saved ? JSON.parse(saved) : INITIAL_HODS;
  });

  // Sync to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('eec_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('eec_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eec_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('eec_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('eec_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('eec_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('eec_hods', JSON.stringify(hods));
  }, [hods]);

  // Methods
  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: `e_${Date.now()}`
    };
    setEvents(prev => [eventWithId, ...prev]);
    
    // Add corresponding notification
    addNotification({
      message: `New event scheduled: "${newEvent.title}" for ${new Date(newEvent.start).toLocaleDateString()}`,
      role: newEvent.role || 'All'
    });
    
    return eventWithId;
  };

  const editEvent = (updatedEvent) => {
    setEvents(prev => prev.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
    
    // Add corresponding notification
    addNotification({
      message: `Event updated: "${updatedEvent.title}" details have been modified.`,
      role: updatedEvent.role || 'All'
    });
  };

  const deleteEvent = (eventId) => {
    const targetEvent = events.find(evt => evt.id === eventId);
    setEvents(prev => prev.filter(evt => evt.id !== eventId));
    
    if (targetEvent) {
      addNotification({
        message: `Event cancelled: "${targetEvent.title}".`,
        role: targetEvent.role || 'All'
      });
    }
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `n_${Date.now()}`,
      message: notif.message,
      time: 'Just now',
      read: false,
      role: notif.role || 'All'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const addAnnouncement = (newAnn) => {
    const annWithId = {
      ...newAnn,
      id: `a_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [annWithId, ...prev]);
    
    addNotification({
      message: `New announcement: "${newAnn.title}" published by ${newAnn.author}.`,
      role: 'All'
    });
  };

  // Student CRUD
  const addStudent = (student) => {
    const newStud = { ...student, id: `s_${Date.now()}` };
    setStudents(prev => [...prev, newStud]);
    // update department counts
    updateDepartmentCounts(student.department, 1, 0);
  };

  const deleteStudent = (id) => {
    const stud = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    if (stud) {
      updateDepartmentCounts(stud.department, -1, 0);
    }
  };

  // Faculty CRUD
  const addFaculty = (fac) => {
    const newFac = { ...fac, id: `f_${Date.now()}` };
    setFaculty(prev => [...prev, newFac]);
    updateDepartmentCounts(fac.department, 0, 1);
  };

  const deleteFaculty = (id) => {
    const fac = faculty.find(f => f.id === id);
    setFaculty(prev => prev.filter(f => f.id !== id));
    if (fac) {
      updateDepartmentCounts(fac.department, 0, -1);
    }
  };

  // HOD CRUD
  const addHOD = (hod) => {
    const newHod = { ...hod, id: `h_${Date.now()}` };
    setHods(prev => [...prev, newHod]);
    // update department HOD name
    setDepartments(prev => 
      prev.map(dept => dept.name === hod.department ? { ...dept, hodName: hod.name } : dept)
    );
  };

  const deleteHOD = (id) => {
    const hod = hods.find(h => h.id === id);
    setHods(prev => prev.filter(h => h.id !== id));
    if (hod) {
      setDepartments(prev => 
        prev.map(dept => dept.name === hod.department ? { ...dept, hodName: 'Vacant' } : dept)
      );
    }
  };

  const updateDepartmentCounts = (deptName, studentOffset, facultyOffset) => {
    setDepartments(prev => 
      prev.map(dept => {
        if (dept.name === deptName) {
          return {
            ...dept,
            studentCount: Math.max(0, dept.studentCount + studentOffset),
            facultyCount: Math.max(0, dept.facultyCount + facultyOffset)
          };
        }
        return dept;
      })
    );
  };

  return (
    <DataContext.Provider value={{
      departments,
      events,
      notifications,
      announcements,
      students,
      faculty,
      hods,
      addEvent,
      editEvent,
      deleteEvent,
      markNotificationRead,
      markAllNotificationsRead,
      addAnnouncement,
      addStudent,
      deleteStudent,
      addFaculty,
      deleteFaculty,
      addHOD,
      deleteHOD
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
