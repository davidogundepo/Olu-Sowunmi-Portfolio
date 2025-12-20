import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VenturesSection from "@/components/VenturesSection";
import ImpactSection from "@/components/ImpactSection";
import ValuesSection from "@/components/ValuesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import WorkWithOluSection from "@/components/WorkWithOluSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <VenturesSection />
      <ValuesSection />
      <HowWeWorkSection />
      <WorkWithOluSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
