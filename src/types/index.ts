
export interface EmployeeRecord {
  id: string;
  employeeName: string;
  employeeEmail: string;
  managerEmail: string;
  courseStartDate: string; // Store as YYYY-MM-DD string or ISO date string
}

export interface EmailTemplate {
  id: 'employeeCourseNotification' | 'managerCourseNotification';
  name: string;
  subject: string;
  body: string;
  placeholders: string[];
}

export interface NotificationLog {
  id: string;
  timestamp: string; // ISO date string
  employeeName: string;
  employeeEmail: string;
  managerEmail: string;
  courseName: string; // Added for context
  courseStartDate: string; // ISO date string
  status: 'Sent' | 'Failed' | 'Pending';
  message?: string;
}
