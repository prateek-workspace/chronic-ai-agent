'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Patient } from '@/lib/mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const chartConfig = {
  value: {
    label: 'Value',
  },
  heartRate: {
    label: 'Heart Rate',
    color: 'hsl(var(--chart-1))',
  },
  spO2: {
    label: 'SpO2',
    color: 'hsl(var(--chart-2))',
  },
  temperature: {
    label: 'Temperature',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

type ChartData = {
  date: string;
  value: number;
}

const renderChart = (data: ChartData[], dataKey: keyof typeof chartConfig, yDomain: [number, number]) => (
  <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
    <LineChart
      accessibilityLayer
      data={data}
      margin={{
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="date"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }}
      />
       <YAxis
          domain={yDomain}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
      <Tooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
      />
      <Line
        dataKey="value"
        type="monotone"
        stroke={`var(--color-${dataKey})`}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ChartContainer>
);

export function VitalsChart({ patient }: { patient: Patient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vitals History</CardTitle>
        <CardDescription>
          Last 30 days of patient vital signs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="heartRate">
          <TabsList>
            <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
            <TabsTrigger value="spO2">SpO2</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
          </TabsList>
          <TabsContent value="heartRate" className="pt-4">
             {renderChart(patient.history.heartRate, 'heartRate', [60, 120])}
          </TabsContent>
          <TabsContent value="spO2" className="pt-4">
             {renderChart(patient.history.spO2, 'spO2', [90, 100])}
          </TabsContent>
          <TabsContent value="temperature" className="pt-4">
             {renderChart(patient.history.temperature, 'temperature', [36, 39])}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
