import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { toast } from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdmitTransfer = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [patientId, setPatientIdToEdit] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/Admit")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeletePatient = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/deletept/${patientId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        toast.success("Deleted Successfully");
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.patientId !== patientId)
        );
      } else {
        console.error("Failed to delete patient:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEditClick = (patientId, data) => {
    setPatientIdToEdit(patientId);
    setEditedData(data);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setPatientIdToEdit(null);
    setEditedData({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleUpdatePatient = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/updatept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.status === 200) {
        toast.success("Details Updated Successfully");
        handleEditDialogClose();
      } else {
        console.error("Failed to update patient:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
          <div
            style={{
              background: "#ffff",
              padding: "10px",
              height: "50px",
              marginBottom: "10px",
              width: "1200px",
              marginLeft: "-4%",
            }}
          >
            <PersonIcon
              style={{ fontSize: 50, marginLeft: "1010px", marginTop: "5px" }}
            />
            <h2 style={{ marginLeft: "50px", marginTop: "-50px" }}>
              To Edit Admit Patient Detials, please enter the details
            </h2>
          </div>
          <Typography
            variant="h3"
            gutterBottom
            style={{ color: "#61AFF7", fontWeight: "bold" }}
          >
            Good Care Hospital
          </Typography>
          <TableContainer
            component={Paper}
            style={{ width: "80%", height: "400px" }}
          >
            <Table>
              <TableHead style={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>PatientName</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Age</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Contact Number</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Medical Acuity</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Admitting Doctors</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow key={index} style={index % 2 === 0 ? { backgroundColor: "#f2f2f2" } : {}}>
                    <TableCell>{patient.patientName}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.contactno}</TableCell>
                    <TableCell>{patient.medicalAcuity}</TableCell>
                    <TableCell>{patient.admittingDoctors}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleEditClick(patient.patientId, patient)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeletePatient(patient.patientId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                name="patientName"
                value={editedData.patientName || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                name="age"
                value={editedData.age || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contact No"
                name="contactno"
                value={editedData.contactno || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="medicalAcuity">Medical Acuity</InputLabel>
                <Select
                  label="Medical Acuity"
                  name="medicalAcuity"
                  value={editedData.medicalAcuity || ""}
                  onChange={handleInputChange}
                  inputProps={{
                    name: "medicalAcuity",
                    id: "medicalAcuity",
                  }}
                >
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="Stable">Stable</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Admitting Doctors"
                name="admittingDoctors"
                value={editedData.admittingDoctors || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdatePatient} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AdmitTransfer;
