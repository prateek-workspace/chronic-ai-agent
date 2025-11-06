import { format } from 'date-fns';

// --- Input Data Structure ---
export interface HealthData {
  vitals?: Array<{
    date: string;
    type: 'blood_pressure' | 'blood_sugar' | 'heart_rate' | 'steps';
    value: { systolic: number; diastolic: number } | number;
    unit: string;
  }>;
  activity?: {
    date: string;
    steps: number;
    calories_burned: number;
  };
  sleep?: {
    date: string;
    duration_hours: number;
    quality: string;
  };
  medications?: Array<{
    name: string;
    dosage: string;
    timestamp: string;
    status: 'taken' | 'missed';
  }>;
}

// --- Processed Data Structures for UI ---
export interface VitalCardData {
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export interface ChartData {
  bp: { dates: string[]; systolic: number[]; diastolic: number[] };
  sugar: { dates: string[]; values: number[] };
  steps: { dates: string[]; values: number[] };
  hr: { dates: string[]; values: number[] };
}

export interface ActivityLogItem {
  id: string;
  description: string;
  time: string;
  icon: 'log' | 'walk' | 'medication';
}


// --- Processing Functions ---

/**
 * Calculates the percentage change between two numbers.
 */
const calculatePercentageChange = (current: number, previous: number | undefined): string => {
  if (previous === undefined || previous === 0 || current === previous) {
    return 'No change';
  }
  const change = ((current - previous) / previous) * 100;
  if (Math.abs(change) < 0.1) return 'No change';
  return `${change > 0 ? '+' : ''}${change.toFixed(0)}% from previous`;
};

/**
 * Processes raw vitals data into the format needed for the VitalStatCards.
 */
export const processVitalsForCards = (vitals: HealthData['vitals']): VitalCardData[] => {
  const defaultVitals: VitalCardData[] = [
    { name: 'Blood Pressure', value: '--', unit: 'mmHg', trend: 'stable', change: 'No data' },
    { name: 'Heart Rate', value: '--', unit: 'bpm', trend: 'stable', change: 'No data' },
    { name: 'Blood Sugar', value: '--', unit: 'mg/dL', trend: 'stable', change: 'No data' },
    { name: 'Steps', value: '--', unit: 'today', trend: 'stable', change: 'No data' },
  ];

  if (!vitals || !Array.isArray(vitals)) {
    return defaultVitals;
  }

  const vitalTypes: Array<'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'steps'> = [
    'blood_pressure', 'heart_rate', 'blood_sugar', 'steps'
  ];

  return vitalTypes.map(type => {
    const relevantVitals = vitals
      .filter(v => v.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (relevantVitals.length === 0) {
        const nameMap = {
            'blood_pressure': 'Blood Pressure',
            'heart_rate': 'Heart Rate',
            'blood_sugar': 'Blood Sugar',
            'steps': 'Steps'
        };
      return { name: nameMap[type], value: '--', unit: '', trend: 'stable', change: 'No data' };
    }

    const latest = relevantVitals[0];
    const previous = relevantVitals[1];

    if (type === 'blood_pressure') {
      const latestValue = latest.value as { systolic: number; diastolic: number };
      const previousValue = previous?.value as { systolic: number; diastolic: number } | undefined;
      const change = calculatePercentageChange(latestValue.systolic, previousValue?.systolic);
      
      return {
        name: 'Blood Pressure',
        value: `${latestValue.systolic}/${latestValue.diastolic}`,
        unit: latest.unit,
        trend: change.startsWith('+') ? 'up' : change.startsWith('-') ? 'down' : 'stable',
        change,
      };
    } else {
      const latestValue = latest.value as number;
      const previousValue = previous?.value as number | undefined;
      const change = calculatePercentageChange(latestValue, previousValue);

      let name = '';
      switch(type) {
        case 'heart_rate': name = 'Heart Rate'; break;
        case 'blood_sugar': name = 'Blood Sugar'; break;
        case 'steps': name = 'Steps'; break;
      }

      return {
        name,
        value: latestValue.toString(),
        unit: latest.unit,
        trend: change.startsWith('+') ? 'up' : change.startsWith('-') ? 'down' : 'stable',
        change,
      };
    }
  });
};

/**
 * Processes raw vitals data into the format needed for the VitalsChart.
 */
export const processVitalsForCharts = (vitals: HealthData['vitals']): ChartData => {
  const emptyChartData: ChartData = {
    bp: { dates: [], systolic: [], diastolic: [] },
    sugar: { dates: [], values: [] },
    steps: { dates: [], values: [] },
    hr: { dates: [], values: [] },
  };

  if (!vitals || !Array.isArray(vitals)) {
    return emptyChartData;
  }
  
  const sortedVitals = [...vitals].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const chartData: ChartData = { ...emptyChartData };

  sortedVitals.forEach(v => {
    const dateLabel = format(new Date(v.date), 'MMM d');
    switch (v.type) {
      case 'blood_pressure':
        const bpValue = v.value as { systolic: number; diastolic: number };
        if (!chartData.bp.dates.includes(dateLabel)) chartData.bp.dates.push(dateLabel);
        chartData.bp.systolic.push(bpValue.systolic);
        chartData.bp.diastolic.push(bpValue.diastolic);
        break;
      case 'blood_sugar':
        if (!chartData.sugar.dates.includes(dateLabel)) chartData.sugar.dates.push(dateLabel);
        chartData.sugar.values.push(v.value as number);
        break;
      case 'steps':
         if (!chartData.steps.dates.includes(dateLabel)) chartData.steps.dates.push(dateLabel);
        chartData.steps.values.push(v.value as number);
        break;
      case 'heart_rate':
         if (!chartData.hr.dates.includes(dateLabel)) chartData.hr.dates.push(dateLabel);
        chartData.hr.values.push(v.value as number);
        break;
    }
  });

  return chartData;
};

/**
 * Processes raw health data to generate a list of recent activities.
 */
export const processRecentActivities = (data: HealthData): ActivityLogItem[] => {
    const activities: Array<{ date: Date; description: string; icon: 'log' | 'walk' | 'medication' }> = [];

    if (data.medications && Array.isArray(data.medications)) {
        data.medications.forEach(med => {
            activities.push({
                date: new Date(med.timestamp),
                description: `${med.status === 'taken' ? 'Took' : 'Missed'} ${med.name} ${med.dosage}`,
                icon: 'medication'
            });
        });
    }

    if (data.vitals && Array.isArray(data.vitals)) {
        const latestVitals = [...data.vitals]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 2); // Get the 2 most recent vital logs

        latestVitals.forEach(v => {
            let description = '';
            if (v.type === 'blood_pressure') {
                const val = v.value as { systolic: number, diastolic: number };
                description = `Logged BP: ${val.systolic}/${val.diastolic} ${v.unit}`;
            } else {
                description = `Logged ${v.type.replace('_', ' ')}: ${v.value} ${v.unit}`;
            }
            activities.push({
                date: new Date(v.date),
                description,
                icon: 'log'
            });
        });
    }

    return activities
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 4)
        .map(act => ({
            id: act.date.toISOString(),
            description: act.description,
            time: format(act.date, "MMM d, h:mm a"),
            icon: act.icon
        }));
};
