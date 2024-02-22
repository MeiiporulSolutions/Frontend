import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const WaitingList = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [patientId, setPatientIdToEdit] = useState(null);

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/WaitingG")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeletePatient = async (patientId) => {
    try {
      if (!patientId) {
        console.error("Patient ID is undefined");
        return;
      }

      const response = await fetch(
        `http://localhost:9000/deletewaiti/${patientId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        toast.success("Deleted Successfully");
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== patientId)
        );
      } else {
        console.error("Failed to delete patient:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEditClick = (patientId, data, actionType) => {
    setEditedData(data);
    setOpenEditDialog(true);
    setEditedData((prevEditedData) => ({ ...prevEditedData, actionType }));
  };

  const handlePriorityEdit = async () => {
    try {
      const response = await fetch(`http://localhost:9000/pro`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: editedData.patientId,
          priority: editedData.priority,
        }),
      });

      if (response.status === 200) {
        toast.success("Priority updated successfully.");
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient._id === editedData.patientId
              ? { ...patient, priority: editedData.priority }
              : patient
          )
        );
        handleEditDialogClose(); // Close the edit dialog after successful update
      } else {
        console.error("Failed to update priority:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditedData({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleUpdatePatient = async () => {
    try {
      const response = await fetch(`http://localhost:9000/assignbedss`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: editedData.patientId,
          bedNumber: editedData.bedNumber,
        }),
      });

      if (response.status === 200) {
        toast.success("Bed assigned successfully.");
        handleEditDialogClose(); // Close the edit dialog after successful update
      } else {
        console.error("Failed to assign bed:", response.statusText);
      }
    } catch (error) {
      console.error("Error assigning bed:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
          <Typography variant="h3" gutterBottom style={{ color: "#61AFF7", fontWeight: "bold" }}>
            Good Care Hospital - Waiting List
          </Typography>
          <TableContainer component={Paper} style={{ width: "80%", height: "400px", marginBottom: "20px" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#2196f3", color: "white" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Patient Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Patient ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Age</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Gender</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Admitting Doctors</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Admission Date</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f5f5f5" }}>
                    <TableCell>{patient.WaitlistEntryfields[0].patientName}</TableCell>
                    <TableCell>{patient.WaitlistEntryfields[0].patientId}</TableCell>
                    <TableCell>{patient.WaitlistEntryfields[0].age}</TableCell>
                    <TableCell>{patient.WaitlistEntryfields[0].gender}</TableCell>
                    <TableCell>{patient.WaitlistEntryfields[0].priority}</TableCell>
                    <TableCell>{patient.WaitlistEntryfields[0].admittingDoctors.join(", ")}</TableCell>
                    <TableCell>{patient.WaitlistEntryfields[0].admissionDate}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(patient._id, patient, "edit")}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="primary" onClick={() => handleEditClick(patient._id, patient, "priority")}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeletePatient(patient.WaitlistEntryfields[0].patientId)}
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
                label="Patient ID"
                name="patientId"
                value={editedData.patientId || ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              {editedData.actionType === "priority" && (
                <TextField
                  label="Priority"
                  name="priority"
                  value={editedData.priority || ""}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              )}
              {editedData.actionType === "edit" && (
                <TextField
                  label="Bed Number"
                  name="bedNumber"
                  value={editedData.bedNumber || ""}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={editedData.actionType === "priority" ? handlePriorityEdit : handleUpdatePatient}
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default WaitingList;
