
import { FileUpload } from '@/components/FileUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, BellRing, FileText, History, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Alert className="border-primary bg-primary/5">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <AlertTitle className="font-semibold text-primary">Welcome to Course Reminder Pro!</AlertTitle>
        <AlertDescription>
          Easily manage course notifications for your employees. Upload your Excel sheet, customize email templates, and track sent notifications.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FileUpload />
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BellRing className="h-6 w-6 text-primary" />
              <CardTitle>Automated Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Scheduled Notifications Illustration" 
              width={600} 
              height={400} 
              className="rounded-md mb-4 object-cover aspect-video"
              data-ai-hint="calendar schedule" 
            />
            <p className="text-sm text-muted-foreground mb-2">
              Our system automatically checks your imported data daily.
            </p>
            <p className="text-sm text-muted-foreground">
              When a course start date is approaching, reminder emails are sent to both the employee and their manager based on your configured templates.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-accent" />
              <CardTitle>Email Templates</CardTitle>
            </div>
            <CardDescription>Customize the content of reminder emails.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Personalize messages for employees and managers. Use placeholders like <code>{`{{employeeName}}`}</code> and <code>{`{{courseDate}}`}</code>.
            </p>
            <Link href="/templates" passHref>
              <Button variant="outline" className="w-full">
                Manage Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="h-6 w-6 text-accent" />
              <CardTitle>Notification Log</CardTitle>
            </div>
            <CardDescription>Track all sent email notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View the status of each notification, including delivery success or failure, and any error messages.
            </p>
            <Link href="/logs" passHref>
              <Button variant="outline" className="w-full">
                View Logs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
