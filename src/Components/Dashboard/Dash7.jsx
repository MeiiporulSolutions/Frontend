import React from "react";
import { ResponsiveLine } from "@nivo/line";

const data = {
  outcomeData: [
    {
      _id: "6530101dec68bb0c022354eb",
      outcomes: [
        {
          ward: "ward A",
          readmissionRate: "90",
          avgLengthRate: "23",
          mortalityRate: "99",
          date: "30/3/2023",
          _id: "6530101dec68bb0c022354ec"
        }
      ]
    }
  ]
};

const Chart = () => {
  const outcomes = data.outcomeData[0].outcomes;

  const chartData = outcomes.map(outcome => ({
    x: outcome.ward,
    "Mortality Rate": parseFloat(outcome.mortalityRate),
    "Average Length of Stay": parseFloat(outcome.avgLengthRate),
  }));

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={[
          {
            id: "Mortality Rate",
            data: chartData.map(item => ({ x: item.x, y: item["Mortality Rate"] })),
          },
          {
            id: "Average Length of Stay",
            data: chartData.map(item => ({ x: item.x, y: item["Average Length of Stay"] })),
          }
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Ward",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Value",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointBorderWidth={2}
        pointBorderColor={{ from: "color" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x" // This enables x-axis tooltips
        sliceTooltip={({ slice }) => (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              <strong>{slice.points[0].serieId}: </strong>
              {slice.points[0].data.yFormatted}
            </div>
            <div>
              <strong>{slice.points[1].serieId}: </strong>
              {slice.points[1].data.yFormatted}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Chart;
