import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch patient data from the API
    fetch("http://localhost:9000/patientCareDashboard") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setPatients(data.patients);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        backgroundColor: "#EAF2F8",
        fontFamily: "Montserrat",
        width: "20px",
        height: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "10px",
          fontFamily: "Montserrat",
          marginLeft: "50px",
          height: "100%",
        }}
      >
        <Grid item xs={6} sx={{ height: "53vh", width: "660px" }}>
          <div
            style={{
              height: "53vh",
              width: "660px",
              background: "#ffff",
              borderRadius: "30px",
              boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
              marginLeft:"-40px",
              marginTop:"-390px",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              style={{
                background: "#61aff7",
                color: "#ffffff",
                padding: "10px",
                borderTopLeftRadius: "30px",
                borderTopRightRadius: "30px",
                fontFamily: "Montserrat",
              }}
            >
              Patient List
            </Typography>
            <Paper elevation={3}>
              <Table>
                <TableBody style={{ background: "#f3f3f3 ", textColor: "Black (#000000)" }}>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4}>Loading data...</TableCell>
                    </TableRow>
                  ) : (
                    patients.map((patient, index) => (
                      <TableRow
                        key={patient._id}
                        style={
                          index % 2 === 0
                            ? { transition: "background-color 0.2s", fontFamily: "Montserrat" }
                            : {
                                transition: "background-color 0.2s",
                                backgroundColor: "(#e0e0e0) ",
                                fontFamily: "Montserrat",
                              }
                        }
                      >
                        <TableCell>Name: {patient.name}</TableCell>
                        <TableCell>Medical Acuity: {patient.medicalAcuity.join(", ")}</TableCell>
                        {patient.assignedNurse && (
                          <TableCell>Assigned Nurse: {patient.assignedNurse}</TableCell>
                        )}
                        {patient.tasks.length > 0 && (
                          <TableCell>
                            <div>
                              <strong>Tasks:</strong>
                            </div>
                            <ul>
                              {patient.tasks.map((task, index) => (
                                <li key={index}>
                                  {`${task.taskType}: ${task.description}`}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </Grid>
      </div>
    </Container>
  );
}

export default PatientList;
