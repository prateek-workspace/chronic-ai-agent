'use server';

/**
 * @fileOverview AI-driven health advice generation for personalized patient care.
 *
 * - generatePersonalizedAdvice - Generates tailored health advice based on patient data.
 * - PersonalizedAdviceInput - The input type for the generatePersonalizedAdvice function.
 * - PersonalizedAdviceOutput - The return type for the generatePersonalizedAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAdviceInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  healthData: z.string().describe('The patient health data including vital signs, activity, and sleep patterns.'),
  aiAnalysis: z.string().describe('The AI analysis of the patient health data, including trends and potential risks.'),
  doctorName: z.string().describe('The name of the doctor requesting the advice.'),
});
export type PersonalizedAdviceInput = z.infer<typeof PersonalizedAdviceInputSchema>;

const PersonalizedAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized health advice for the patient.'),
});
export type PersonalizedAdviceOutput = z.infer<typeof PersonalizedAdviceOutputSchema>;

export async function generatePersonalizedAdvice(input: PersonalizedAdviceInput): Promise<PersonalizedAdviceOutput> {
  return generatePersonalizedAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAdvicePrompt',
  input: {schema: PersonalizedAdviceInputSchema},
  output: {schema: PersonalizedAdviceOutputSchema},
  prompt: `You are an AI assistant helping doctors provide personalized health advice to their patients.

You will receive patient health data, AI analysis, and the doctor's name. Your task is to generate personalized health advice for the patient.

Patient Name: {{{patientName}}}
Health Data: {{{healthData}}}
AI Analysis: {{{aiAnalysis}}}
Doctor Name: {{{doctorName}}}

Based on the information above, generate personalized health advice for the patient.
`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generatePersonalizedAdviceFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedAdviceFlow',
    inputSchema: PersonalizedAdviceInputSchema,
    outputSchema: PersonalizedAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
