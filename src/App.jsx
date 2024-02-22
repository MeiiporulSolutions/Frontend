import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AdmitPatient from "./Components/Admit/AdmitPatient";
import Bed from "./Components/Grid/Bed";
import TransferPatient from "./Components/Transfer/TransferPatient";
import DischargePatient from "./Components/Discharge/DischargePatient";
import HospitalGrid from "./Components/Grid/HospitalGrid";
import PatientTable from "./Components/Admit/PatientTable";
import BedOccupancy from "./Components/Dashboard/BedOccupancy";
import BarChart from "./Components/Dashboard/BarChart";
import Dash6 from "./Components/Dashboard/Dash6";
import Dash8 from "./Components/Dashboard/Dash8";
import Line from "./Components/Dashboard/Line";
import Dash7 from "./Components/Dashboard/Dash7";
import Risk from "./Components/Dashboard/Risk";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import "./App.css";
import Dash4 from "./Components/Dashboard/Dash4";
import Dashboard from "./Components/Dashboard/Dashboard";
import EditTransfer from "./Components/Transfer/EditTransfer";
import EditDischarge from "./Components/Discharge/EditDischarge";
import Dash1 from "./Components/Dashboard/Dash1";
import Dash5 from "./Components/Dashboard/Dash5";
import PatientFlow from "./Components/Dashboard/PatientFlow";
import Extraward from "./Components/Grid/Extraward";
import Dash8Sample from "./Components/Dashboard/Dash8sample";
import Configuration from "./Components/Configuration/Configuration";
import LeftNavbar from "./Components/Navbar/LeftNavbar";
import WardList from "./Components/WiteList/WardList";
import WaitingListTable from "./Components/WiteList/WaitingListTable";
import FormWait from "./Components/WiteList/FormWait";
import WaitListForm from "./Components/WiteList/WaitListForm";
import Configuration2 from "./Components/Configuration/Configuration2";
import Test from "./Components/Grid/Test";
import LoginRoute from './Components/Login/Loginroute'; // Adjust the path as necessary
import DashHeat from "./Components/Dashboard/DashHeat";
import Dashboard2 from "./Components/Dashboard/Dashboard2";
import Dashboardmort from "./Components/Dashboard/Dashboardmort";
import Dashboardline from "./Components/Dashboard/Dashboardline";
import Dashboardsan from "./Components/Dashboard/Dashboardsan";
axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation(); // Get the current location
  
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <div style={{ display: "flex" }}>
        <LeftNavbar />
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1 }}>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={900}
                classNames="fade"
                unmountOnExit
              >
                <div>
                  <Routes>
                    <Route path="/" element={<LoginRoute />}>
                      <Route index element={<LoginRoute />} />
                      <Route path="/Dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="/Configr" element={<Configuration2 />} />
                    <Route path="/Dash7" element={<Dash7 />} />
                    <Route path="/Bed" element={<Bed />} />
                    <Route path="/Dashboard4" element={<Dashboard />} />
                    <Route path="/Dashboard3" element={<BedOccupancy />} />
                    <Route path="/Dashboard2" element={<BarChart />} />
                    <Route
                      path="/TransferPatient"
                      element={<TransferPatient />}
                    />
                    <Route path="/AdmitPatient" element={<AdmitPatient />} />
                    <Route path="/Line" element={<Line />} />
                    <Route
                      path="/DischargePatient"
                      element={<DischargePatient />}
                    />
                    <Route path="/ExtraWard" element={<Extraward />} />
                    <Route path="/HospitalGrid" element={<HospitalGrid />} />
                    <Route
                      path="/Configuration"
                      element={<Configuration />}
                    />
                    <Route path="/PatientTable" element={<PatientTable />} />
                    <Route
                      path="/EditTransfer"
                      element={<EditTransfer />}
                    />
                    <Route
                      path="/EditDischarge"
                      element={<EditDischarge />}
                    />
                    <Route path="/Dash8Sample" element={<Dash8Sample />} />
                    <Route path="/Dash1" element={<Dash1 />} />
                    <Route path="/Dash6" element={<Dash6 />} />
                    <Route path="/Dash5" element={<Dash5 />} />
                    <Route path="/Dash8" element={<Dash8 />} />
                    <Route path="/Risk" element={<Risk />} />
                    <Route path="/Dash4" element={<Dash4 />} />
                    <Route path="/PatientFlow" element={<PatientFlow />} />
                    <Route path="/WardList" element={<WardList />} />
                    <Route
                      path="/WaitingListTable"
                      element={<WaitingListTable />}
                    />
                    <Route path="/FormWait" element={<FormWait />} />
                    <Route path="/WaitListForm" element={<WaitListForm />} />
                    <Route path="/testing" element={<Test />} />
                    <Route path="/Dashline" element={<Dashboard2 />}/>
                    <Route path="/Fill" element={<DashHeat />} /> {/* New route path */}
                    <Route path="/Dmort" element={<Dashboardmort />} />
                    <Route path="/Dline" element={<Dashboardline />} />
                       <Route path="/Dsani" element={<Dashboardsan />} />

                  </Routes> 
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
