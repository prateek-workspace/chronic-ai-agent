'use client';

import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Loader2 } from 'lucide-react';
import type { Patient } from '@/lib/mock-data';
import {
  analyzePatientTrends,
  AnalyzePatientTrendsOutput,
} from '@/ai/flows/analyze-patient-trends';
import {
  generatePersonalizedAdvice,
  PersonalizedAdviceOutput,
} from '@/ai/flows/generate-personalized-advice';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AIAnalysis({ patient }: { patient: Patient }) {
  const [analysis, setAnalysis] = useState<AnalyzePatientTrendsOutput | null>(
    null
  );
  const [advice, setAdvice] = useState<PersonalizedAdviceOutput | null>(null);
  const [isAnalyzing, startAnalysisTransition] = useTransition();
  const [isGeneratingAdvice, startAdviceTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalyze = () => {
    startAnalysisTransition(async () => {
      setAdvice(null);
      try {
        const result = await analyzePatientTrends({
          patientId: patient.id,
          healthData: patient.healthDataJson,
        });
        setAnalysis(result);
        toast({
          title: 'Analysis Complete',
          description: `AI has successfully analyzed ${patient.name}'s data.`,
        });
      } catch (error) {
        console.error('Analysis failed:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not generate AI analysis. Please try again.',
        });
      }
    });
  };

  const handleGenerateAdvice = () => {
    if (!analysis) return;
    startAdviceTransition(async () => {
      try {
        const result = await generatePersonalizedAdvice({
          patientName: patient.name,
          healthData: patient.healthDataJson,
          aiAnalysis: JSON.stringify(analysis, null, 2),
          doctorName: 'Dr. Smith',
        });
        setAdvice(result);
        toast({
          title: 'Advice Generated',
          description: `Personalized advice for ${patient.name} is ready.`,
        });
      } catch (error) {
        console.error('Advice generation failed:', error);
        toast({
          variant: 'destructive',
          title: 'Advice Generation Failed',
          description: 'Could not generate advice. Please try again.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          AI-Powered Insights
        </CardTitle>
        <CardDescription>
          Use generative AI to analyze patient data for trends, risks, and
          personalized advice.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Analyze Trends
          </Button>
          {analysis && !isAnalyzing && (
            <Button
              onClick={handleGenerateAdvice}
              disabled={isGeneratingAdvice}
              variant="secondary"
            >
              {isGeneratingAdvice ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Advice
            </Button>
          )}
        </div>

        {isAnalyzing && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing patient data... This may take a moment.
          </div>
        )}

        {analysis && !isAnalyzing && (
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>AI Trend Analysis</AlertTitle>
            <AlertDescription className="space-y-4 mt-2">
              <div>
                <h4 className="font-semibold">Identified Trends</h4>
                <p>{analysis.trends}</p>
              </div>
              <div>
                <h4 className="font-semibold">Potential Risks</h4>
                <p>{analysis.potentialRisks}</p>
              </div>
              <div>
                <h4 className="font-semibold">Recommendations</h4>
                <p>{analysis.recommendations}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {isGeneratingAdvice && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating personalized advice...
          </div>
        )}

        {advice && !isGeneratingAdvice && (
          <Alert variant="default" className="bg-primary/10">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Personalized Health Advice</AlertTitle>
            <AlertDescription className="mt-2">
              <p>{advice.advice}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
