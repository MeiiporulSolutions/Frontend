// // import React, { useEffect, useState } from "react";
// // import Grid from "@mui/material/Grid";
// // import Typography from "@mui/material/Typography";
// // //import PersonIcon from "@mui/icons-material/Person";
// // import LinearProgress from "@mui/material/LinearProgress";
// // //import SideNavbar from "../Navbar/SideNavbar";
// // import axios from "axios";
// // import { ResponsiveBar } from "@nivo/bar";
// // import { ResponsivePie } from "@nivo/pie";
// // import { ResponsiveHeatMap } from "@nivo/heatmap";
// // import { ResponsiveLine } from "@nivo/line";
// // import { ResponsiveScatterPlot } from "@nivo/scatterplot";
// // import { ResponsiveSankey } from "@nivo/sankey";

// // const Dashboard = () => {
// //   const [hospitals, setHospitals] = useState([]);
// //   const [totalDischarges, setTotalDischarges] = useState(0);
// //   const [totalAdmissions, setTotalAdmissions] = useState(0);
// //   const [totalTransfer, setTotalTransfer] = useState(0);
// //   const [chartDatab, setChartData] = useState([]);
// //   const [chartData, setChart] = useState([]);

// //   useEffect(() => {
// //     // Fetch data from the API
// //     fetch("http://localhost:9000/bed1d")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         // Extract the bed status data from the API response
// //         const bedStatusData = data.bedStatusPerWard;

// //         // Transform the data to match the format expected by the chart
// //         const transformedData = Object.keys(bedStatusData).map((ward) => ({
// //           ward,
// //           "Occupied This Week": bedStatusData[ward].occupiedThisWeekBeds,
// //           "Occupied This Month": bedStatusData[ward].occupiedThisMonthBeds,
// //           "Available Beds": bedStatusData[ward].availableBeds,
// //         }));
// //         setChart(transformedData);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:9000/bedGet")
// //       .then((response) => {
// //         setHospitals(response.data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });

// //     axios
// //       .get("http://localhost:9000/Disget")
// //       .then((response) => {
// //         const total = response.data.length;
// //         setTotalDischarges(total);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching discharges:", error);
// //       });

// //     axios
// //       .get("http://localhost:9000/transferGet")
// //       .then((response) => {
// //         const total = response.data.length;
// //         setTotalTransfer(total);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching discharges:", error);
// //       });

// //     axios
// //       .get("http://localhost:9000/aff")
// //       .then((response) => {
// //         const total = response.data.length;
// //         console.log(response.data); // Calculate the total number of admissions
// //         setTotalAdmissions(total);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching admissions:", error);
// //       });
// //   }, []);

// //    const maximumDischargeCapacity = 100;
// //    const maximumAdmissionCapacity = 100;
// //    const maximumTransferCapacity = 100;

// //     const [datap, setDatap] = useState([]);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch("http://localhost:9000/wardoccupancys");
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! Status: ${response.status}`);
// //       }

// //       const responseData = await response.json();
// //       const newData = responseData.wardOccupancy.map((entry) => ({
// //         id: entry.ward,
// //         value: entry.occupancy,
// //       }));
// //       setDatap(newData);

// //       console.log(responseData);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const [datag, setDatag] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:9000/availablebeddds")
// //       .then((response) => response.json())

// //       .then((responseData) => {
// //         const newData = responseData.realTimeBedAvailability.map((entry) => ({
// //           Ward: entry.ward,
// //           "Available Beds": entry.availableBeds,
// //         }));
// //         setDatag(newData);

// //         console.log(responseData);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);

// //   const [datah, setDatah] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:9000/availbedct")
// //       .then((response) => response.json())

// //       .then((data) => {
// //         const formattedData = data.map((item) => ({
// //           id: item.Ward,

// //           data: [
// //             {
// //               x: item.AdmissionTime,
// //               y: item.AvailableBeds,
// //             },
// //           ],
// //         }));
// //         setDatah(formattedData);
// //         console.log(data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);

// //   const [apiData, setApiData] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:9000/paaaG")
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log('Received data from API:', data);
// //       setApiData(data.patientAcuityBreakdown);
// //     })
// //     .catch((error) => {
// //       console.error('Error fetching data:', error);
// //     });
// // }, []);

// //   const chartDatag = Object.keys(apiData).map((wardName) => ({
// //     ward: wardName,
// //     ...apiData[wardName],
// //   }));

// //   const [data, setDatal] = useState([]);

// //   // Step 2: Use useEffect to fetch data from the API
// //   useEffect(() => {
// //     // Fetch data from the API endpoint
// //     fetch("http://localhost:9000/admission-discharge")
// //       .then((response) => response.json())
// //       .then((responseData) => {
// //         // Assuming the API returns data in a format similar to your initial data
// //         setDatal(responseData.admissionsDischargesTrend);
// //         console.log(responseData);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);

// //   // 7
// //   const [datas, setDatas] = useState([]);

// //   useEffect(() => {
// //     // Fetch data from your API
// //     fetch("http://localhost:9000/patientriskget")
// //       .then((response) => response.json())
// //       .then((responseData) => {
// //         // Map and format your API data
// //         const formattedData = responseData.map((patient) => ({
// //           x: patient.medicalAcuity,
// //           y: patient.riskScore,
// //           name: patient.name,
// //         }));
// //         setDatas(formattedData);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);
// //   const initialData = {
// //     bedTurnaroundTime: [
// //       {
// //         ward: "Ward A",
// //         bedNumber: "bed_1",
// //         admissiondate: "2023-09-25",
// //         turnaroundTime: 30,
// //       },
// //       {
// //           ward: "Ward A",
// //           bedNumber: "bed_3",
// //           admissiondate: "2023-09-29",
// //           turnaroundTime: 120,
// //         },
// //         {
// //           ward: "Ward A",
// //           bedNumber: "bed_3",
// //           admissiondate: "2023-09-27",
// //           turnaroundTime: 180,
// //         },
// //     ],
// //   };
// // // const [datax, setDatax] = useState();

// //   // useEffect(() => {
// //   //   fetch("http://localhost:9000/patientflow")
// //   //     .then((response) => response.json())
// //   //     .then((data) => {
// //   //       const nodesSet = new Set();
// //   //       const links = data.patientFlow.map((item) => {
// //   //         nodesSet.add(item.from);
// //   //         nodesSet.add(item.to);
// //   //         return {
// //   //           source: item.from,
// //   //           target: item.to,
// //   //           value: item.value,
// //   //         };
// //   //       });

// //   //       const nodes = Array.from(nodesSet).map((node) => ({ id: node }));

// //   //       const formattedData = {
// //   //         nodes,
// //   //         links,
// //   //       };

// //   //       setDatax(formattedData);
// //   //     })
// //   //     .catch((error) => console.error("Error fetching data: " + error));
// //   // }, []);
// //   // if (!datax) {
// //   //   // Data is still loading
// //   //   return <div>Loading...</div>;
// //   // }

// //   return (
// //     <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
// //       <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
// //         <div
// //           style={{
// //             background: "#ffff",
// //             padding: "10px",
// //             height: "50px",
// //             marginBottom: "10px",
// //             width: "105%",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             marginLeft: "-5%",
// //           }}
// //         >
// //           {/* <Typography
// //             variant="h3"
// //             gutterBottom
// //             style={{ color: "#61AFF7", fontWeight: "bold", marginTop: "15px" }}
// //           >
// //             Good Care Hospital
// //           </Typography> */}
// //           {/* <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} /> */}
// //         </div>
// //         <Grid container spacing={2}>
// //           <Grid item xs={2} style={{ textAlign: "center" }}>
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "10px",
// //                 borderRadius: "10px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <div style={{ fontWeight: "bold", fontSize: "18px" }}>
// //                 Total Discharges
// //               </div>
// //               <div style={{ fontWeight: "bold", fontSize: "20px" }}>
// //                 {totalDischarges}
// //               </div>
// //               <LinearProgress
// //                 variant="determinate"
// //                 value={(totalDischarges / maximumDischargeCapacity) * 100}
// //                 style={{ height: "10px", marginTop: "5px" }}
// //               />
// //             </div>
// //           </Grid>

// //           <Grid item xs={2} style={{ textAlign: "center" }}>
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "10px",
// //                 borderRadius: "10px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <div style={{ fontWeight: "bold", fontSize: "18px" }}>
// //                 Total Admission
// //               </div>
// //               <div style={{ fontWeight: "bold", fontSize: "20px" }}>
// //                 {totalAdmissions}
// //               </div>
// //               <LinearProgress
// //                 variant="determinate"
// //                 value={(totalAdmissions / maximumAdmissionCapacity) * 100}
// //                 style={{ height: "10px", marginTop: "5px" }}
// //               />
// //             </div>
// //           </Grid>
// //           <Grid item xs={2} style={{ textAlign: "center" }}>
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "10px",
// //                 borderRadius: "10px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <div style={{ fontWeight: "bold", fontSize: "18px" }}>
// //                 Total Transfer
// //               </div>
// //               <div style={{ fontWeight: "bold", fontSize: "20px" }}>
// //                 {totalTransfer}
// //               </div>
// //               <LinearProgress
// //                 variant="determinate"
// //                 value={(totalTransfer / maximumTransferCapacity) * 100}
// //                 style={{ height: "10px", marginTop: "5px" }}
// //               />
// //             </div>
// //           </Grid>

// //           {/* Create a container for "Ward A" */}
// //           <Grid item xs={3} style={{ textAlign: "center" }}>
// //             {hospitals.map((hospital) => (
// //               <div key={hospital.id}>
// //                 {hospital.wards.map((ward) => {
// //                   if (ward.name === "Ward A") {
// //                     return (
// //                       <div key={ward.id} style={{ marginBottom: "20px" }}>
// //                         <div
// //                           style={{
// //                             background: "white",
// //                             padding: "10px",
// //                             borderRadius: "10px",
// //                             boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //                           }}
// //                         >
// //                           <div style={{ fontWeight: "bold", fontSize: "18px" }}>
// //                             {ward.name} Available Beds
// //                           </div>
// //                           <div style={{ fontWeight: "bold", fontSize: "20px" }}>
// //                             {" "}
// //                             {
// //                               ward.beds.filter(
// //                                 (bed) => bed.status === "available"
// //                               ).length
// //                             }{" "}
// //                             / {ward.beds.length}
// //                           </div>
// //                           <LinearProgress
// //                             variant="determinate"
// //                             value={
// //                               (ward.beds.filter(
// //                                 (bed) => bed.status === "available"
// //                               ).length /
// //                                 ward.beds.length) *
// //                               100
// //                             }
// //                             style={{ height: "10px", marginTop: "5px" }}
// //                           />
// //                         </div>
// //                       </div>
// //                     );
// //                   }
// //                   return null; // Return null for other wards
// //                 })}
// //               </div>
// //             ))}
// //           </Grid>

// //           {/* Create a container for "Ward B" */}

// //           <Grid item xs={3} style={{ textAlign: "center" }}>
// //             {hospitals.map((hospital) => (
// //               <div key={hospital.id}>
// //                 {hospital.wards.map((ward) => {
// //                   if (ward.name === "Ward B") {
// //                     return (
// //                       <div key={ward.id} style={{ marginBottom: "20px" }}>
// //                         <div
// //                           style={{
// //                             background: "white",
// //                             padding: "10px",
// //                             borderRadius: "10px",
// //                             boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //                           }}
// //                         >
// //                           <div style={{ fontWeight: "bold", fontSize: "18px" }}>
// //                             {ward.name} Available Beds
// //                           </div>
// //                           <div style={{ fontWeight: "bold", fontSize: "20px" }}>
// //                             {" "}
// //                             {
// //                               ward.beds.filter(
// //                                 (bed) => bed.status === "available"
// //                               ).length
// //                             }{" "}
// //                             / {ward.beds.length}
// //                           </div>
// //                           <LinearProgress
// //                             variant="determinate"
// //                             value={
// //                               (ward.beds.filter(
// //                                 (bed) => bed.status === "available"
// //                               ).length /
// //                                 ward.beds.length) *
// //                               100
// //                             }
// //                             style={{ height: "10px", marginTop: "5px" }}
// //                           />
// //                         </div>
// //                       </div>
// //                     );
// //                   }
// //                   return null; // Return null for other wards
// //                 })}
// //               </div>
// //             ))}
// //           </Grid>

// //           {/* <Grid item xs={6}>
// //             {" "} */}
// //             {/* This grid item will contain the first bar chart */}
// //             {/* <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }} */}
          
// //               {/* <Typography variant="h6" style={{ marginTop: "50px" }}>
// //                 Specific time period
// //               </Typography>
// //               <ResponsiveBar
// //                 data={chartData}
// //                 indexBy="ward"
// //                 keys={[
// //                   "Occupied This Week",
// //                   "Occupied This Month",
// //                   "Available Beds",
// //                 ]}
// //                 margin={{ top: 10, right: 170, bottom: 100, left: 60 }}
// //                 padding={0.3}
// //                 axisBottom={{
// //                   tickRotation: -45,
// //                 }}
// //                 labelSkipWidth={12}
// //                 labelSkipHeight={12}
// //                 legends={[
// //                   {
// //                     dataFrom: "keys",
// //                     anchor: "top-right",
// //                     direction: "column",
// //                     translateX: 120,
// //                     itemWidth: 100,
// //                     itemHeight: 20,
// //                   },
// //                 ]}
// //               />
// //             </div>
// //           </Grid> */}

// //           {/* <Grid item xs={6}>
// //             {" "} */}
// //             {/* This grid item will contain the second bar chart */}
// //             {/* <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             > */}
// //               {/* <Typography variant="h6" style={{ marginTop: "50px" }}>
// //                 Bed Occupancy Trends
// //               </Typography>
// //               <ResponsiveBar
// //                 data={chartDatab}
// //                 keys={["Admissions"]}
// //                 indexBy="date"
// //                 margin={{ top: 10, right: 60, bottom: 100, left: 60 }}
// //                 padding={0.1}
// //                 colors={{ scheme: "category10" }}
// //                 axisBottom={{
// //                   tickRotation: -45,
// //                 }}
// //                 axisLeft={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Total Admission",
// //                   legendPosition: "middle",
// //                   legendOffset: -40,
// //                   tickValues: [0, 1, 2, 3, 4, 5],
// //                 }}
// //                 enableGridX={false}
// //                 labelSkipWidth={12}
// //                 labelSkipHeight={12}
// //                 labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
// //                 animate={true}
// //                 motionStiffness={90}
// //                 motionDamping={15}
// //               />
// //             </div>
// //           </Grid> */}

// //           <Grid item xs={6}>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <Typography variant="h6" style={{ marginTop: "50px" }}>
// //                 Occupancy Overview
// //               </Typography>
// //               <ResponsivePie
// //                 height={400}
// //                 width={700}
// //                 margin={{ top: 10, right: 100, bottom: 100, left: 90 }}
// //                 data={datap}
// //                 innerRadius={0.5}
// //                 padAngle={0.7}
// //                 cornerRadius={3}
// //                 colors={{ scheme: "nivo" }}
// //                 borderWidth={1}
// //                 borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
// //                 radialLabelsSkipAngle={10}
// //                 radialLabelsTextXOffset={6}
// //                 radialLabelsTextColor="#333333"
// //                 radialLabelsLinkOffset={0}
// //                 radialLabelsLinkDiagonalLength={16}
// //                 radialLabelsLinkHorizontalLength={24}
// //                 radialLabelsLinkStrokeWidth={1}
// //                 radialLabelsLinkColor={{ from: "color" }}
// //                 slicesLabelsSkipAngle={10}
// //                 slicesLabelsTextColor="#333333"
// //                 animate={true}
// //                 motionStiffness={90}
// //                 motionDamping={15}
// //               />
// //             </div>
// //           </Grid>

// //           <Grid item xs={6}>
// //             {" "}
// //             {/* This grid item will contain the second bar chart */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <Typography variant="h6" style={{ marginTop: "50px" }}>
// //                 Real-time Bed Availability
// //               </Typography>
// //               <ResponsiveBar
// //                 data={datag}
// //                 keys={["Available Beds"]}
// //                 indexBy="Ward"
// //                 width={800}
// //                 margin={{ top: 10, right: 130, bottom: 100, left: 60 }}
// //                 padding={0.3}
// //                 innerPadding={3}
// //                 minValue={0}
// //                 maxValue={20} // Adjust this value based on your data
// //                 axisBottom={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                 }}
// //                 axisLeft={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                 }}
// //                 labelSkipWidth={12}
// //                 labelSkipHeight={12}
// //                 labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
// //                 legends={[
// //                   {
// //                     dataFrom: "keys",
// //                     anchor: "bottom-right",
// //                     direction: "column",
// //                     justify: false,
// //                     translateX: 120,
// //                     translateY: 0,
// //                     itemsSpacing: 2,
// //                     itemWidth: 100,
// //                     itemHeight: 20,
// //                     itemDirection: "left-to-right",
// //                     itemOpacity: 0.85,
// //                     symbolSize: 20,
// //                     effects: [
// //                       {
// //                         on: "hover",
// //                         style: {
// //                           itemOpacity: 1,
// //                         },
// //                       },
// //                     ],
// //                   },
// //                 ]}
// //               />
// //             </div>
// //           </Grid>

// //           {/* <Grid item xs={6}>
// //             {" "}
// //             {/* This grid item will contain the second bar chart */}
// //             {/* <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <Typography variant="h6" style={{ marginTop: "50px" }}>
// //                 Display Bed Availability Board
// //               </Typography>

// //               <ResponsiveHeatMap
// //                 data={datah}
// //                 margin={{ top: 10, right: 90, bottom: 100, left: 90 }}
// //                 valueFormat={0}
// //                 axisTop={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: -90,
// //                   legend: "",
// //                   legendOffset: 46,
// //                 }}
// //                 axisRight={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "WARD",
// //                   legendPosition: "middle",
// //                   legendOffset: 70,
// //                 }}
// //                 axisLeft={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "WARD",
// //                   legendPosition: "middle",
// //                   legendOffset: -72,
// //                 }}
// //                 colors={{
// //                   type: "diverging",
// //                   scheme: "red_yellow_blue",
// //                   diverge: 0.5,
// //                   minValue: 0,
// //                   maxValue: 10,
// //                 }}
// //                 emptyColor="#555555"
// //                 legends={[
// //                   {
// //                     anchor: "bottom",
// //                     translateX: 0,
// //                     translateY: 30,
// //                     itemCount: 10,
// //                     itemWidth: 100,
// //                     itemHeight: 12,
// //                     itemDirection: "left-to-right",
// //                     itemsSpacing: 5,
// //                     itemTextColor: "#333",
// //                     symbolSize: 12,
// //                     symbolShape: "square",
// //                   },
// //                 ]}
// //               />
// //             </div> */}
// //           {/* </Grid>  */}

// //           <Grid item xs={6}>
// //             {" "}
// //             {/* This grid item will contain the second bar chart */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <Typography variant="h6" style={{ marginTop: "50px" }}>
// //               Patient Acuity Breakdown Dashboard
// //               </Typography>
// //               <ResponsiveBar
// //                 data={chartDatag}
// //                 keys={["Critical", "Moderate", "Stable"]}
// //                 indexBy="ward" // Replace 0 and 1 with "Ward A" and "Ward B"
// //                 margin={{ top: 10, right: 130, bottom: 100, left: 60 }}
// //                 padding={0.5}
// //                 colors={{ scheme: "nivo" }}
// //                 axisTop={null}
// //                 axisRight={null}
// //                 axisBottom={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Ward",
// //                   legendPosition: "middle",
// //                   legendOffset: 32,
// //                 }}
// //                 axisLeft={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Beds",
// //                   legendPosition: "middle",
// //                   legendOffset: -40,
// //                 }}
// //                 labelSkipWidth={12}
// //                 labelSkipHeight={12}
// //                 labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
// //                 legends={[
// //                   {
// //                     dataFrom: "keys",
// //                     anchor: "bottom-right",
// //                     direction: "column",
// //                     justify: false,
// //                     translateX: 120,
// //                     translateY: 0,
// //                     itemsSpacing: 2,
// //                     itemWidth: 150,
// //                     itemHeight: 20,
// //                     itemDirection: "left-to-right",
// //                     itemOpacity: 0.85,
// //                     symbolSize: 20,
// //                     effects: [
// //                       {
// //                         on: "hover",
// //                         style: {
// //                           itemOpacity: 1,
// //                         },
// //                       },
// //                     ],
// //                   },
// //                 ]}
// //               />
// //             </div>
// //           </Grid>

// //           <Grid item xs={6}>
// //             {" "}
// //             {/* This grid item will contain the second bar chart */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <Typography variant="h6" style={{ marginTop: "50px" }}>
// //               Admissions and Discharges Trend Dashboard
// //               </Typography>
// //               <ResponsiveLine
// //                 data={[
// //                   {
// //                     id: "Admissions",
// //                     color: "hsl(49, 70%, 50%)",
// //                     data: data.map((item) => ({
// //                       x: item.date,
// //                       y: item.admissions,
// //                     })),
// //                   },
// //                   {
// //                     id: "Discharges",
// //                     color: "hsl(199, 70%, 50%)",
// //                     data: data.map((item) => ({
// //                       x: item.date,
// //                       y: item.discharges,
// //                     })),
// //                   },
// //                 ]}
// //                 margin={{ top: 10, right: 110, bottom: 100, left: 60 }}
// //                 xScale={{ type: "point" }}
// //                 yScale={{
// //                   type: "linear",
// //                   min: "auto",
// //                   max: "auto",
// //                   stacked: true,
// //                   reverse: false,
// //                 }}
// //                 yFormat=" >-.2f"
// //                 axisTop={null}
// //                 axisRight={null}
// //                 axisBottom={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Date",
// //                   legendOffset: 36,
// //                   legendPosition: "middle",
// //                 }}
// //                 axisLeft={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Total Admission and Discharge",
// //                   legendOffset: -40,
// //                   legendPosition: "middle",
// //                 }}
// //                 pointSize={10}
// //                 pointColor={{ theme: "background" }}
// //                 pointBorderWidth={2}
// //                 pointBorderColor={{ from: "serieColor" }}
// //                 pointLabelYOffset={-12}
// //                 useMesh={true}
// //                 legends={[
// //                   {
// //                     anchor: "bottom-right",
// //                     direction: "column",
// //                     justify: false,
// //                     translateX: 100,
// //                     translateY: 0,
// //                     itemsSpacing: 0,
// //                     itemDirection: "left-to-right",
// //                     itemWidth: 80,
// //                     itemHeight: 20,
// //                     itemOpacity: 0.75,
// //                     symbolSize: 12,
// //                     symbolShape: "circle",
// //                     symbolBorderColor: "rgba(0, 0, 0, .5)",
// //                     effects: [
// //                       {
// //                         on: "hover",
// //                         style: {
// //                           itemBackground: "rgba(0, 0, 0, .03)",
// //                           itemOpacity: 1,
// //                         },
// //                       },
// //                     ],
// //                   },
// //                 ]}
// //               />
// //             </div>
// //           </Grid>

// //           <Grid item xs={6}>
// //             {" "}
// //             {/* This grid item will contain the second bar chart */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <Typography variant="h6" style={{ marginTop: "50px" }}>
// //               Patient Risk Assessment Dashboard
// //               </Typography>
// //                <ResponsiveScatterPlot
// //                 data={[
// //                   {
// //                     id: "scatterplot",
// //                     data: datas,
// //                   },
// //                 ]}
// //                 margin={{ top: 10, right: 30, bottom: 100, left: 80 }}
// //                 xScale={{ type: "point", padding: 0.5 }}
// //                 yScale={{ type: "linear", min: 0, max: 1 }}
// //                 axisTop={null}
// //                 axisRight={null}
// //                 axisBottom={{
// //                   orient: "bottom",
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Medical Acuity",
// //                   legendPosition: "middle",
// //                   legendOffset: 46,
// //                 }}
// //                 axisLeft={{
// //                   orient: "left",
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Risk Score",
// //                   legendPosition: "middle",
// //                   legendOffset: -60,
// //                 }}
// //                 tooltip={({ node }) => (
// //                   <div>
// //                     <strong>{node.data.name}</strong>
// //                     <br />
// //                     Medical Acuity: {node.data.x}
// //                     <br />
// //                     Risk Score: {node.data.y}
// //                   </div>
// //                 )}
// //                 colors={{ scheme: "category10" }}
// //                 blendMode="multiply"
// //                 nodeSize={8}
// //                 nodeOpacity={0.7}
// //                 nodeBorderWidth={2}
// //                 nodeBorderColor={{
// //                   from: "color",
// //                   modifiers: [["darker", 0.7]],
// //                 }}
// //               /> 
// //             </div>
// //           </Grid>

// //           {/* <Grid item xs={6}>
// //             {" "}
// //             {/* This grid item will contain the second bar chart */}
// //             {/* <div
// //               className="chart-container"
// //               style={{
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
             
// //             </div>
// //           </Grid>  */} 

// //            <Grid item xs={6}>
// //             {" "} 
// //             {/* This grid item will contain the second bar chart */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 height: "400px",
// //                 background: "#ffff",
// //                 borderRadius: "30px",
// //                 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
// //               }}
// //             >
// //               <ResponsiveLine
// //                 data={[
// //                   {
// //                     id: "turnaroundTime",
// //                     color: "hsl(49, 70%, 50%)",
// //                     data: data.map((item) => ({
// //                       x: item.admissiondate,
// //                       y: item.turnaroundTime,
// //                     })),
// //                   },
// //                 ]}
               
// //                 margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
// //                 xScale={{ type: "time", format: "%Y-%m-%d" }}
// //                 yScale={{
// //                   type: "linear",
// //                   min: "auto",
// //                   max: "auto",
// //                   stacked: true,
// //                   reverse: false,
// //                 }}
// //                 yFormat=" >-.2f"
// //                 axisTop={null}
// //                 axisRight={null}
// //                 axisBottom={{
// //                   format: "%Y-%m-%d",
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: -45,
// //                   legend: "Admission Date",
// //                   legendOffset: 36,
// //                   legendPosition: "middle",
// //                 }}
// //                 axisLeft={{
// //                   tickSize: 5,
// //                   tickPadding: 5,
// //                   tickRotation: 0,
// //                   legend: "Turnaround Time",
// //                   legendOffset: -40,
// //                   legendPosition: "middle",
// //                 }}
// //                 pointSize={10}
// //                 pointColor={{ theme: "background" }}
// //                 pointBorderWidth={2}
// //                 pointBorderColor={{ from: "serieColor" }}
// //                 pointLabelYOffset={-12}
// //                 useMesh={true}
// //                 legends={[
// //                   {
// //                     anchor: "bottom-right",
// //                     direction: "column",
// //                     justify: false,
// //                     translateX: 100,
// //                     translateY: 0,
// //                     itemsSpacing: 0,
// //                     itemDirection: "left-to-right",
// //                     itemWidth: 80,
// //                     itemHeight: 20,
// //                     itemOpacity: 0.75,
// //                     symbolSize: 12,
// //                     symbolShape: "circle",
// //                     symbolBorderColor: "rgba(0, 0, 0, .5)",
// //                     effects: [
// //                       {
// //                         on: "hover",
// //                         style: {
// //                           itemBackground: "rgba(0, 0, 0, .03)",
// //                           itemOpacity: 1,
// //                         },
// //                       },
// //                     ],
// //                   },
// //                 ]}
// //               />
// //             </div>
// //           </Grid> 
// //         </Grid>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import PersonIcon from "@mui/icons-material/Person";
// import Typography from "@mui/material/Typography";
// import { ResponsiveLine } from "@nivo/line";

// const initialData = {
//   bedTurnaroundTime: [
//     {
//       ward: "Ward A",
//       bedNumber: "bed_1",
//       admissiondate: "2023-09-25",
//       turnaroundTime: 30,
//     },
//     {
//         ward: "Ward A",
//         bedNumber: "bed_3",
//         admissiondate: "2023-09-29",
//         turnaroundTime: 120,
//       },
//       {
//         ward: "Ward A",
//         bedNumber: "bed_3",
//         admissiondate: "2023-09-27",
//         turnaroundTime: 180,
//       },
//   ],
// };

// export const Trend = () => {
//   // Step 1: Create a state variable to store the data
//   const [data] = useState(initialData.bedTurnaroundTime); // Removed unused 'setData'

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
//           Your Heat Map Heading
//         </Typography>
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
//                     id: "turnaroundTime",
//                     color: "hsl(49, 70%, 50%)",
//                     data: data.map((item) => ({
//                       x: item.admissiondate,
//                       y: item.turnaroundTime,
//                     })),
//                   },
//                 ]}
               
//                 margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                 xScale={{ type: "time", format: "%Y-%m-%d" }}
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
//                   format: "%Y-%m-%d",
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: -45,
//                   legend: "Admission Date",
//                   legendOffset: 36,
//                   legendPosition: "middle",
//                 }}
//                 axisLeft={{
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: "Turnaround Time",
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
