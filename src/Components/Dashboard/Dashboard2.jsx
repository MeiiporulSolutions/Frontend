import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { ResponsiveLine } from "@nivo/line";

export const Dashboard2 = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const apiUrl = "http://localhost:9000/bedturnaroundtime";
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
          setData(result.bedTurnaroundTime);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
    return (
     
        
            <Grid item xs={6}>
              <div
                style={{
                  height: "53vh",
                width: "660px",
                  background: "#ffff",
                  borderRadius: "30px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                  marginLeft:"700px",
                  marginTop:"-640px",
                }}
              >
                <ResponsiveLine
                  data={[
                    {
                      id: "turnaroundTime",
                      color: "hsl(49, 70%, 50%)",
                      data: data.map((item) => ({
                        x: item.date,
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
          
    );
  };
  
  export default Dashboard2;
