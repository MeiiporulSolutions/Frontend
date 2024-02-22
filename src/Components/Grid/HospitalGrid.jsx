// import React, { Component } from 'react';
// import axios from 'axios';
// import '../Grid/HospitalGrid.css';
// import { 
//   Container, 
//   Grid, 
//   FormControl, 
//   InputLabel, 
//   MenuItem, 
//   Select, 
//   Paper, 
//   Typography 
// } from '@mui/material';

// const classes = {
//   container: {
//     marginTop: '30px',
//     marginBottom: '10px',
//     position: 'relative',
//     borderRadius: '20px',
//     boxShadow: '5px 10px 6px rgba(0, 0, 0, 0.3)',
//     maxWidth: '1500px',
//   },
//   centeredGrid: {
//     padding: '10px',
//     position: 'absolute',
//     left: '20%',
//   },
//   gridItem: {
//     padding: '10px',
//   },
//   available: {
//     backgroundColor: 'blue',
//     width: '150px',
//     margin: '10px',
//   },
//   occupied: {
//     backgroundColor: 'gray',
//     width: '150px',
//     margin: '10px',
//   },
// };

// class HospitalGrid extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hospitals: [],
//       selectedWard: 'Ward A', // Default to Ward A
//     };
//   }

//   componentDidMount() {
//     axios.get('http://localhost:9000/bee')
//       .then((response) => {
//         this.setState({ hospitals: response.data });
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }

//   handleWardChange = (ward) => {
//     this.setState({ selectedWard: ward });
//   };

//   render() {
//     const { selectedWard, hospitals } = this.state;

//     return (
//       <Container sx={classes.container}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <div className="ward-selector">
//               <FormControl>
//                 <InputLabel>Ward</InputLabel>
//                 <Select
//                   value={selectedWard}
//                   onChange={(e) => this.handleWardChange(e.target.value)}
//                 >
//                   <MenuItem value="Ward A">Ward A</MenuItem>
//                   <MenuItem value="Ward B">Ward B</MenuItem>
//                 </Select>
//               </FormControl>
//             </div>
//           </Grid>
//           <Grid container spacing={2}>
//             {hospitals.map((hospital) => (
//               <Grid item xs={12} key={hospital.id}>
//                 {hospital.wards
//                   .filter((ward) => ward.name === selectedWard)
//                   .map((ward) => (
//                     <Paper key={ward.id} elevation={3} sx={classes.gridItem}>
//                       <Typography variant="h5">{ward.name}</Typography>
//                       {ward.beds.map((bed) => (
//                         <Paper
//                           key={bed.number}
//                           elevation={3}
//                           className={`bes ${
//                             bed.status === 'available' ? 'available' : 'occupied'
//                           }`}
//                           sx={
//                             bed.status === 'available'
//                               ? classes.available
//                               : classes.occupied
//                           }
//                         >
//                           <Typography variant="p">{bed.number}</Typography>
//                           <Typography variant="p">{bed.status}</Typography>
//                           {bed.status === 'occupied' && (
//                             <>
//                               <Typography variant="p">{bed.patientName}</Typography>
//                               <Typography variant="p">{bed.patientId}</Typography>
//                               <Typography variant="p">{bed.medicalAcuity}</Typography>
//                             </>
//                           )}
//                         </Paper>
//                       ))}
//                     </Paper>
//                   ))}
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Container>
//     );
//   }
// }

// export default HospitalGrid;



// import React, { useState, useEffect } from "react";
// import Container from "@mui/material/Container";
// import LinearProgress from "@mui/material/LinearProgress"; // Import LinearProgress
// import axios from "axios";

// const Dashboard = () => {
//   const [hospitals, setHospitals] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/bee")
//       .then((response) => {
//         setHospitals(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
//       <Container maxWidth="lg">
//         {hospitals.map((hospital) => (
//           <div key={hospital.id}>
//             <h2 style={{ fontWeight: "bold" }}>{hospital.name}</h2>
//             {hospital.wards.map((ward) => (
//               <div key={ward.id}>
//                 <h3 style={{ fontWeight: "bold" }}>{ward.name}</h3>
//                 {/* Convert Total Available Beds to LinearProgress */}
//                 <div>
//                   Total Available Beds:{" "}
//                   {ward.beds.filter((bed) => bed.status === "available").length}
//                   {" / "}
//                   {ward.beds.length}
//                   <LinearProgress
//                     variant="determinate"
//                     value={
//                       (ward.beds.filter((bed) => bed.status === "available").length /
//                         ward.beds.length) *
//                       100
//                     }
//                     style={{ height: "10px", marginTop: "5px" }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;
