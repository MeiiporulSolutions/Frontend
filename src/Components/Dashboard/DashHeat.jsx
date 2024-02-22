import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import Grid from "@mui/material/Grid";

const staticData = [
  {
    "id": "Ward A",
    "data": [
      { "x": "8:00 AM", "y": 10 },
      { "x": "10:00 AM", "y": 12 },
      { "x": "11:00 AM", "y": 7 },
    ]
  },
  {
    "id": "Ward B",
    "data": [
      { "x": "8:00 AM", "y": 1 },
      { "x": "10:00 AM", "y": 20 },
      { "x": "11:00 AM", "y": 6 },
    ]
  },
  {
    "id": "Ward C",
    "data": [
      { "x": "8:00 AM", "y": 7 },
      { "x": "10:00 AM", "y": 20 },
      { "x": "11:00 AM", "y": 10 },
    ]
  },
];

const DashHeat = () => {
  return (
    <Grid container style={{ height: '90vh' }}>
      {/* This grid item will contain the heatmap chart */}
      <Grid item xs={12} md={12}>
        <div
          className="chart-container"
          style={{
            height: "53vh",
            width: "660px",
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            marginLeft:"60px",
            marginTop:"50px",
            marginLeft:"20px",
                marginTop:"30px",
          }}
        >
          <ResponsiveHeatMap
            data={staticData}
            margin={{ top: 200, right: 110, bottom: 130, left: 90 }}
            valueFormat=">-.2s"
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -90,
              legend: 'Time',
              legendOffset: 46,
            }}
            axisRight={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Ward',
              legendPosition: 'middle',
              legendOffset: 70,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Ward',
              legendPosition: 'middle',
              legendOffset: -72,
            }}
            axisBottom={{
              tickSize:15,
              tickPadding: 15,
              legend: 'Time', // Legend for the x-axis
              legendPosition: 'middle',
              legendOffset: 56,
            }}
            colors={{
              type: 'diverging',
              scheme: 'red_yellow_blue',
              diverge: 0.5,
            }}
            emptyColor="#555555"
            legends={[
              {
                anchor: 'bottom-right', // Position at the bottom right corner
                direction: 'row', // Display legends in a row
                translateX: 90, // Adjust horizontal position
                translateY: 50, // Adjust vertical position
                itemWidth: 100, // Width of legend items
                itemHeight: 20, // Height of legend items
                itemsSpacing: 10, // Spacing between legend items
                itemTextColor: '#000000', // Color of legend text
                symbolSize: 20, // Size of legend symbols
                symbolShape: 'rect', // Shape of legend symbols
                legend: [
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemTextColor: '#000000',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 20,
                    symbolShape: 'square',
                    items: [
                      {
                        label: 'Time', // X-axis legend
                        color: '#000000',
                        legend:'count'
                         // Color of the legend
                      },
                    ],
                  },
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 30,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemTextColor: '#000000',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 20,
                    symbolShape: 'square',
                    items: [
                      {
                        label: 'Ward', // Y-axis legend
                        color: '#000000',
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default DashHeat;
