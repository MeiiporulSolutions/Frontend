import React, { useState, useEffect } from "react";
import { ResponsivePie } from '@nivo/pie';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
const BarChart = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
 
    fetch("http://localhost:9000/ward-occupancy")

      .then((response) => response.json())

      .then((responseData) => {
        const newData = responseData.wardOccupancy.map((entry) => ({
          id: entry.ward,
          value: entry.occupancy,
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
        Occupancy Overview Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
  <div
  style={{
    height: "500px",
    width: "860px",
    background: "#ffff",
    borderRadius: "30px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
>
   
     
     <ResponsivePie
          height={400}
          width={700}
          margin={{ top: 70, right: -70, bottom: 60, left: 90 }}
          data={data}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: "color" }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div> </Grid></Grid></div></div>
  );
};

export default BarChart;