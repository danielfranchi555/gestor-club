'use client';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';

export const description = 'A bar chart with a label';

const chartConfig = {
  desktop: {
    label: 'reservations',
    color: 'hsl(var(--chart-1))',
  },
};

export function Metrics() {
  const supabase = createSupabaseFrontendClient();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Función para obtener datos de reservas por mes
    const fetchReservations = async () => {
      const { data, error } = await supabase.rpc('get_reservations_by_month');

      if (error) {
        console.error('Error fetching reservations:', error);
      } else {
        // Mapear los datos para ajustarlos al formato necesario por Recharts
        const formattedData = data.map((item) => ({
          month: item.month.trim(), // Remover espacios innecesarios
          reservations: item.reservations,
        }));
        setChartData(formattedData);
      }
    };

    fetchReservations();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>Reservas mensuales</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData} // Usar los datos dinámicos
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="reservations" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total reservations for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
