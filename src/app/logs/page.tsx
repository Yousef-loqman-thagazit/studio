
import { NotificationLogClient } from '@/components/NotificationLogClient';

export default function LogsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notification Log</h1>
        <p className="text-muted-foreground">
          Track the status of all automated email reminders.
        </p>
      </div>
      <NotificationLogClient />
    </div>
  );
}
