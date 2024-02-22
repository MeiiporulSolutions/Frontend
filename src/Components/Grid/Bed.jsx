import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ChromePicker } from 'react-color';
import ElderlyIcon from '@mui/icons-material/Elderly';
import BedIcon from '@mui/icons-material/Bed';
import { toast } from 'react-hot-toast';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import "./HospitalGrid.css"
import availableImage from '../../Images/new.jpg';
import occupiedImage from '../WiteList/new2.jpg';

const BedCard = ({ bed, availableColor, occupiedColor, selectedWard }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // State for click fade effect

  const handleCardClick = () => {
    setIsDialogOpen(true);
    setIsClicked(true); // Set clicked state to trigger the fade effect
    setTimeout(() => {
      setIsClicked(false); // Reset clicked state after a delay
    }, 300); // Adjust the delay time as needed
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!bed || !bed.status || !bed.bedNumber) {
    return null;
  }

  const handleAdmitClick = () => {
    if (bed.status === "available") {
      const url = `/AdmitPatient`;
      navigate(url);
    } else {
      toast.error("Cannot admit patient to an occupied bed.");
    }
  };

  const handleTransferClick = () => {
    if (bed.status === "occupied" && selectedWard) {
      const url = `/TransferPatient?bedNumber=${bed.bedNumber.replace(
        "bed_",
        "bed_"
      )}&patientId=${bed.patientId}&patientName=${bed.patientName}&age=${
        bed.age
      }&gender=${bed.gender}&medicalAcuity=${bed.medicalAcuity}&contactno=${
        bed.contactno
      }&currentWardId=${selectedWard.wards[0].wardId}`;
      navigate(url);
    }
  };

  const handleDischargeClick = () => {
    if (bed.status === "occupied" && selectedWard) {
      const url = `/DischargePatient?bedNumber=${bed.bedNumber}&patientId=${
        bed.patientId
      }&patientName=${bed.patientName}&age=${bed.age}&gender=${
        bed.gender
      }&medicalAcuity=${bed.medicalAcuity}&contactno=${bed.contactno}&admissionDate=${
        bed.admissionDate
      }&WardId=${selectedWard.wards[0].wardId}`;
      navigate(url);
    }
  };

  return (
    <>
      <Card
        style={{
          width: 100,
          height: 165,
          margin: 10,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease', // Added opacity transition
          cursor: 'pointer',
          backgroundColor: isHovered ? 'blue' : '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: isHovered ? '0 8px 16px 0 rgba(0,0,0,0.2)' : '0 4px 8px 0 rgba(0,0,0,0.2)',
          opacity: isClicked ? 0.5 : 1, // Apply fade-out effect when clicked
          position: 'relative',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <div style={{ position: 'relative' }}>
          <img 
            src={bed.status === "available" ? availableImage : occupiedImage} 
            alt={`Bed ${bed.bedNumber}`} 
            style={{ width: '100px', height: 'auto' }} 
          />
          {/* Card Overlay */}
          <div 
            className="card-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            
            {/* Additional overlay content goes here */}
          </div>
        </div>
        <CardContent
          style={{
            backgroundColor: bed.status === "available" ? availableColor : occupiedColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 20,
            transition: 'background-color 0.3s ease',
          }}
        >
          <Typography variant="subtitle2" style={{ color: bed.status === "available" ? "white" : "black", marginTop: 10 }}>
            {bed.status === "available" ? "Available" : "Occupied"}
          </Typography>
          <Typography variant="subtitle2" style={{ color: bed.status === "available" ? "white" : "black", marginTop: 10 }}>
            {bed.bedNumber}
          </Typography>
          {bed.status === "available" && (
            <IconButton
              variant="contained"
              color="primary"
              size="small"
              style={{ marginTop: -80 }}
              onClick={handleAdmitClick}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          {bed.status === "occupied" && (
            <div>
              <IconButton
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: -170 }}
                onClick={handleTransferClick}
              >
                <TransferWithinAStationIcon/>
              </IconButton>
              <IconButton
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: -215,marginLeft:22 }}
                onClick={handleDischargeClick}
              >
                <ElderlyIcon/>
              </IconButton>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{`Bed ${bed.bedNumber}`}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            Status: {bed.status === "available" ? "Available" : "Occupied"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const Bedsm = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [availableColor, setAvailableColor] = useState("#04f489");
  const [occupiedColor, setOccupiedColor] = useState("#b4cecf");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/bedGet")
      .then((response) => {
        setHospitals(response.data);
        const defaultWard = response.data.find(hospital => hospital.wards[0].wardName === "Ward A");
        setSelectedWard(defaultWard);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleWardChange = (ward) => {
    setSelectedWard(ward);
  };

  const handleColorPickerOpen = () => {
    setIsColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setIsColorPickerOpen(false);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#EAF2F8",width:"100%" }}>
      <div style={{ width: "100%", padding: "10px", marginLeft: "200px", marginTop: "50px" }}>
        <Container
          maxWidth="lr"
          style={{
            display: "flex",
            width: "900px",
            height: "650px",
            marginTop: "10px",
            justifyContent: "flex-start",
            background: "#fff",
            borderRadius: "30px",
            marginLeft: "-15px",
            boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)",
          
          }}
        >
          <div sx={{ minWidth: 800,maxHeight:700}}>
            <CardContent>
              <Typography variant="h5" gutterBottom style={{ color: "gray", fontWeight: "bold", marginBottom: "20px",fontFamily:"Montserrat" }}>
                Grid view
              </Typography>
              <div style={{ marginRight: "20px" }}>
                <Typography variant="h6" style={{ color: "gray", fontFamily: "Montserrat" }}>
                  Select Ward:
                </Typography>
                <Select value={selectedWard} onChange={(e) => handleWardChange(e.target.value)}>
                  {hospitals.map((hospital) => (
                    <MenuItem key={hospital._id} value={hospital}>
                      {`${hospital.wards[0].wardName} - ${hospital.wards[0].wardType} - ${hospital.wards[0].wardId}`}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {selectedWard && (
                <div key={selectedWard._id} className="ward-container">
                  <div className="beds-container" style={{ display: "flex", flexWrap: "wrap" }}>
                    {selectedWard.wards[0].beds.map((bed) => (
                      <BedCard
                        key={bed._id}
                        bed={bed}
                        availableColor={availableColor}
                        occupiedColor={occupiedColor}
                        selectedWard={selectedWard} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <CardContent>
              <div style={{ marginTop: "20px", fontFamily: "Montserrat"}}>
                <Button variant="contained" color="primary" onClick={handleColorPickerOpen}>
                  Open Color Picker
                </Button>
              </div>
              <Dialog open={isColorPickerOpen} onClose={handleColorPickerClose}>
                <DialogTitle>Choose Color</DialogTitle>
                <DialogContent>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography variant="h6" style={{ marginBottom: "5px",fontFamily: "Montserrat" }}>
                      Available Bed Color:
                    </Typography>
                    <ChromePicker color={availableColor} onChange={(color) => setAvailableColor(color.hex)} />
                  </div>
                  <div>
                    <Typography variant="h6" style={{ marginBottom: "5px" ,fontFamily: "Montserrat"}}>
                      Occupied Bed Color:
                    </Typography>
                    <ChromePicker color={occupiedColor} onChange={(color) => setOccupiedColor(color.hex)} />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleColorPickerClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Bedsm;
