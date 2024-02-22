
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { ResponsiveLine } from "@nivo/line";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export const Trend = () => {
  const [data, setData] = useState([]);

  // Step 2: Use useEffect to fetch data from the API
  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://localhost:9000/admission-discharge")
      .then((response) => response.json())
      .then((responseData) => {
        // Assuming the API returns data in a format similar to your initial data
        setData(responseData.admissionsDischargesTrend);
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty array [] as the second argument makes this effect run only once

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
          Admissions and Discharges Trend Dashboard
        </Typography>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            localeText={{ start: "Start Date", end: "End Date" }}
          />
        </LocalizationProvider> */}

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
                    id: "Admissions",
                    color: "hsl(49, 70%, 50%)",
                    data: data.map((item) => ({
                      x: item.date,
                      y: item.admissions,
                    })),
                  },
                  {
                    id: "Discharges",
                    color: "hsl(199, 70%, 50%)",
                    data: data.map((item) => ({
                      x: item.date,
                      y: item.discharges,
                    })),
                  },
                ]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
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
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Date",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Total Admission and Discharge",
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



// import React, { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import PersonIcon from "@mui/icons-material/Person";
// import Typography from "@mui/material/Typography";
// import { ResponsiveLine } from "@nivo/line";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateRangePicker } from "@mui/DateRangePicker";

// export const Trend = () => {
//   const [data, setData] = useState([]);
//   const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

//   // Step 2: Use useEffect to fetch data from the API
//   useEffect(() => {
//     // Fetch data from the API endpoint using selectedDateRange
//     if (selectedDateRange[0] && selectedDateRange[1]) {
//       const startDate = selectedDateRange[0].toISOString();
//       const endDate = selectedDateRange[1].toISOString();

//       // Replace the API endpoint URL with the correct one that accepts date range parameters
//       fetch(`http://localhost:9000/admission-discharge?startDate=${startDate}&endDate=${endDate}`)
//         .then((response) => response.json())
//         .then((responseData) => {
//           // Assuming the API returns data in a format similar to your initial data
//           setData(responseData.admissionsDischargesTrend);
//           console.log(responseData);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//   }, [selectedDateRange]); // Trigger the effect whenever the selectedDateRange changes

//   const handleDateRangeChange = (newDateRange) => {
//     setSelectedDateRange(newDateRange);
//   };

//   return (
//     <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
//       <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
//         <div
//           style={{
//             background: "#ffff",
//             padding: "10px",
//             height: "50px",
//             marginBottom: "10px",
//             width: "105%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginLeft: "-5%",
//           }}
//         >
//           <Typography
//             variant="h3"
//             gutterBottom
//             style={{ color: "#61AFF7", fontWeight: "bold", marginTop: "15px" }}
//           >
//             Good Care Hospital
//           </Typography>
//           <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} />
//         </div>
//         <Typography variant="h5" style={{ marginBottom: "20px" }}>
//           Admissions and Discharges Trend Dashboard
//         </Typography>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateRangePicker
//             localeText={{ start: "Start Date", end: "End Date" }}
//             value={selectedDateRange}
//             onChange={handleDateRangeChange} // Connect the date range picker to the state
//           />
//         </LocalizationProvider>

//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <div
//               style={{
//                 height: "500px",
//                 width: "1000px",
//                 background: "#ffff",
//                 borderRadius: "30px",
//                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <ResponsiveLine
//                 data={[
//                   {
//                     id: "admissions",
//                     color: "hsl(49, 70%, 50%)",
//                     data: data.map((item) => ({
//                       x: item.date,
//                       y: item.admissions,
//                     })),
//                   },
//                   {
//                     id: "discharges",
//                     color: "hsl(199, 70%, 50%)",
//                     data: data.map((item) => ({
//                       x: item.date,
//                       y: item.discharges,
//                     })),
//                   },
//                 ]}
//                 margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                 xScale={{ type: "point" }}
//                 yScale={{
//                   type: "linear",
//                   min: "auto",
//                   max: "auto",
//                   stacked: true,
//                   reverse: false,
//                 }}
//                 yFormat=" >-.2f"
//                 axisTop={null}
//                 axisRight={null}
//                 axisBottom={{
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: "Date",
//                   legendOffset: 36,
//                   legendPosition: "middle",
//                 }}
//                 axisLeft={{
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: "Total Admission and Discharge",
//                   legendOffset: -40,
//                   legendPosition: "middle",
//                 }}
//                 pointSize={10}
//                 pointColor={{ theme: "background" }}
//                 pointBorderWidth={2}
//                 pointBorderColor={{ from: "serieColor" }}
//                 pointLabelYOffset={-12}
//                 useMesh={true}
//                 legends={[
//                   {
//                     anchor: "bottom-right",
//                     direction: "column",
//                     justify: false,
//                     translateX: 100,
//                     translateY: 0,
//                     itemsSpacing: 0,
//                     itemDirection: "left-to-right",
//                     itemWidth: 80,
//                     itemHeight: 20,
//                     itemOpacity: 0.75,
//                     symbolSize: 12,
//                     symbolShape: "circle",
//                     symbolBorderColor: "rgba(0, 0, 0, .5)",
//                     effects: [
//                       {
//                         on: "hover",
//                         style: {
//                           itemBackground: "rgba(0, 0, 0, .03)",
//                           itemOpacity: 1,
//                         },
//                       },
//                     ],
//                   },
//                 ]}
//               />
//             </div>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default Trend;