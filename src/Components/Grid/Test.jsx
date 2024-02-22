import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MediaCard from './MediaCard';
import './Test.css';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Test() {
  const [testData, setTestData] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/Bedget')
      .then((response) => {
        setTestData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  const handleAdmitPatient = (bedNumber, wardId) => {
    // Add logic here for what to do after admitting a patient
    console.log(`Admitting patient to Bed ${bedNumber} in Ward ${wardId}`);
    // For example, you can redirect to a new page or show a success message.
  };

  return (
    <div>
      <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "100%", padding: "10px", marginLeft: "50px", marginTop: "50px" }}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "gray", fontWeight: "bold", marginTop: "20px", fontFamily: "Arial, sans-serif" }}
          >
            Grid view
          </Typography>
          <Container
            maxWidth="lr"
            style={{
              display: "flex",
              width: "100%",
              height: "1000px",
              marginTop: "10px",
              justifyContent: "flex-start",
              background: "#ffff",
              borderRadius: "30px",
              marginLeft: "-15px",
              boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <Typography variant="h6" style={{ color: "blue", fontFamily: "Verdana, sans-serif" }}>
                Select Ward:
              </Typography>
              <Select
                value={selectedWard}
                onChange={handleWardChange}
                style={{ minWidth: "200px", fontFamily: "Georgia, serif" }}
              >
                {testData.map((ward) => (
                  <MenuItem key={ward._id} value={ward}>
                    {`${ward.wards[0].wardName} - ${ward.wards[0].wardType} - ${ward.wards[0].wardId}`}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {selectedWard && (
              <div key={selectedWard._id} className="ward-container">
                <h2 style={{ color: "green", fontFamily: "Courier New, monospace" }}>
                  Ward: {selectedWard.wards[0].wardName}
                </h2>
                <h2 style={{ color: "red", fontFamily: "Tahoma, sans-serif" }}>
                  Ward ID: {selectedWard.wards[0].wardId}
                </h2>
                <h2 style={{ color: "purple", fontFamily: "Palatino Linotype, serif" }}>
                  Ward Type: {selectedWard.wards[0].wardType}
                </h2>
                <div className="beds-container">
                  {selectedWard.wards[0].beds.map((bed) => (
                    <MediaCard
                      key={bed._id}
                      bedNumber={bed.bedNumber}
                      status={bed.status}
                      navigate={(url) => window.location.href = url}
                      selectedBed={bed}
                      selectedWard={selectedWard}
                      handleAdmitPatient={handleAdmitPatient}
                    />
                  ))}
                </div>
              </div>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Test;