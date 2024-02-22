import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4caf50', // Change head background color
    color: 'white',
    fontSize: 18, // Increase font size for head
    fontWeight: 'bold', // Add bold font weight
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f1f8e9', // Change odd row background color
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const WardList = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/avabeds1d');
        console.log('API Response Status:', response.status);

        if (response.status === 200) {
          const data = await response.json();
          console.log('API Data:', data);
          setApiData(data.realTimeBedAvailability);
        } else {
          console.error('Error fetching API data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchData();
  }, []);

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  return (
    <div style={{ marginLeft: '400px', marginTop: "70px" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Available Beds
      </h2>
      <Select
        value={selectedWard}
        onChange={handleWardChange}
        label="Ward"
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Ward
        </MenuItem>
        {apiData.map((wardData) => (
          <MenuItem key={wardData.ward} value={wardData.ward}>
            {wardData.ward}
          </MenuItem>
        ))}
      </Select>

      <TableContainer component={Paper} style={{ width: '500px', height: '100px' }}>
        <Table sx={{ minWidth: 10, minHeight: 100 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ward</StyledTableCell>
              <StyledTableCell align="right">Bed Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData
              .filter((wardData) => selectedWard === '' || wardData.ward === selectedWard)
              .map((wardData) => (
                <StyledTableRow key={wardData.ward}>
                  <StyledTableCell component="th" scope="row" variant="head">
                    {wardData.ward}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Array.isArray(wardData.availableBeds) ? (
                      wardData.availableBeds.map((bed) => (
                        <span key={bed.bedNumber}>{bed.bedNumber}, </span>
                      ))
                    ) : (
                      'N/A'
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {apiData.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={2} align="center">
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WardList;
