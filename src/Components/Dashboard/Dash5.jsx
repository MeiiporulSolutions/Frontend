import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const AdmissionChart = () => {
  const data = {
    admissionsDischargesTrend: [
      {
        date: "2023-09-20", // Corrected date format
        admissions: 10,
        discharges: 0,
      },
      {
        date: "2023-09-29", // Corrected date format
        admissions: 1,
        discharges: 0,
      },
      {
        date: "2023-10-05", // Corrected date format
        admissions: 23,
        discharges: 0,
      },
      {
        date: "2023-09-01", // Corrected date format
        admissions: 0,
        discharges: 3,
      },
    ],
  };

  const chartData = [
    {
      id: 'admissions',
      data: data.admissionsDischargesTrend.map(entry => ({
        x: entry.date,
        y: entry.admissions,
      })),
    },
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        colors={{ scheme: 'category10' }}
        enablePoints={false}
        enableGridX={false}
        enableGridY={true}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default AdmissionChart;
