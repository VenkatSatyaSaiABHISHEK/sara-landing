import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import ProductDemo from "@/components/product/ProductDemo";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Dashboard from "@/components/product/Dashboard";
import Integrations from "@/components/sections/Integrations";
import OperatingPrinciples from "@/components/sections/OperatingPrinciples";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductDemo />
        <HowItWorks />
        <Features />
        <Dashboard />
        <Integrations />
        <OperatingPrinciples />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
