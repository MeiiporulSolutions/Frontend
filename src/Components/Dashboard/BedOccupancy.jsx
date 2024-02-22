import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

const BarChart = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
 
    fetch("http://localhost:9000/availablebeds")

      .then((response) => response.json())

      .then((responseData) => {
        const newData = responseData.realTimeBedAvailability.map((entry) => ({
          Ward: entry.ward,
          "Available Beds": entry.availableBeds,
        }));
        setData(newData);
       
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

      });
  }, []);

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
  
        {/* Place your heading here */}
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          
          Real time Bed Avaliability Dashboard
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
     
        <ResponsiveBar
          data={data}
          keys={["Available Beds"]}
          indexBy="Ward" 
          width={800}
          margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
          padding={0.3}
          innerPadding={3}
          minValue={0}
          maxValue={20} // Adjust this value based on your data
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      
    </div> </Grid></Grid></div></div>
  );
};

export default BarChart;