import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Insights from "./pages/insightcomponents/InsightsPage";
import Compare from "./pages/ComparePage";
import Install from "./pages/InstallPage";
// import Faq from "./pages/Faq";
// import District from "./pages/District";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/install" element={<Install />} />
          {/* <Route path="/faq" element={<Faq />} /> */}
          {/* <Route path="/district" element={<District />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
