'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing patient health data to identify trends and predict potential health risks.
 *
 * - analyzePatientTrends - A function that initiates the patient trend analysis flow.
 * - AnalyzePatientTrendsInput - The input type for the analyzePatientTrends function.
 * - AnalyzePatientTrendsOutput - The return type for the analyzePatientTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePatientTrendsInputSchema = z.object({
  patientId: z.string().describe('The unique identifier for the patient.'),
  healthData: z.string().describe('A JSON string containing the patient health data, including vital signs, activity levels, and sleep patterns.'),
});
export type AnalyzePatientTrendsInput = z.infer<typeof AnalyzePatientTrendsInputSchema>;

const AnalyzePatientTrendsOutputSchema = z.object({
  trends: z.string().describe('A summary of the identified trends in the patient health data.'),
  potentialRisks: z.string().describe('A prediction of potential health risks based on the identified trends.'),
  recommendations: z.string().describe('Personalized recommendations for the patient based on the analysis.'),
});
export type AnalyzePatientTrendsOutput = z.infer<typeof AnalyzePatientTrendsOutputSchema>;

export async function analyzePatientTrends(input: AnalyzePatientTrendsInput): Promise<AnalyzePatientTrendsOutput> {
  return analyzePatientTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePatientTrendsPrompt',
  input: {schema: AnalyzePatientTrendsInputSchema},
  output: {schema: AnalyzePatientTrendsOutputSchema},
  prompt: `You are an AI assistant that analyzes patient health data to identify trends and predict potential health risks.

  Analyze the following patient health data for trends and potential risks, and provide personalized recommendations. Structure the data as a JSON object with fields "trends", "potentialRisks", and "recommendations".

  Patient ID: {{{patientId}}}
  Health Data: {{{healthData}}}
  `,
});

const analyzePatientTrendsFlow = ai.defineFlow(
  {
    name: 'analyzePatientTrendsFlow',
    inputSchema: AnalyzePatientTrendsInputSchema,
    outputSchema: AnalyzePatientTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
