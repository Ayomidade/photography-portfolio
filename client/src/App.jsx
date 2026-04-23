import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Project from "@/pages/Project";
import Commissions from "@/pages/Commissions";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Images from "@/pages/Images";
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import AdminProjects from "./admin/pages/AdminProjects";
import NewProject from "./admin/pages/NewProject";
import EditProject from "./admin/pages/EditProject";
import AdminPhotos from "./admin/pages/AdminPhotos";
import NewPhoto from "./admin/pages/NewPhoto";
import EditPhoto from "./admin/pages/EditPhoto";
import ProtectedRoute from "./admin/components/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>

            {/* ── Admin routes — no Navbar/Footer ── */}
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin' element={<Navigate  to='/admin/dashboard' replace />} />

            <Route path='/admin/dashboard' element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path='/admin/projects' element={
              <ProtectedRoute><AdminProjects /></ProtectedRoute>
            } />
            <Route path='/admin/projects/new' element={
              <ProtectedRoute><NewProject /></ProtectedRoute>
            } />
            <Route path='/admin/projects/:id/edit' element={
              <ProtectedRoute><EditProject /></ProtectedRoute>
            } />
            <Route path='/admin/photos' element={
              <ProtectedRoute><AdminPhotos /></ProtectedRoute>
            } />
            <Route path='/admin/photos/new' element={
              <ProtectedRoute><NewPhoto /></ProtectedRoute>
            } />
            <Route path='/admin/photos/:id/edit' element={
              <ProtectedRoute><EditPhoto /></ProtectedRoute>
            } />

            {/* ── Public routes — with Navbar/Footer ── */}
            <Route path='/*' element={
              <>
                <GrainOverlay />
                <Navbar />
                <main>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/projects/:slug' element={<Project />} />
                    <Route path='/images' element={<Images />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />

            </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </ThemeProvider>
  );
};

export default App;
