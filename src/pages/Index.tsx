import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PositioningBar from "@/components/PositioningBar";
import About from "@/components/About";
import PortfolioGrid from "@/components/PortfolioGrid";
import Services from "@/components/Services";
import AIWorkflow from "@/components/AIWorkflow";
import Testimonials from "@/components/Testimonials";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PositioningBar />
        <About />
        <Services />
        <AIWorkflow />
        <Testimonials />
        <PortfolioGrid />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
