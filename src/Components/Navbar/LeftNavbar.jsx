import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BedIcon from "@mui/icons-material/Bed";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TransferWithinAStationOutlinedIcon from "@mui/icons-material/TransferWithinAStationOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ViewListIcon from "@mui/icons-material/ViewList";

// export default function MiniDrawer() {
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // Create state to manage the dropdown's open/close state
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold" }}
            noWrap
            component="div"
          >
            Good Care Hospital
          </Typography>
          <div style={{ flexGrow: 1 }}></div>{" "}
          {/* This creates space to push the PersonIcon to the right */}
          <IconButton color="inherit" aria-label="user profile">
            <PersonIcon style={{ fontSize: 50, marginRight: "10px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Dashboard",
            "Bed Availability",
            "Admit Patient",
            "Patient Table",
            "Configuration",
          ].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Link
                to={
                  text === "Dashboard"
                    ? "/Dashboard"
                    : text === "Bed Availability"
                    ? "/Bed"
                    : text === "Admit Patient"
                    ? "/AdmitPatient" // Link to the AdmitPatient form
                    : text === "Discharge Patient"
                    ? "/DischargePatient"
                    : text === "Patient Table"
                    ? "/PatientTable" // Link to the PatientTable
                    : "/DischargePatient" // Default to "/PatientTable" if none of the conditions match
                }
                style={{ textDecoration: "none" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text === "Dashboard" ? (
                      <DashboardIcon />
                    ) : text === "Bed Availability" ? (
                      <BedIcon />
                    ) : text === "Admit Patient" ? (
                      <EventIcon />
                    ) : text === "Patient Table" ? (
                      <ChecklistIcon /> 
                      ) : text === "Configuration" ? (
                        <SettingsIcon /> 
                    ) : null}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

          <Divider />

          {/* "Admit Patient" dropdown button */}
          {/* <ListItem
            onClick={() => setDropdownOpen(!dropdownOpen)}
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {/* idula irundu */}
                {/* <ViewListIcon />
              </ListItemIcon>
              <ListItemText
                primary="View List"
                sx={{ opacity: open ? 1 : 0, marginLeft: "8px" }}
              />
            </ListItemButton>
          </ListItem> */}

          {/* Additional items in the dropdown */}
          <Collapse in={dropdownOpen}>
            <List>
              <ListItem key="Transfer" disablePadding sx={{ display: "block" }}>
                <Link to="/Configr" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <TransferWithinAStationOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Transfer"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem
                key="Discharge"
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to="/Configuration1" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Discharge"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Collapse>

          <Divider /> 
          <ListItem
                key="Discharge"
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to="/TransferPatient" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Edit WaitingList"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem
                key="Discharge"
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to="/Dash1" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Waitelist Form"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>

           {/* "Admit Patient" dropdown button */}
           <ListItem
            onClick={() => setDropdown(!dropdown)}
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {/* idula irundu */}
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText
                primary="Wait List"
                sx={{ opacity: open ? 1 : 0, marginLeft: "8px" }}
              />
            </ListItemButton>
          </ListItem>

          {/* Additional items in the dropdown */}
          <Collapse in={dropdown}>
            <List>
              <ListItem key="Transfer" disablePadding sx={{ display: "block" }}>
                <Link to="/FormWait" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <TransferWithinAStationOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Admit Waitlist"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem
                key="Discharge"
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to="/WaitingListTable" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Edit WaitingList"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem
                key="Discharge"
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to="/WaitListForm" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Waitelist Form"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem
                key="Discharge"
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to="/WardList" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Available List"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>

            </List>
          </Collapse>
        </List>
      </Drawer>
    </Box>
  );
}
