import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
const BedOccupancyChart = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/medical-acuity')
      .then((response) => response.json())
      .then((data) => {
        // Replace 0 and 1 with "Ward A" and "Ward B"
        const updatedData = {
          "Ward A": data.patientAcuityBreakdown["0"],
          "Ward B": data.patientAcuityBreakdown["1"]
        };
        setApiData(updatedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = Object.keys(apiData).map((wardName) => ({
    ward: wardName,
    ...apiData[wardName],
  }));

  return (
    // <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
    //   <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
    //     <div
    //       style={{
    //         background: "#ffff",
    //         padding: "10px",
    //         height: "50px",
    //         marginBottom: "10px",
    //         width: "105%",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "space-between",
    //         marginLeft: "-5%",
    //       }}
    //     >
    //       <Typography
    //         variant="h3"
    //         gutterBottom
    //         style={{ color: "#61AFF7", fontWeight: "bold", marginTop: "15px" }}
    //       >
    //         Good Care Hospital
    //       </Typography>
    //       <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} />
    //     </div>
  
    //     {/* Place your heading here */}
    //     <Typography variant="h5" style={{ marginBottom: "20px" }}>
    //       Patient Acuity Dashboard
    //     </Typography>
  
        <Grid container spacing={2}>
          <Grid item xs={6}>
    <div
    style={{
      height: "500px",
      width: "700px",
      background: "#ffff",
      borderRadius: "30px",
      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
      marginLeft:"20px",
    }}
  >
        <ResponsiveBar
          data={chartData}
          keys={["Critical", "Moderate", "Stable"]}
          indexBy="ward" // Replace 0 and 1 with "Ward A" and "Ward B"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.5}
          colors={{ scheme: 'nivo' }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Ward',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Beds',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 150,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      </Grid></Grid>
      // </div></div>
    
  );
};

export default BedOccupancyChart;