import { getPatientById } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { PatientDetails } from './components/patient-details';
import { VitalsChart } from './components/vitals-chart';
import { AIAnalysis } from './components/ai-analysis';
import { HealthTimeline } from './components/health-timeline';

export default function PatientPage({ params }: { params: { id: string } }) {
  const patient = getPatientById(params.id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title={patient.name} />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <PatientDetails patient={patient} />
            <VitalsChart patient={patient} />
            <AIAnalysis patient={patient} />
          </div>
          <div className="lg:col-span-1">
            <HealthTimeline patient={patient} />
          </div>
        </div>
      </main>
    </div>
  );
}
