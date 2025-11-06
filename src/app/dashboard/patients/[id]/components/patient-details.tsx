import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Patient } from '@/lib/mock-data';
import { Heart, Wind, Thermometer, User, Cake } from 'lucide-react';

export function PatientDetails({ patient }: { patient: Patient }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback>
              {patient.name.charAt(0)}
              {patient.name.split(' ')[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{patient.name}</CardTitle>
            <CardDescription>{patient.condition}</CardDescription>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Cake className="w-4 h-4" />
                <span>{patient.age} years old</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{patient.gender}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Current Vitals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border rounded-lg p-4">
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Heart className="w-6 h-6 text-red-500" />
            <span className="text-2xl font-bold mt-1">
              {patient.vitals.heartRate}
            </span>
            <span className="text-sm text-muted-foreground">BPM</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Wind className="w-6 h-6 text-blue-500" />
            <span className="text-2xl font-bold mt-1">
              {patient.vitals.spO2}
            </span>
            <span className="text-sm text-muted-foreground">% SpO2</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
            <Thermometer className="w-6 h-6 text-orange-500" />
            <span className="text-2xl font-bold mt-1">
              {patient.vitals.temperature}
            </span>
            <span className="text-sm text-muted-foreground">°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
