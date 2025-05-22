
"use client";

import { useState, useEffect } from 'react';
import type { NotificationLog } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Mail, CalendarDays, UserCircle, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data generation
const generateMockLogs = (count: number): NotificationLog[] => {
  const logs: NotificationLog[] = [];
  const statuses: NotificationLog['status'][] = ['Sent', 'Failed', 'Pending'];
  const employeeNames = ['Alice Smith', 'Bob Johnson', 'Carol Williams', 'David Brown', 'Eve Davis'];
  const courseNames = ['Advanced Excel', 'Project Management Fundamentals', 'Leadership Skills', 'Cybersecurity Basics', 'Cloud Computing Intro'];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const employeeName = employeeNames[Math.floor(Math.random() * employeeNames.length)];
    const courseName = courseNames[Math.floor(Math.random() * courseNames.length)];
    const courseStartDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date in next 30 days
    
    logs.push({
      id: `log-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random time in last 7 days
      employeeName: employeeName,
      employeeEmail: `${employeeName.toLowerCase().replace(' ', '.')}@example.com`,
      managerEmail: `manager.${employeeName.toLowerCase().split(' ')[1]}@example.com`,
      courseName: courseName,
      courseStartDate: courseStartDate.toISOString().split('T')[0],
      status: status,
      message: status === 'Failed' ? 'SMTP server connection error' : undefined,
    });
  }
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};


export function NotificationLogClient() {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setLogs(generateMockLogs(25));
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: NotificationLog['status']) => {
    switch (status) {
      case 'Sent':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white"><CheckCircle2 className="mr-1 h-3 w-3" />Sent</Badge>;
      case 'Failed':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Failed</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-400 hover:bg-yellow-500 text-black"><AlertTriangle className="mr-1 h-3 w-3" />Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Notification Logs...</CardTitle>
          <CardDescription>Please wait while we fetch the latest logs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (logs.length === 0) {
     return (
      <Card>
        <CardHeader>
          <CardTitle>Notification Logs</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No notification logs found.</p>
          <p className="text-sm text-muted-foreground">Logs will appear here once notifications are sent.</p>
        </CardContent>
      </Card>
     );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Notification Activity</CardTitle>
        <CardDescription>Overview of all reminder emails sent or pending.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead><UserCircle className="inline-block mr-1 h-4 w-4" />Employee</TableHead>
                <TableHead><Briefcase className="inline-block mr-1 h-4 w-4" />Manager Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead><CalendarDays className="inline-block mr-1 h-4 w-4" />Course Start</TableHead>
                <TableHead><CalendarDays className="inline-block mr-1 h-4 w-4" />Sent At</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{log.employeeName}</div>
                    <div className="text-xs text-muted-foreground">{log.employeeEmail}</div>
                  </TableCell>
                  <TableCell className="text-sm">{log.managerEmail}</TableCell>
                  <TableCell className="text-sm">{log.courseName}</TableCell>
                  <TableCell className="text-sm">{new Date(log.courseStartDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-sm">{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate" title={log.message}>{log.message || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
