import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  // Sample data - in a real app this would come from your API
  const sampleData = [
    {id: 1, year: '2025', month: 'June', opening: '1000', closing: '1300'},
    {id: 2, year: '2025', month: 'July', opening: '1300', closing: '1600'}
    // Add more months as needed
  ];

  useEffect(() => {
    const dashboardInfo = async () => {
      const token = Cookies.get("token");
      try {
        const response = await axios.get("http://localhost:4000/investor/performance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Use API data if available, otherwise fall back to sample data
        setPerformanceData(response.data.data || sampleData);
      } catch (error) {
        console.error(error);
        // Fall back to sample data if API fails
        setPerformanceData(sampleData);
      }
    };

    dashboardInfo();
  }, []);

  // Transform the data for the chart
  const transformData = (data) => {
    return {
      labels: data.map(item => `${item.month} ${item.year}`),
      fundOpenValues: data.map(item => parseFloat(item.opening)),
      fundCloseValues: data.map(item => parseFloat(item.closing)),
      //previousYearClose: 950 // You might want to calculate this from actual data
    };
  };

  const chartData = transformData(performanceData);

  // Calculate performance metrics
  const calculatePerformance = (startValue, endValue) => {
    return (((endValue - startValue) / startValue) * 100).toFixed(2);
  };

  // Performance calculations
  const ytdReturn = chartData.fundOpenValues.length > 0 ? 
    calculatePerformance(
      chartData.fundOpenValues[0],
      chartData.fundCloseValues[chartData.fundCloseValues.length - 1]
    ) : '0.00';
  
  // const yearlyReturn = chartData.fundCloseValues.length > 0 ?
  //   calculatePerformance(
  //     chartData.previousYearClose,
  //     chartData.fundCloseValues[chartData.fundCloseValues.length - 1]
  //   ) : '0.00';
  
  const monthlyReturns = chartData.fundOpenValues.map((open, index) => {
    return calculatePerformance(open, chartData.fundCloseValues[index]);
  });

  // Generate colors based on price movement
  const getBarColor = (open, close) => {
    return close >= open
      ? "rgba(16, 185, 129, 0.7)" // green for rise
      : "rgba(239, 68, 68, 0.7)"; // red for fall
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Opening Price",
        data: chartData.fundOpenValues,
        backgroundColor: "rgba(148, 163, 184, 0.7)",
        borderColor: "rgba(148, 163, 184, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
      {
        label: "Closing Price",
        data: chartData.fundCloseValues,
        backgroundColor: chartData.fundOpenValues.map((open, i) =>
          getBarColor(open, chartData.fundCloseValues[i])
        ),
        borderColor: chartData.fundOpenValues.map((open, i) =>
          getBarColor(open, chartData.fundCloseValues[i]).replace("0.7", "1")
        ),
        borderWidth: 1,
        barThickness: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += "$" + context.parsed.y.toLocaleString();
            }
            return label;
          },
          afterLabel: function (context) {
            if (context.datasetIndex === 1) {
              const index = context.dataIndex;
              const change = monthlyReturns[index];
              return `Monthly change: ${change}%`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        stacked: false,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        stacked: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg shadow">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Fund Performance ({currentYear})
        </h3>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-xs text-slate-500">Monthly</p>
            <p
              className={`text-lg font-bold ${
                monthlyReturns.length > 0 && parseFloat(monthlyReturns[monthlyReturns.length - 1]) >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {monthlyReturns.length > 0 ? monthlyReturns[monthlyReturns.length - 1] : '0.00'}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500">YTD</p>
            <p
              className={`text-lg font-bold ${
                parseFloat(ytdReturn) >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {ytdReturn}%
            </p>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-80">
        {performanceData.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Loading performance data...</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-[20px]">
        <div className="bg-slate-50 p-4 sm:p-6 rounded-lg ">
          <h3 className="font-medium mb-3 sm:mb-4">Risk Metrics</h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                name: "Sharpe Ratio",
                value: "0.00",
              },
              {
                name: "Max Drawdown",
                value: "0.00%",
              },
              { name: "Volatility", value: "0.00", },
              { name: "Alpha", value: "0.00", },
              { name: "Beta", value: "0.00",},
            ].map((metric, i) => (
              <div
                key={i}
                className="flex justify-between items-center pb-3 sm:pb-4 border-b border-slate-200 last:border-0 w-[1300px]"
              >
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {metric.name}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Benchmark: {metric.benchmark}
                  </p>
                </div>
                <p
                  className={`text-base sm:text-lg font-mono ${
                    metric.name === "Max Drawdown" ||
                    metric.value.startsWith("-")
                      ? "text-rose-600"
                      : "text-emerald-600"
                  }`}
                >
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;