import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import oloImage from "@/assets/olu-1.jpg";

const HeroSection = () => {
  const words = ["Systems.", "Support.", "Opportunity."];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-safe-top">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={oloImage}
          alt="Olu Sowunmi"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="label-text text-accent-orange mb-8 mt-24 md:mt-0"
        >
          Talent Leader • Entrepreneur • Trainer
        </motion.p>

        <h1 className="text-display-lg md:text-display-xl font-display font-bold text-foreground mb-8">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`inline-block mr-4 ${
                word === "Opportunity." ? "gradient-text" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-body-lg text-foreground-muted max-w-2xl mx-auto mb-12"
        >
          People rarely lack talent. They usually lack systems, support and opportunity. 
          Everything I do flows from that belief.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col gap-4 justify-center items-center"
        >
          <a href="#ventures" className="btn-gradient w-full sm:w-auto">
            <span>Explore Ventures</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-md border border-accent-teal text-accent-teal font-display font-semibold transition-all duration-300 hover:bg-accent-teal hover:text-background w-full sm:w-auto text-center"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator - hidden on mobile to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-accent-orange bounce-arrow">
          <span className="label-text text-accent-orange">Scroll to Explore</span>
          <ChevronDown size={28} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
