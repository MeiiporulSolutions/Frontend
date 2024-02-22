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
// import SideNavbar from "../Navbar/SideNavbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const EditTransfer = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false); // Define openEditDialog state
  const [editedData, setEditedData] = useState({}); // Define editedData state
  const [patientId, setPatientIdToEdit] = useState(null); // Define patientIdToEdit state
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:9000/tee")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeletePatient = async (patientId) => {
    try {
      // Send a DELETE request to the API to delete the patient
      const response = await fetch(
        `http://localhost:9000/bedaction/${patientId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        toast.success("Deleted Successfully");
        // If the delete operation is successful, remove the patient from the local state
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
      // Send a PUT request to update the patient data
      const response = await fetch(
        `http://localhost:9000/updated/${patientId}`,
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
        // If the update operation is successful, close the dialog and refresh the data
        handleEditDialogClose();
        // You may also want to fetch updated data from the API here
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
              To Edit Transfer Patient Detials, please enter the details
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
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Age</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Contact Number
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Medical Acuity
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Transfer Reason
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Ward</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Bed No</TableCell>
                  {/* <TableCell style={{ fontWeight: "bold" }}>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>{patient.patientName}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.contactno}</TableCell>
                    <TableCell>{patient.medicalAcuity}</TableCell>
                    <TableCell>{patient.transferReason}</TableCell>
                    <TableCell>{patient.currentWard}</TableCell>
                    <TableCell>{patient.currentBedNumber}</TableCell>

                    {/* <TableCell> */}
                      {/* <IconButton
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
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Edit Dialog */}
          <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                name="name"
                value={editedData.name || ""}
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
                label="Transfer Reason"
                name="transferReason"
                value={editedData.transferReason || ""}
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

export default EditTransfer;
