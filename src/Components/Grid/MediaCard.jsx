import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField'; // Import TextField from Material-UI

function MediaCard({ bedNumber, status, imageUrl, navigate, selectedBed, selectedWard, handleAdmitPatient }) {
  const availableColor = '#04f489';
  const occupiedColor = '#b4cecf';
  const criticalColor = '#ff6689';

  let cardColor;
  switch (status) {
    case 'available':
      cardColor = availableColor;
      break;
    case 'occupied':
      cardColor = occupiedColor;
      break;
    case 'critical':
      cardColor = criticalColor;
      break;
    default:
      cardColor = '#ffffff';
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [availableForAdmission, setAvailableForAdmission] = useState(false);

  useEffect(() => {
    if (status === 'available') {
      setAvailableForAdmission(true);
      setOpenDialog(true);
    }
  }, [status]);

  const handleAdmitClick = () => {
    if (selectedBed && selectedBed.status === 'available') {
      // Replace 'AdmitPatient' with the correct route for admitting a patient
      const url = `/AdmitPatient?bedNumber=${selectedBed.bedNumber}&ward=${selectedWard.wards[0].wardId}`;
      navigate(url);
      // Call the parent component's function for further logic
     // handleAdmitPatient(selectedBed.bedNumber, selectedWard.wards[0].wardId);
    }
  };

  const handleTransferClick = () => {
    if (selectedBed && selectedBed.status === 'occupied') {
      // Replace 'TransferPatient' with the correct route for transferring a patient
      const url = `/TransferPatient?bedNumber=${selectedBed.bedNumber}&ward=${selectedWard.wards[0].wardId}&patientId=${selectedBed.patientId}`;
      navigate(url);
      // You can add more logic here if needed
    }
  };

  const handleDischargeClick = () => {
    // Implement logic for discharging patient
    // You can navigate to another page or show a dialog for discharge
    console.log('Discharge button clicked for bed:', bedNumber);
  };

  return (
    <div style={{ backgroundColor: cardColor, padding: '10px' }}>
      <Card>
        <CardMedia
          component="img"
          alt={`Bed ${bedNumber}`}
          height="90"
          width="80"
          image={imageUrl || "https://th.bing.com/th?id=OIP.4pQjwAaoLuwG3DWhV0UoIAHaH0&w=243&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
        />
      </Card>

      {status && (
        <div>
          <DialogTitle>Status Information</DialogTitle>
          <DialogContentText>
            Bed Number: {bedNumber}
            <br />
            Status: {status}
          </DialogContentText>
          <DialogActions>
            {/*{availableForAdmission && (*/}
            {status === 'available' && (
              
              <Button
                style={{
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "5px 20px",
                  background: "#2196F3",
                  bottom: "10px",
                  color: "white",
                  left: "40px",
                }}
                onClick={handleAdmitClick}
                color="primary"
              >
                Admit
              </Button>
            )}
            {status === 'occupied' && (
              <>
                <Button
                  style={{
                    textTransform: "none",
                    borderRadius: "30px",
                    padding: "5px 10px",
                    background:  "#2196F3",
                    bottom: "10px",
                    color: "white",
                    left: "9px",
                  }}
                  onClick={handleTransferClick}
                  color="primary"
                >
                  Transfer
                </Button>
                <Button
                  style={{
                    textTransform: "none",
                    borderRadius: "30px",
                    padding: "5px 10px",
                    background:  "#2196F3",
                    bottom: "10px",
                    color: "white",
                    left: "10px",
                  }}
                  onClick={handleDischargeClick}
                  color="primary"
                >
                  Discharge
                </Button>
              </>
            )}
          </DialogActions>
        </div>
      )}
    </div>
  );
}

export default MediaCard;

