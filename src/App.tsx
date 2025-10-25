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
import AIDemo from "./pages/AIDemo/AIDemo";
import AIChatBuilder from "./pages/AIChatBuilder/AIChatBuilder";
import ModernPreview from "./pages/TemplatePreview/ModernPreview";
import ClassicPreview from "./pages/TemplatePreview/ClassicPreview";
import CreativePreview from "./pages/TemplatePreview/CreativePreview";
import TechPreview from "./pages/TemplatePreview/TechPreview";
import NaturePreview from "./pages/TemplatePreview/NaturePreview";
import DesignPreview from "./pages/TemplatePreview/DesignPreview";
import TemplatePreviewIndex from "./pages/TemplatePreview/index";
import PreviewSlider from "./pages/TemplatePreview/PreviewSlider";
import { NotificationContainer, useNotifications } from "./components/common/Notification";
import { AuthProvider } from "./context/AuthContext";
import { CvProvider } from "./context/CvContext";
import { AIProvider } from "./context/AIContext";
import { ConversationProvider } from "./context/ConversationContext";

export default function App() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      <AuthProvider>
        <CvProvider>
          <AIProvider>
            <ConversationProvider>
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
            <Route path="/ai-demo" element={<AIDemo />} />
            <Route path="/ai-builder" element={<AIChatBuilder />} />
          </Route>

          {/* Template Preview Pages - Without Layout */}
          <Route path="/preview" element={<TemplatePreviewIndex />} />
          <Route path="/preview/slider" element={<PreviewSlider />} />
          <Route path="/preview/modern" element={<ModernPreview />} />
          <Route path="/preview/classic" element={<ClassicPreview />} />
          <Route path="/preview/creative" element={<CreativePreview />} />
          <Route path="/preview/tech" element={<TechPreview />} />
          <Route path="/preview/nature" element={<NaturePreview />} />
          <Route path="/preview/design" element={<DesignPreview />} />

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
            </Routes>
              </Router>
            </ConversationProvider>
          </AIProvider>
        </CvProvider>
      </AuthProvider>
    </>
  );
}
