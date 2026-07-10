export const DEPARTMENTS = [
  { id: 'cse', name: 'CSE', fullName: 'Computer Science and Engineering', studentCount: 480, facultyCount: 24, hodName: 'Dr. Sarah D\'Souza', email: 'hod.cse@eec.edu' },
  { id: 'csd', name: 'CSD', fullName: 'Computer Science and Design', studentCount: 180, facultyCount: 10, hodName: 'Dr. K. Vignesh', email: 'hod.csd@eec.edu' },
  { id: 'cyber', name: 'Cyber Security', fullName: 'Information Technology (Cyber Security)', studentCount: 120, facultyCount: 8, hodName: 'Dr. R. Madhavan', email: 'hod.cyber@eec.edu' },
  { id: 'aids', name: 'AI & DS', fullName: 'Artificial Intelligence & Data Science', studentCount: 240, facultyCount: 12, hodName: 'Dr. Preethi Raj', email: 'hod.aids@eec.edu' },
  { id: 'aiml', name: 'AI & ML', fullName: 'Artificial Intelligence & Machine Learning', studentCount: 240, facultyCount: 14, hodName: 'Dr. S. K. Prasad', email: 'hod.aiml@eec.edu' },
  { id: 'it', name: 'IT', fullName: 'Information Technology', studentCount: 360, facultyCount: 18, hodName: 'Dr. M. Karpagam', email: 'hod.it@eec.edu' },
  { id: 'ece', name: 'ECE', fullName: 'Electronics and Communication Engineering', studentCount: 420, facultyCount: 22, hodName: 'Dr. G. Ramkumar', email: 'hod.ece@eec.edu' },
  { id: 'eee', name: 'EEE', fullName: 'Electrical and Electronics Engineering', studentCount: 300, facultyCount: 16, hodName: 'Dr. A. Srinivasan', email: 'hod.eee@eec.edu' },
  { id: 'eie', name: 'EIE', fullName: 'Electronics and Instrumentation Engineering', studentCount: 180, facultyCount: 10, hodName: 'Dr. T. Kalaiselvi', email: 'hod.eie@eec.edu' },
  { id: 'mechanical', name: 'Mechanical', fullName: 'Mechanical Engineering', studentCount: 360, facultyCount: 20, hodName: 'Dr. P. Ravichandran', email: 'hod.mech@eec.edu' },
  { id: 'civil', name: 'Civil', fullName: 'Civil Engineering', studentCount: 240, facultyCount: 12, hodName: 'Dr. N. Muralidharan', email: 'hod.civil@eec.edu' },
  { id: 'automobile', name: 'Automobile', fullName: 'Automobile Engineering', studentCount: 120, facultyCount: 8, hodName: 'Dr. S. Senthil', email: 'hod.auto@eec.edu' },
  { id: 'biomedical', name: 'Biomedical', fullName: 'Biomedical Engineering', studentCount: 180, facultyCount: 11, hodName: 'Dr. H. Hannah', email: 'hod.biomed@eec.edu' },
  { id: 'robotics', name: 'Robotics & Automation', fullName: 'Robotics and Automation Engineering', studentCount: 120, facultyCount: 7, hodName: 'Dr. J. Devakumar', email: 'hod.robotics@eec.edu' },
  { id: 'mba', name: 'MBA', fullName: 'Master of Business Administration', studentCount: 120, facultyCount: 10, hodName: 'Dr. R. Geetha', email: 'hod.mba@eec.edu' },
  { id: 'mca', name: 'MCA', fullName: 'Master of Computer Applications', studentCount: 120, facultyCount: 8, hodName: 'Dr. V. Umarani', email: 'hod.mca@eec.edu' },
];

export const MOCK_USERS = {
  admin: {
    username: 'admin',
    name: 'Dr. Ramesh Kumar',
    role: 'Admin',
    department: 'Administration',
    email: 'principal@eec.edu',
    mobile: '+91 98401 23456',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    stats: {
      totalStudents: 4160,
      totalFaculty: 222,
      totalDepartments: 16,
      totalEvents: 42
    }
  },
  hod: {
    username: 'hod',
    name: 'Dr. Sarah D\'Souza',
    role: 'HOD',
    department: 'CSE',
    email: 'hod.cse@eec.edu',
    mobile: '+91 94440 98765',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    stats: {
      studentCount: 480,
      facultyCount: 24,
      departmentEvents: 8,
      announcementsCount: 12
    }
  },
  faculty: {
    username: 'faculty',
    name: 'Prof. Rajesh Pillai',
    role: 'Faculty',
    department: 'CSE',
    assignedClass: 'CSE III Year - Sec A',
    email: 'rajesh.pillai@eec.edu',
    mobile: '+91 98840 55443',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    stats: {
      studentCount: 65,
      weeklyClasses: 14,
      assignedEvents: 4,
      pendingGrades: 2
    }
  },
  student: {
    username: 'student',
    name: 'Amit Sharma',
    role: 'Student',
    department: 'CSE',
    currentClass: 'CSE III Year - Sec A',
    email: 'amit.sharma23@student.eec.edu',
    mobile: '+91 81220 99887',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    academicSummary: {
      cgpa: '8.76',
      attendance: '92%',
      creditsEarned: 112,
      pendingBacklogs: 0
    }
  }
};

export const INITIAL_EVENTS = [
  {
    id: 'e1',
    title: 'Placement Drive: Cognizant',
    description: 'Campus recruitment drive by Cognizant for all final year B.E/B.Tech, MCA, and MBA students. Attendance is mandatory for registered students.',
    start: '2026-07-06T09:00:00',
    end: '2026-07-06T17:00:00',
    venue: 'Main Auditorium & Placement Block',
    department: 'All',
    visibility: 'College',
    role: 'Student'
  },
  {
    id: 'e2',
    title: 'HODs Council Meeting',
    description: 'Monthly meeting of all Department Heads with the Principal to discuss academic progress, upcoming external audits, and event scheduling.',
    start: '2026-07-06T14:30:00',
    end: '2026-07-06T16:00:00',
    venue: 'Conference Hall (Admin Block)',
    department: 'Administration',
    visibility: 'College',
    role: 'HOD'
  },
  {
    id: 'e3',
    title: 'AI Workshop: Hands-on Deep Learning',
    description: 'A 2-day practical workshop on building deep learning models using PyTorch. Organized by the Department of CSE.',
    start: '2026-07-07T09:30:00',
    end: '2026-07-08T16:30:00',
    venue: 'CSE Lab 4',
    department: 'CSE',
    visibility: 'Department',
    role: 'Student'
  },
  {
    id: 'e4',
    title: 'Internal Assessment I - Data Structures',
    description: 'Unit 1 & Unit 2 portions. Duration: 1.5 Hours. Classroom seating plan will be posted on the notice board.',
    start: '2026-07-09T10:00:00',
    end: '2026-07-09T11:30:00',
    venue: 'Classrooms 301 - 304',
    department: 'CSE',
    visibility: 'Class',
    role: 'Student'
  },
  {
    id: 'e5',
    title: 'Guest Lecture on Cyber Security Trends',
    description: 'Special lecture by Mr. Raghavan Sundar, VP Security at CyberShield. Open to CSE, IT, Cyber Security students.',
    start: '2026-07-10T11:00:00',
    end: '2026-07-10T13:00:00',
    venue: 'Seminar Hall II',
    department: 'CSE',
    visibility: 'Department',
    role: 'Student'
  },
  {
    id: 'e6',
    title: 'College Sports Day 2026',
    description: 'Annual sports meet featuring track events, football, basketball, and relay matches. Principal will inaugurate the event.',
    start: '2026-07-15T08:00:00',
    end: '2026-07-15T18:00:00',
    venue: 'College Sports Ground',
    department: 'All',
    visibility: 'College',
    role: 'All'
  },
  {
    id: 'e7',
    title: 'Department Symposium: WebCraft 2026',
    description: 'Annual national level technical symposium. Events include Paper Presentation, Hackathon, Web Design, and Coding Battle.',
    start: '2026-07-22T09:00:00',
    end: '2026-07-22T17:00:00',
    venue: 'CSE Department & Auditorium',
    department: 'CSE',
    visibility: 'Department',
    role: 'All'
  },
  {
    id: 'e8',
    title: 'Faculty Development Program (FDP)',
    description: 'Pedagogy and Interactive Teaching Methodologies in Modern Engineering Education. Mandatory for all junior faculty members.',
    start: '2026-07-17T09:30:00',
    end: '2026-07-17T15:30:00',
    venue: 'Smart Classroom (Mech Block)',
    department: 'All',
    visibility: 'College',
    role: 'Faculty'
  },
  {
    id: 'e9',
    title: 'Java Programming Lab Exam',
    description: 'External laboratory examination for III Semester CSE Sec A students. Make sure to bring your verified lab record notebook.',
    start: '2026-07-24T09:00:00',
    end: '2026-07-24T12:00:00',
    venue: 'CSE Lab 2',
    department: 'CSE',
    visibility: 'Class',
    role: 'Student'
  },
  {
    id: 'e10',
    title: 'Holiday - Muharram',
    description: 'Government public holiday. College will remain closed.',
    start: '2026-07-28T00:00:00',
    end: '2026-07-28T23:59:59',
    venue: 'N/A',
    department: 'All',
    visibility: 'College',
    role: 'All'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    message: 'Cognizant Placement Drive scheduled for July 6th at 9:00 AM.',
    time: '2 hours ago',
    read: false,
    role: 'All'
  },
  {
    id: 'n2',
    message: 'Dr. Sarah D\'Souza updated the description for "AI Workshop: Hands-on Deep Learning".',
    time: '5 hours ago',
    read: false,
    role: 'Student'
  },
  {
    id: 'n3',
    message: 'New announcement: "Internal Assessment I timetable has been published".',
    time: '1 day ago',
    read: false,
    role: 'All'
  },
  {
    id: 'n4',
    message: 'Admin added you to the Faculty Development Program roster.',
    time: '2 days ago',
    read: true,
    role: 'Faculty'
  },
  {
    id: 'n5',
    message: 'Department meeting scheduled on July 6th at 2:30 PM with the Principal.',
    time: '3 days ago',
    read: true,
    role: 'HOD'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'a1',
    title: 'Internal Assessment I Schedule',
    content: 'The first internal assessment exams for all semesters will commence from July 9th, 2026. The detailed timetable has been posted on the department notice boards. Hall tickets will be issued by the class tutors starting tomorrow.',
    date: '2026-07-05',
    department: 'All',
    author: 'Principal Office'
  },
  {
    id: 'a2',
    title: 'WebCraft 2026 Symposium Registration Open',
    content: 'Registration for our national level technical symposium WebCraft 2026 is now open. CSE students are requested to actively coordinate event committees. Exciting cash prizes for winners! Last date to register is July 18th.',
    date: '2026-07-04',
    department: 'CSE',
    author: 'Dr. Sarah D\'Souza (HOD)'
  },
  {
    id: 'a3',
    title: 'NBA Accreditation Mock Audit',
    content: 'A mock NBA audit will be conducted on Friday, July 10th. All faculty members are requested to keep their course files, laboratory manuals, and student mentoring reports updated and signed by the respective HODs.',
    date: '2026-07-03',
    department: 'All',
    author: 'Dean Academics'
  },
  {
    id: 'a4',
    title: 'NPTEL Certification Fee Reimbursement',
    content: 'Students who successfully completed NPTEL certifications in the Jan-Apr 2026 session with Elite Gold or Silver certificates are eligible for 100% fee reimbursement. Submit the certificates to your class advisor.',
    date: '2026-07-01',
    department: 'CSE',
    author: 'CSE Dept Office'
  }
];

export const INITIAL_STUDENTS = [
  { id: 's1', name: 'Amit Sharma', rollNo: '23CS101', email: 'amit.sharma23@student.eec.edu', mobile: '+91 81220 99887', department: 'CSE', year: 'III', section: 'A' },
  { id: 's2', name: 'Bhavya Nair', rollNo: '23CS105', email: 'bhavya.nair23@student.eec.edu', mobile: '+91 94445 11223', department: 'CSE', year: 'III', section: 'A' },
  { id: 's3', name: 'Chaitanya K', rollNo: '23CS112', email: 'chaitanya.k23@student.eec.edu', mobile: '+91 98841 00223', department: 'CSE', year: 'III', section: 'B' },
  { id: 's4', name: 'Devanand S', rollNo: '23EC204', email: 'devanand.s23@student.eec.edu', mobile: '+91 91234 56780', department: 'ECE', year: 'III', section: 'A' },
  { id: 's5', name: 'Eliza Thomas', rollNo: '24IT021', email: 'eliza.t24@student.eec.edu', mobile: '+91 90807 06050', department: 'IT', year: 'II', section: 'A' },
  { id: 's6', name: 'Farhan Khan', rollNo: '23ME045', email: 'farhan.k23@student.eec.edu', mobile: '+91 99404 88776', department: 'Mechanical', year: 'III', section: 'B' },
  { id: 's7', name: 'Gautham Ravi', rollNo: '23CS140', email: 'gautham.r23@student.eec.edu', mobile: '+91 98409 33221', department: 'CSE', year: 'III', section: 'C' },
  { id: 's8', name: 'Harini Sundar', rollNo: '23AD012', email: 'harini.s23@student.eec.edu', mobile: '+91 97765 44321', department: 'AI & DS', year: 'III', section: 'A' },
  { id: 's9', name: 'Indrajeet Sen', rollNo: '23EC245', email: 'indrajeet.s23@student.eec.edu', mobile: '+91 88701 44556', department: 'ECE', year: 'III', section: 'B' },
  { id: 's10', name: 'Janani K', rollNo: '24CS155', email: 'janani.k24@student.eec.edu', mobile: '+91 90034 55667', department: 'CSE', year: 'II', section: 'B' }
];

export const INITIAL_FACULTY = [
  { id: 'f1', name: 'Prof. Rajesh Pillai', employeeId: 'EEC_CSE_012', email: 'rajesh.pillai@eec.edu', mobile: '+91 98840 55443', department: 'CSE', designation: 'Assistant Professor', assignedClass: 'CSE III Year - Sec A' },
  { id: 'f2', name: 'Dr. Anand Babu', employeeId: 'EEC_CSE_004', email: 'anand.babu@eec.edu', mobile: '+91 94441 22334', department: 'CSE', designation: 'Associate Professor', assignedClass: 'CSE IV Year - Sec B' },
  { id: 'f3', name: 'Mrs. Rekha S', employeeId: 'EEC_IT_023', email: 'rekha.s@eec.edu', mobile: '+91 98412 88990', department: 'IT', designation: 'Assistant Professor', assignedClass: 'IT III Year - Sec A' },
  { id: 'f4', name: 'Mr. Vigneshwaran K', employeeId: 'EEC_ECE_015', email: 'vignesh.k@eec.edu', mobile: '+91 99620 44556', department: 'ECE', designation: 'Assistant Professor', assignedClass: 'ECE II Year - Sec A' },
  { id: 'f5', name: 'Dr. Chandrasekhar M', employeeId: 'EEC_ME_002', email: 'c.sekhar@eec.edu', mobile: '+91 98402 11223', department: 'Mechanical', designation: 'Professor', assignedClass: 'Mech IV Year - Sec A' },
  { id: 'f6', name: 'Mrs. Deepa Lakshmi', employeeId: 'EEC_AD_008', email: 'deepa.l@eec.edu', mobile: '+91 97712 33445', department: 'AI & DS', designation: 'Assistant Professor', assignedClass: 'AI & DS III Year - Sec A' }
];

export const INITIAL_HODS = [
  { id: 'h1', name: 'Dr. Sarah D\'Souza', employeeId: 'EEC_CSE_HOD', email: 'hod.cse@eec.edu', mobile: '+91 94440 98765', department: 'CSE', designation: 'Professor & Head' },
  { id: 'h2', name: 'Dr. G. Ramkumar', employeeId: 'EEC_ECE_HOD', email: 'hod.ece@eec.edu', mobile: '+91 98402 65432', department: 'ECE', designation: 'Professor & Head' },
  { id: 'h3', name: 'Dr. M. Karpagam', employeeId: 'EEC_IT_HOD', email: 'hod.it@eec.edu', mobile: '+91 91760 99887', department: 'IT', designation: 'Professor & Head' },
  { id: 'h4', name: 'Dr. P. Ravichandran', employeeId: 'EEC_ME_HOD', email: 'hod.mech@eec.edu', mobile: '+91 94445 66778', department: 'Mechanical', designation: 'Professor & Head' },
  { id: 'h5', name: 'Dr. Preethi Raj', employeeId: 'EEC_AD_HOD', email: 'hod.aids@eec.edu', mobile: '+91 98845 11229', department: 'AI & DS', designation: 'Professor & Head' }
];

