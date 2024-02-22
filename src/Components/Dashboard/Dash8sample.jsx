import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { ResponsiveLine } from "@nivo/line";

const initialData = {
  bedTurnaroundTime: [
    {
      ward: "Ward A",
      bedNumber: "bed_1",
      admissiondate: "2023-09-25",
      turnaroundTime: 30,
    },
    {
        ward: "Ward A",
        bedNumber: "bed_3",
        admissiondate: "2023-09-29",
        turnaroundTime: 120,
      },
      {
        ward: "Ward A",
        bedNumber: "bed_3",
        admissiondate: "2023-09-27",
        turnaroundTime: 180,
      },
  ],
};

export const Trend = () => {
  // Step 1: Create a state variable to store the data
  const [data] = useState(initialData.bedTurnaroundTime); // Removed unused 'setData'

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
        <div
          style={{
            background: "#ffff",
            padding: "10px",
            height: "50px",
            marginBottom: "10px",
            width: "105%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "-5%",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            style={{ color: "#61AFF7", fontWeight: "bold", marginTop: "15px" }}
          >
            Good Care Hospital
          </Typography>
          <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} />
        </div>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Your Heat Map Heading
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                height: "500px",
                width: "1000px",
                background: "#ffff",
                borderRadius: "30px",
                boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ResponsiveLine
                data={[
                  {
                    id: "turnaroundTime",
                    color: "hsl(49, 70%, 50%)",
                    data: data.map((item) => ({
                      x: item.admissiondate,
                      y: item.turnaroundTime,
                    })),
                  },
                ]}
               
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "time", format: "%Y-%m-%d" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  format: "%Y-%m-%d",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: "Admission Date",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Turnaround Time",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Trend;
