import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import BedIcon from "@mui/icons-material/Bed";
import { Link } from "react-router-dom";

export const SideNavbar = () => {
  const [isListOpen, setIsListOpen] = React.useState(false);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <Paper
      sx={{
        width: "15%",
        backgroundColor: "#61AFF7",
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        <Button
          component={Link}
          to="/Dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Dashboard
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Bed"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Bed Availability
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/AdmitPatient"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Admit Patient
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
       
       

       

        <Button
          component={Link}
          to="/PatientTable"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Patient details
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
       
        {/* New "List" dropdown with "Transfer" and "Discharge" options */}
        <div style={{ position: "relative" }}>
          <Button
            onClick={toggleList}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ whiteSpace: "nowrap", textTransform: "none" }}
                >
                  View List
                </Typography>
              }
              sx={{ marginLeft: "-20px", color: "#ffff" }}
            />
          </Button>
          {isListOpen && (
            <ul
              id="list-menu"
              className="sub-menu"
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                listStyle: "none",
                padding: "0",
                margin: "0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: "1",
                top: "100%", // Adjust the top position to make the dropdown appear below the button
                right: "0", // Adjust the right position as needed
                borderRadius: "4px", // Add some border-radius for a cleaner look
              }}
            >
              <li>
                <Button
                  component={Link}
                  to="/EditTransfer"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    padding: "8px 16px", // Adjust padding to make it smaller
                  }}
                >
                  Transfer
                </Button>
              </li>
              <li>
                <Button
                  component={Link}
                  to="/EditDischarge"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    padding: "8px 16px", // Adjust padding to make it smaller
                  }}
                >
                  Discharge
                </Button>
              </li>
            </ul>
          )}
        </div>
        {/* <Button
          component={Link}
          to="/EditTransfer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Edit Transfer
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>

        <Button
          component={Link}
          to="/EditDischarge"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Edit Discharge
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button> */}
        <Button
          component={Link}
          to="/Dashboard2"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
               Occupancy Overview 
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        {/* <Button
          component={Link}
          to="/Dashboard2"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Real time Bed Avaliabilty Dashboard
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button> */}
        <Button
          component={Link}
          to="/Dashboard3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              > Real time Bed 
               
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Dashboard4"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
               Patient acuity
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Dash1"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Display Bed Availability
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Dash6"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              >
                Patient Care 
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        
        <Button
          component={Link}
          to="/Risk"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              > Risk Assessment
               
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Line"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              > Admissions and Trend 
               
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Dash8"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              > Bed Turnaround Time
               
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        <Button
          component={Link}
          to="/Configuration"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <BedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", textTransform: "none" }}
              > Configuration Screen
               
              </Typography>
            }
            sx={{ marginLeft: "-20px", color: "#ffff" }}
          />
        </Button>
        
      </List>
    </Paper>
  );
};

export default SideNavbar;
