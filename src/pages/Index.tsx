import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PortfolioGrid />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
