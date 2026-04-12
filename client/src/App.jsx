import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Collection from "@/pages/Collection";
import Journal from "@/pages/Journal";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import Collections from "@/pages/Collections";
import GrainOverlay from "./components/ui/GrainOverlay";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <GrainOverlay />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collection/:slug" element={<Collection />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/about" element={<About />} />

            {/* 404 ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {/* </GrainOverlay> */}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
