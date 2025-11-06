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

export interface DetailedReport {
  id: number;
  name: string;
  date: string;
  type: 'Weekly Summary' | 'BP Report' | 'Glucose Report' | 'Activity Log';
  summary: string;
  vitals: { name: string; value: string; status: 'Normal' | 'High' | 'Low' }[];
  recommendations: string[];
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


export const generateDetailedReports = (): DetailedReport[] => {
  return [
    {
      id: 1,
      name: 'Weekly Health Summary',
      date: 'Oct 25, 2025',
      type: 'Weekly Summary',
      summary: 'Overall, this week showed a slight upward trend in blood pressure and blood sugar. Activity levels were inconsistent. Increased focus on diet and consistent light exercise is recommended.',
      vitals: [
        { name: 'Avg. Blood Pressure', value: '142/91 mmHg', status: 'High' },
        { name: 'Avg. Blood Sugar', value: '155 mg/dL', status: 'High' },
        { name: 'Avg. Heart Rate', value: '78 bpm', status: 'Normal' },
        { name: 'Avg. Daily Steps', value: '3,200', status: 'Low' },
      ],
      recommendations: [
        'Aim for at least 30 minutes of walking, 5 days a week.',
        'Reduce sodium intake by avoiding processed foods.',
        'Monitor blood sugar levels before and after meals.',
        'Ensure consistent medication adherence.'
      ]
    },
    {
      id: 2,
      name: 'Blood Pressure Trend Report',
      date: 'Oct 24, 2025',
      type: 'BP Report',
      summary: 'Systolic blood pressure has been consistently above the target of 130 mmHg for the past 5 days. Diastolic pressure remains borderline high. This pattern suggests a need for intervention.',
      vitals: [
        { name: 'Highest BP', value: '148/95 mmHg', status: 'High' },
        { name: 'Lowest BP', value: '135/88 mmHg', status: 'High' },
        { name: 'Weekly Average', value: '142/91 mmHg', status: 'High' },
      ],
      recommendations: [
        'Consult your doctor about a potential medication adjustment.',
        'Practice deep-breathing exercises for 10 minutes daily.',
        'Strictly limit salt intake to less than 2,300 mg per day.'
      ]
    },
    {
        id: 3,
        name: 'Monthly Activity Log',
        date: 'Oct 1, 2025',
        type: 'Activity Log',
        summary: 'Activity levels were highest on weekends but dropped significantly during weekdays. The average daily step count of 4,100 is below the recommended 7,000 for managing your condition.',
        vitals: [
            { name: 'Avg. Daily Steps', value: '4,100', status: 'Low' },
            { name: 'Most Active Day', value: '8,900 steps (Sat)', status: 'Normal' },
            { name: 'Least Active Day', value: '1,200 steps (Wed)', status: 'Low' },
        ],
        recommendations: [
            'Incorporate short 10-minute walks during work breaks.',
            'Find an enjoyable activity like cycling or swimming.',
            'Set a daily step goal and track your progress.'
        ]
    },
  ];
};
