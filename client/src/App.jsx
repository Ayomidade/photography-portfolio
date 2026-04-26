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
import Register from "./admin/pages/Register";
import Dashboard from "./admin/pages/Dashboard";
import AdminProjects from "./admin/pages/AdminProjects";
import NewProject from "./admin/pages/NewProject";
import EditProject from "./admin/pages/EditProject";
import AdminPhotos from "./admin/pages/AdminPhotos";
import NewPhoto from "./admin/pages/NewPhoto";
import EditPhoto from "./admin/pages/EditPhoto";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import useScrollToTop from "./hooks/useScrollToTop";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  useScrollToTop();

  return (
    <Routes>
      {/* {useScrollToTop()} */}
      {/* ── Admin routes — no Navbar/Footer ── */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/new"
        element={
          <ProtectedRoute>
            <NewProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/:id/edit"
        element={
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/photos"
        element={
          <ProtectedRoute>
            <AdminPhotos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/photos/new"
        element={
          <ProtectedRoute>
            <NewPhoto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/photos/:id/edit"
        element={
          <ProtectedRoute>
            <EditPhoto />
          </ProtectedRoute>
        }
      />

      {/* ── Public routes — with Navbar/Footer ── */}
      <Route
        path="/*"
        element={
          <>
            <GrainOverlay />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<Project />} />
                <Route path="/images" element={<Images />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: "Montserrat, sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                letterSpacing: "0.04em",
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: 0,
              },
            }}
          />
          <AppRoutes />
        </BrowserRouter>
      </AdminAuthProvider>
    </ThemeProvider>
  );
};

export default App;
