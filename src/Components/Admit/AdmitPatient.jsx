import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import FormControl from "@mui/material/FormControl";
import { FormControl, InputLabel, MenuItem, Select,FormLabel } from "@mui/material";
import { useFormik } from "formik";

//import LocalizationProvider from "@mui/lab/LocalizationProvider";
//import AdapterDayjs from "@mui/lab/AdapterDayjs";
//import { DatePicker } from "@mui/lab";
//import { TimePicker } from "@mui/lab/TimePicker";
import * as Yup from "yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

const validationSchema = Yup.object().shape({
  // Your validation schema definition...
  patientName: Yup.string()
    .required("Patient name is required")
    .matches(/^[a-zA-Z\s]+$/, "Patient name must contain letters only"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  gender: Yup.string().required("Gender is required"),
  contactno: Yup.string()
    .required("Contact number is required")
    .matches(/^\d{10}$/, "Contact number must be 10 digits"),
  abhaNo: Yup.string().required("ABHA number is required"),
  wardId: Yup.string().required("Ward ID is required"),
  wardName: Yup.string().required("Ward name is required"),
  bedNumber: Yup.string().required("Bed number is required"),
  medicalAcuity: Yup.string().required("Medical acuity is required"),
  admittingDoctors: Yup.string().required("Admitting doctors are required"),
  assignedNurse: Yup.string().required("Assigned nurse is required"),
  admissionDate: Yup.date().required("Admission date is required"),
  admissionTime: Yup.string().required("Admission time is required"),
  address: Yup.object().shape({
    doorno: Yup.string().required("Door number is required"),
    streetname: Yup.string().required("Street name is required"),
    district: Yup.string().required("District is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    pincode: Yup.number().required("Pincode is required"),
  }),
  tasks: Yup.object().shape({
    taskType: Yup.string().required("Task type is required"),
    description: Yup.string().required("Task description is required"),
  }),
  infectionStatus:Yup.string().required("infected is required"),
});

const initializeFormData = (queryParams) => ({
  patientName: "",
  age: "",
  gender: "",
  contactno: "",
  abhaNo: "",
  wardId: queryParams.get("bedNumber") ? queryParams.get("wardId") || "" : "",
  wardName: queryParams.get("bedNumber") ? queryParams.get("wardName") || "" : "",
  bedNumber: queryParams.get("bedNumber") || "",
  medicalAcuity: "",
  admittingDoctors: "",
  assignedNurse: "",
  admissionDate: null,
  admissionTime: null,
  address: {
    doorno: "",
    streetname: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
  },
  tasks: {
    taskType: "",
    description: "",
  },
  infectionStatus:"",
});

const AdmitPatient = () => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [data, setData] = useState(initializeFormData(queryParams));
  const [isAdmitted, setIsAdmitted] = useState(false);

  useEffect(() => {
    if (queryParams.has("bedNumber")) {
      setData(initializeFormData(queryParams));
    }
  }, [queryParams]);

  useEffect(() => {
    if (isAdmitted) {
      // Show popup when patient is admitted
      toast.success("Patient Admitted Successfully");
      setIsAdmitted(false); // Reset admission status
    }
  }, [isAdmitted]);
  const handleFormSubmit = async (values) => {
    try {
        await axios.post("http://localhost:9000/admitpt", values);
        // Reset the form and set admission status
        formik.resetForm();
        setIsAdmitted(true);
        toast.success("Patient admitted successfully");
    } catch (error) {
        // Handle network or other errors
        console.error("Error:", error);
        toast.error("An error occurred while submitting the form.");
    }
};


  const formik = useFormik({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });
  const handleDateChange = (newDate) => {
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    formik.setFieldValue("admissionDate", formattedDate);
  };

  const handleTimeChange = (newTime) => {
    const formattedTime = newTime ? dayjs(newTime).format("HH:mm A") : "";
    formik.setFieldValue("admissionTime", formattedTime);
  };

  const shouldDisableDate = (day) => {
    return dayjs(day).isBefore(dayjs(), "day");
  };

  const handleGenderChange = (event) => {
    formik.setFieldValue("gender", event.target.value);
  };
  return (
    <div style={{ display: "flex", justifyContent: "left", backgroundColor: "#f5f5f5" }}>
    
      <div style={{ width: "80%", padding: "10px" }}>
    
       
        <Typography variant="h6" gutterBottom style={{ color: "#61AFF7", fontWeight: "bold",marginTop:"70px", textAlign: "center" }}>To Admit patient please enter the details</Typography>
        <Container maxWidth="lg" style={{ background: "#ffff", borderRadius: "30px", boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)" }}>
          <div style={{ padding: "30px" }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                  <TextField
                    required
                    sx={{  transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      
                    },
                    background: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                  }}
                    fullWidth
                    label="Name"
                    variant="outlined"
                    type="text"
                    value={formik.values.patientName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="patientName"
                    InputLabelProps={{
                      style: { letterSpacing: "0.2rem", fontSize: "0.8rem", }
                    }}
                    inputProps={{
                      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
                    }}
                    placeholder="Enter Name"
                  />
                  {formik.touched.patientName && formik.errors.patientName && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.patientName}
                    </div>
                  )}
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    required
                    sx={{  transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      
                    },
                    background: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                  }}
                    fullWidth
                    label="Age"
                    variant="outlined"
                    type="number"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="age"
                    InputLabelProps={{
                      style: { letterSpacing: "0.2rem", fontSize: "0.8rem", }
                    }}
                    inputProps={{
                      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
                    }}
                    placeholder="Enter age"
                  />
                  {formik.touched.age && formik.errors.age && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.age}
                    </div>
                  )}
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  sx={{  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    
                  },
                  background: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}
                    required
                    fullWidth
                    label="Contact Number"
                    variant="outlined"
                    type="tel"
                    value={formik.values.contactno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="contactno"
                    InputLabelProps={{
                      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
                    }}
                    inputProps={{
                      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
                    }}
                    placeholder="Enter contact number"
                  />
                  {formik.touched.contactno && formik.errors.contactno && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.contactno}
                    </div>
                  )}
                </Grid>
                {/* Age */}
                {/* Contact Number */}
                {/* Gender */}
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


                {/* Bed Number */}
                <Grid item xs={6} sm={3}>
                  <TextField
                    sx={{  transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      
                    },
                    background: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    marginLeft:"400px",
                    marginTop:"-100px",
                  }}
                    required
                    fullWidth
                    label="Bed Number"
                    variant="outlined"
                    type="text"
                    value={formik.values.bedNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="bedNumber"
                    InputLabelProps={{
                      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
                    }}
                    inputProps={{
                      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
                    }}
                    placeholder="Enter bed number"
                  />
                  {formik.touched.bedNumber && formik.errors.bedNumber && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.bedNumber}
                    </div>
                  )}
                </Grid>
                {/* ABHA Number */}
                <Grid item xs={6} sm={3}>
                  <TextField
                    required
                    sx={{  transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      
                    },
                    background: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    marginLeft:"-270px",
                  }}
                    fullWidth
                    label="ABHA Number"
                    variant="outlined"
                    type="text"
                    value={formik.values.abhaNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="abhaNo"
                    InputLabelProps={{
                      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
                    }}
                    inputProps={{
                      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
                    }}
                    placeholder="Enter ABHA number"
                  />
                  {formik.touched.abhaNo && formik.errors.abhaNo && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.abhaNo}
                    </div>
                  )}
                </Grid>
                {/* Ward Name */}
                <Grid item xs={6} sm={3}>
                  <FormControl fullWidth   sx={{  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    
                  },
                  background: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}>
                    <InputLabel style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}>Ward Name</InputLabel>
                    <Select
                      value={formik.values.wardName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="wardName"
                      variant="outlined"
                      style={{ fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }}
                    >
                      <MenuItem value="Ward A">Ward A</MenuItem>
                      <MenuItem value="Ward B">Ward B</MenuItem>
                      <MenuItem value="Ward C">Ward C</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.wardName && formik.errors.wardName && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.wardName}
                    </div>
                  )}
                </Grid>
                {/* Ward ID */}
                <Grid item xs={6} sm={3}>
                  <TextField
                    required
                    fullWidth
                    sx={{  transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      
                    },
                    background: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    marginLeft:"50px",
                  }}
                    label="Ward ID"
                    variant="outlined"
                    type="text"
                    value={formik.values.wardId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="wardId"
                    InputLabelProps={{
                      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
                    }}
                    inputProps={{
                      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
                    }}
                    placeholder="Enter ward ID"
                  />
                  {formik.touched.wardId && formik.errors.wardId && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.wardId}
                    </div>
                  )}
                </Grid>
                <Grid item xs={6} sm={3}>

                <FormControl fullWidth   sx={{  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    
                  },
                  background: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                  marginLeft:"90px",
                }}>
                    <InputLabel style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}>MedicalAcuity</InputLabel>
                    <Select
                      value={formik.values.medicalAcuity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="medicalAcuity"
                      variant="outlined"
                      style={{ fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }}
                    >
                      <MenuItem value="Critical">Critical</MenuItem>
                      <MenuItem value="Moderate">Moderate</MenuItem>
                      <MenuItem value="Stable">Stable</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.medicalAcuity && formik.errors.medicalAcuity && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.medicalAcuity}
                    </div>
                  )}
                </Grid>
                <Grid item xs={6} sm={3}>

                <FormControl fullWidth  sx={{  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    
                  },
                  background: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                  marginLeft:"-90px",
                  marginTop:"-100px",
                  marginLeft:"-90px",
                }}>
                    <InputLabel style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}>Admitting Doctors</InputLabel>
                    <Select
                      value={formik.values.admittingDoctors}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="admittingDoctors"
                      variant="outlined"
                      style={{ fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }}
                    >
                      <MenuItem value="Dr.John">Dr.John</MenuItem>
                        <MenuItem value="Dr.Mithun">Dr.Mithun</MenuItem>
                        <MenuItem value="Dr.Ajay">Dr.Ajay</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.admittingDoctors && formik.errors.admittingDoctors && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {formik.errors.admittingDoctors}
                    </div>
                  )}
                </Grid>
                <Grid item xs={6} sm={3}>

<FormControl fullWidth  sx={{  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    
                  },
                  background: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                }}>
    <InputLabel style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}>Assignednurse</InputLabel>
    <Select
      value={formik.values.assignedNurse}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="assignedNurse"
      variant="outlined"
      style={{ fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }}
    >
        <MenuItem value="Nr.Smithi">Nr.Smithi</MenuItem>
              <MenuItem value="Nr.Jeny">Nr.Jeny</MenuItem>
              <MenuItem value="Nr.Lily">Nr.Lily</MenuItem>
    </Select>
  </FormControl>
  {formik.touched.assignedNurse&& formik.errors.assignedNurse && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.assignedNurse}
    </div>
  )}
</Grid>

<Grid item xs={6} sm={3}>
  <LocalizationProvider dateAdapter={AdapterDayjs} sx={{
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      background: "#e0e0e0",
      color: "#000000",
      transform: "scale(1.05)",
      borderColor: "#cccccc"
    },
    "&:focus": {
      background: "#cce6ff", // Example color change when focused
      color: "#0047b3", // Example color change when focused
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
    marginLeft: "40px"
  }}>
    <TimePicker
      label="Admission Time"
      slotProps={{ textField: { fullWidth: true } }}
      value={formik.values.admissionTime}
      onChange={handleTimeChange}
      onBlur={formik.handleBlur}
      renderInput={(params) => <TextField {...params} style={{ fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }} />}
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
        marginLeft: "40px",
      }}
    />
  </LocalizationProvider>

  {formik.touched.admissionTime && formik.errors.admissionTime && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "15px" }}>
      {formik.errors.admissionTime}
    </div>
  )}
</Grid>



<Grid item xs={6} sm={3}>
 
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker
        label="Admission Date"
        slotProps={{ textField: { fullWidth: true } }} // Setting fullWidth to true
        value={formik.values.admissionDate}
        onChange={handleDateChange}
        onBlur={formik.handleBlur}
        renderInput={(params) => <TextField {...params} style={{ fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }} />}
        shouldDisableDate={shouldDisableDate}
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
          marginLeft:"90px",
        }}
      />
    </LocalizationProvider>
    
    {formik.touched.admissionDate && formik.errors.admissionDate && (
      <div style={{ color: "red", fontSize: "12px", marginTop: "15px" }}>
        {formik.errors.admissionDate}
      </div>
    )}
 
</Grid>
<Grid item xs={2}>
  <Typography variant="h6" gutterBottom style={{ color: "gray", marginTop: "100px",marginLeft:"-800px" }} >
    Address
  </Typography>
</Grid>
<Grid item xs={3}>
  <TextField
    required
    label="Door No."
    variant="outlined"
    type="text"
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    value={formik.values.address.doorno}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="address.doorno"
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter door number"
  />
  {formik.touched.address?.doorno && formik.errors.address?.doorno && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.address?.doorno}
    </div>
  )}
</Grid>

<Grid item xs={3}>
  <TextField
    required
    label="Street Name"
    variant="outlined"
    type="text"
    value={formik.values.address.streetname}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    name="address.streetname"
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter street name"
  />
  {formik.touched.address?.streetname && formik.errors.address?.streetname && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.address?.streetname}
    </div>
  )}
</Grid>

<Grid item xs={3}>
  <TextField
    required
    label="District"
    variant="outlined"
    type="text"
    value={formik.values.address.district}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="address.district"
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter district"
  />
  {formik.touched.address?.district && formik.errors.address?.district && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.address?.district}
    </div>
  )}
</Grid>

<Grid item xs={3}>
  <TextField
    required
    label="State"
    variant="outlined"
    type="text"
    value={formik.values.address.state}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    name="address.state"
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter state"
  />
  {formik.touched.address?.state && formik.errors.address?.state && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.address?.state}
    </div>
  )}
</Grid>

<Grid item xs={3}>
  <TextField
    required
    label="Country"
    variant="outlined"
    type="text"
    value={formik.values.address.country}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="address.country"
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter country"
  />
  {formik.touched.address?.country && formik.errors.address?.country && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.address?.country}
    </div>
  )}
</Grid>

<Grid item xs={3}>
  <TextField
    required
    label="Pincode"
    variant="outlined"
    type="text"
    value={formik.values.address.pincode}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    name="address.pincode"
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter pincode"
  />
  {formik.touched.address?.pincode && formik.errors.address?.pincode && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.address?.pincode}
    </div>
  )}
</Grid>
<Grid item xs={1.4}>
  <Typography variant="h6" gutterBottom style={{ color: "gray", marginTop: "80px",marginLeft:"-550px" }} > 
Tasks  </Typography>
</Grid>
<Grid item xs={2.2} xm={1.2}>
  {/* <TextField
    required
    label="Task Type"
    variant="outlined"
    type="text"
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    value={formik.values.tasks.taskType}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="tasks.taskType"
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter task type"
  />
  {formik.touched.tasks?.taskType && formik.errors.tasks?.taskType && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.tasks?.taskType}
    </div>
  )} */}
</Grid>

<Grid item xs={2.5}xm={1.9}>
  <TextField
    required
    label="Task Description"
    variant="outlined"
    type="text"
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    value={formik.values.tasks.description}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="tasks.description"
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter task description"
  />
  {formik.touched.tasks?.description && formik.errors.tasks?.description && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.tasks?.description}
    </div>
  )}
</Grid>

<Grid item xs={2.2} xm={1.2}>
  <TextField
    required
    label="Task Type"
    variant="outlined"
    type="text"
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    value={formik.values.tasks.taskType}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="tasks.taskType"
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter task type"
  />
  {formik.touched.tasks?.taskType && formik.errors.tasks?.taskType && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.tasks?.taskType}
    </div>
  )}
</Grid>
<Grid item xs={2.5} xm={1.3}>
  <TextField
    required
    label="Infection Status"
    variant="outlined"
    type="text"
    value={formik.values.infectionStatus}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="infectionStatus"
    sx={{  transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      
    },
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
  }}
    InputLabelProps={{
      style: { letterSpacing: "0.2rem", fontSize: "0.8rem" }
    }}
    inputProps={{
      style: { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" }
    }}
    placeholder="Enter infection status"
  />
  {formik.touched.infectionStatus && formik.errors.infectionStatus && (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
      {formik.errors.infectionStatus}
    </div>
  )}
</Grid>


                {/* ... (similar structure for other form fields) */}
                <Grid item xs={3} xm={3}>
  <Button 
    type="submit" 
    variant="contained" 
    color="primary" 
    style={{ 
      width: '200px', 
      height: '50px', 
      fontFamily: 'Montserrat',
      marginTop: '30px' // Adjust margin top as needed
    }}
  >
    Admit Patient
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

export default AdmitPatient;