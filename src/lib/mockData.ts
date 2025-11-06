import { faker } from '@faker-js/faker';

// --- Types ---
export interface Vital {
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export interface Activity {
  id: string;
  description: string;
  time: string;
  icon: 'log' | 'walk' | 'medication';
}

export interface BloodPressureChartData {
  dates: string[];
  systolic: number[];
  diastolic: number[];
}

export interface SingleValueChartData {
  dates: string[];
  values: number[];
}


// --- Data Generators ---

export const generateVitals = (): Vital[] => {
  return [
    {
      name: 'Blood Pressure',
      value: `${faker.number.int({ min: 125, max: 145 })}/${faker.number.int({ min: 80, max: 95 })}`,
      unit: 'mmHg',
      trend: faker.helpers.arrayElement(['up', 'stable']),
      change: `+${faker.number.int({ min: 2, max: 8 })}% from last week`,
    },
    {
      name: 'Heart Rate',
      value: faker.number.int({ min: 70, max: 85 }).toString(),
      unit: 'bpm',
      trend: 'stable',
      change: 'within normal range',
    },
    {
      name: 'Blood Sugar',
      value: faker.number.int({ min: 130, max: 160 }).toString(),
      unit: 'mg/dL',
      trend: faker.helpers.arrayElement(['up', 'down']),
      change: `${faker.helpers.arrayElement(['+','-'])}${faker.number.int({ min: 5, max: 12 })}% from last week`,
    },
    {
      name: 'Steps',
      value: faker.number.int({ min: 2500, max: 4500 }).toString(),
      unit: 'today',
      trend: 'down',
      change: `-${faker.number.int({ min: 10, max: 20 })}% from yesterday`,
    },
  ];
};

export const getAIAssistantSuggestion = (): { title: string; suggestion: string } => {
    return {
        title: "Your BP is trending high.",
        suggestion: "Your blood pressure has been slightly elevated for the past 3 days. Try to reduce your salt intake today and aim for a 20-minute walk after dinner. Keep monitoring!"
    }
};

export const generateRecentActivities = (): Activity[] => {
  return [
    {
      id: faker.string.uuid(),
      description: 'Logged Blood Sugar: 152 mg/dL',
      time: '10 minutes ago',
      icon: 'log',
    },
    {
      id: faker.string.uuid(),
      description: 'Completed a 20-minute walk',
      time: '2 hours ago',
      icon: 'walk',
    },
    {
      id: faker.string.uuid(),
      description: 'Took Metformin 500mg',
      time: '4 hours ago',
      icon: 'medication',
    },
     {
      id: faker.string.uuid(),
      description: 'Logged Blood Pressure: 142/90 mmHg',
      time: '5 hours ago',
      icon: 'log',
    },
  ];
};

const generateDates = (): string[] => {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
}

export const generateBloodPressureChartData = (): BloodPressureChartData => {
  const dates = generateDates();
  const systolic = Array.from({ length: 7 }, () => faker.number.int({ min: 125, max: 145 }));
  const diastolic = Array.from({ length: 7 }, () => faker.number.int({ min: 80, max: 95 }));
  return { dates, systolic, diastolic };
};

export const generateSugarChartData = (): SingleValueChartData => {
    const dates = generateDates();
    const values = Array.from({ length: 7 }, () => faker.number.int({ min: 130, max: 180 }));
    return { dates, values };
}

export const generateStepsChartData = (): SingleValueChartData => {
    const dates = generateDates();
    const values = Array.from({ length: 7 }, () => faker.number.int({ min: 2000, max: 8000 }));
    return { dates, values };
}

export const generateHeartRateChartData = (): SingleValueChartData => {
    const dates = generateDates();
    const values = Array.from({ length: 7 }, () => faker.number.int({ min: 65, max: 90 }));
    return { dates, values };
}
