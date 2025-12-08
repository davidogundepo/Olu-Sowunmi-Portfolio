import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import VenturesSection from "@/components/VenturesSection";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import CollaborationSection from "@/components/CollaborationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />
      <HeroSection />
      <TimelineSection />
      <VenturesSection />
      <ImpactSection />
      <AboutSection />
      <CollaborationSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
