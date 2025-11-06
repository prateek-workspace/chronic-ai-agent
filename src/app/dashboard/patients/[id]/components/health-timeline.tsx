import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Patient, AlertLevel } from '@/lib/mock-data';
import { AlertTriangle, Info, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const alertMeta: Record<
  AlertLevel,
  { icon: React.ElementType; style: string }
> = {
  Critical: { icon: AlertTriangle, style: 'text-red-500' },
  Warning: { icon: Info, style: 'text-yellow-500' },
  Info: { icon: Bell, style: 'text-blue-500' },
};

const badgeStyles: Record<AlertLevel, string> = {
    Critical: 'bg-red-500/20 text-red-500',
    Warning: 'bg-yellow-500/20 text-yellow-500',
    Info: 'bg-blue-500/20 text-blue-500'
}

export function HealthTimeline({ patient }: { patient: Patient }) {
  const sortedAlerts = [...patient.alerts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Timeline</CardTitle>
        <CardDescription>Recent alerts and interventions.</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedAlerts.length > 0 ? (
          <div className="space-y-6">
            {sortedAlerts.map((alert, index) => {
              const MetaIcon = alertMeta[alert.level].icon;
              return (
                <div key={alert.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full bg-muted',
                        alertMeta[alert.level].style.replace('text-', 'bg-') + '/20'
                      )}
                    >
                      <MetaIcon
                        className={cn('h-4 w-4', alertMeta[alert.level].style)}
                      />
                    </div>
                    {index < sortedAlerts.length - 1 && (
                      <div className="w-px flex-1 bg-border my-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{alert.message}</p>
                       <Badge className={cn('text-xs whitespace-nowrap', badgeStyles[alert.level])}>
                        {alert.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Bell className="mx-auto h-8 w-8 mb-2" />
            <p>No recent alerts for this patient.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
