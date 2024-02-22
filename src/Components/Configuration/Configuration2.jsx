import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";

const BedManagement = () => {
  const [formData, setFormData] = useState({
    wardName: "",
    wardId: "",
    wardType: "",
    Bednumber: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBeds = async () => {
    if (formData.Bednumber <= 0) {
      setErrorMessage("Number of beds must be a positive value");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/adbeds1", formData);
      console.log(response.data);
      setErrorMessage("Success");
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding beds:", error);
      setErrorMessage("Error adding beds. Please try again.");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Clear the form data and error message when closing the dialog
    setFormData({
      wardName: "",
      wardId: "",
      wardType: "",
      Bednumber: 0,
    });
    setErrorMessage("");
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "100%", padding: "10px", marginLeft: "50px", marginTop: "50px" }}>
        <Typography variant="h5" gutterBottom style={{ color: "gray", fontWeight: "bold", marginTop: "20px" }}>
          To enter Configuration Screen, please enter the details
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleOpenDialog} style={{ margin: "10px" }}>
          ADD BED AND WARD STATUS
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Configuration Screen</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                marginTop: "15px",
                backgroundColor: "#fff",
                color: "blue",
                transition: "0.3s",
                borderRadius: "5px",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <TextField
                label="Ward Name"
                type="text"
                placeholder="Enter ward name"
                name="wardName"
                value={formData.wardName}
                onChange={handleChange}
                sx={{ height: "30px", width: "300px", marginTop: "10px", marginLeft: "30px" }}
              />
              <br />

              <TextField
                label="Ward ID"
                type="text"
                placeholder="Enter ward ID"
                name="wardId"
                value={formData.wardId}
                onChange={handleChange}
                sx={{ height: "30px", width: "300px", marginTop: "30px", marginLeft: "30px" }}
              />
              <br />

              <TextField
                label="Ward Type"
                type="text"
                placeholder="Enter ward type"
                name="wardType"
                value={formData.wardType}
                onChange={handleChange}
                sx={{ height: "30px", width: "300px", marginTop: "30px", marginLeft: "30px" }}
              />
              <br />

              <TextField
                label="Number of Beds"
                type="number"
                placeholder="Enter number of beds"
                name="Bednumber"
                value={formData.Bednumber}
                onChange={handleChange}
                sx={{ height: "30px", width: "300px", marginTop: "30px", marginLeft: "30px" }}
              />

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <br />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddBeds} color="primary">
              Add Beds
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default BedManagement;
