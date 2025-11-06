import {
  getPatients,
  getCriticalAlerts,
  Patient,
  PatientStatus,
} from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DashboardHeader } from '@/components/dashboard-header';
import Link from 'next/link';
import {
  Heart,
  Thermometer,
  Wind,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const statusStyles: Record<PatientStatus, string> = {
  Stable: 'bg-accent text-accent-foreground',
  'At Risk': 'bg-yellow-500/20 text-yellow-500',
  Critical: 'bg-red-500/20 text-red-500',
};

function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card
      className="flex flex-col hover:shadow-lg transition-shadow duration-300"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback>
                {patient.name.charAt(0)}
                {patient.name.split(' ')[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{patient.name}</CardTitle>
              <CardDescription>
                {patient.age}, {patient.condition}
              </CardDescription>
            </div>
          </div>
          <Badge className={cn('text-xs', statusStyles[patient.status])}>
            {patient.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-lg font-bold">
              {patient.vitals.heartRate}
            </span>
            <span className="text-xs text-muted-foreground">BPM</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-bold">{patient.vitals.spO2}</span>
            <span className="text-xs text-muted-foreground">% SpO2</span>
          </div>
          <div className="flex flex-col items-center">
            <Thermometer className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-bold">
              {patient.vitals.temperature}
            </span>
            <span className="text-xs text-muted-foreground">°C</span>
          </div>
        </div>
      </CardContent>
      <Link
        href={`/dashboard/patients/${patient.id}`}
        className="block mt-auto"
      >
        <Button variant="ghost" className="w-full justify-center gap-2">
          View Details <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </Card>
  );
}

export default function DashboardPage() {
  const patients = getPatients();
  const alerts = getCriticalAlerts();

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Patient Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">All Patients</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Critical Alert Feed</h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Alert</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id} className="hover:bg-muted/50 cursor-pointer">
                      <TableCell>
                        <Link href={`/dashboard/patients/${alert.patientId}`} className="font-medium hover:underline">
                          {alert.patientName}
                        </Link>
                      </TableCell>
                      <TableCell className="flex items-start gap-2">
                        <AlertTriangle
                          className={cn('w-4 h-4 mt-0.5', {
                            'text-red-500': alert.level === 'Critical',
                            'text-yellow-500': alert.level === 'Warning',
                          })}
                        />
                        <div className="flex flex-col">
                           <span className="font-semibold">{alert.level}</span>
                           <span className="text-sm text-muted-foreground">{alert.message}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
