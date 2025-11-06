import { PlaceHolderImages } from './placeholder-images';

export type PatientStatus = 'Stable' | 'At Risk' | 'Critical';
export type AlertLevel = 'Info' | 'Warning' | 'Critical';

export interface VitalHistory {
  date: string;
  value: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  status: PatientStatus;
  avatar: string;
  vitals: {
    heartRate: number;
    spO2: number;
    temperature: number;
  };
  history: {
    heartRate: VitalHistory[];
    spO2: VitalHistory[];
    temperature: VitalHistory[];
  };
  alerts: {
    id: string;
    level: AlertLevel;
    message: string;
    timestamp: string;
  }[];
  healthDataJson: string;
}

function generateVitalHistory(
  days: number,
  min: number,
  max: number
): VitalHistory[] {
  const history: VitalHistory[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    });
  }
  return history;
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 68,
    gender: 'Male',
    condition: 'Chronic Heart Failure',
    status: 'At Risk',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-1')?.imageUrl || '',
    vitals: {
      heartRate: 95,
      spO2: 93,
      temperature: 37.1,
    },
    history: {
      heartRate: generateVitalHistory(30, 80, 110),
      spO2: generateVitalHistory(30, 92, 96),
      temperature: generateVitalHistory(30, 36.5, 37.5),
    },
    alerts: [
      {
        id: 'a1',
        level: 'Warning',
        message: 'Heart rate elevated over the last 2 hours.',
        timestamp: '2023-10-27T10:00:00Z',
      },
      {
        id: 'a2',
        level: 'Info',
        message: 'Patient missed scheduled activity goal.',
        timestamp: '2023-10-26T18:00:00Z',
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 72,
    gender: 'Female',
    condition: 'COPD',
    status: 'Stable',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-2')?.imageUrl || '',
    vitals: {
      heartRate: 76,
      spO2: 96,
      temperature: 36.8,
    },
    history: {
      heartRate: generateVitalHistory(30, 70, 85),
      spO2: generateVitalHistory(30, 95, 99),
      temperature: generateVitalHistory(30, 36.5, 37.2),
    },
    alerts: [
      {
        id: 'b1',
        level: 'Info',
        message: 'All vitals stable for the past 24 hours.',
        timestamp: '2023-10-27T11:00:00Z',
      },
    ],
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 55,
    gender: 'Male',
    condition: 'Type 2 Diabetes',
    status: 'Stable',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-3')?.imageUrl || '',
    vitals: {
      heartRate: 80,
      spO2: 98,
      temperature: 37.0,
    },
    history: {
      heartRate: generateVitalHistory(30, 75, 90),
      spO2: generateVitalHistory(30, 97, 100),
      temperature: generateVitalHistory(30, 36.6, 37.3),
    },
    alerts: [],
  },
  {
    id: '4',
    name: 'Emily White',
    age: 78,
    gender: 'Female',
    condition: 'Hypertension',
    status: 'Critical',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-4')?.imageUrl || '',
    vitals: {
      heartRate: 110,
      spO2: 91,
      temperature: 36.9,
    },
    history: {
      heartRate: generateVitalHistory(30, 90, 115),
      spO2: generateVitalHistory(30, 90, 95),
      temperature: generateVitalHistory(30, 36.5, 37.5),
    },
    alerts: [
      {
        id: 'c1',
        level: 'Critical',
        message: 'Sustained low SpO2 detected. Immediate attention required.',
        timestamp: '2023-10-27T11:30:00Z',
      },
      {
        id: 'c2',
        level: 'Warning',
        message: 'Blood pressure readings consistently high.',
        timestamp: '2023-10-27T08:00:00Z',
      },
    ],
  },
   {
    id: '5',
    name: 'Maria Garcia',
    age: 65,
    gender: 'Female',
    condition: 'Asthma',
    status: 'Stable',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-5')?.imageUrl || '',
    vitals: {
      heartRate: 82,
      spO2: 97,
      temperature: 36.7,
    },
    history: {
      heartRate: generateVitalHistory(30, 70, 85),
      spO2: generateVitalHistory(30, 96, 99),
      temperature: generateVitalHistory(30, 36.4, 37.1),
    },
    alerts: [
        {
        id: 'd1',
        level: 'Info',
        message: 'Medication reminder sent.',
        timestamp: '2023-10-27T09:00:00Z',
      },
    ],
  },
   {
    id: '6',
    name: 'David Chen',
    age: 70,
    gender: 'Male',
    condition: 'Kidney Disease',
    status: 'At Risk',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-6')?.imageUrl || '',
    vitals: {
      heartRate: 88,
      spO2: 94,
      temperature: 37.2,
    },
    history: {
      heartRate: generateVitalHistory(30, 80, 95),
      spO2: generateVitalHistory(30, 93, 97),
      temperature: generateVitalHistory(30, 36.8, 37.5),
    },
    alerts: [
      {
        id: 'e1',
        level: 'Warning',
        message: 'Irregular sleep pattern detected last night.',
        timestamp: '2023-10-27T07:00:00Z',
      },
    ],
  },
].map(p => ({
  ...p,
  healthDataJson: JSON.stringify({
    vitals: p.vitals,
    recentHistory: {
      heartRate: p.history.heartRate.slice(-7),
      spO2: p.history.spO2.slice(-7),
      temperature: p.history.temperature.slice(-7),
    },
    activity: {
      steps: Math.floor(Math.random() * 5000) + 1000,
      sleepHours: Math.random() * (8 - 4) + 4,
    }
  }, null, 2),
}));


export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export const getCriticalAlerts = () => {
  return patients
    .flatMap(p => p.alerts.map(a => ({...a, patientName: p.name, patientId: p.id})))
    .filter(a => a.level === 'Critical' || a.level === 'Warning')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
