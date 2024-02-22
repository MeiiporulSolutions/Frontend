import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const initialFormData = {
  patientName: "",
  age: "",
  gender: "",
  contactno: "",
  patientId: "",
  currentWardId: "",
  currentBedNumber: "",
  transferWardId: "",
  transferBedNumber: "",
  medicalAcuity: "",
  transferReasons: "",
  extraTransferReason: "",
};

const TransferPatient = () => {
  const location = useLocation();
  const [wardOptions, setWardOptions] = useState([]);

  useEffect(() => {
    // Fetch ward options from the API
    axios
      .get("http://localhost:9000/bedGet")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Flatten the nested structure and extract ward names
          const extractedWardNames = response.data.flatMap((item) =>
            item.wards.map((ward) => ward.name)
          );
          setWardOptions(extractedWardNames);
        }
      })
      .catch((error) => {
        console.error("Error fetching ward options:", error);
      });
  }, []);

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [data, setData] = useState(initialFormData);

  useEffect(() => {
    if (queryParams.has("bedNumber")) {
      setData({
        patientName: queryParams.get("patientName") || "",
        age: queryParams.get("age") === "undefined" ? "" : queryParams.get("age") || "",
        gender: queryParams.get("gender") === "undefined" ? "" : queryParams.get("gender") || "",
        contactno: queryParams.get("contactno") === "undefined" ? "" : queryParams.get("contactno") || "",
        patientId: queryParams.get("patientId") === "undefined" ? "" : queryParams.get("patientId") || "",
        currentWardId: queryParams.get("currentWardId") === "undefined" ? "" : queryParams.get("currentWardId") || "",
        currentBedNumber: queryParams.get("bedNumber") || "",
        transferWardId: "",
        transferBedNumber: "",
        medicalAcuity: queryParams.get("medicalAcuity") === "undefined" ? "" : queryParams.get("medicalAcuity") || "",
        transferReasons: "",
        extraTransferReason: "",
      });
    }
  }, [queryParams]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/tpsss",
        data
      );

      if (response.data.success) {
        // Reset the form and show a success message
        setData(initialFormData);
        toast.success(response.data.message);
      } else {
        // Display the error message from the server
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleGenderChange = (event) => {
    setData({
      ...data,
      gender: event.target.value,
    });
  };

  const handleDatedChanged = (newDate) => {
    const formattedDated = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setData({ ...data, admissionDate: formattedDated });
  };

  const isFormValid = () => {
    // Add validation logic here
    return data.patientName !== "" && data.age !== "" && data.gender !== "" && data.patientId !== "" && data.currentWardId !== "" && data.currentBedNumber !== "";
  };

  return (
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
            To Transfer patient, please enter the details
          </h2>
        </div>
        <Typography
          variant="h3"
          gutterBottom
          style={{ color: "#61AFF7", fontWeight: "bold" }}
        >
          Good Care Hospital
        </Typography>
        <Container
          maxWidth="lr"
          style={{
            display: "flex",
            width: "80%",
            height: "400px",
            marginTop: "10px",
            justifyContent: "flex-start",
            background: "#ffff",
            borderRadius: "30px",
            marginLeft: "-15px",
            boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ width: "100%" }}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={3.1}>
                 
                <TextField
                    label="Name"
                    id="outlined-size-small"
                    defaultValue="Small"
                    size="small"
                    value={data.patientName}
                    onChange={(e) =>
                      setData({ ...data, patientName: e.target.value })
                    }
                    required
                    style={{ width: "100%" }}
                    sx={{
                      ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                      ".MuiInputLabel-shrink": { letterSpacing: 0 },
                      "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                      "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                      ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        
                      },
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                  
                </Grid>
                <Grid item xs={6} sm={1.3}>
                 
                    <TextField
                      label="Age"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      
                      value={data.age}
                      onChange={(e) =>
                        setData({ ...data, age: e.target.value })

                      }
                      sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                          
                        },
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                      }}
                      required
                    />
               
                </Grid>
                
                <Grid item xs={12} sm={3.2}>
                 
                    <TextField
                      label="Contact No"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.contactno}
                      onChange={(e) =>
                        setData({ ...data, contactno: e.target.value })
                      }
                         sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                          
                        },
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                      }}
                      required
                      style={{ width: "100%" }}
                    />
                  
                </Grid>
                <Grid item xs={12} sm={4.5}>
                
                    <RadioGroup
                      name="gender"
                      value={data.gender}
                      onChange={handleGenderChange}
                      sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                          
                        },
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                      }}
                      row
                    >
                        <Typography variant="h5" style={{  fontSize: 14, fontFamily: "Montserrat", color: "#252B42",letterSpacing: "0.2rem", fontSize: "0.8rem" }} gutterBottom>
        Gender
      </Typography>
                      <FormControlLabel
          value="male"
          control={<Radio />}
          label={<Typography variant="h6" style={{  fontSize: 14, fontFamily: "Montserrat", color: "#252B42",letterSpacing: "0.2rem", fontSize: "0.8rem" }}>Male</Typography>}
          
        />
        <FormControlLabel
          value="b"
          control={<Radio />}
          label={<Typography variant="body1" style={{  fontSize: 14, fontFamily: "Montserrat", color: "#252B42" ,letterSpacing: "0.2rem", fontSize: "0.8rem"}}>Female</Typography>}
        />
        <FormControlLabel
          value="c"
          control={<Radio />}
          label={<Typography variant="subtitle1" style={{  fontSize: 14, fontFamily: "Montserrat", color: "#252B42",letterSpacing: "0.2rem", fontSize: "0.8rem" }}>Others</Typography>}
        />
                    </RadioGroup>
                 
                </Grid>



                <Grid item xs={12} sm={2}  >
                    <FormControl size="small" fullWidth variant="outlined" sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                          
                        },
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                       
                      }}>
                      <InputLabel id="demo-select-small-label">
                        Medical Acuity
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.medicalAcuity}
                        onChange={(e) =>
                          setData({ ...data, medicalAcuity: e.target.value })
                        }
                        label="Medical Acuity"
                      >
                        <MenuItem value="Critical">Critical</MenuItem>
                        <MenuItem value="Moderate">Moderate</MenuItem>
                        <MenuItem value="Stable">Stable</MenuItem>
                      </Select>
                    </FormControl>
                  
                </Grid>

                <Grid item xs={6} sm={4}  >
                
                    <FormControl size="small" fullWidth variant="outlined"sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                        marginTop:"-75px",
                        marginLeft:"90px",
                      }}>
                      <InputLabel>Transfer Ward</InputLabel>
                      <Select
                        value={data.transferWardId}
                        onChange={(e) =>
                          setData({ ...data, transferWardId: e.target.value })
                        }
                        label="Wards"
                      >
                        <MenuItem value="Ward A1">Ward A1</MenuItem>
                        <MenuItem value="Ward B1">Ward B1</MenuItem>
                        <MenuItem value="Ward C1">Ward C1</MenuItem>
                        <MenuItem value="Ward D1">Ward D1</MenuItem>
                        <MenuItem value="Ward E1">Ward E1</MenuItem>
                      </Select>
                    </FormControl>
         
                </Grid>
                <Grid item xs={6} sm={3.2}  >
                  
                    <FormControl size="small" fullWidth variant="outlined"sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                      }}>
                      <InputLabel>Current Ward</InputLabel>
                      <Select
                        value={data.currentWardId}
                        onChange={(e) =>
                          setData({ ...data, currentWardId: e.target.value })
                        }
                        label="Wards"
                      >
                        <MenuItem value="Ward A1">Ward A1</MenuItem>
                        <MenuItem value="Ward B1">Ward B1</MenuItem>
                        <MenuItem value="Ward C1">Ward C1</MenuItem>
                        <MenuItem value="Ward D1">Ward D1</MenuItem>
                        <MenuItem value="Ward E1">Ward E1</MenuItem>
                      </Select>
                    </FormControl>
                 
                </Grid>

                {/* <Grid item xs={6} sm={3}>
                  <div
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Admission Date"
                        slotProps={{ textField: { size: "small" } }}
                        value={
                          data.admissionDate ? dayjs(data.admissionDate) : null
                        }
                        onChange={(newDate) => handleDatedChanged(newDate)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid> */}
                <Grid item xs={6} sm={2}  >
                 
                    <TextField
                      label="Patient ID"
                      id="outlined-size-small"
                      size="small"
                      value={data.patientId}
                      onChange={(e) =>
                        setData({ ...data, patientId: e.target.value })
                      }
                      sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                      }}
                      required
                    />
             
                </Grid>

                <Grid item xs={6} sm={2} >
                
                    <TextField
                      label="Current Bed No"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.currentBedNumber}
                      onChange={(e) =>
                        setData({ ...data, currentBedNumber: e.target.value })
                      }
                      sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                      }}
                      required
                    />
            
                </Grid>
                <Grid item xs={6} sm={2.7} >
                 
                    <TextField
                      label="Transfer Bed No"
                      id="outlined-size-small"
                      defaultValue="Small"
                      size="small"
                      value={data.transferBedNumber}
                      onChange={(e) =>
                        setData({ ...data, transferBedNumber: e.target.value })
                      }
                      sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                        marginTop:"-70px",
                        marginLeft:"-70px",
                      }}
                      required
                    />
                 
                </Grid>

                <Grid item xs={6} sm={3} >
                 
                    <FormControl size="small" fullWidth variant="outlined"sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                        marginLeft:'810px',
                        marginTop:"-150px",
                      }}>
                      <InputLabel id="demo-select-small-label">
                        Transfer Reasons
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.transferReasons}
                        onChange={(e) =>
                          setData({ ...data, transferReasons: e.target.value })
                        }
                        label="Transfer Reasons"
                      >
                        <MenuItem value="Blood Cell Count">
                          Blood Cell Count
                        </MenuItem>
                        <MenuItem value="Respiratory Rate">
                          Respiratory Rate
                        </MenuItem>
                        <MenuItem value="Heart Rate">Heart Rate</MenuItem>
                        <MenuItem value="Planned Surgeries">
                          Planned Surgeries
                        </MenuItem>
                      </Select>
                    </FormControl>
               
                </Grid>
                <Grid item xs={6} sm={4} >
           
                  
                    <FormControl size="small" fullWidth variant="outlined" sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        
                        background: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                        marginTop:"-70px",
                        marginLeft:"400px",
                      }}>
                      <InputLabel id="demo-select-small-label">
                        Extra Transfer Reasons
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.extraTransferReason}
                        onChange={(e) =>
                          setData({ ...data, extraTransferReason: e.target.value })
                        }
                        label="Transfer Reasons"
                      >
                        <MenuItem value="Blood Cell Count">
                          Blood Cell Count
                        </MenuItem>
                        <MenuItem value="Respiratory Rate">
                          Respiratory Rate
                        </MenuItem>
                        <MenuItem value="Heart Rate">Heart Rate</MenuItem>
                        <MenuItem value="Planned Surgeries">
                          Planned Surgeries
                        </MenuItem>
                      </Select>
                    </FormControl>
               
                </Grid>

              
                <Grid item xs={12}  sx={{
                        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
                        ".MuiInputLabel-shrink": { letterSpacing: 0 },
                        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
                        "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
                        ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
                          
                        },
                        // background: "#f0f0f0",
                        // padding: "10px",
                        // borderRadius: "10px",
                        // boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                      }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      marginLeft: "650px",
                      marginTop: "5px",
                      borderRadius: "30px",
                      padding: "15px 30px",
                      fontSize: "18px",
                      lineHeight: "1.5",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Transfer Patient
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TransferPatient;



  