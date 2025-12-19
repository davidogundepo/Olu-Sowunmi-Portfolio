import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import oluNewImage from "@/assets/olu-new.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={oluNewImage}
                alt="Olu Sowunmi"
                className="w-full h-auto max-h-[600px] object-cover rounded-lg"
              />
            </div>

            {/* Floating Accents */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-orange/20 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-teal/20 rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="label-text text-accent-teal mb-4 block">About Me</span>
            <h2 className="text-display-lg font-display text-foreground mb-6">
              A Life Committed to <span className="gradient-text">Building Others</span>
            </h2>

            <div className="space-y-5 text-body text-foreground-muted">
              <p>
                Olugbenga "Olu" Sowunmi is a builder of people and platforms. For over a decade 
                he has helped organisations, professionals and communities move from good 
                intentions to real outcomes.
              </p>
              <p>
                Olu's core craft is talent strategy: spotting it, growing it, and deploying it on real 
                problems. From roles across VIPCG, Tribal, G4S, RSG, IBM and JPMorganChase to 
                building REDtech Africa Consulting, MOMMS and 3PN, he has consistently worked at 
                the intersection of business strategy and human potential.
              </p>
              <p>
                Today, Olu is a trusted trainer and facilitator for organisations that want measurable 
                change, not just inspiration. His sessions are highly interactive and practical, with minimal 
                theory and maximum tools people can apply immediately.
              </p>
              <p>
                He splits his time across mission-led platforms focused on turning potential into 
                visible results, blending corporate discipline, entrepreneurial creativity and community 
                impact. Equally at home in the boardroom, on campus, in government, or in the community.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="border-l-2 border-accent-orange pl-4">
                <span className="text-display-sm font-display gradient-text">10+</span>
                <p className="text-sm text-foreground-muted">Years Experience</p>
              </div>
              <div className="border-l-2 border-accent-teal pl-4">
                <span className="text-display-sm font-display gradient-text">6</span>
                <p className="text-sm text-foreground-muted">Ventures Founded</p>
              </div>
              <div className="border-l-2 border-accent-gold pl-4">
                <span className="text-display-sm font-display gradient-text">3</span>
                <p className="text-sm text-foreground-muted">Continents Impacted</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
