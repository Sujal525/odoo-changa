// Patient Side: App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ResourceFinder from './components/ResourceFinder';
import ChatBot from './components/ChatBot';
import ReportExplanation from './components/ReportExplanation';
import GlobalInsights from './components/GlobalInsights';
import VirtualMeeting from './components/VirtualMeeting';
import ClinicAppointment from './components/ClinicAppointment';
import HealthRecordPortal from './components/HealthRecordPortal';


function App() {
  const patientId = 123; // Replace with your actual patient id retrieval logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resource-finder" element={<ResourceFinder />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/report-explanation" element={<ReportExplanation />} />
        <Route path="/global-insights" element={<GlobalInsights />} />
        <Route path="/virtual-meeting" element={<VirtualMeeting patientId={patientId} />} />
        <Route path="/clinic-appointment" element={<ClinicAppointment patientId={patientId} />} />
        <Route path="/health_records" element={<HealthRecordPortal />} />
        
      </Routes>
    </Router>
  );
}

export default App;
