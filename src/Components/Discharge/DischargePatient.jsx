import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const initialFormData = {
  patientName: "",
  age: "",
  gender: "",
  patientId: "",
  wardId: "",
  bedNumber: "",
  medicalAcuity: "",
  dischargeReasons: "",
  mortalityRate: "",
  dischargeDate: null,
  admissionDate: null,
  dischargeTime: null,
};

const DischargePatient = () => {
  const location = useLocation();
  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [wardOptions, setWardOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/bedGet")
      .then((response) => {
        if (Array.isArray(response.data)) {
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

  const [data, setData] = useState(initialFormData);

  useEffect(() => {
    if (queryParams.has("bedNumber")) {
      const admissionDateQueryParam = queryParams.get("admissionDate") || "";
      const formattedAdmissionDate = admissionDateQueryParam
        ? dayjs(admissionDateQueryParam).format("YYYY-MM-DD")
        : null;

      setData({
        patientName: queryParams.get("patientName") || "",
        age: queryParams.get("age") !== undefined ? queryParams.get("age") : "",
        gender: queryParams.get("gender") !== undefined ? queryParams.get("gender") : "",
        contactno: queryParams.get("contactno") !== undefined ? queryParams.get("contactno") : "",
        patientId: queryParams.get("patientId") !== undefined ? queryParams.get("patientId") : "",
        wardId: queryParams.get("WardId") !== undefined ? queryParams.get("WardId") : "",
        bedNumber: queryParams.get("bedNumber") || "",
        medicalAcuity: queryParams.get("medicalAcuity") !== undefined ? queryParams.get("medicalAcuity") : "",
        dischargeReasons: "",
        admissionDate: formattedAdmissionDate,
      });
    }
  }, [queryParams]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {
      patientName,
      age,
      gender,
      patientId,
      wardId,
      bedNumber,
      medicalAcuity,
      dischargeReasons,
      admissionDate,
      dischargeDate,
      dischargeTime,
    } = data;

    try {
      const { data: response } = await axios.post(
        "http://localhost:9000/distaa",
        {
          patientName,
          age,
          gender,
          patientId,
          wardId,
          bedNumber,
          medicalAcuity,
          dischargeReasons,
          admissionDate,
          dischargeDate,
          dischargeTime,
        }
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        setData(initialFormData);
        toast.success("Patient Discharged Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenderChange = (event) => {
    setData({
      ...data,
      gender: event.target.value,
    });
  };

  const Dated = (newDate) => {
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setData({ ...data, dischargeDate: formattedDate });
  };

  const handleTime = (newTime) => {
    const formattedTime = newTime ? dayjs(newTime).format("hh:mm A") : "";
    setData({ ...data, dischargeTime: formattedTime });
  };

  const handleDatedChanged = (newDate) => {
    const formattedDated = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setData({ ...data, admissionDate: formattedDated });
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "100%", padding: "10px", marginLeft: "50px" }}>
        <div
          style={{
            background: "#f0f0f0",
            padding: "10px",
            height: "70px",
            marginBottom: "10px",
            width: "1500px",
            marginLeft: "-4%",
          }}
        >
          <PersonIcon
            style={{ fontSize: 50, marginLeft: "1010px", marginTop: "5px" }}
          />
          <h2 style={{ marginLeft: "50px", marginTop: "-50px" }}>
            To Discharge patient, please enter the details
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
            height: "370px",
            width: "75%",
            marginTop: "30px",
            justifyContent: "flex-start",
            background: "#f0f0f0",
            borderRadius: "30px",
            marginLeft: "10px",
            boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ width: "100%" }}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={4}>

                  <TextField
                    label="Name"
                    id="outlined-size-small"
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
                <Grid item xs={6} sm={1.5}>

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

                <RadioGroup
                      name="gender"
                      value={data.gender}
                      onChange={handleGenderChange}
                      defaultValue="Small"
                      size="small"
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
                        padding: "6px",
                        borderRadius: "10px",
                        boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                        marginLeft:"40px",
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
                <Grid item xs={6} sm={3} >
                 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label=" Discharge Time"
                        slotProps={{ textField: { size: "small" } }}
                        value={data.dischargeTime}
                        onChange={(newTime) => handleTime(newTime)}
                        renderInput={(params) => <TextField {...params} />}
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
                      />
                    </LocalizationProvider>
                  
                </Grid>

                <Grid item xs={6} sm={3}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Discharge Date"
                        slotProps={{ textField: { size: "small" } }}
                        value={
                          data.dischargeDate ? dayjs(data.dischargeDate) : null
                        }
                        onChange={(newDate) => Dated(newDate)}
                        renderInput={(params) => <TextField {...params} />}
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
                      />
                    </LocalizationProvider>
               
                </Grid>

                <Grid item xs={6} sm={3} >
                 
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

                <Grid item xs={6} sm={3}>
                 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Admission Date"
                        slotProps={{ textField: { size: "small" } }}
                        value={
                          data.admissionDate ? dayjs(data.admissionDate) : null
                        }
                        onChange={(newDate) => handleDatedChanged(newDate)}
                        renderInput={(params) => <TextField {...params} />}
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
                      />
                    </LocalizationProvider>
                  
                </Grid>
                <Grid item xs={12} sm={3}>
                 
                    <FormControl size="small" fullWidth variant="outlined"  sx={{
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
                      <InputLabel id="demo-select-small-label">
                        Discharge Reason
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.dischargeReasons}
                        onChange={(e) =>
                          setData({ ...data, dischargeReasons: e.target.value })
                        }
                        label="Discharge Reason"
                      >
                        <MenuItem value="">Select Reason</MenuItem>
                        <MenuItem value="Patient is ok">Patient is ok</MenuItem>
                        <MenuItem value="Patient is not ok">
                          Patient is not ok
                        </MenuItem>
                        <MenuItem value="Patient is fine">
                          Patient is fine{" "}
                        </MenuItem>
                        <MenuItem value="Patient is critical">
                          Patient is critical
                        </MenuItem>
                        <MenuItem value="died">
                          died
                        </MenuItem>
                      </Select>
                    </FormControl>
                  
                </Grid>
                <Grid item xs={6} sm={3} >
                 
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      label=" BedNumber"
                      value={data.bedNumber}
                      onChange={(e) =>
                        setData({ ...data, bedNumber: e.target.value })
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
                <Grid item xs={12} sm={3} >
                
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
                }}>
                      <InputLabel>WardID</InputLabel>
                      <Select
                        value={data.wardId}
                        onChange={(e) =>
                          setData({ ...data, wardId: e.target.value })
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

                <Grid item xs={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      marginLeft: "690px",
                      marginTop: "10px",
                      borderRadius: "30px",
                      padding: "15px 30px",
                      fontSize: "18px",
                      lineHeight: "1.5",
                      boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Discharge
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
export default DischargePatient;