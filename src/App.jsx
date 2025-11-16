import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchDonor from "./pages/DonorList";
import AdminDashboard from "./pages/AdminDashboard";
import EmailVerification from "./pages/EmailVerification";
import EventandCertificats from "./pages/EventandCertificats";
import Certificates from "./pages/Certificates";
import ReadMore from "./pages/ReadMore";
import ManageAdmins from "./pages/ManageAdmins";
import { AuthProvider } from "./context/AuthContext";
import AdminEventandCertificates from "./pages/AdminEventandCertificates";
import AdminCertificats from "./pages/AdminCertificats";
import ViewCertificate from "./components/ViewCertificate";
import AdminPatientList from "./pages/AdminPatientsList";
import Founder from "./pages/Founder";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-donor" element={<SearchDonor />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/events&certificates" element={<EventandCertificats />} />
        <Route
          path="/adminevents&certificates"
          element={<AdminEventandCertificates />}
        />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/viewcertificate" element={<ViewCertificate />} />
        <Route path="/admincertificates" element={<AdminCertificats />} />
        <Route path="/readmore" element={<ReadMore />} />
        <Route path="/manage-admins" element={<ManageAdmins />} />
        <Route path="/email/verify" element={<EmailVerification />} />
        <Route path="/admin/patients" element={<AdminPatientList />} />
        <Route path="/founder" element={<Founder />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
