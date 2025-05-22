
"use client";

import { useState } from 'react';
import type { EmailTemplate } from '@/types';
import { EmailTemplateForm } from '@/components/EmailTemplateForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Briefcase } from 'lucide-react';

const initialTemplates: Record<EmailTemplate['id'], EmailTemplate> = {
  employeeCourseNotification: {
    id: 'employeeCourseNotification',
    name: 'Employee Course Reminder',
    subject: 'Upcoming Course Reminder: {{courseName}}',
    body: `Hi {{employeeName}},\n\nThis is a reminder that your course "{{courseName}}" is scheduled to start on {{courseStartDate}}.\n\nBest regards,\nHR Department`,
    placeholders: ['{{employeeName}}', '{{courseName}}', '{{courseStartDate}}'],
  },
  managerCourseNotification: {
    id: 'managerCourseNotification',
    name: 'Manager Notification: Employee Course',
    subject: 'Employee Course Start: {{employeeName}} - {{courseName}}',
    body: `Hi {{managerName}},\n\nThis is to inform you that {{employeeName}} (reporting to you) is scheduled to start the course "{{courseName}}" on {{courseStartDate}}.\n\nPlease ensure they have the necessary arrangements to attend.\n\nThanks,\nHR Department`,
    placeholders: ['{{managerName}}', '{{employeeName}}', '{{courseName}}', '{{courseStartDate}}'],
  },
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Record<EmailTemplate['id'], EmailTemplate>>(initialTemplates);

  const handleSaveTemplate = (updatedTemplate: EmailTemplate) => {
    setTemplates(prev => ({
      ...prev,
      [updatedTemplate.id]: updatedTemplate,
    }));
    // Here you would typically send the updated template to a backend API
    console.log('Saving template:', updatedTemplate);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
        <p className="text-muted-foreground">
          Customize the emails sent to employees and managers.
        </p>
      </div>

      <Tabs defaultValue="employee" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="employee">
            <User className="mr-2 h-4 w-4" /> Employee Template
          </TabsTrigger>
          <TabsTrigger value="manager">
            <Briefcase className="mr-2 h-4 w-4" /> Manager Template
          </TabsTrigger>
        </TabsList>
        <TabsContent value="employee" className="mt-6">
           <EmailTemplateForm
            template={templates.employeeCourseNotification}
            onSave={handleSaveTemplate}
          />
        </TabsContent>
        <TabsContent value="manager" className="mt-6">
          <EmailTemplateForm
            template={templates.managerCourseNotification}
            onSave={handleSaveTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
