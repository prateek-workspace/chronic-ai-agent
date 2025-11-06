import { faker } from '@faker-js/faker';
import { 
  BloodPressureChartData, 
  SingleValueChartData, 
  generateBloodPressureChartData, 
  generateSugarChartData, 
  generateStepsChartData, 
  generateHeartRateChartData 
} from './mockData';

export type PatientStatus = 'normal' | 'attention' | 'alert';

export interface MockPatient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  sex: 'Male' | 'Female';
  status: PatientStatus;
  lastUpdate: string;
  vitals: {
    bp: string;
    hr: string;
    sugar: string;
    steps: string;
  };
  aiSuggestion: string;
  medicalHistory: string;
  medications: string;
  charts: {
    bp: BloodPressureChartData;
    sugar: SingleValueChartData;
    steps: SingleValueChartData;
    hr: SingleValueChartData;
  };
}

const generateMockPatient = (): MockPatient => {
  const status = faker.helpers.arrayElement<PatientStatus>(['normal', 'attention', 'alert']);
  let bpValue, sugarValue, stepsValue;

  switch (status) {
    case 'alert':
      bpValue = `${faker.number.int({ min: 150, max: 170 })}/${faker.number.int({ min: 95, max: 105 })}`;
      sugarValue = faker.number.int({ min: 180, max: 250 });
      stepsValue = faker.number.int({ min: 500, max: 2000 });
      break;
    case 'attention':
      bpValue = `${faker.number.int({ min: 135, max: 149 })}/${faker.number.int({ min: 85, max: 94 })}`;
      sugarValue = faker.number.int({ min: 140, max: 179 });
      stepsValue = faker.number.int({ min: 2000, max: 4000 });
      break;
    default: // normal
      bpValue = `${faker.number.int({ min: 110, max: 125 })}/${faker.number.int({ min: 70, max: 80 })}`;
      sugarValue = faker.number.int({ min: 90, max: 120 });
      stepsValue = faker.number.int({ min: 6000, max: 10000 });
      break;
  }

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    age: faker.number.int({ min: 45, max: 75 }),
    sex: faker.helpers.arrayElement(['Male', 'Female']),
    status,
    lastUpdate: faker.helpers.arrayElement(['5m ago', '1h ago', '3h ago']),
    vitals: {
      bp: bpValue,
      hr: faker.number.int({ min: 60, max: 90 }).toString(),
      sugar: sugarValue.toString(),
      steps: stepsValue.toString(),
    },
    aiSuggestion: status === 'alert' 
      ? 'BP high for 3 days — advised doctor consultation.' 
      : status === 'attention' 
      ? 'Walk 20 min after dinner, drink more water.'
      : 'Perfect! Maintain this routine.',
    medicalHistory: `Diagnosed with ${faker.helpers.arrayElement(['Type-2 Diabetes', 'Hypertension', 'Hyperlipidemia'])} ${faker.number.int({ min: 2, max: 10 })} years ago.`,
    medications: `${faker.commerce.productName()} 500mg, ${faker.commerce.productName()} 10mg`,
    charts: {
      bp: generateBloodPressureChartData(),
      sugar: generateSugarChartData(),
      steps: generateStepsChartData(),
      hr: generateHeartRateChartData(),
    }
  };
};

export const mockPatientList: MockPatient[] = Array.from({ length: 8 }, generateMockPatient);
