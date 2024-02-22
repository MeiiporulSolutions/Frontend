import React, { useState, useEffect } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
const ScatterPlot = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch('http://localhost:9000/patientriskget')
      .then((response) => response.json())
      .then((responseData) => {
        // Map and format your API data
        const formattedData = responseData.map((patient) => ({
          x: patient.medicalAcuity,
          y: patient.riskScore,
          name: patient.name,
        }));
        setDatas(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    
   
  
        <Grid container spacing={2}>
          <Grid item xs={6}>
    <div
    style={{
      height: "500px",
      width: "600px",
      background: "#ffff",
      borderRadius: "30px",
      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
    }}
  >
     
        {datas.length > 0 ? (
          <ResponsiveScatterPlot
            data={[
              {
                id: 'scatterplot',
                data: datas,
              },
            ]}
            margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
            xScale={{ type: 'point', padding: 0.5 }}
            yScale={{ type: 'linear', min: 0, max: 1 }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Medical Acuity',
              legendPosition: 'middle',
              legendOffset: 46,
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Risk Score',
              legendPosition: 'middle',
              legendOffset: -60,
            }}
            tooltip={({ node }) => (
              <div>
                <strong>{node.data.name}</strong>
                <br />
                Medical Acuity: {node.data.x}
                <br />
                Risk Score: {node.data.y}
              </div>
            )}
            colors={{ scheme: 'category10' }}
            blendMode="multiply"
            nodeSize={8}
            nodeOpacity={0.7}
            nodeBorderWidth={2}
            nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
          />
        ) : (
          <div>No data available.</div>
        )}
      </div></Grid></Grid>
  );
};

export default ScatterPlot;