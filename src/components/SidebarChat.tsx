import { useState, useEffect } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Axios from "@/utils";
import { Category } from "@/types";

type Confiq = {
  [key: string]: {
    label: string;
    color: string;
  };
};

type ChartData = {
  categoryName: string;
  count: number;
};

const Chart = () => {
  const [chartData, setChartData] = useState<
    { browser: string; visitors: number; fill: string }[]
  >([]);
  const [chartConfig, setChartConfig] = useState<Confiq>({});

  const defaultColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  function createChartConfig(categories: string[]) {
    return categories.reduce((config, category, index) => {
      config[category.toLowerCase()] = {
        label: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize first letter
        color: defaultColors[index % defaultColors.length],
      };
      return config;
    }, {} as Confiq);
  }
  function transformData(apiData: ChartData[]) {
    return apiData.map((item) => ({
      browser: item.categoryName.toLowerCase(), // Normalize category name
      visitors: item.count,
      fill: defaultColors[apiData.indexOf(item) % defaultColors.length],
    }));
  }
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await Axios.get("course/courseCount");
        console.log(response.data.data);
        const categories = response.data.data.map(
          (item: Category) => item.categoryName
        );
        const chartConfig = createChartConfig(categories);
        setChartConfig(chartConfig);
        setChartData(transformData(response.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCount();
  }, []);

  console.log(chartData);

  return (
    <Card className="flex flex-col w-full shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Course Count</CardTitle>
        <CardDescription>Course count by category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value].label.substring(0, 10)
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default Chart;
