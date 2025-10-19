import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Create from "./pages/CvCreate/Create";
import Templates from "./pages/CvTemplates/Templates";
import Gallery from "./pages/CvGallery/Gallery";
import MyCVs from "./pages/MyCVs/MyCVs";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Help from "./pages/Help/Help";
import { NotificationContainer, useNotifications } from "./components/common/Notification";

export default function App() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      <Router>
        <ScrollToTop />
        <NotificationContainer 
          notifications={notifications} 
          onClose={removeNotification} 
        />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* Main CV Pages */}
            <Route index path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/my-cvs" element={<MyCVs />} />
            
            {/* Account Pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
