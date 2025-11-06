export interface DetailedReport {
  name: string;
  date: string;
  type: 'Comprehensive Analysis';
  summary: string;
  vitals: { name: string; value: string; status: 'Normal' | 'High' | 'Low' | 'Attention' }[];
  recommendations: string[];
}
